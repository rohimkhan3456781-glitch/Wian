/**
 * AI模型配置和路由
 * 根据用户会员等级选择不同的模型
 */

import { createOpenAICompatible } from "@ai-sdk/openai-compatible"

// DeepSeek — 免费/基础用户的默认模型
const deepseek = createOpenAICompatible({
  name: "deepseek",
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY || "",
})

export type ModelTier = "free" | "basic" | "premium"

interface ModelConfig {
  provider: ReturnType<typeof createOpenAICompatible>
  modelId: string
  maxTokens: number
  temperature: number
}

// 模型配置表
const MODEL_CONFIGS: Record<ModelTier, ModelConfig> = {
  free: {
    provider: deepseek,
    modelId: "deepseek-chat",
    maxTokens: 400,
    temperature: 0.8,
  },
  basic: {
    provider: deepseek,
    modelId: "deepseek-chat",
    maxTokens: 800,
    temperature: 0.8,
  },
  premium: {
    provider: deepseek,
    modelId: "deepseek-chat",
    maxTokens: 1200,
    temperature: 0.85,
  },
}

/**
 * 获取对应会员等级的AI模型
 */
export function getModel(tier: ModelTier) {
  const config = MODEL_CONFIGS[tier]
  return {
    model: config.provider(config.modelId),
    maxTokens: config.maxTokens,
    temperature: config.temperature,
  }
}

/**
 * 每日消息限额
 */
export const DAILY_MESSAGE_LIMITS: Record<ModelTier, number> = {
  free: 20,
  basic: 500,
  premium: 999999, // 无限
}
