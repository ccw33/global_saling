# 石湾陶瓷公仔独立站

> 一个展示和销售石湾陶瓷公仔的电商网站，使用 Next.js 14 + PostgreSQL 构建。

---

## 📊 项目状态

**当前完成度**: 约 70%

| Epic | 名称 | 状态 |
|------|------|------|
| Epic 1 | 项目初始化和基础设施搭建 | ✅ 完成 |
| Epic 2 | 产品展示页面开发 | ✅ 完成 |
| Epic 3 | 博客和故事讲述模块 | ✅ 完成 |
| Epic 4 | 多语言和国际化功能 | 🚧 部分完成 |
| Epic 5 | 联系表单和邮件通知 | 🚧 部分完成 |
| Epic 6 | SEO 优化和性能提升 | ⏳ 待开始 |
| Epic 7 | 部署上线 | ⏳ 待开始 |

**详细进度**: 查看 [`docs/feature/shiwan-ceramics-ecommerce/IMPLEMENT_PLAN.md`](docs/feature/shiwan-ceramics-ecommerce/IMPLEMENT_PLAN.md)

---

## 🚀 快速开始

### 前置条件

- Node.js 18.x 或 20.x
- PostgreSQL (端口 5433)
- npm

### 1. 安装依赖

```bash
cd frontend
npm install
```

### 2. 配置数据库

```bash
# 快速设置
cp .env.local.example .env.local

# 详细设置指南
# 查看: docs/SETUP.md
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问: **http://localhost:3000/zh/**

**详细指南**: 查看 [`QUICK_START.md`](QUICK_START.md)

---

## ✨ 功能特性

### 已完成 ✅

- ✅ Next.js 14 + TypeScript + Tailwind CSS
- ✅ PostgreSQL 数据库集成
- ✅ 多语言路由（中文 / 英文）
- ✅ 产品列表和详情页面
- ✅ 分类筛选功能
- ✅ 博客模块
- ✅ 联系表单
- ✅ 响应式设计

### 开发中 🚧

- 🚧 多货币支持（USD, SGD, MYR, CNY）
- 🚧 邮件发送集成（Resend）

### 待开发 ⏳

- ⏳ SEO 优化（sitemap, robots.txt, metadata）
- ⏳ 性能优化（图片优化、缓存策略）
- ⏳ Vercel 部署

---

## 📁 项目结构

```
shiwan-ceramics/
├── frontend/                    # Next.js 前端项目
│   ├── app/[lang]/             # 多语言页面
│   │   ├── products/           # 产品页面
│   │   ├── blog/               # 博客页面
│   │   ├── contact/            # 联系页面
│   │   └── about/              # 关于页面
│   ├── components/             # UI 组件
│   │   ├── ui/                 # 通用组件
│   │   ├── layout/             # 布局组件
│   │   ├── product/            # 产品组件
│   │   ├── blog/               # 博客组件
│   │   └── contact/            # 联系组件
│   ├── lib/                    # 工具函数
│   │   ├── db.ts              # 数据库查询函数
│   │   └── db-client.ts       # PostgreSQL 连接池
│   ├── types/                  # TypeScript 类型定义
│   └── middleware.ts           # 语言重定向
├── docs/                       # 项目文档
│   ├── SETUP.md                # 环境设置指南 ⭐️
│   ├── feature/                # 敏捷开发文档
│   │   └── shiwan-ceramics-ecommerce/
│   │       ├── IMPLEMENT_PLAN.md  # 实施计划（包含进度）⭐️
│   │       ├── REQUIREMENTS.md    # 需求文档
│   │       └── ARCHITECTURE.md    # 架构设计
│   ├── archives/               # 归档文档
│   │   ├── epic-1-initialization/
│   │   ├── epic-2-product-display/
│   │   └── epic-3-blog/
│   ├── POSTGRESQL_SETUP.md     # PostgreSQL 设置
│   ├── SCHEMA_SETUP.md         # Schema 设置
│   └── SUPABASE_SETUP.md       # Supabase 设置
├── README.md                   # 项目主文档 ⭐️
└── QUICK_START.md              # 快速开始 ⭐️
```

---

## 🛠️ 技术栈

### 前端

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: React Server Components

### 后端

- **数据库**: PostgreSQL
- **API**: Next.js API Routes
- **ORM**: 原生 SQL (pg)

### 部署（计划）

- **托管**: Vercel
- **数据库**: Supabase 或 OrbStack PostgreSQL
- **邮件**: Resend

---

## 📚 重要文档

### 新手必读

- **[快速开始](QUICK_START.md)** - 3 步快速启动项目
- **[环境设置指南](docs/SETUP.md)** - 详细的环境配置说明

### 开发文档

- **[实施计划](docs/feature/shiwan-ceramics-ecommerce/IMPLEMENT_PLAN.md)** - 完整的开发计划和进度跟踪 ⭐️
- **[需求文档](docs/feature/shiwan-ceramics-ecommerce/REQUIREMENTS.md)** - 产品需求和用户故事
- **[架构设计](docs/feature/shiwan-ceramics-ecommerce/ARCHITECTURE.md)** - 技术架构和设计决策

### 数据库设置

- **[PostgreSQL 设置](docs/POSTGRESQL_SETUP.md)** - PostgreSQL 数据库配置
- **[Schema 设置](docs/SCHEMA_SETUP.md)** - 数据库 Schema 创建
- **[Supabase 设置](docs/SUPABASE_SETUP.md)** - Supabase 云数据库配置

### 归档文档

- **[Epic 1 归档](docs/archives/epic-1-initialization/)** - 项目初始化阶段文档
- **[Epic 2 归档](docs/archives/epic-2-product-display/)** - 产品展示阶段文档
- **[Epic 3 归档](docs/archives/epic-3-blog/)** - 博客模块阶段文档

---

## 🎯 开发计划

### 近期计划

1. **Epic 4.2**: 货币切换和显示功能
   - Header 货币选择器
   - 支持多货币（USD, SGD, MYR, CNY）
   - localStorage 持久化

2. **Epic 6**: SEO 优化
   - 生成 sitemap.xml
   - 优化 metadata
   - 添加结构化数据

3. **Epic 5.4**: 邮件集成
   - 集成 Resend 邮件服务
   - 创建邮件模板

### 长期计划

- Epic 7: Vercel 部署上线
- 性能优化和监控
- 单元测试和 E2E 测试

**完整计划**: 查看 [实施计划](docs/feature/shiwan-ceramics-ecommerce/IMPLEMENT_PLAN.md)

---

## 🛠️ 开发命令

```bash
# 启动开发服务器
cd frontend
npm run dev

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

