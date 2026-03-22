import Link from "next/link"
import { Sparkles, MessageSquare, Brain, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      {/* 导航栏 */}
      <header className="flex h-16 items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">AI酒馆</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            登录
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            注册
          </Link>
        </div>
      </header>

      {/* 主内容 */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
        {/* 标题区域 */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            云端AI角色聊天平台
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            和AI角色
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              自由对话
            </span>
          </h1>
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
            无需部署，打开即用。自定义角色、长期记忆、世界书系统，
            <br className="hidden sm:block" />
            给你最好的AI角色扮演体验。
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/chat"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-8 text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
            >
              <MessageSquare className="h-5 w-5" />
              开始聊天
            </Link>
            <Link
              href="/characters"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-background px-8 text-base font-medium hover:bg-accent"
            >
              浏览角色
            </Link>
          </div>
        </div>

        {/* 特色功能 */}
        <div className="mx-auto mt-24 grid max-w-5xl gap-8 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">流畅对话</h3>
            <p className="text-sm text-muted-foreground">
              打字机效果实时响应，支持Markdown格式，对话体验媲美真人。
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">长期记忆</h3>
            <p className="text-sm text-muted-foreground">
              AI会记住你们聊过的每一件事，角色的记忆永远不会丢失。
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">开箱即用</h3>
            <p className="text-sm text-muted-foreground">
              无需部署、无需API密钥、无需技术背景。注册即可开始。
            </p>
          </div>
        </div>
      </main>

      {/* 底部 */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>AI酒馆 - 云端AI角色聊天平台</p>
      </footer>
    </div>
  )
}
