import Link from "next/link"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// 预装角色（后续从数据库读取）
const presetCharacters = [
  {
    id: "preset-1",
    name: "林黛玉",
    description: "红楼梦中的林黛玉，才华横溢、多愁善感的女子。擅长诗词，性格敏感细腻。",
    personality: "才华横溢、多愁善感、伶牙俐齿",
    tags: ["古典", "文学", "红楼梦"],
    chatCount: 0,
    avatar: null,
  },
  {
    id: "preset-2",
    name: "诸葛亮",
    description: "三国时期蜀汉丞相，足智多谋、鞠躬尽瘁的千古名相。",
    personality: "智慧超群、沉稳睿智、忠义无双",
    tags: ["历史", "三国", "谋略"],
    chatCount: 0,
    avatar: null,
  },
  {
    id: "preset-3",
    name: "福尔摩斯",
    description: "贝克街221B的著名侦探，拥有超凡的观察力和推理能力。",
    personality: "冷静理性、观察入微、特立独行",
    tags: ["推理", "侦探", "经典"],
    chatCount: 0,
    avatar: null,
  },
  {
    id: "preset-4",
    name: "星际旅行者·艾拉",
    description: "来自远方星系的冒险家，驾驶着一艘老旧的飞船穿梭于各个星球之间。",
    personality: "乐观开朗、勇敢冒险、幽默风趣",
    tags: ["科幻", "冒险", "原创"],
    chatCount: 0,
    avatar: null,
  },
  {
    id: "preset-5",
    name: "温柔的咖啡店主·小雨",
    description: "一家隐藏在巷子深处的小咖啡店的主人，总是能用温暖的话语治愈每一位客人。",
    personality: "温柔体贴、善于倾听、治愈系",
    tags: ["日常", "治愈", "原创"],
    chatCount: 0,
    avatar: null,
  },
  {
    id: "preset-6",
    name: "赛博朋克黑客·零",
    description: "2077年的天才黑客，游走在网络暗面与现实世界之间，只相信代码和数据。",
    personality: "叛逆不羁、技术天才、冷酷锐利",
    tags: ["赛博朋克", "科幻", "原创"],
    chatCount: 0,
    avatar: null,
  },
]

export default function CharactersPage() {
  return (
    <div className="flex h-full flex-col">
      {/* 顶栏 */}
      <header className="flex h-16 items-center justify-between border-b border-border px-6">
        <h1 className="text-lg font-semibold">角色</h1>
        <Link href="/characters/create">
          <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            创建角色
          </Button>
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        {/* 搜索栏 */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索角色..."
            className="pl-10"
          />
        </div>

        {/* 角色列表 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {presetCharacters.map((char) => (
            <Link key={char.id} href={`/chat/${char.id}`}>
              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    {/* 角色头像 */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-lg font-bold text-white">
                      {char.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base">{char.name}</CardTitle>
                      <CardDescription className="mt-1 line-clamp-1 text-xs">
                        {char.personality}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                    {char.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {char.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
