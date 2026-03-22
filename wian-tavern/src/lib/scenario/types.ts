/**
 * ═══════════════════════════════════════════════════════════════
 * 星穹铁道 · 多角色剧本系统 — 架构设计文档
 * ═══════════════════════════════════════════════════════════════
 *
 * 核心概念：
 * 用户作为"穿越者"进入星穹铁道的世界观
 * 每个NPC角色由独立的LLM实例扮演
 * 用户的选择会产生蝴蝶效应，改变剧情走向
 *
 * ═══════════════════════════════════════════════════════════════
 */

// ============================================================
// 1. 剧本场景（Scene）— 剧情的基本单元
// ============================================================

export interface ScenarioScene {
  id: string
  /** 场景标题（给用户看的） */
  title: string
  /** 场景描述（环境、氛围、背景叙述） */
  narration: string
  /** 当前场景中在场的角色ID列表 */
  presentCharacters: string[]
  /** 场景触发条件（可选，用于条件分支） */
  condition?: SceneCondition
  /** 场景结束后的选项（用户选择） */
  choices?: ScenarioChoice[]
  /** 是否允许自由对话（在选择之前可以跟角色聊天） */
  allowFreeChat: boolean
  /** 自由对话最大轮数（超过后自动弹出选项） */
  maxFreeChatRounds?: number
  /** 场景BGM提示（前端用） */
  bgmHint?: string
  /** 场景背景图提示 */
  backgroundHint?: string
}

// ============================================================
// 2. 剧情选择（Choice）— 用户的决策点
// ============================================================

export interface ScenarioChoice {
  id: string
  /** 选项文本 */
  text: string
  /** 选项的简短描述（鼠标悬浮时显示） */
  description?: string
  /** 选择后跳转的场景ID */
  nextSceneId: string
  /** 选择后触发的旁白（过渡文本） */
  transitionNarration?: string
  /** 选择后对角色好感度的影响 */
  affinityChanges?: Record<string, number>
  /** 选择后设置的标记（用于后续条件判断） */
  setFlags?: Record<string, boolean | string | number>
  /** 选择需要满足的条件 */
  requireFlags?: Record<string, boolean | string | number>
  /** 是否为隐藏选项（需要特定条件才显示） */
  hidden?: boolean
}

// ============================================================
// 3. 条件系统 — 根据之前的选择决定走向
// ============================================================

export interface SceneCondition {
  type: "flag" | "affinity" | "and" | "or"
  /** flag条件：检查某个标记 */
  flag?: string
  value?: boolean | string | number
  /** affinity条件：检查角色好感度 */
  characterId?: string
  minAffinity?: number
  /** 组合条件 */
  conditions?: SceneCondition[]
}

// ============================================================
// 4. 角色定义 — 每个角色都是独立的LLM实例
// ============================================================

export interface ScenarioCharacter {
  id: string
  name: string
  /** 角色的完整描述（性格、外貌、背景、说话风格） */
  description: string
  /** 角色的核心性格关键词 */
  personality: string
  /** 角色的说话风格示例 */
  speechStyle: string
  /** 角色对穿越者的初始态度 */
  initialAttitude: string
  /** 角色的秘密/内心想法（LLM知道但不主动告诉用户的） */
  innerThoughts: string
  /** 角色头像颜色（用于UI显示） */
  avatarColor: string
  /** 角色的命途（开拓、毁灭、智识等） */
  path?: string
}

// ============================================================
// 5. 剧本章节 — 对应游戏中的一个完整剧情弧
// ============================================================

export interface ScenarioChapter {
  id: string
  /** 章节标题 */
  title: string
  /** 章节副标题 */
  subtitle: string
  /** 章节描述 */
  description: string
  /** 对应游戏版本 */
  gameVersion: string
  /** 章节所在星球/区域 */
  location: string
  /** 章节涉及的角色 */
  characters: ScenarioCharacter[]
  /** 章节的场景列表 */
  scenes: ScenarioScene[]
  /** 章节的起始场景ID */
  startSceneId: string
  /** 穿越时间点描述 */
  entryPointDescription: string
  /** 世界观背景（注入所有角色的system prompt） */
  worldContext: string
}

// ============================================================
// 6. 穿越时间点 — 用户可以选择的入口
// ============================================================

