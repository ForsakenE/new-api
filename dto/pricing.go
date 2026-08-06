package dto

import "github.com/QuantumNous/new-api/constant"

// 这里不好动就不动了，本来想独立出来的（
type OpenAIModels struct {
	Id                     string                  `json:"id"`
	Object                 string                  `json:"object"`
	Created                int                     `json:"created"`
	OwnedBy                string                  `json:"owned_by"`
	SupportedEndpointTypes []constant.EndpointType `json:"supported_endpoint_types"`

	// 扩展字段（从 Model.Endpoints JSON 解析）
	ContextLength    *int64    `json:"context_length,omitempty"`    // 上下文长度
	MaxOutput        *int      `json:"max_output,omitempty"`        // 最大输出令牌数
	InputModalities  string    `json:"input_modalities,omitempty"`  // 输入模态（逗号分隔）
	OutputModalities string    `json:"output_modalities,omitempty"` // 输出模态（逗号分隔）
	Capabilities     []string  `json:"capabilities,omitempty"`      // 能力标签
	InputPrice       *float64  `json:"input_price,omitempty"`       // 输入价格（USD/M tokens）
	OutputPrice      *float64  `json:"output_price,omitempty"`      // 输出价格（USD/M tokens）
	CachePrice       *float64  `json:"cache_price,omitempty"`       // 缓存价格（USD/M tokens）
	LifecycleStatus  string    `json:"lifecycle_status,omitempty"`  // 生命周期状态
	LifecycleNotice  string    `json:"lifecycle_notice,omitempty"`  // 生命周期通知 URL
}

type AnthropicModel struct {
	ID          string `json:"id"`
	CreatedAt   string `json:"created_at"`
	DisplayName string `json:"display_name"`
	Type        string `json:"type"`
}

type GeminiModel struct {
	Name                       interface{}   `json:"name"`
	BaseModelId                interface{}   `json:"baseModelId"`
	Version                    interface{}   `json:"version"`
	DisplayName                interface{}   `json:"displayName"`
	Description                interface{}   `json:"description"`
	InputTokenLimit            interface{}   `json:"inputTokenLimit"`
	OutputTokenLimit           interface{}   `json:"outputTokenLimit"`
	SupportedGenerationMethods []interface{} `json:"supportedGenerationMethods"`
	Thinking                   interface{}   `json:"thinking"`
	Temperature                interface{}   `json:"temperature"`
	MaxTemperature             interface{}   `json:"maxTemperature"`
	TopP                       interface{}   `json:"topP"`
	TopK                       interface{}   `json:"topK"`
}
