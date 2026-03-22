import Link from "next/link"
import { MessageSquare, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ChatListPage() {
  return (
    <div className="flex h-full flex-col">
      {/* 顶栏 */}
      <header className="flex h-16 items-center justify-between border-b border-border px-6">
        <h1 className="text-lg font-semibold">对话</h1>
        <Link href="/characters">
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            选择角色开始
          </Button>
        </Link>
      </header>

      {/* 空状态 */}
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">还没有对话</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          选择一个角色开始你的第一次对话吧
        </p>
        <Link href="/characters" className="mt-6">
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <MessageSquare className="h-4 w-4" />
            浏览角色
          </Button>
        </Link>
      </div>
    </div>
  )
}
