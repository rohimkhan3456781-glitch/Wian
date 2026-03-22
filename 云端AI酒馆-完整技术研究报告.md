# 云端AI酒馆 - 完整技术研究报告

> 调研时间：2026年3月 | 目标：打造一个比SillyTavern更好的云端AI角色聊天平台

---

# 第一部分：竞品分析

## 1. SillyTavern（AI酒馆）

### 技术栈
- **前端**：纯原生JavaScript + HTML + CSS（没用React/Vue）
- **后端**：Node.js 18+ / Express.js
- **数据存储**：不用数据库，全部文件系统存储（JSON/JSONL）
- **配置**：config.yaml + 环境变量

### 核心功能
- 支持30+个AI后端（OpenAI、Claude、DeepSeek、本地模型等）
- 角色卡系统（V1/V2标准，PNG嵌入元数据）
- 世界书（Lorebook）关键词触发知识注入
- 提示词管理器（精细控制prompt构建）
- 扩展插件系统（事件驱动架构）
- 多用户支持

### 优点
- 极高自定义自由度
- 完全免费开源（AGPLv3）
- 30+个AI后端支持
- 强大的世界书系统
- 角色卡生态丰富

### 缺点（我们的机会！）
- **学习曲线陡峭** — 新手配置困难
- **需要自己部署** — 要Node.js环境、命令行操作
- **需要自己找API** — 还要自己付API费
- **长期记忆不足** — 超出上下文后信息丢失
- **UI复杂** — 设置选项过多
- **更新常出Bug**
- **前端代码有历史包袱**

---

## 2. 各竞品数据对比

| 平台 | 月活用户 | 月收入（估） | 定价 | NSFW | 核心优势 |
|------|---------|-------------|------|------|---------|
| **Character.AI** | 2000万 | ~$420万 | $9.99/月 | 否 | 最大角色生态（1800万+角色） |
| **Talkie**（MiniMax） | 1100万 | ~$580万 | $9.99/月 | 受限 | 广告+订阅双驱动 |
| **Janitor AI** | 870万 | ~$520万 | 免费/$9.99+ | 是 | NSFW自由度 |
| **CrushOn.AI** | 310万 | 未公开 | $5.99-49.90 | 是 | 多模型+无审查 |
| **Chai AI** | 200万DAU | ~$400万 | 免费增值 | 部分 | 12人团队年入5000万美元 |
| **Replika** | 200万 | ~$250万 | 纯订阅 | 受限 | 情感陪伴品牌 |
| **猫箱**（中国） | — | 100万+美元/月 | 15-78元 | 否 | 国内AI社交品类首个盈利 |

### 关键发现
1. **Chai AI只有12个员工就年入近5000万美元** — 证明小团队完全可行
2. **Character.AI审查太严导致用户流失** — 用户流向Janitor AI等平台
3. **猫箱打破了"国内AI社交难赚钱"的印象**
4. **市场规模**：AI角色聊天市场预计2031年达19亿美元
5. **记忆和个性化是下一个战场**

---

# 第二部分：核心技术方案

## 1. 角色卡系统

### Character Card V2 格式（行业标准）

```json
{
  "spec": "chara_card_v2",
  "spec_version": "2.0",
  "data": {
    "name": "角色名称",
    "description": "角色描述（外貌、背景、性格等）",
    "personality": "性格简述",
    "scenario": "对话场景/情境设定",
    "first_mes": "角色第一条消息",
    "mes_example": "示例对话（<START>分隔）",
    "creator_notes": "给使用者看的说明",
    "system_prompt": "覆盖默认system prompt",
    "post_history_instructions": "历史消息之后的指令",
    "alternate_greetings": ["备选开场白1", "备选开场白2"],
    "tags": ["fantasy", "male"],
    "creator": "作者名",
    "character_version": "1.0",
    "extensions": {},
    "character_book": {
      "name": "角色专属知识库",
      "entries": [
        {
          "keys": ["触发关键词"],
          "content": "当关键词触发时注入的文本",
          "enabled": true
        }
      ]
    }
  }
}
```

### PNG嵌入角色卡（Node.js实现）

