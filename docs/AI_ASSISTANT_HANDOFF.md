# AI Travel Assistant — 改动对照与交接说明

面向项目其他同学的交接文档。本次为 **增量接入**，不重写登录 / 积分 / 兑换 / 解锁核心逻辑。

正式域名：https://cchinaroute.com  
仓库：https://github.com/olinadouce/ChinaTravelGuide

---

## 1. 现有架构核查结论（实现前）

| 项 | 结论 |
|---|---|
| 前端 | Next.js **16.2** App Router + React 19 + Tailwind |
| 后端 | Next.js Route Handlers（`src/app/api/**`），`runtime = "nodejs"` |
| 认证 | Firebase Auth（邮箱 + Google），API 用 `Authorization: Bearer <idToken>` |
| 用户 / 积分 / 解锁 | Firestore `users/{uid}`：`points`、`unlockedPackages`（值为 `pkg-*` id） |
| ORM | 无 Prisma；Firebase Admin SDK |
| 国际化 | 非 next-intl；前端 `localStorage.ctg_language` + `/api/translate` |
| 样式 | Tailwind |
| Vercel | Next 部署；付费攻略走 Vercel Blob |
| package 识别 | URL `/packages/[slug]`，解锁校验用 `pkg.id`（如 `pkg-ishowspeed-beijing`） |
| 管理员 | 原站无后台角色；AI 管理页用 `AI_ADMIN_UIDS` / `AI_ADMIN_EMAILS` |

---

## 2. 改动总览（新增 vs 修改）

### 2.1 新增文件（全部为 AI 助手相关）

```
knowledge/                                      # 定稿 Markdown 知识库（人工校对后同步）
scripts/knowledge-lib.ts                        # frontmatter 校验
scripts/sync-knowledge.ts                       # validate / sync / status
src/lib/ai/config.ts
src/lib/ai/system-prompt.ts
src/lib/ai/entitlements.ts                      # 复用 unlockedPackages
src/lib/ai/search.ts                            # Vector Store Search（先检索后生成）
src/lib/ai/generate.ts                          # Responses API + Structured Outputs
src/lib/ai/scope.ts
src/lib/ai/rate-limit.ts                        # Firestore 跨实例限流
src/lib/ai/unanswered.ts                        # 未收录问题
src/lib/ai/ai-assistant.test.ts
src/app/api/ai-assistant/chat/route.ts
src/app/api/ai-assistant/unanswered/route.ts
src/components/ai/AITravelAssistant.tsx         # 右下角悬浮窗
src/app/admin/unanswered-questions/page.tsx
vitest.config.ts
docs/AI_ASSISTANT_HANDOFF.md                    # 本文件
```

### 2.2 修改文件（尽量最小）

| 文件 | 改动前 | 改动后 |
|---|---|---|
| `src/app/layout.tsx` | 仅 Nav + main + Footer | **多挂载** `<AITravelAssistant />`（登录/admin 页组件内自隐藏） |
| `package.json` | 无 knowledge/test 脚本；无 openai | 增加 `openai`/`gray-matter`/`zod`/`vitest`/`tsx` 与 `knowledge:*`、`test` |
| `.env.example` | 仅 Firebase / Blob | **追加** AI / OpenAI / Admin 环境变量说明 |
| `firestore.rules` | 用户/论坛规则 | **追加** `unansweredQuestions`、`aiRateLimits`（仅 Admin SDK） |
| `README.md` | 原说明 | **追加** AI Assistant 章节 |

### 2.3 明确未改动（底层保持原样）

- Firebase 登录流程、`FirebaseAuthProvider`
- `points-service` / 兑换解锁 API
- 方案包数据 `src/data/packages/*`
- 付费 HTML Blob 读取逻辑
- 现有页面业务（destinations / forum / tools 等）

---

## 3. 权限逻辑（必须理解）

服务端根据 session 计算，**忽略**客户端传来的 `isPaid` / `unlockedPackageIds` / `isAdmin`。

