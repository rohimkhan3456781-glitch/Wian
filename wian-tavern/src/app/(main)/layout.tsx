import { Sidebar } from "@/components/layout/sidebar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 lg:ml-[280px]">
        {children}
      </main>
    </div>
  )
}