```javascript
// 读取角色卡
const extract = require('png-chunks-extract');
const text = require('png-chunk-text');

function readCharacterCard(pngPath) {
  const buffer = fs.readFileSync(pngPath);
  const chunks = extract(buffer);
  const textChunks = chunks
    .filter(c => c.name === 'tEXt')
    .map(c => text.decode(c.data));
  const charaChunk = textChunks.find(c => c.keyword === 'chara');
  const json = Buffer.from(charaChunk.text, 'base64').toString('utf-8');
  return JSON.parse(json);
}
```

---

## 2. 提示词工程（最关键的技术）

### Prompt构建架构

```
┌─────────────────────────────────┐
│  System Prompt (主系统提示)       │  ← 定义AI行为框架
├─────────────────────────────────┤
│  Character Description           │  ← 角色卡的description
├─────────────────────────────────┤
│  Character Personality           │  ← 角色卡的personality
├─────────────────────────────────┤
│  Scenario                        │  ← 当前场景
├─────────────────────────────────┤
│  World Info / Lorebook           │  ← 动态注入的世界设定
├─────────────────────────────────┤
│  Example Messages                │  ← 示例对话
├─────────────────────────────────┤
│  Chat History                    │  ← 实际对话历史
├─────────────────────────────────┤
│  Post-History Instructions       │  ← 最后的指令
└─────────────────────────────────┘
```

### 推荐System Prompt模板

```text
Write {{char}}'s next reply in a fictional roleplay between {{char}} and {{user}}.

## Core Rules
- Write in third person, present tense, narrative prose style.
- Be proactive, creative, and drive the plot forward.
- Always stay in character and maintain {{char}}'s unique voice.
- Describe actions, emotions, and surroundings in vivid detail.
- Use "..." for speech and *...* for actions/thoughts.
- Never speak or act for {{user}}.
- Never break the fourth wall or acknowledge being an AI.
- Responses should be 2-4 paragraphs.
```

### 角色一致性保持技巧

1. **First Message是最强的风格锚点** — 模型会强烈模仿第一条消息的风格
2. **正面表述优于否定** — "以尊重用户自主性的方式撰写"比"不要代替用户行动"好
3. **示例对话用`<START>`分隔**
4. **采样参数**：temperature 0.7-0.9，frequency_penalty 0.7，presence_penalty 0.5

---

## 3. 记忆系统

### 三层记忆架构

```
短期记忆（最近20条消息）→ 中期记忆（摘要压缩）→ 长期记忆（向量数据库）
```

### 向量记忆实现（PostgreSQL + pgvector）

```sql
CREATE EXTENSION vector;

-- 长期记忆表
CREATE TABLE memories (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  character_id UUID NOT NULL,
  content TEXT NOT NULL,
  memory_type VARCHAR(20),  -- 'fact' | 'event' | 'summary'
  embedding vector(1536),
  importance FLOAT DEFAULT 0.5,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON memories USING hnsw (embedding vector_cosine_ops);
```

### 语义检索

```javascript
async function retrieveMemories(userId, characterId, query, limit = 5) {
  const queryEmbedding = await getEmbedding(query);
  const result = await db.query(
    `SELECT content, 1 - (embedding <=> $4::vector) AS similarity
     FROM memories
     WHERE user_id = $1 AND character_id = $2
     ORDER BY embedding <=> $4::vector
     LIMIT $3`,
    [userId, characterId, limit, JSON.stringify(queryEmbedding)]
  );
  return result.rows;
}
```

---

## 4. 世界书（Lorebook）实现

关键词触发 + 按需注入，只在对话中出现相关关键词时才注入，节省token。

支持：
- AND/OR/NOT复杂条件匹配
- Token预算管理
- 粘滞条目（激活后保持N轮）
- 冷却时间
- 递归扫描（链式触发）

---

## 5. 推荐技术栈

