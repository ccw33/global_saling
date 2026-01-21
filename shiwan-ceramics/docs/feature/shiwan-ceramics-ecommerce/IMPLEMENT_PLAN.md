# 石湾陶瓷公仔独立站 - 开发实施计划

> 最后更新: 2026-01-21
> 当前完成度: 约 70%
> 当前 Epic: Epic 2, 3, 5(部分) 已完成

---

## 📊 进度跟踪

### Epic 完成状态

| Epic | 名称 | 状态 | 完成日期 |
|------|------|------|----------|
| Epic 1 | 项目初始化和基础设施搭建 | ✅ 完成 | 2026-01-18 |
| Epic 2 | 产品展示页面开发 | ✅ 完成 | 2026-01-18 |
| Epic 3 | 博客和故事讲述模块 | ✅ 完成 | 2026-01-18 |
| Epic 4 | 多语言和国际化功能 | 🚧 部分完成 | - |
| Epic 5 | 联系表单和邮件通知 | 🚧 部分完成 | - |
| Epic 6 | SEO优化和性能提升 | ⏳ 待开始 | - |
| Epic 7 | 部署上线 | ⏳ 待开始 | - |

### Story 完成状态

#### Epic 1: 项目初始化和基础设施 ✅ (100%)
- [x] Story 1.1: Next.js 14 项目初始化
- [x] Story 1.2: PostgreSQL 数据库集成
- [x] Story 1.3: TypeScript 配置和类型定义
- [x] Story 1.4: 多语言路由配置

#### Epic 2: 产品展示页面开发 ✅ (100%)
- [x] Story 2.1: TypeScript 类型定义
- [x] Story 2.2: UI 组件开发（Button, Header, Footer, ProductCard, CategoryFilter）
- [x] Story 2.3: 产品列表页面（支持分类筛选）
- [x] Story 2.4: 产品详情页面（图片、信息、相关产品）
- [x] Story 2.5: 首页和关于页面

#### Epic 3: 博客和故事讲述模块 ✅ (100%)
- [x] Story 3.1: 博客列表页面
- [x] Story 3.2: 博客详情页面（封面、内容、相关文章）
- [x] Story 3.3: BlogCard 组件

#### Epic 4: 多语言和国际化功能 🚧 (80%)
- [x] Story 4.1: 语言路由和切换功能
- [ ] Story 4.2: 货币切换和显示功能（待开发）
- [ ] Story 4.3: 翻译产品内容为英文（待开发）

#### Epic 5: 联系表单和邮件通知 🚧 (90%)
- [x] Story 5.1: 联系表单组件（ContactForm.tsx）
- [x] Story 5.2: API Route（app/api/contact/route.ts）
- [x] Story 5.3: 联系页面
- [ ] Story 5.4: 邮件发送集成（待集成 Resend）

#### Epic 6: SEO优化和性能提升 ⏳ (30%)
- [ ] Story 6.1: 基础 SEO 优化（待开发）
- [ ] Story 6.2: 性能优化和图片优化（待开发）

#### Epic 7: 部署上线 ⏳ (0%)
- [ ] Story 7.1: Vercel 部署
- [ ] Story 7.2: 生产环境配置
- [ ] Story 7.3: 端到端测试和上线检查

### 当前工作

**正在进行**: 无（准备开始 Epic 4.2: 货币切换功能）

**下一步计划**:
1. **优先级1** (本周): Epic 4.2 - 货币切换和显示功能
2. **优先级2** (下周): Epic 6 - SEO 优化
3. **优先级3** (后续): Epic 5.4 - 邮件集成

### 技术债务

- [ ] 邮件发送集成（Resend）
- [ ] SEO 优化（sitemap, robots.txt, metadata）
- [ ] 多货币支持（USD, SGD, MYR, CNY）
- [ ] 产品内容英文翻译
- [ ] 性能优化（图片优化、缓存策略）

---

## Epic 1: 项目初始化和基础设施搭建 ✅

### 目标
搭建 Next.js 14 项目基础架构，配置 PostgreSQL 数据库连接，建立多语言支持。

### Stories

#### Story 1.1: Next.js 项目初始化 ✅
**文件**: `frontend/`
- Next.js 14 + TypeScript + Tailwind CSS
- ESLint + Prettier 配置
- Git 仓库初始化

#### Story 1.2: PostgreSQL 数据库集成 ✅
**文件**: `frontend/lib/db-client.ts`, `frontend/lib/db.ts`
- PostgreSQL 连接池管理
- 完整的 CRUD 查询函数
- 环境变量配置

