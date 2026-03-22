"use client"

import { useChat, type UIMessage } from "@ai-sdk/react"
import { TextStreamChatTransport } from "ai"
import { useRef, useEffect, useState, useCallback } from "react"
import { Send, RotateCcw, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { CharacterData } from "@/lib/ai/prompts"

interface ChatInterfaceProps {
  character: CharacterData
  userName?: string
}

// 从UIMessage中提取文本内容
function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("")
}

export function ChatInterface({ character, userName = "用户" }: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [input, setInput] = useState("")
  const [isComposing, setIsComposing] = useState(false)

  const firstMessageText = character.firstMessage
    ? character.firstMessage
        .replace(/\{\{char\}\}/gi, character.name)
        .replace(/\{\{user\}\}/gi, userName)
    : ""

  const { messages, sendMessage, regenerate, stop, status } = useChat({
    transport: new TextStreamChatTransport({
      api: "/api/chat",
      body: {
        character,
        userName,
        tier: "free",
      },
    }),
    messages: firstMessageText
      ? [
          {
            id: "first-message",
            role: "assistant" as const,
            parts: [{ type: "text" as const, text: firstMessageText }],
          },
        ]
      : [],
  })

  const isLoading = status === "submitted" || status === "streaming"

  // 自动滚动到底部
  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current
      el.scrollTop = el.scrollHeight
    }
  }, [messages])

  // 自动调整textarea高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  // 发送消息
  const handleSend = useCallback(() => {
    const text = input.trim()
    if (!text || isLoading) return
    setInput("")
    sendMessage({ text })
  }, [input, isLoading, sendMessage])

  // 按Enter发送（Shift+Enter换行）
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* 角色信息栏 */}
      <header className="flex h-16 items-center gap-3 border-b border-border px-4">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-bold text-white">
            {character.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold">{character.name}</h2>
          <p className="truncate text-xs text-muted-foreground">
            {character.personality || character.description.slice(0, 50)}
          </p>
        </div>
      </header>

      {/* 消息列表 */}
      <ScrollArea className="flex-1">
        <div ref={scrollRef} className="h-full overflow-y-auto">
          <div className="mx-auto max-w-3xl space-y-6 p-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                characterName={character.name}
                userName={userName}
              />
            ))}

            {/* 加载指示器 */}
            {status === "submitted" && (
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-xs font-bold text-white">
                    {character.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-2xl rounded-tl-none bg-muted px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* 操作按钮 */}
      {messages.length > 1 && (
        <div className="flex justify-center gap-2 border-t border-border px-4 py-2">
          {isLoading ? (
            <Button variant="ghost" size="sm" onClick={() => stop()} className="gap-1 text-xs">
              <Square className="h-3 w-3" />
              停止生成
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => regenerate()} className="gap-1 text-xs">
              <RotateCcw className="h-3 w-3" />
              重新生成
            </Button>
          )}
        </div>
      )}

      {/* 输入区域 */}
      <div className="border-t border-border p-4">
        <div className="mx-auto flex max-w-3xl gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder={`对 ${character.name} 说些什么...`}
            className="min-h-[44px] max-h-[200px] resize-none"
            rows={1}
          />
          <Button
            type="button"
            size="icon"
            disabled={!input.trim() || isLoading}
            onClick={handleSend}
            className="h-[44px] w-[44px] shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-muted-foreground">
          免费用户每日20条消息 | AI生成内容仅供娱乐
        </p>
      </div>
    </div>
  )
}

// 消息气泡组件
function MessageBubble({
  message,
  characterName,
  userName,
}: {
  message: UIMessage
  characterName: string
  userName: string
}) {
  const isUser = message.role === "user"
  const text = getMessageText(message)

  if (!text) return null

  return (
    <div className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback
          className={cn(
            "text-xs font-bold text-white",
            isUser
              ? "bg-gradient-to-br from-blue-500 to-cyan-500"
              : "bg-gradient-to-br from-purple-500 to-pink-500"
          )}
        >
          {isUser ? userName[0] : characterName[0]}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "rounded-tr-none bg-primary text-primary-foreground"
            : "rounded-tl-none bg-muted"
        )}
      >
        <div className="whitespace-pre-wrap break-words">
          {formatMessage(text)}
        </div>
      </div>
    </div>
  )
}

/**
 * 简单的消息格式化
 * 支持 *动作* 和 **粗体** 的显示
 */
function formatMessage(content: string): React.ReactNode {
  const parts = content.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="text-muted-foreground/80">
          {part.slice(1, -1)}
        </em>
      )
    }
    return part
  })
}