```
┌─────────────────────────────────────────────┐
│                  Frontend                    │
│  Next.js 15 + React + TypeScript + Tailwind │
│  shadcn/ui + SSE streaming                  │
└──────────────────┬──────────────────────────┘
                   │ HTTPS / SSE
┌──────────────────▼──────────────────────────┐
│                  Backend                     │
│  Node.js + Hono                             │
│  Vercel AI SDK (统一多模型接口)               │
│  Redis (速率限制 + 缓存)                     │
└──────────┬───────────┬──────────────────────┘
           │           │
┌──────────▼──┐  ┌─────▼──────────────────────┐
│ PostgreSQL  │  │   AI Provider APIs          │
│ + pgvector  │  │   DeepSeek / Claude / GPT   │
│ (Prisma ORM)│  │   (按需路由)                 │
└─────────────┘  └────────────────────────────┘
```

| 层级 | 选择 | 理由 |
|------|------|------|
| 前端 | Next.js + React | 生态成熟，SSR对SEO有利 |
| 后端 | Node.js + Hono | 比Express更快，TypeScript前后端同构 |
| ORM | Prisma | 类型安全，自动生成TypeScript类型 |
| 数据库 | PostgreSQL + pgvector | 关系数据+向量搜索一站式 |
| 缓存 | Redis | 速率限制、会话缓存 |
| 实时通信 | SSE | AI响应是单向流，比WebSocket简单 |

### SSE流式响应（打字机效果）

```javascript
// 后端
app.post('/api/chat', async (c) => {
  return streamSSE(c, async (stream) => {
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: messages,
      stream: true,
    });
    for await (const chunk of completion) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) await stream.writeSSE({ data: text, event: 'token' });
    }
  });
});
```

---

## 6. API成本控制

### 模型价格对比（2026年3月）

| 模型 | 输入 ($/M tokens) | 输出 ($/M tokens) | 适合场景 |
|------|-------------------|-------------------|---------|
| **DeepSeek V3** | $0.28 | $0.42 | **首选！性价比之王** |
| Gemini 2.5 Flash | $0.30 | $2.50 | 免费额度大 |
| GPT-5 nano | $0.05 | $0.40 | 摘要/分类等辅助任务 |
| Claude Haiku 4.5 | $1.00 | $5.00 | 角色扮演质量优秀 |
| Claude Sonnet 4.6 | $3.00 | $15.00 | 旗舰级RP质量 |

### 成本估算

```
以DeepSeek V3为例：
- 单次对话成本：(2000 x 0.28 + 300 x 0.42) / 1,000,000 = $0.000686
- 免费用户每天50条：$0.034/天 ≈ $1/月
- 付费用户每天100条(Claude Sonnet)：≈ $31.5/月
```

### 成本控制策略

1. **模型分层路由** — 免费用户用DeepSeek，付费用户用Claude/GPT
2. **Token预算控制** — 每用户每日限额
3. **Prompt缓存** — 角色描述等不变部分缓存，节省90%输入成本
4. **回复长度限制** — 免费400 tokens，付费1000 tokens

---

# 第三部分：支付与运营

## 1. 支付接入

### 最佳路径
```
注册个体工商户（免费，3天出照）→ 申请微信/支付宝商户号 → 直接对接官方API
```

### 过渡方案
先用XorPay快速上线（免开户费，综合费率0.88%）→ 同步注册个体工商户 → 切换到官方支付

### 第三方支付对比

| 平台 | 开户费 | 综合费率 | 支付渠道 |
|------|--------|---------|---------|
| **XorPay** | 免费 | **0.88%** | 微信+支付宝 |
| 虎皮椒 | 118元 | 1.6-2.6% | 微信+支付宝 |
| YunGouOS | 300元 | 2.6% | 微信+支付宝 |

---

## 2. 会员定价

### 三档设计

| 档位 | 月费 | 年费 | 每日消息 | AI模型 | 记忆 |
|------|------|------|---------|--------|------|
| 免费 | 0 | 0 | 20-30条 | DeepSeek | 最近10轮 |
| 基础 | 19.9元 | 168元 | 200-500条 | 标准模型 | 最近50轮 |
| 高级 | 39.9元 | 388元 | 无限 | Claude/GPT | 完整历史 |

### 补充策略
- 虚拟货币：1元=100币，用于解锁特定角色卡
- 首月特惠：9.9元
- 新用户送3天高级版体验

---

## 3. 合规要求（极其重要！）

### 必须做的
1. **注册个体工商户** — 线上免费办理
2. **ICP备案** — 1-3周
3. **算法备案** — 约2个月
4. **大模型登记**（调用第三方API）或 **大模型备案**（自研/微调）