---

## 🗄️ 数据库 Schema

```sql
shiwan_ceramics
├── categories     # 分类表（人物像、动物、器皿等）
├── masters        # 大师表（刘泽棉、黄松坚等）
├── products       # 产品表（陶瓷公仔作品）
└── blogs          # 博客文章表
```

**详细 Schema**: 查看 [`docs/create-schema-only.sql`](docs/create-schema-only.sql)

---

## ❓ 常见问题

### Q: 如何设置数据库？

**A**: 查看 [环境设置指南](docs/SETUP.md) 或 [快速开始](QUICK_START.md)

### Q: 数据库连接失败？

**A**: 确认 PostgreSQL 服务运行，检查 `.env.local` 配置。详见 [SETUP.md 的常见问题章节](docs/SETUP.md#常见问题)

### Q: 如何添加新产品？

**A**: 直接在数据库的 `shiwan_ceramics.products` 表中插入数据

### Q: 如何部署到生产环境？

**A**: 计划使用 Vercel 部署，详见 [实施计划 - Epic 7](docs/feature/shiwan-ceramics-ecommerce/IMPLEMENT_PLAN.md#epic-7-部署上线)

---

## 🤝 贡献指南

本项目使用 `/agile-dev` skill 进行开发，采用五角色协作流程：

1. **产品经理** - 需求分析
2. **架构设计师** - 技术架构设计
3. **开发规划师** - Epic-Story 任务拆分
4. **开发工程师** - 代码实现
5. **QA 工程师** - 测试验证

---

## 📄 许可证

本项目采用 MIT 许可证。

---

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件
- 使用联系表单（开发完成后）

---

**祝开发顺利！🚀**
