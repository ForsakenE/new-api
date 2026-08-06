package model

import (
	"github.com/QuantumNous/new-api/common"
)

// ModelEndpoints 表示模型的扩展配置（存储在 models.endpoints JSON 字段中）。
//
// JSON 结构由 Buyer 后端构建并同步到 new-api，包含：
// - limits: 限制配置（最大输出令牌数等）
// - pricing: 定价信息（输入/输出/缓存价格）
// - capabilities: 能力标签列表
// - lifecycle: 生命周期信息（状态、通知 URL）
//
// 参考：Buyer ModelAdminService.buildEndpointsJson
type ModelEndpoints struct {
	Limits       *ModelLimits       `json:"limits,omitempty"`
	Pricing      *ModelPricing      `json:"pricing,omitempty"`
	Capabilities []string           `json:"capabilities,omitempty"`
	Lifecycle    *ModelLifecycle    `json:"lifecycle,omitempty"`
}

// ModelLimits 模型限制配置
type ModelLimits struct {
	MaxOutput *int `json:"max_output,omitempty"` // 最大输出令牌数
}

// ModelPricing 模型定价信息
type ModelPricing struct {
	InputPrice  *float64 `json:"input_price,omitempty"`  // 输入价格（USD/M tokens）
	OutputPrice *float64 `json:"output_price,omitempty"` // 输出价格（USD/M tokens）
	CachePrice  *float64 `json:"cache_price,omitempty"`  // 缓存价格（USD/M tokens）
}

// ModelLifecycle 模型生命周期信息
type ModelLifecycle struct {
	Status    string `json:"status,omitempty"`     // 生命周期状态（active/deprecated/legacy）
	NoticeUrl string `json:"notice_url,omitempty"` // 通知 URL
}

// ParseEndpoints 解析 Model.Endpoints JSON 字段为结构体
func (m *Model) ParseEndpoints() (*ModelEndpoints, error) {
	if m.Endpoints == "" {
		return &ModelEndpoints{}, nil
	}

	var endpoints ModelEndpoints
	err := common.UnmarshalJsonStr(m.Endpoints, &endpoints)
	if err != nil {
		return &ModelEndpoints{}, err
	}
	return &endpoints, nil
}

// GetMaxOutput 从 endpoints 中提取最大输出令牌数
func (m *Model) GetMaxOutput() *int {
	endpoints, err := m.ParseEndpoints()
	if err != nil || endpoints.Limits == nil {
		return nil
	}
	return endpoints.Limits.MaxOutput
}

// GetCapabilities 从 endpoints 中提取能力列表
func (m *Model) GetCapabilities() []string {
	endpoints, err := m.ParseEndpoints()
	if err != nil {
		return []string{}
	}
	return endpoints.Capabilities
}

// GetPricing 从 endpoints 中提取定价信息
func (m *Model) GetPricing() *ModelPricing {
	endpoints, err := m.ParseEndpoints()
	if err != nil {
		return nil
	}
	return endpoints.Pricing
}

// GetLifecycle 从 endpoints 中提取生命周期信息
func (m *Model) GetLifecycle() *ModelLifecycle {
	endpoints, err := m.ParseEndpoints()
	if err != nil {
		return nil
	}
	return endpoints.Lifecycle
}