### 绝对不能碰的
- **NSFW内容** — AlienChat案：开发者判刑4年、罚金400万元！
- 必须使用已备案的国内大模型API
- 必须建立内容安全过滤系统（敏感词库≥1万词）

### 合规时间线
```
第1个月：注册个体工商户 + ICP备案
第2个月：公安备案 + 算法备案材料准备
第3-4个月：提交算法备案 + 安全评估
第5-6个月：大模型登记
第7个月：上线运营
```

---

## 4. 推广获客

### 渠道优先级
1. **小红书**（最优先） — 用户画像与AI角色聊天高度重合
2. **B站** — Z世代接受度高
3. **抖音** — 流量大但精准度低
4. **SEO** — 百度+小红书搜索+微信搜一搜

### 冷启动计划
```
第1-2周：即刻/V2EX发布，邀请种子用户内测
第3-4周：小红书10-20篇种草笔记，B站2-3个视频
第2个月：日更小红书，联系KOC合作
第3个月：分析ROI，集中资源到最优渠道
```

---

# 第四部分：我们的差异化优势

## 比SillyTavern好在哪？

| 对比项 | SillyTavern | 我们的云端版 |
|--------|------------|------------|
| 使用门槛 | 要部署Node.js | 打开网页就用 |
| API费用 | 用户自己掏 | 包含在月费里 |
| 手机体验 | 勉强能用 | 专门优化 |
| 角色卡 | 要自己找 | 预装+兼容导入 |
| 记忆系统 | 基础（上下文窗口限制） | 向量数据库长期记忆 |
| 学习曲线 | 极陡 | 开箱即用 |

## MVP开发计划

### 第一期（1-2周）
1. 角色卡导入/创建（兼容V2 PNG格式）
2. 基础对话（SSE流式）
3. 上下文窗口管理
4. 用户注册登录
5. 免费额度限制

### 第二期（第3-4周）
6. 支付系统接入
7. 会员订阅管理
8. 向量记忆（pgvector）
9. 世界书/Lorebook

### 第三期（后续迭代）
10. 多模型路由
11. 用户自创角色+社区分享
12. 语音聊天（TTS）
13. 多角色同场景互动

---

# 参考来源

## SillyTavern技术
- [SillyTavern GitHub](https://github.com/SillyTavern/SillyTavern)
- [SillyTavern官方文档](https://docs.sillytavern.app/)
- [Character Card V2规范](https://github.com/malfoyslastname/character-card-spec-v2)
- [SillyTavern DeepWiki架构分析](https://deepwiki.com/SillyTavern/SillyTavern)

## 竞品数据
- [Character AI Statistics 2026](https://www.demandsage.com/character-ai-statistics/)
- [Janitor AI Statistics 2026](https://wifitalents.com/janitor-ai-statistics/)
- [CrushOn AI Statistics](https://wifitalents.com/crushon-ai-statistics/)
- [CHAI $48M Revenue](https://www.prnewswire.com/news-releases/chai-48myear-in-revenue-after-funding-round-by-amd-and-coreweave-302609197.html)
- [MiniMax ARR $150M](https://kr-asia.com/minimaxs-arr-tops-usd-150-million-as-it-pivots-toward-an-ai-platform-model)

## 技术实现
- [LLM API Pricing 2026](https://www.tldl.io/resources/llm-api-pricing-2026)
- [SSE vs WebSocket for AI Chat](https://www.sniki.dev/posts/sse-vs-websockets-for-ai-chat/)
- [Vercel AI Chatbot Template](https://github.com/vercel/chatbot)

## 支付与合规
- [XorPay官网](https://xorpay.com)
- [AI算法备案攻略](https://zhuanlan.zhihu.com/p/1896984498073236885)
- [大模型备案全流程](https://zhuanlan.zhihu.com/p/1910099650351986326)
- [AlienChat判刑案例](https://zhuanlan.zhihu.com/p/16792939911)

## 推广获客
- [小红书搜索红利](https://zhuanlan.zhihu.com/p/683187913)
- [AI陪伴行业崛起](https://www.moonfox.cn/insight/trending/1813)
