# 石湾公仔海外独立站 | Shiwan Ceramics DTC Store

基于Next.js 14 + shadcn/ui + Prisma + PostgreSQL的全栈电商独立站，专注于石湾陶瓷公仔的海外销售。

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI组件库**: shadcn/ui (基于Radix UI)
- **样式方案**: Tailwind CSS
- **类型检查**: TypeScript
- **后端运行时**: Next.js API Routes
- **数据库**: PostgreSQL (Docker)
- **ORM**: Prisma
- **支付集成**: Stripe, PayPal, 支付宝, 微信支付
- **包管理器**: npm

## 项目结构

```
.
├── app/                    # Next.js App Router目录
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React组件
│   └── ui/               # shadcn/ui基础组件
├── lib/                   # 工具函数和配置
│   └── utils.ts          # 通用工具函数
├── prisma/               # Prisma数据库配置
├── public/               # 静态资源
├── docs/                 # 项目文档
│   └── feature/         # 功能文档
│       └── shiwan-doll-store/
│           ├── REQUIREMENTS.md    # 需求文档
│           ├── ARCHITECTURE.md   # 架构设计
│           └── IMPLEMENT_PLAN.md # 实施计划
└── package.json          # 项目配置
```

## 快速开始

### 前置要求

- Node.js 18+ 
- npm 或 pnpm
- Docker (用于运行PostgreSQL)

### 安装依赖

```bash
npm install
```

### 启动开发环境

#### 方式1: 使用Docker (推荐)

1. 启动PostgreSQL数据库容器：

```bash
docker-compose up -d postgres
```

2. 初始化数据库（首次运行）：

```bash
npx prisma migrate dev
```

3. 启动Next.js开发服务器：

```bash
npm run dev
```

4. 访问 http://localhost:3000

#### 方式2: 本地开发（仅Next.js）

如果你已经有PostgreSQL服务：

1. 配置 `.env.local` 文件：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/shiwan_doll_store"
```

2. 初始化数据库：

```bash
npx prisma migrate dev
```

3. 启动开发服务器：

```bash
npm run dev
```

### 可用脚本

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm start            # 启动生产服务器
npm run lint         # 运行ESLint检查
npm run type-check   # 运行TypeScript类型检查
```

## Docker部署

### 启动PostgreSQL数据库

```bash
docker-compose up -d postgres
```

**说明**: 数据库服务运行在端口5434（映射到容器的5432端口）

### 查看日志

```bash
docker-compose logs -f postgres
```

### 查看容器状态

```bash
docker ps | grep shiwan
```

### 停止数据库

```bash
docker-compose down
```

### 重启数据库

```bash
docker-compose restart postgres
```

## 数据库管理

### Prisma命令

```bash
# 创建数据库迁移
npx prisma migrate dev --name init

# 重置数据库（删除所有数据）
npx prisma migrate reset

# 生成Prisma Client
npx prisma generate

# 打开Prisma Studio（可视化数据库管理）
npx prisma studio
```

## 开发指南

### 代码规范

- 使用TypeScript进行类型检查
- 遵循ESLint规则
- 使用Prettier格式化代码
- 组件命名使用PascalCase
- 函数命名使用camelCase

### 提交规范

遵循 Conventional Commits 规范：

```
feat: 添加商品列表页面
fix: 修复购物车数量计算错误
docs: 更新README文档
style: 格式化代码
refactor: 重构订单状态管理
test: 添加支付流程测试
chore: 更新依赖包
```

## 环境变量

创建 `.env.local` 文件：

```env
# 数据库配置
DATABASE_URL="postgresql://postgres:password@localhost:5432/shiwan_doll_store"

# Next.js配置
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe配置（后续）
STRIPE_SECRET_KEY=sk_test_xxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx

# PayPal配置（后续）
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret

# 支付宝配置（后续）
ALIPAY_APP_ID=your_app_id
ALIPAY_PRIVATE_KEY=your_private_key

# 微信支付配置（后续）
WECHAT_MCH_ID=your_mch_id
WECHAT_API_KEY=your_api_key
```

## 功能开发进度

详细进度请查看：[docs/feature/shiwan-doll-store/IMPLEMENT_PLAN.md](docs/feature/shiwan-doll-store/IMPLEMENT_PLAN.md)

### 已完成
- Epic 1: 项目初始化和基础配置 (进行中)
  - Story 1.1: 创建Next.js项目和基础配置 ✅
  - Story 1.2: 配置Docker和PostgreSQL (进行中)
  - Story 1.3: 配置Prisma ORM (待开始)

### 待开发
- Epic 2: 数据库和核心模型
- Epic 3: 商品展示功能
- Epic 4: 购物车和结算流程
- Epic 5: 支付集成
- Epic 6: 订单管理和测试

## 贡献指南

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: 添加某个功能'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 许可证

本项目仅供学习参考。

## 联系方式

如有问题，请提交Issue。
