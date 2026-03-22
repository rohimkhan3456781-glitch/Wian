import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 items-center border-b border-border px-6">
        <h1 className="text-lg font-semibold">设置</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* 个人信息 */}
          <Card>
            <CardHeader>
              <CardTitle>个人信息</CardTitle>
              <CardDescription>管理你的账号信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nickname">昵称</Label>
                <Input id="nickname" placeholder="输入你的昵称" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">邮箱</Label>
                <Input id="email" type="email" placeholder="your@email.com" disabled />
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                保存修改
              </Button>
            </CardContent>
          </Card>

          {/* 对话设置 */}
          <Card>
            <CardHeader>
              <CardTitle>对话设置</CardTitle>
              <CardDescription>自定义你的对话体验</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>默认AI模型</Label>
                <p className="text-sm text-muted-foreground">
                  免费用户使用 DeepSeek V3，升级会员可使用更高级模型
                </p>
              </div>
              <div className="space-y-2">
                <Label>消息历史长度</Label>
                <p className="text-sm text-muted-foreground">
                  免费版保留最近10轮对话，升级可获得更长记忆
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 账号安全 */}
          <Card>
            <CardHeader>
              <CardTitle>账号安全</CardTitle>
              <CardDescription>管理密码和登录方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">当前密码</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">新密码</Label>
                <Input id="new-password" type="password" />
              </div>
              <Button variant="outline">修改密码</Button>
            </CardContent>
          </Card>

          {/* 危险区域 */}
          <Card className="border-red-200 dark:border-red-900">
            <CardHeader>
              <CardTitle className="text-red-600">危险操作</CardTitle>
              <CardDescription>以下操作不可撤销，请谨慎</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">导出所有数据</p>
                  <p className="text-xs text-muted-foreground">
                    下载你的所有对话记录和角色数据
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  导出
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600">删除账号</p>
                  <p className="text-xs text-muted-foreground">
                    永久删除你的账号和所有数据
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  删除账号
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