#### Story 1.3: TypeScript 配置和类型定义 ✅
**文件**: `frontend/types/index.ts`
- Product, Category, Master, Blog 类型定义
- API 响应类型
- Locale 类型

#### Story 1.4: 多语言路由配置 ✅
**文件**: `frontend/middleware.ts`
- 语言路由（`/zh/` 和 `/en/`）
- 默认语言重定向
- 语言切换中间件

### 数据库 Schema
- **categories** - 分类表（3条示例数据）
- **masters** - 大师表（2条示例数据）
- **products** - 产品表（2条示例数据）
- **blogs** - 博客表（2条示例数据）

---

## Epic 2: 产品展示页面开发 ✅

### 目标
实现产品列表、产品详情、分类筛选等核心产品展示功能。

### Stories

#### Story 2.1: TypeScript 类型定义 ✅
**文件**: `types/index.ts`

**验收标准**:
- [x] Product 类型包含所有必需字段
- [x] Category 和 Master 类型定义
- [x] API 响应类型定义

#### Story 2.2: UI 组件开发 ✅
**文件**: `components/`

**创建的组件**:
- `components/ui/Button.tsx` - 按钮组件
- `components/layout/Header.tsx` - 页头（导航+语言切换）
- `components/layout/Footer.tsx` - 页脚
- `components/product/ProductCard.tsx` - 产品卡片
- `components/product/CategoryFilter.tsx` - 分类筛选器

**验收标准**:
- [x] 响应式设计
- [x] 多语言支持
- [x] 交互效果（hover, transition）

#### Story 2.3: 产品列表页面 ✅
**文件**: `app/[lang]/products/page.tsx`

**功能**:
- [x] 显示所有产品
- [x] 支持按分类筛选
- [x] 响应式 Grid 布局（1/2/3列）
- [x] 空状态处理
- [x] Server Component 优化

#### Story 2.4: 产品详情页面 ✅
**文件**: `app/[lang]/products/[slug]/page.tsx`

**功能**:
- [x] 产品图片展示（支持多图）
- [x] 产品详细信息（名称、描述、价格、库存）
- [x] 产品故事展示
- [x] 大师信息展示
- [x] 相关产品推荐
- [x] 面包屑导航
- [x] 询价按钮（跳转到联系表单）
- [x] SEO 优化（结构化数据预留）

#### Story 2.5: 首页和关于页面 ✅
**文件**:
- `app/[lang]/page.tsx` - 首页
- `app/[lang]/about/page.tsx` - 关于页面

**首页功能**:
- [x] Hero 区域
- [x] 精选产品展示（最多6个）
- [x] 陶艺大师介绍
- [x] CTA 行动号召

**关于页面功能**:
- [x] 石湾陶艺历史介绍
- [x] 制作工艺说明
- [x] 大师传承介绍
- [x] 品牌使命阐述

---

## Epic 3: 博客和故事讲述模块 ✅

### 目标
实现博客列表、博客详情、内容展示等功能，用于品牌故事传播。

### Stories

#### Story 3.1: 博客列表页面 ✅
**文件**: `app/[lang]/blog/page.tsx`

**功能**:
- [x] 显示所有已发布的博客
- [x] 响应式 Grid 布局
- [x] 空状态处理

#### Story 3.2: 博客详情页面 ✅
**文件**: `app/[lang]/blog/[slug]/page.tsx`

**功能**:
- [x] 博客封面图
- [x] 标题、发布日期、作者
- [x] 富文本内容展示
- [x] 相关文章推荐
- [x] 面包屑导航
- [x] 返回列表按钮

**组件**:
- [x] `components/blog/BlogCard.tsx` - 博客卡片组件

---

## Epic 4: 多语言和国际化功能 🚧

### 目标
实现多语言切换、多货币支持、内容翻译等功能，支持全球市场。

### Stories

#### Story 4.1: 语言路由和切换功能 ✅
**文件**: `middleware.ts`, `components/layout/Header.tsx`

**功能**:
- [x] URL 结构支持语言前缀（`/zh/`, `/en/`）
- [x] Header 语言切换按钮
- [x] 默认语言重定向

#### Story 4.2: 货币切换和显示功能 ⏳
**文件**: 待创建

**计划功能**:
- [ ] Header 货币切换下拉菜单
- [ ] 支持 USD, SGD, MYR, CNY
- [ ] 价格自动转换
- [ ] localStorage 持久化

#### Story 4.3: 翻译产品内容 ⏳
**文件**: 待创建

**计划功能**:
- [ ] 所有20个产品的英文内容
- [ ] 博客文章英文内容
- [ ] 中文到英文的完整翻译

---

## Epic 5: 联系表单和邮件通知 🚧

