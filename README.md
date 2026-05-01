# 🇨🇳 China Travel Guide - 中国行攻略网站

面向入境游客的中国旅游攻略网站源码包

## 📦 项目内容

```
ChinaTravelGuide/
├── package.json          # 项目依赖配置
├── package-lock.json     # 依赖锁定文件
├── next.config.mjs       # Next.js 配置
├── tailwind.config.ts    # Tailwind CSS 配置
├── postcss.config.mjs    # PostCSS 配置
├── tsconfig.json         # TypeScript 配置
├── public/               # 静态资源目录
│   └── images/           # 图片资源
└── src/                  # 源代码目录
    ├── app/              # 页面组件
    │   ├── layout.tsx    # 根布局
    │   ├── page.tsx      # 首页
    │   ├── destinations/ # 目的地模块
    │   ├── journeys/     # 路线模块
    │   ├── practical-info/ # 实用信息
    │   └── tools/        # 实用工具
    ├── components/       # UI组件
    ├── data/             # 数据文件
    ├── hooks/            # React Hooks
    ├── lib/              # 工具函数
    └── types/            # TypeScript类型
```

## 🚀 快速开始

### 1. 解压项目
```bash
unzip ChinaTravelGuide.zip
cd ChinaTravelGuide
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 访问网站
打开浏览器访问: http://localhost:3000

## 📋 功能模块

| 模块 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | Hero + 精选目的地 + 主题路线 |
| 目的地 | `/destinations` | 8个精选城市展示 |
| 目的地详情 | `/destinations/[slug]` | 单个城市完整攻略 |
| 主题路线 | `/journeys` | 5条精选旅游路线 |
| 实用信息 | `/practical-info` | 签证/交通/预算等指南 |
| 货币转换 | `/tools/currency` | 实时汇率换算 |
| 常用语 | `/tools/phrases` | 中英文常用语翻译 |

## 🛠 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS 3.4
- **动画**: Framer Motion
- **图标**: Lucide React
- **主题**: 亮/暗模式切换

## 🎨 设计特色

- 中国红 (#DC2626) + 琉璃金 (#F59E0B) 主色调
- 流畅的页面过渡动画
- 响应式布局 (手机/平板/桌面)
- 深色模式支持

## 📝 注意事项

1. **Node.js 版本**: 需要 Node.js 18+
2. **首次运行**: `npm install` 可能需要几分钟
3. **生产部署**: `npm run build` 构建后部署

## 🔧 可用脚本

```bash
npm run dev      # 开发服务器
npm run build    # 生产构建
npm run start    # 生产服务器
npm run lint     # 代码检查
```

---

*Built with ❤️ for China travelers*
