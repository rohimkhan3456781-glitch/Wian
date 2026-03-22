/**
 * AI角色对话的Prompt构建引擎
 * 负责将角色卡、对话历史、世界书等信息组装成完整的prompt
 */

export interface CharacterData {
  name: string
  description: string
  personality: string
  scenario: string
  firstMessage: string
  exampleMessages: string
  systemPrompt: string
  postHistoryInstructions: string
}

export interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

export interface WorldBookEntry {
  keywords: string[]
  content: string
  priority: number
  maxTokens: number
  enabled: boolean
}

// 默认的系统提示词
const DEFAULT_SYSTEM_PROMPT = `Write {{char}}'s next reply in a fictional roleplay between {{char}} and {{user}}.

## Core Rules
- Write in the language that {{user}} uses. If {{user}} writes in Chinese, respond in Chinese.
- Be proactive, creative, and drive the conversation forward.
- Always stay in character and maintain {{char}}'s unique voice and personality.
- Describe actions, emotions, and surroundings in vivid detail when appropriate.
- Use "..." for speech and *...* for actions/thoughts.
- Never speak or act for {{user}}.
- Never break the fourth wall or acknowledge being an AI.
- Responses should be 1-4 paragraphs, matching the conversation flow.
- React naturally to what {{user}} says, showing genuine emotions and personality.`

/**
 * 构建完整的消息列表，用于发送给AI模型
 */
export function buildPrompt(options: {
  character: CharacterData
  userName: string
  chatHistory: ChatMessage[]
  worldBookEntries?: WorldBookEntry[]
  memories?: string[]
  maxContextTokens?: number
}): ChatMessage[] {
  const {
    character,
    userName,
    chatHistory,
    worldBookEntries = [],
    memories = [],
  } = options

  const messages: ChatMessage[] = []

  // 1. 系统提示词
  const systemPrompt = character.systemPrompt || DEFAULT_SYSTEM_PROMPT
  let systemContent = replaceTemplateTags(systemPrompt, character.name, userName)

  // 2. 角色描述
  if (character.description) {
    systemContent += `\n\n## Character: ${character.name}\n${replaceTemplateTags(character.description, character.name, userName)}`
  }

  // 3. 角色性格
  if (character.personality) {
    systemContent += `\n\n## Personality\n${replaceTemplateTags(character.personality, character.name, userName)}`
  }

  // 4. 场景
  if (character.scenario) {
    systemContent += `\n\n## Scenario\n${replaceTemplateTags(character.scenario, character.name, userName)}`
  }

  // 5. 世界书条目（关键词匹配后注入）
  const triggeredEntries = matchWorldBookEntries(
    worldBookEntries,
    chatHistory.slice(-5).map((m) => m.content).join(" ")
  )
  if (triggeredEntries.length > 0) {
    systemContent += "\n\n## World Information"
    for (const entry of triggeredEntries) {
      systemContent += `\n${entry.content}`
    }
  }

  // 6. 长期记忆注入
  if (memories.length > 0) {
    systemContent += `\n\n## Relevant Memories\nThings ${character.name} remembers about past conversations:`
    for (const memory of memories) {
      systemContent += `\n- ${memory}`
    }
  }

  messages.push({ role: "system", content: systemContent })

  // 7. 示例对话
  if (character.exampleMessages) {
    const examples = parseExampleMessages(character.exampleMessages, character.name, userName)
    if (examples.length > 0) {
      // 添加示例对话分隔标记
      messages.push({
        role: "system",
        content: "[The following are example conversations to demonstrate the character's voice and style:]",
      })
      messages.push(...examples)
      messages.push({
        role: "system",
        content: "[End of examples. The actual roleplay begins below:]",
      })
    }
  }

  // 8. 实际对话历史
  messages.push(...chatHistory)

  // 9. 历史后指令（放在最后，紧贴AI回复前）
  if (character.postHistoryInstructions) {
    messages.push({
      role: "system",
      content: replaceTemplateTags(character.postHistoryInstructions, character.name, userName),
    })
  }

  return messages
}

/**
 * 替换模板标签 {{char}} 和 {{user}}
 */
function replaceTemplateTags(text: string, charName: string, userName: string): string {
  return text
    .replace(/\{\{char\}\}/gi, charName)
    .replace(/\{\{user\}\}/gi, userName)
}

/**
 * 解析示例对话
 * 格式: <START> 分隔多组示例
 */
function parseExampleMessages(
  text: string,
  charName: string,
  userName: string
): ChatMessage[] {
  const messages: ChatMessage[] = []
  const processed = replaceTemplateTags(text, charName, userName)

  // 按 <START> 分割，取最后一组（最能代表角色风格的）
  const groups = processed.split(/<START>/i).filter((g) => g.trim())
  const lastGroup = groups[groups.length - 1] || ""

  // 解析每一行
  const lines = lastGroup.split("\n").filter((l) => l.trim())
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith(`${charName}:`)) {
      messages.push({
        role: "assistant",
        content: trimmed.slice(charName.length + 1).trim(),
      })
    } else if (trimmed.startsWith(`${userName}:`)) {
      messages.push({
        role: "user",
        content: trimmed.slice(userName.length + 1).trim(),
      })
    }
  }

  return messages
}

/**
 * 匹配世界书条目：检查最近对话中是否包含关键词
 */
function matchWorldBookEntries(
  entries: WorldBookEntry[],
  recentText: string
): WorldBookEntry[] {
  const lowerText = recentText.toLowerCase()

  return entries
    .filter((entry) => {
      if (!entry.enabled) return false
      return entry.keywords.some((kw) => lowerText.includes(kw.toLowerCase()))
    })
    .sort((a, b) => b.priority - a.priority)
}
