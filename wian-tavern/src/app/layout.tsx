import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI酒馆 - 云端AI角色聊天平台",
  description:
    "与AI角色自由对话，无需部署，打开即用。支持自定义角色、长期记忆、世界书系统。",
  keywords: ["AI聊天", "AI角色", "角色扮演", "虚拟角色", "AI酒馆"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="h-full font-sans">{children}</body>
    </html>
  )
}
