"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  MessageSquare,
  Users,
  Settings,
  Crown,
  Plus,
  Menu,
  X,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const navItems = [
  { href: "/chat", label: "对话", icon: MessageSquare },
  { href: "/characters", label: "角色", icon: Users },
  { href: "/membership", label: "会员", icon: Crown },
  { href: "/settings", label: "设置", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* 移动端菜单按钮 */}
      <button
        className="fixed left-4 top-4 z-50 rounded-lg bg-white p-2 shadow-md dark:bg-zinc-900 lg:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* 移动端遮罩 */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full w-[280px] flex-col border-r border-border bg-background transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">AI酒馆</span>
          </Link>
          <button
            className="rounded-lg p-1 hover:bg-accent lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 新建对话按钮 */}
        <div className="p-4">
          <Link href="/chat">
            <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              新建对话
            </Button>
          </Link>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 px-3">
          <ScrollArea className="h-full">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </ScrollArea>
        </nav>

        {/* 底部用户信息 */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
              U
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium">未登录</p>
              <p className="text-xs text-muted-foreground">免费用户</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
