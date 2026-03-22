import { streamText } from "ai"
import { getModel, type ModelTier } from "@/lib/ai/models"
import { buildPrompt, type CharacterData, type ChatMessage } from "@/lib/ai/prompts"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      messages,
      character,
      userName = "用户",
      tier = "free",
    } = body as {
      messages: ChatMessage[]
      character: CharacterData
      userName?: string
      tier?: ModelTier
    }

    // 参数验证
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "消息不能为空" }, { status: 400 })
    }

    if (!character || !character.name) {
      return Response.json({ error: "角色信息不能为空" }, { status: 400 })
    }

    // 构建完整的prompt
    const fullMessages = buildPrompt({
      character,
      userName,
      chatHistory: messages,
    })

    // 获取模型配置
    const { model, maxTokens, temperature } = getModel(tier)

    // 流式生成回复
    const result = streamText({
      model,
      messages: fullMessages,
      maxOutputTokens: maxTokens,
      temperature,
      frequencyPenalty: 0.7,
      presencePenalty: 0.5,
    })

    // 返回SSE流
    return result.toTextStreamResponse()
  } catch (error) {
    console.error("聊天API错误:", error)
    return Response.json(
      { error: "服务器内部错误，请稍后重试" },
      { status: 500 }
    )
  }
}
