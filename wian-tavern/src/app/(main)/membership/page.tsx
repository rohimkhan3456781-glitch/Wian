import { Check, Crown, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "免费版",
    price: "0",
    period: "",
    description: "体验基础功能",
    icon: Sparkles,
    features: [
      "每日20条消息",
      "2个自定义角色",
      "基础AI模型",
      "短期记忆（10轮对话）",
      "预装角色全部可用",
    ],
    limitations: ["含广告", "高峰期需排队"],
    buttonText: "当前方案",
    buttonVariant: "outline" as const,
    highlight: false,
  },
  {
    name: "基础版",
    price: "19.9",
    period: "/月",
    yearPrice: "168",
    description: "适合日常使用",
    icon: Zap,
    features: [
      "每日500条消息",
      "10个自定义角色",
      "标准AI模型",
      "中期记忆（50轮对话）",
      "无广告",
      "更多角色模板",
      "高峰期优先排队",
    ],
    limitations: [],
    buttonText: "升级到基础版",
    buttonVariant: "default" as const,
    highlight: true,
  },
  {
    name: "高级版",
    price: "39.9",
    period: "/月",
    yearPrice: "388",
    description: "深度用户首选",
    icon: Crown,
    features: [
      "无限消息",
      "无限自定义角色",
      "高级AI模型（更智能）",
      "完整长期记忆",
      "无广告",
      "高级角色设定",
      "语音对话功能",
      "多角色互动",
      "优先体验新功能",
    ],
    limitations: [],
    buttonText: "升级到高级版",
    buttonVariant: "default" as const,
    highlight: false,
  },
]

export default function MembershipPage() {
  return (
    <div className="flex h-full flex-col">
      <header className="flex h-16 items-center border-b border-border px-6">
        <h1 className="text-lg font-semibold">会员中心</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-5xl">
          {/* 标题 */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">选择适合你的方案</h2>
            <p className="mt-2 text-muted-foreground">
              首月特惠 9.9 元，新用户注册送 3 天高级版体验
            </p>
          </div>

          {/* 套餐卡片 */}
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={cn(
                  "relative flex flex-col",
                  plan.highlight && "border-primary shadow-lg shadow-primary/10"
                )}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="premium">最受欢迎</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <plan.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg text-muted-foreground">元{plan.period}</span>
                  </div>
                  {plan.yearPrice && (
                    <p className="text-sm text-muted-foreground">
                      年付 {plan.yearPrice} 元（省更多）
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        {feature}
                      </li>
                    ))}
                    {plan.limitations.map((limitation) => (
                      <li
                        key={limitation}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-0.5 h-4 w-4 shrink-0 text-center">-</span>
                        {limitation}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.buttonVariant}
                    className={cn(
                      "mt-6 w-full",
                      plan.highlight &&
                        "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 虚拟货币 */}
          <div className="mt-12">
            <h3 className="mb-4 text-center text-xl font-semibold">虚拟货币充值</h3>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              1元 = 100币，用于解锁特定角色卡、购买装扮等
            </p>
            <div className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-4">
              {[
                { amount: 1, coins: 100 },
                { amount: 6, coins: 600 },
                { amount: 30, coins: 3000, bonus: "+300" },
                { amount: 98, coins: 9800, bonus: "+1200" },
              ].map((pack) => (
                <Card
                  key={pack.amount}
                  className="cursor-pointer text-center transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <p className="text-2xl font-bold text-primary">{pack.coins}</p>
                    <p className="text-xs text-muted-foreground">虚拟币</p>
                    {pack.bonus && (
                      <Badge variant="success" className="mt-1 text-xs">
                        赠送{pack.bonus}
                      </Badge>
                    )}
                    <p className="mt-2 font-medium">{pack.amount}元</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