### 目标
实现联系表单、询价功能、邮件通知等功能，方便客户联系。

### Stories

#### Story 5.1: 联系表单组件 ✅
**文件**: `components/contact/ContactForm.tsx`

**功能**:
- [x] 姓名、邮箱、主题、消息字段
- [x] 表单验证（必填字段、邮箱格式）
- [x] 提交 loading 状态
- [x] 成功/错误消息显示
- [x] 产品询价模式（预填 productSlug）
- [x] 多语言支持

#### Story 5.2: API Route ✅
**文件**: `app/api/contact/route.ts`

**功能**:
- [x] POST 请求处理
- [x] 表单验证
- [x] 邮箱格式验证
- [x] 错误处理
- [ ] 邮件发送集成（预留 TODO，需配置 Resend）

#### Story 5.3: 联系页面 ✅
**文件**: `app/[lang]/contact/page.tsx`

**功能**:
- [x] 联系信息展示
- [x] 联系表单嵌入
- [x] 产品询价说明
- [x] 响应式布局

#### Story 5.4: 邮件发送集成 ⏳
**文件**: 待创建

**计划功能**:
- [ ] 注册 Resend 账户
- [ ] 配置 API Key
- [ ] 实现邮件发送逻辑
- [ ] 创建邮件模板
- [ ] DNS 配置（DKIM, SPF）

---

## Epic 6: SEO 优化和性能提升 ⏳

### 目标
实现 SEO 优化、性能优化、图片优化等，提升搜索引擎排名和用户体验。

### Stories

#### Story 6.1: 基础 SEO 优化 ⏳
**文件**: 待创建

**计划功能**:
- [ ] 所有页面唯一的 title 和 meta description
- [ ] 结构化数据（Product Schema, Article Schema）
- [ ] 生成 sitemap.xml
- [ ] 生成 robots.txt
- [ ] Canonical URL
- [ ] Open Graph 标签
- [ ] 图片 alt 文本

#### Story 6.2: 性能优化 ⏳
**文件**: 待创建

**计划功能**:
- [ ] 所有图片使用 Next.js Image 组件
- [ ] 响应式图片 sizes 优化
- [ ] WebP 格式优先
- [ ] Lighthouse 性能分数 > 90
- [ ] ISR 缓存策略

---

## Epic 7: 部署上线 ⏳

### 目标
将项目部署到生产环境，进行端到端测试，正式上线。

### Stories

#### Story 7.1: Vercel 部署 ⏳
**文件**: 待创建

**计划功能**:
- [ ] Vercel 项目创建
- [ ] GitHub 仓库连接
- [ ] 环境变量配置
- [ ] 自定义域名配置

#### Story 7.2: 生产环境配置 ⏳
**文件**: 待创建

**计划功能**:
- [ ] 生产数据库配置
- [ ] 备份策略
- [ ] 监控配置

#### Story 7.3: 端到端测试 ⏳
**文件**: 待创建

**计划功能**:
- [ ] 所有页面访问测试
- [ ] 语言切换测试
- [ ] 联系表单提交测试
- [ ] 移动端响应式测试
- [ ] 跨浏览器测试
- [ ] SEO 测试
- [ ] 性能测试

---

## 项目配置

### 开发环境

```bash
# 数据库配置（OrbStack PostgreSQL）
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USER=bulletin
POSTGRES_PASSWORD=bulletin
POSTGRES_DB=bulletin_dev
POSTGRES_SCHEMA=shiwan_ceramics

# 启动开发服务器
cd frontend
npm run dev

# 访问应用
http://localhost:3000/zh/
```

### 技术栈

- **前端**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **数据库**: PostgreSQL (OrbStack)
- **部署**: Vercel (计划)
- **邮件**: Resend (计划)

### 项目结构

```
shiwan-ceramics/
├── frontend/
│   ├── app/[lang]/           # 多语言页面
│   │   ├── products/         # 产品页面
│   │   ├── blog/             # 博客页面
│   │   ├── contact/          # 联系页面
│   │   └── about/            # 关于页面
│   ├── components/           # UI 组件
│   ├── lib/                  # 工具函数
│   ├── types/                # TypeScript 类型
│   └── middleware.ts         # 语言重定向
├── docs/                     # 项目文档
│   ├── feature/              # 敏捷开发文档
│   └── archives/             # 归档文档
└── README.md                 # 项目主文档
```

---

## 相关文档

- **需求文档**: `REQUIREMENTS.md`
- **架构设计**: `ARCHITECTURE.md`
- **快速开始**: `QUICK_START.md`
- **环境设置**: `docs/SETUP.md`
