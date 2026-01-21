# 石湾陶瓷公仔独立站 - 前端项目

> Next.js 14 + TypeScript + Tailwind CSS

## 项目简介

这是石湾陶瓷公仔跨境电商独立站的前端项目，使用 Next.js 14 App Router 开发，支持多语言（中文/英文）和多货币显示。

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **CMS**: Strapi 4.x (Headless CMS)
- **部署**: Vercel

## 开发环境设置

### 前置要求

- Node.js 18+ 
- npm 9+

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 可用命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 自动修复代码问题
npm run lint:fix

# 类型检查
npm run type-check

# 格式化代码
npm run format

# 检查代码格式
npm run format:check
```

## 项目结构

```
frontend/
├── app/                    # App Router 目录
│   ├── layout.tsx          # 根布局
│   ├── globals.css         # 全局样式
│   └── page.tsx            # 首页
├── components/             # 可复用组件
├── lib/                    # 工具函数
├── types/                  # TypeScript 类型定义
├── public/                 # 静态资源
├── eslint.config.mjs       # ESLint 配置
├── next.config.ts          # Next.js 配置
├── tailwind.config.ts      # Tailwind 配置
└── tsconfig.json           # TypeScript 配置
```

## 环境变量

创建 `.env.local` 文件：

```bash
# Strapi CMS API 地址
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# 邮件服务 API Key (Resend)
RESEND_API_KEY=your_resend_api_key

# 网站域名
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 代码规范

项目使用 ESLint 和 Prettier 进行代码质量检查和格式化。

- 提交代码前请运行 `npm run lint` 和 `npm run type-check`
- 使用 `npm run format` 格式化代码

## 相关文档

- [需求文档](../docs/feature/shiwan-doll-website/REQUIREMENTS.md)
- [架构设计](../docs/feature/shiwan-doll-website/ARCHITECTURE.md)
- [实施计划](../docs/feature/shiwan-doll-website/IMPLEMENT_PLAN.md)

## 开发指南

### 开发流程

1. 创建分支: `git checkout -b feature/story-1.1`
2. 开发功能
3. 运行测试: `npm run type-check && npm run lint`
4. 格式化代码: `npm run format`
5. 提交代码
6. 创建 Pull Request

### 代码风格

- 使用 TypeScript 严格模式
- 遵循 ESLint 和 Prettier 规范
- 组件使用函数式组件和 Hooks
- 优先使用 Server Components（默认）

## 许可证

MIT