```
未登录 / 已登录未解锁 → 只能检索 access_level=free
已解锁某 pkg-id     → free 全部 + 该 package 的 paid
管理员 (env 白名单) → 全部
```

解锁数组存的是 **`pkg-ishowspeed-hong-kong`** 这种 id，不是 slug。  
知识库 frontmatter `packageId` 已对齐为 `pkg-*`。

---

## 4. API

### `POST /api/ai-assistant/chat`

请求：`message`, 可选 `currentPackageId`/`currentCity`/`pageUrl`/`locale`/`history(≤6)`  
响应：`status: answered|not_found|clarification|error` + `answer` + `sources`  
不返回：file id、vector store id、分数、系统 prompt、堆栈

### `GET/PATCH /api/ai-assistant/unanswered`

仅管理员。查看/标记 `planned|added|ignored`。

---

## 5. Firestore 新集合

| 集合 | 用途 |
|---|---|
| `unansweredQuestions/{hash}` | 未收录问题去重计数 |
| `aiRateLimits/{id}` | 10 分钟窗口限流 |

客户端规则均为 deny；读写走 Admin SDK。

---

## 6. 环境变量（Vercel Production / Preview / Development 都要配）

```
OPENAI_API_KEY=
OPENAI_VECTOR_STORE_ID=
OPENAI_RESPONSE_MODEL=gpt-4.1-mini
OPENAI_MAX_SEARCH_RESULTS=8
OPENAI_MIN_RELEVANCE_SCORE=0.35
AI_ASSISTANT_MAX_INPUT_LENGTH=1000
AI_ASSISTANT_RATE_LIMIT_PER_10_MINUTES=20
AI_ASSISTANT_ANON_RATE_LIMIT_PER_10_MINUTES=8
AI_ADMIN_UIDS=
AI_ADMIN_EMAILS=
```

**禁止** 使用 `NEXT_PUBLIC_OPENAI_*`。

---

## 7. 知识库操作

1. 人工把 Word 转 Markdown 放入 `knowledge/<package>/free|paid/*.md`
2. 补全 YAML frontmatter
3. `npm run knowledge:validate`
4. `npm run knowledge:sync`（可选 `--prune`）
5. `npm run knowledge:status`
6. 部署代码到 Vercel

说明：`knowledge/_pending-ishowspeed-henan` 因官网暂无对应 package，未纳入校验同步。

---

## 8. 易变信息提示

票价 / 开放时间 / 行程时间 / 酒店信息 / 风险提示等回答后，会追加确认提示（system prompt + 服务端兜底）。  
聊天窗底部另有常驻 disclaimer。

---

## 9. 本地验证命令

```bash
npm install
npm run knowledge:validate
npm run lint
npm run typecheck
npm run test
npm run build
```

### 本次本机验证结果（2026-07-24）

| 命令 | 结果 |
|---|---|
| `npm run knowledge:validate` | 通过（322 个 Markdown） |
| `npm run test` | 通过（17/17） |
| `npm run typecheck` | 通过 |
| AI 相关 `eslint` | 0 error（仅 warning） |
| `npm run build` | 通过 |

说明：全仓 `npm run lint` 仍含站点原有 warning（论坛/认证等），与本次 AI 改动无关。

---

## 10. 上线步骤（给运维）

1. OpenAI 控制台创建 Vector Store，记下 ID  
2. Vercel 写入第 6 节环境变量（Production + Preview）  
3. 本地执行 `knowledge:sync` 上传知识  
4. 合并/推送本分支，等 Vercel 构建  
5. 配置 `AI_ADMIN_EMAILS` 后访问 `/admin/unanswered-questions`  
6. 抽测：未登录只答 free；解锁香港后可问香港 paid；北京 paid 仍拒答  

---

## 11. 风险与后续

- 知识 Markdown 仍是自动转换初稿，建议继续人工校对  
- Guilin 等部分文档文本提取偏少（原 Word 可能大量图片）  
- 生产限流依赖 Firestore；若后续接 Redis/KV，可替换 `src/lib/ai/rate-limit.ts` adapter  
