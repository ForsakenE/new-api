package oauth

import (
	"context"
	"io"
	"net/http"
	"net/url"
	"time"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/i18n"
	"github.com/QuantumNous/new-api/model"
	"github.com/gin-gonic/gin"
)

func init() {
	Register("wechat_open", &WeChatOpenProvider{})
}

// WeChatOpenProvider implements OAuth for WeChat Open Platform (website QR code login)
type WeChatOpenProvider struct{}

type wechatOpenTokenResponse struct {
	AccessToken  string `json:"access_token"`
	ExpiresIn    int    `json:"expires_in"`
	RefreshToken string `json:"refresh_token"`
	OpenID       string `json:"openid"`
	Scope        string `json:"scope"`
	UnionID      string `json:"unionid"`
	ErrCode      int    `json:"errcode"`
	ErrMsg       string `json:"errmsg"`
}

type wechatOpenUserInfo struct {
	OpenID     string `json:"openid"`
	Nickname   string `json:"nickname"`
	HeadImgURL string `json:"headimgurl"`
	UnionID    string `json:"unionid"`
	ErrCode    int    `json:"errcode"`
	ErrMsg     string `json:"errmsg"`
}

func (p *WeChatOpenProvider) GetName() string {
	return "WeChat"
}

func (p *WeChatOpenProvider) IsEnabled() bool {
	return common.WeChatOpenOAuthEnabled
}

// ExchangeToken exchanges authorization code for access token via WeChat Open Platform.
// WeChat uses GET with URL params instead of POST body.
func (p *WeChatOpenProvider) ExchangeToken(ctx context.Context, code string, c *gin.Context) (*OAuthToken, error) {
	if code == "" {
		return nil, NewOAuthError(i18n.MsgOAuthInvalidCode, nil)
	}

	params := url.Values{}
	params.Set("appid", common.WeChatOpenClientId)
	params.Set("secret", common.WeChatOpenClientSecret)
	params.Set("code", code)
	params.Set("grant_type", "authorization_code")

	reqURL := "https://api.weixin.qq.com/sns/oauth2/access_token?" + params.Encode()
	req, err := http.NewRequestWithContext(ctx, "GET", reqURL, nil)
	if err != nil {
		return nil, err
	}

	client := http.Client{Timeout: 20 * time.Second}
	res, err := client.Do(req)
	if err != nil {
		return nil, NewOAuthErrorWithRaw(i18n.MsgOAuthConnectFailed, map[string]any{"Provider": "WeChat"}, err.Error())
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	var tokenResp wechatOpenTokenResponse
	if err := common.Unmarshal(body, &tokenResp); err != nil {
		return nil, err
	}

	if tokenResp.ErrCode != 0 {
		return nil, NewOAuthErrorWithRaw(i18n.MsgOAuthTokenFailed, map[string]any{"Provider": "WeChat"}, tokenResp.ErrMsg)
	}

	if tokenResp.AccessToken == "" || tokenResp.OpenID == "" {
		return nil, NewOAuthError(i18n.MsgOAuthTokenFailed, map[string]any{"Provider": "WeChat"})
	}

	// Store openid in IDToken field so GetUserInfo can use it
	return &OAuthToken{
		AccessToken:  tokenResp.AccessToken,
		TokenType:    "Bearer",
		RefreshToken: tokenResp.RefreshToken,
		ExpiresIn:    tokenResp.ExpiresIn,
		Scope:        tokenResp.Scope,
		IDToken:      tokenResp.OpenID,
	}, nil
}

// GetUserInfo retrieves user info from WeChat Open Platform.
// WeChat requires access_token and openid as URL params (not Authorization header).
func (p *WeChatOpenProvider) GetUserInfo(ctx context.Context, token *OAuthToken) (*OAuthUser, error) {
	openID := token.IDToken
	if openID == "" {
		return nil, NewOAuthError(i18n.MsgOAuthGetUserErr, map[string]any{"Provider": "WeChat"})
	}

	params := url.Values{}
	params.Set("access_token", token.AccessToken)
	params.Set("openid", openID)
	params.Set("lang", "zh_CN")

	reqURL := "https://api.weixin.qq.com/sns/userinfo?" + params.Encode()
	req, err := http.NewRequestWithContext(ctx, "GET", reqURL, nil)
	if err != nil {
		return nil, err
	}

	client := http.Client{Timeout: 20 * time.Second}
	res, err := client.Do(req)
	if err != nil {
		return nil, NewOAuthErrorWithRaw(i18n.MsgOAuthConnectFailed, map[string]any{"Provider": "WeChat"}, err.Error())
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	var userInfo wechatOpenUserInfo
	if err := common.Unmarshal(body, &userInfo); err != nil {
		return nil, err
	}

	if userInfo.ErrCode != 0 {
		return nil, NewOAuthErrorWithRaw(i18n.MsgOAuthGetUserErr, map[string]any{"Provider": "WeChat"}, userInfo.ErrMsg)
	}

	// Use unionid as the stable cross-app identifier; fall back to openid if unavailable
	providerUserID := userInfo.UnionID
	if providerUserID == "" {
		providerUserID = userInfo.OpenID
	}

	if providerUserID == "" {
		return nil, NewOAuthError(i18n.MsgOAuthUserInfoEmpty, map[string]any{"Provider": "WeChat"})
	}

	return &OAuthUser{
		ProviderUserID: providerUserID,
		Username:       "",
		DisplayName:    userInfo.Nickname,
		Email:          "",
	}, nil
}

func (p *WeChatOpenProvider) IsUserIDTaken(providerUserID string) bool {
	return model.IsWeChatIdAlreadyTaken(providerUserID)
}

func (p *WeChatOpenProvider) FillUserByProviderID(user *model.User, providerUserID string) error {
	user.WeChatId = providerUserID
	return user.FillUserByWeChatId()
}

func (p *WeChatOpenProvider) SetProviderUserID(user *model.User, providerUserID string) {
	user.WeChatId = providerUserID
}

func (p *WeChatOpenProvider) GetProviderPrefix() string {
	return "wechat_"
}
