package controller

import (
	"io"
	"net/http"
	"net/url"
	"strconv"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/model"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

const juheAPIBase = "https://open.juhedenglu.cn/connect.php"

type juheLoginResponse struct {
	Code   int    `json:"code"`
	Msg    string `json:"msg"`
	Type   string `json:"type"`
	URL    string `json:"url"`
	QRCode string `json:"qrcode"`
}

type juheCallbackResponse struct {
	Code        int    `json:"code"`
	Msg         string `json:"msg"`
	Type        string `json:"type"`
	AccessToken string `json:"access_token"`
	SocialUID   string `json:"social_uid"`
	FaceImg     string `json:"faceimg"`
	Nickname    string `json:"nickname"`
	Location    string `json:"location"`
	Gender      string `json:"gender"`
	IP          string `json:"ip"`
}

func juheGet(rawURL string, out any) error {
	client := http.Client{Timeout: 15 * time.Second}
	resp, err := client.Get(rawURL)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	return common.Unmarshal(body, out)
}

// JuheWeChatGetLoginURL 调聚合登录 API 获取微信跳转地址，返回给前端后由前端跳转。
// GET /api/oauth/juhe_wechat/login?redirect_uri=xxx
func JuheWeChatGetLoginURL(c *gin.Context) {
	if !common.JuheWeChatEnabled {
		c.JSON(http.StatusOK, gin.H{"success": false, "message": "聚合登录微信未启用"})
		return
	}
	if common.JuheAppId == "" || common.JuheAppKey == "" {
		c.JSON(http.StatusOK, gin.H{"success": false, "message": "聚合登录 AppID/AppKey 未配置"})
		return
	}
	redirectURI := c.Query("redirect_uri")
	if redirectURI == "" {
		c.JSON(http.StatusOK, gin.H{"success": false, "message": "缺少 redirect_uri 参数"})
		return
	}

	params := url.Values{}
	params.Set("act", "login")
	params.Set("appid", common.JuheAppId)
	params.Set("appkey", common.JuheAppKey)
	params.Set("type", "wx")
	params.Set("redirect_uri", redirectURI)

	var loginResp juheLoginResponse
	if err := juheGet(juheAPIBase+"?"+params.Encode(), &loginResp); err != nil {
		c.JSON(http.StatusOK, gin.H{"success": false, "message": "请求聚合登录失败: " + err.Error()})
		return
	}
	if loginResp.Code != 0 {
		c.JSON(http.StatusOK, gin.H{"success": false, "message": loginResp.Msg})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"url": loginResp.URL,
		},
	})
}

// JuheWeChatCallback 处理聚合登录微信回调，用 code 换取 social_uid，完成登录或绑定。
// GET /api/oauth/juhe_wechat?code=xxx&type=wx
func JuheWeChatCallback(c *gin.Context) {
	if !common.JuheWeChatEnabled {
		c.JSON(http.StatusOK, gin.H{"success": false, "message": "聚合登录微信未启用"})
		return
	}

	code := c.Query("code")
	if code == "" {
		c.JSON(http.StatusOK, gin.H{"success": false, "message": "缺少 code 参数"})
		return
	}

	params := url.Values{}
	params.Set("act", "callback")
	params.Set("appid", common.JuheAppId)
	params.Set("appkey", common.JuheAppKey)
	params.Set("type", "wx")
	params.Set("code", code)

	var cbResp juheCallbackResponse
	if err := juheGet(juheAPIBase+"?"+params.Encode(), &cbResp); err != nil {
		c.JSON(http.StatusOK, gin.H{"success": false, "message": "回调请求失败: " + err.Error()})
		return
	}
	if cbResp.Code != 0 {
		c.JSON(http.StatusOK, gin.H{"success": false, "message": cbResp.Msg})
		return
	}
	if cbResp.SocialUID == "" {
		c.JSON(http.StatusOK, gin.H{"success": false, "message": "聚合登录未返回用户标识"})
		return
	}

	socialUID := cbResp.SocialUID
	session := sessions.Default(c)

	// 已登录用户 → 绑定流程
	if username := session.Get("username"); username != nil {
		if model.IsWeChatIdAlreadyTaken(socialUID) {
			c.JSON(http.StatusOK, gin.H{"success": false, "message": "该微信账号已被绑定"})
			return
		}
		id := session.Get("id")
		user := model.User{Id: id.(int)}
		if err := user.FillUserById(); err != nil {
			common.ApiError(c, err)
			return
		}
		user.WeChatId = socialUID
		if err := user.Update(false); err != nil {
			common.ApiError(c, err)
			return
		}
		c.JSON(http.StatusOK, gin.H{"success": true, "message": "bind"})
		return
	}

	// 未登录 → 登录/注册流程
	user := model.User{WeChatId: socialUID}
	if model.IsWeChatIdAlreadyTaken(socialUID) {
		if err := user.FillUserByWeChatId(); err != nil {
			c.JSON(http.StatusOK, gin.H{"success": false, "message": err.Error()})
			return
		}
		if user.Id == 0 {
			c.JSON(http.StatusOK, gin.H{"success": false, "message": "用户已注销"})
			return
		}
	} else {
		if !common.RegisterEnabled {
			c.JSON(http.StatusOK, gin.H{"success": false, "message": "管理员关闭了新用户注册"})
			return
		}
		user.Username = "wechat_" + strconv.Itoa(model.GetMaxUserId()+1)
		user.DisplayName = cbResp.Nickname
		if user.DisplayName == "" {
			user.DisplayName = "WeChat User"
		}
		user.Role = common.RoleCommonUser
		user.Status = common.UserStatusEnabled
		if err := user.Insert(0); err != nil {
			c.JSON(http.StatusOK, gin.H{"success": false, "message": err.Error()})
			return
		}
	}

	if user.Status != common.UserStatusEnabled {
		c.JSON(http.StatusOK, gin.H{"success": false, "message": "用户已被封禁"})
		return
	}

	setupLogin(&user, c)
}
