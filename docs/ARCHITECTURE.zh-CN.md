# ChinaTravelGuide 架构说明

本文面向第一次接触项目的开发者，说明网站做什么、代码放在哪里，以及一次请求如何流过系统。

## 1. 项目实现的功能

这是一个面向海外游客的中国入境旅行网站，主要包含：

- 旅行攻略：按主题和城市展示免费攻略，并在 iframe 中加载原始 HTML 攻略。
- 完整攻略：登录用户可以用积分解锁，付费内容从私有 Vercel Blob 读取。
- 预订导流：按城市展示酒店、活动等联盟商品并跳转到外部预订平台。
- 旅行社区：用户可以发帖、上传图片、评论、点赞、接收通知并管理自己的帖子。
- 会员与积分：Firebase Authentication 负责登录；Firestore 保存用户资料、积分流水、解锁记录和社区数据。
- 实用工具：旅行信息、常用语、货币换算和翻译。
- 基础体验：响应式导航、深浅色主题和页面翻译。

## 2. 总体分层

```text
浏览器
  │
  ├─ src/app/**/page.tsx              页面与路由
  ├─ src/components                   可复用 UI 与交互
  └─ src/lib/authenticated-api.ts     携带 Firebase ID Token 的请求
          │
          ▼
Next.js Route Handlers
  ├─ src/app/api/**/route.ts          HTTP 参数、状态码和响应
  └─ src/lib/server/api-route.ts      通用鉴权边界
          │
          ▼
服务层
  ├─ forum-service.ts                 社区规则与事务
  ├─ points-service.ts                积分和解锁规则与事务
  ├─ forum-image-storage.ts           图片存储
  └─ firebase-admin.ts                服务端 Firebase 身份验证
          │
          ├─ Firestore                用户、积分、帖子、评论、通知
          └─ Vercel Blob              社区图片与私有完整攻略

静态内容
  ├─ src/data                         类型化的站点内容和商品配置
  └─ public                           图片、免费 HTML 攻略和下载文件
```

分层的关键原则是：页面负责展示，API 负责 HTTP，服务层负责业务规则，数据层负责内容。这样修改页面样式不会碰到积分规则，修改存储实现也不需要重写页面。

## 3. 目录职责

### `src/app`

使用 Next.js App Router。文件夹名称就是 URL，`page.tsx` 是页面，`route.ts` 是 API。例如：

- `app/packages/[slug]/page.tsx` 对应单个攻略页。
- `app/forum/[slug]/page.tsx` 对应讨论详情。
- `app/api/packages/unlock/route.ts` 对应解锁攻略的 POST API。

`layout.tsx` 是所有页面的外壳，按顺序挂载主题 Provider、登录 Provider、导航、页面主体和页脚。

### `src/components`

- `auth`：登录状态和用户资料。
- `layout`：导航、页脚和翻译。
- `packages`：攻略卡片、iframe、积分领取和解锁界面。
- `book`：城市与联盟商品。
- `sections`：首页区块。
- `ui`：跨业务复用的小组件。

### `src/data`

这里是静态、可版本控制的内容。`data/packages/index.ts` 是攻略数据的统一入口；页面和服务统一从这里查询攻略，避免各自维护重复列表。

### `src/lib`

`lib` 放与页面无关的能力。带 `server` 的目录只能在服务端使用，因为其中包含 Admin SDK、事务和私有存储访问。

## 4. 登录与资料同步如何工作

1. `FirebaseAuthProvider` 监听 Firebase Authentication。
2. 登录状态一确认，界面先获得一个最小用户对象，因此导航无需等待 Firestore。
3. 浏览器取得 Firebase ID Token，通过 `/api/account/sync` 请求积分资料。
4. API 在服务端再次验证 Token；浏览器传来的用户 ID 不被信任。
5. `syncPointsProfile` 在 Firestore 事务中创建资料，并处理注册奖励和每日登录奖励。
6. 完整资料回到 Provider，所有调用 `useAuth()` 的组件自动更新。

认证与积分资料使用不同 loading 状态，是为了在 Firestore 较慢或暂时不可用时，仍然让用户正常登录和浏览。

## 5. 积分领取与攻略解锁

领取积分时，客户端会先检查阅读时间、滚动比例或下载状态，以便立即提示用户；这只是体验优化。服务端会重新验证规则，并在 Firestore 事务中同时写入：

- 新积分余额；
- 防止重复领取的 action marker；
- 可审计的积分流水。

解锁时服务器根据 `packageId` 重新查找真实价格，不接受客户端显示的价格。余额扣减、解锁列表和负数流水在同一个事务完成，因此两个并发请求不能重复消费同一份余额。

打开完整攻略时，API 还会再次检查登录身份和 `unlockedPackages`，只有已经解锁的用户才能从私有 Blob 得到 HTML 内容。

## 6. 社区如何工作

编辑精选帖子存放在代码中，会员帖子存放在 Firestore。读取列表时服务层合并两类数据。精选帖本身不复制到数据库，只用独立 stats 文档记录新增点赞和评论。

发帖、评论和点赞都使用事务：

- 发帖事务同时写入帖子和冷却时间，防止并发绕过限流。
- 评论事务同时创建评论、更新计数并创建通知。
- 点赞事务同时切换用户点赞文档、更新总数和通知。

上传帖子图片时先写入 Blob；如果后续发帖失败，API 会删除刚上传的孤立图片。

## 7. 为什么采用这种写法

- Server Component 优先：无需交互的页面在服务端渲染，减少浏览器 JavaScript。
- Client Component 按需：登录、弹窗、计时、滚动和表单才使用 `'use client'`。
- 双重校验：客户端校验改善体验，服务端校验保证安全。
- 事务保证一致性：积分、计数器和通知涉及多个文档，必须原子提交。
- 静态内容与动态数据分离：编辑内容易于审阅和部署，用户数据适合数据库。
- 统一鉴权请求与 API 边界：Token、错误响应和缓存策略只实现一次，减少遗漏。
- 私有内容不进入客户端包：完整攻略由鉴权 API 流式返回，而不是直接放在公开 URL。

## 8. 本地运行与验证

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

环境变量示例位于 `.env.example`。浏览器端 Firebase 配置使用 `NEXT_PUBLIC_*`；Firebase Admin 和 Blob 凭据只能保存在服务端环境变量中，不能写入源码或 `public`。