export interface TimelineEntry {
  id: string
  /** 时间点标题 */
  title: string
  /** 时间点描述 */
  description: string
  /** 对应章节ID */
  chapterId: string
  /** 游戏版本 */
  gameVersion: string
  /** 所在星球 */
  location: string
  /** 主要角色（头像展示用） */
  mainCharacters: string[]
  /** 难度/复杂度标签 */
  complexity: "简单" | "中等" | "复杂" | "史诗"
  /** 预估时长 */
  estimatedDuration: string
  /** 解锁条件 */
  unlockCondition?: string
}

// ============================================================
// 7. 运行时状态 — 追踪用户在剧本中的进度
// ============================================================

export interface ScenarioState {
  /** 当前章节ID */
  chapterId: string
  /** 当前场景ID */
  currentSceneId: string
  /** 全局标记（用户的选择记录） */
  flags: Record<string, boolean | string | number>
  /** 各角色好感度 */
  affinity: Record<string, number>
  /** 对话历史（每个角色独立） */
  characterHistories: Record<string, ChatMessage[]>
  /** 全局旁白历史 */
  narrationHistory: string[]
  /** 已经过的场景ID列表 */
  visitedScenes: string[]
  /** 用户的穿越者设定 */
  playerProfile: {
    name: string
    backstory: string
  }
}

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

// ============================================================
// 8. 多LLM编排引擎 — 核心调度逻辑
// ============================================================

/**
 * 场景中同时有多个角色时的对话编排策略：
 *
 * 1. 用户发送消息
 * 2. 「导演LLM」判断哪些角色应该回应（不是所有角色每次都说话）
 * 3. 被选中的角色按顺序生成回复（可并行）
 * 4. 每个角色的回复会被其他角色"看到"（加入上下文）
 * 5. 到达特定触发点时，显示选项让用户决策
 *
 * 导演LLM的职责：
 * - 决定谁说话、谁沉默、谁做出反应
 * - 控制场景节奏（不能让对话拖太久）
 * - 在适当时机推进剧情（触发选项/过渡到下一场景）
 * - 插入环境描写和旁白
 */

export interface DirectorDecision {
  /** 应该回应的角色ID列表（按顺序） */
  respondingCharacters: string[]
  /** 是否需要插入旁白 */
  insertNarration: boolean
  /** 旁白内容 */
  narration?: string
  /** 是否触发选项 */
  triggerChoices: boolean
  /** 场景氛围变化 */
  moodShift?: string
}

// ============================================================
// 9. 系统Prompt模板 — 给每个角色LLM的指令
// ============================================================

export const SCENARIO_SYSTEM_PROMPT_TEMPLATE = `你正在参与一个星穹铁道的沉浸式互动剧本。

## 世界观背景
{{worldContext}}

## 当前场景
{{sceneNarration}}

## 你的角色
你扮演的是{{characterName}}。
{{characterDescription}}

## 性格与说话风格
{{personality}}
{{speechStyle}}

## 你对穿越者的态度
有一个来自异世界的穿越者（{{playerName}}）出现在了这个世界中。
{{initialAttitude}}

## 你的内心想法（不要直接告诉穿越者）
{{innerThoughts}}

## 当前在场的其他角色
{{otherCharacters}}

## 重要规则
1. 完全沉浸在角色中，用{{characterName}}的口吻说话
2. 你的回复应该自然地推进对话和剧情
3. 根据穿越者的行为调整你的态度和反应
4. 保持角色的核心性格不变，但允许关系发展
5. 当其他角色说话时，你可能会有反应
6. 不要打破第四面墙
7. 回复控制在2-4段，保持对话节奏
8. 用中文回复，保持角色原有的说话习惯`

export const DIRECTOR_SYSTEM_PROMPT = `你是一个互动剧本的导演AI。你的职责是编排多角色场景中的对话流程。

当前场景中有以下角色在场：
{{presentCharacters}}

穿越者（用户）刚刚说了/做了：
{{userMessage}}

之前的对话：
{{recentHistory}}

请决定：
1. 哪些角色应该回应？（不是每个角色每次都需要说话）
2. 是否需要插入环境描写/旁白？
3. 是否到了应该给用户展示选项的时机？
4. 场景的氛围有没有变化？

以JSON格式回复：
{
  "respondingCharacters": ["角色ID1", "角色ID2"],
  "insertNarration": true/false,
  "narration": "旁白内容（如果需要）",
  "triggerChoices": true/false,
  "moodShift": "氛围变化描述（如果有）"
}`
