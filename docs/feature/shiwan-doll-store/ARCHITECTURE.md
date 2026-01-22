# 石湾公仔海外独立站 架构设计

> 创建日期: 2026-01-21
> 状态: 待确认

---

## 技术框架选型

### 核心技术栈

| 技术 | 版本 | 选择理由 |
|------|------|----------|
| **前端框架** | Next.js 14+ | App Router、Server Components、SEO友好、部署简单 |
| **UI组件库** | shadcn/ui | 基于Radix UI，可定制性强，不依赖第三方UI框架 |
| **样式方案** | Tailwind CSS | shadcn/ui原生支持，开发效率高 |
| **后端运行时** | Next.js API Routes | 与前端同框架，全栈开发，减少上下文切换 |
| **数据库** | PostgreSQL (Docker) | 关系型数据库，Docker容器化部署，便于本地开发 |
| **ORM** | Prisma | 类型安全，迁移简单，开发体验好 |
| **支付集成** | Stripe + PayPal SDKs | 官方SDK，文档完善，支持主流支付方式 |
| **第三方支付** | 支付宝 + 微信支付 SDK | 亚洲市场主流支付方式 |
| **表单处理** | React Hook Form + Zod | 性能好，类型安全，与shadcn/ui集成良好 |
| **状态管理** | React Context API / Zustand | MVP使用Context，复杂场景可升级到Zustand |
| **部署平台** | Docker + Nginx | 本地部署，完全控制，便于后续扩展 |

### 技术选型决策（务实框架）

**优先级1：可测试性**
- Next.js App Router + API Routes：易于编写单元测试和集成测试
- Prisma：提供测试环境支持，可使用事务进行测试隔离
- React Hook Form + Zod：表单逻辑可独立测试

**优先级2：可读性**
- Next.js标准目录结构：`app/`、`components/`、`lib/`、`prisma/`
- shadcn/ui组件：代码清晰，易于理解和维护
- TypeScript：类型安全，提高代码可读性

**优先级3：一致性**
- Next.js + shadcn/ui + Prisma 是成熟的组合，社区支持好
- 遵循Next.js官方最佳实践

**优先级4：简单性**
- 使用Server Components减少客户端复杂性
- API Routes处理业务逻辑，简单直接
- 避免过度抽象，保持代码直观

**优先级5：可逆性**
- Next.js生态成熟，可以轻松迁移到其他部署平台
- Prisma支持多数据库，可以切换数据库类型
- 组件化设计，便于重构和替换

---

## 项目目录结构

```
shiwan-doll-store/
├── app/                          # Next.js App Router目录
│   ├── (auth)/                   # 认证相关页面（后续迭代）
│   │   ├── login/
│   │   └── register/
│   ├── (shop)/                   # 商店相关页面
│   │   ├── cart/                 # 购物车页面
│   │   │   └── page.tsx
│   │   ├── checkout/             # 结算流程
│   │   │   └── page.tsx
│   │   ├── products/             # 商品相关页面
│   │   │   ├── [slug]/          # 商品详情页
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx         # 商品列表页
│   │   └── orders/              # 订单相关页面（后续迭代）
│   │       ├── [id]/
│   │       │   └── page.tsx    # 订单详情页
│   │       └── page.tsx         # 订单列表页
│   ├── admin/                    # 管理后台（简化版）
│   │   ├── products/
│   │   │   ├── new/             # 添加商品
│   │   │   │   └── page.tsx
│   │   │   ├── [id]/            # 编辑商品
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx         # 商品列表
│   │   └── orders/               # 订单管理
│   │       └── page.tsx
│   ├── about/                    # 关于我们（品牌故事）
│   │   └── page.tsx
│   ├── api/                      # API Routes
│   │   ├── auth/                 # 认证API（后续）
│   │   ├── products/             # 商品API
│   │   │   ├── route.ts         # GET（列表）、POST（创建）
│   │   │   └── [id]/            # GET、PUT、DELETE
│   │   │       └── route.ts
│   │   ├── cart/                 # 购物车API
│   │   │   └── route.ts
│   │   ├── checkout/             # 支付API
│   │   │   ├── stripe/          # Stripe支付
│   │   │   │   ├── route.ts     # 创建支付会话
│   │   │   │   └── webhook.ts   # Stripe webhook
│   │   │   ├── paypal/          # PayPal支付
│   │   │   │   ├── route.ts     # 创建订单
│   │   │   │   └── webhook.ts   # PayPal webhook
│   │   │   ├── alipay/          # 支付宝支付
│   │   │   │   └── route.ts     # 创建支付订单
│   │   │   └── wechat/          # 微信支付
│   │   │       └── route.ts     # 创建支付订单
│   │   ├── orders/               # 订单API
│   │   │   ├── route.ts         # 创建订单、查询订单
│   │   │   └── [id]/
│   │   │       └── route.ts     # 获取/更新订单
│   │   └── webhooks/            # 支付webhook统一入口
│   │       └── route.ts
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页
│   ├── globals.css               # 全局样式
│   └── favicon.ico
├── components/                   # React组件
│   ├── ui/                       # shadcn/ui基础组件
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── form.tsx
│   │   ├── dialog.tsx
│   │   ├── toast.tsx
│   │   └── ...                  # 其他shadcn/ui组件
│   ├── shop/                     # 商店相关组件
│   │   ├── product-card.tsx     # 商品卡片
│   │   ├── product-list.tsx     # 商品列表
│   │   ├── cart-sidebar.tsx     # 购物车侧边栏
│   │   ├── checkout-form.tsx    # 结算表单
│   │   └── payment-method-selector.tsx  # 支付方式选择器
│   ├── admin/                    # 管理后台组件
│   │   ├── product-form.tsx     # 商品表单
│   │   ├── order-table.tsx      # 订单表格
│   │   └── status-badge.tsx     # 订单状态徽章
│   └── layout/                   # 布局组件
│       ├── header.tsx           # 顶部导航
│       ├── footer.tsx           # 底部信息
│       └── page-container.tsx   # 页面容器
├── lib/                          # 工具函数和配置
│   ├── db.ts                     # Prisma客户端配置
│   ├── payments/                 # 支付相关工具
│   │   ├── stripe.ts            # Stripe客户端配置
│   │   ├── paypal.ts            # PayPal客户端配置
│   │   ├── alipay.ts            # 支付宝客户端配置
│   │   └── wechat.ts            # 微信支付客户端配置
│   ├── validations/              # Zod验证schema
│   │   ├── product.ts
│   │   ├── order.ts
│   │   └── checkout.ts
│   ├── utils.ts                  # 通用工具函数
│   └── constants.ts              # 常量定义（货币、语言等）
├── prisma/                       # Prisma数据库配置
│   ├── schema.prisma             # 数据模型定义
│   ├── seed.ts                   # 种子数据（测试用）
│   └── migrations/               # 数据库迁移文件
│       └── ...                  # 迁移记录
├── public/                       # 静态资源
│   ├── images/                   # 产品图片
│   ├── logo.svg                  # 网站logo
│   └── favicon.ico
├── types/                        # TypeScript类型定义
│   ├── product.ts
│   ├── order.ts
│   ├── cart.ts
│   └── payment.ts
├── hooks/                        # React Hooks
│   ├── use-cart.ts               # 购物车状态管理
│   ├── use-product.ts            # 商品数据获取
│   └── use-order.ts              # 订单数据获取
├── contexts/                     # React Context
│   ├── cart-context.tsx          # 购物车全局状态
│   └── payment-context.tsx       # 支付全局状态
├── middleware.ts                 # Next.js中间件（可选，用于认证、多语言等）
├── next.config.js                # Next.js配置
├── tailwind.config.ts            # Tailwind CSS配置
├── tsconfig.json                 # TypeScript配置
├── .env.example                  # 环境变量示例
├── .env.local                    # 环境变量（不提交到git）
├── package.json
├── pnpm-lock.yaml                # 使用pnpm作为包管理器
└── README.md

```

---

## 高层架构思路

### 1. 整体设计思路

**全栈单页应用（Full-Stack SPA）**
- 使用Next.js 14的App Router，采用React Server Components（RSC）作为主要渲染模式
- 页面路由在`app/`目录下组织，采用路由组`(auth)`、`(shop)`进行逻辑分组
- API Routes在`app/api/`目录下，与前端页面同仓库，便于维护

**分层架构**
```
展示层（Presentation Layer）
├── Pages (app/)
├── Components (components/)
└── Hooks (hooks/)

业务逻辑层（Business Logic Layer）
├── API Routes (app/api/)
├── Contexts (contexts/)
└── Utils (lib/)

数据访问层（Data Access Layer）
├── Prisma Client (lib/db.ts)
├── Schemas (prisma/schema.prisma)
└── Migrations (prisma/migrations/)
```

### 2. 关键技术决策

**决策1：使用Server Components还是Client Components？**
- **Server Components**：用于大部分页面（商品列表、详情、订单等），利用服务器端渲染，提升SEO和首屏性能
- **Client Components**：用于需要交互的组件（购物车、表单、支付流程）
- **混合模式**：页面整体为Server Component，局部交互组件使用`"use client"`

**决策2：状态管理方案**
- **MVP阶段**：使用React Context API管理购物车等简单状态
- **后续升级**：如果状态复杂度增加，可迁移到Zustand
- **避免**：不使用Redux等重量级状态管理库

**决策3：数据库设计原则**
- **简化设计**：MVP阶段只包含核心表（Product、Order、OrderItem）
- **预留扩展**：设计表结构时考虑后续扩展（用户、评价、优惠券等）
- **类型安全**：使用Prisma生成的类型，确保类型安全

**决策4：支付集成策略**
- **多支付渠道**：集成Stripe、PayPal、支付宝、微信支付四种支付方式
- **统一接口**：在后端抽象统一的支付接口，前端通过`paymentMethod`参数选择支付渠道
- **Webhook处理**：统一webhook入口，根据支付来源分发到对应处理器

**决策5：图片存储方案**
- **MVP阶段**：使用Next.js `public/`目录存储静态图片
- **后续升级**：可集成Cloudinary、AWS S3等对象存储服务
- **图片优化**：使用Next.js Image组件自动优化图片

### 3. 系统边界和接口

**外部系统接口**
- **支付网关**：Stripe、PayPal、支付宝、微信支付（通过SDK）
- **数据库**：PostgreSQL（通过Prisma）
- **部署平台**：Vercel（自动CI/CD）

**内部模块接口**
- **API Routes**：RESTful风格，返回JSON
- **前端组件**：通过Context API共享状态
- **数据验证**：使用Zod schema进行参数校验

---

## 技术约束

### 必须使用的技术/框架

- ✅ Next.js 14+（App Router模式）
- ✅ React 18+
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ shadcn/ui组件库
- ✅ Prisma ORM
- ✅ PostgreSQL
- ✅ React Hook Form + Zod

### 必须避免的反模式

- ❌ 不使用CSS-in-JS库（除shadcn/ui内置的Radix UI）
- ❌ 不使用Redux、MobX等重量级状态管理
- ❌ 不直接在组件中调用数据库（必须通过API Routes）
- ❌ 不使用`.env`文件提交到git（使用`.env.local`）
- ❌ 不使用硬编码配置（使用环境变量）

### 关键技术要求

**性能要求**
- 页面加载时间 < 3秒（Lighthouse Performance > 80）
- 首屏内容渲染（FCP）< 1.5秒
- 图片使用Next.js Image组件优化

**安全要求**
- 支付密钥使用环境变量存储
- API Routes实现CSRF保护
- 敏感操作（支付、订单管理）需要认证（后续迭代）
- 输入验证使用Zod schema

**可维护性要求**
- 组件单一职责，保持简洁
- 使用TypeScript类型注解
- API返回统一的错误格式
- 代码注释清晰，关键逻辑说明

**可测试性要求**
- API Routes可独立测试
- 组件可单元测试
- 关键业务逻辑可集成测试

---

## 向现有代码学习

### 参考实现位置

本项目为新项目，参考以下最佳实践：

**Next.js App Router官方示例**
- https://github.com/vercel/next.js/tree/canary/examples/with-prisma
- https://github.com/shadcn-ui/ui（shadcn/ui组件库）

**支付集成参考**
- Stripe Next.js集成文档：https://stripe.com/docs/payments/quickstart
- PayPal SDK文档：https://developer.paypal.com/docs/api/rest-sdk/
- 支付宝开放平台文档：https://opendocs.alipay.com/open/270
- 微信支付开发文档：https://pay.weixin.qq.com/wiki/doc/apiv3/index.shtml

**电商项目参考**
- Next.js E-commerce示例：https://github.com/vercel/commerce
- Shopify Storefront API参考：https://shopify.dev/api/storefront

### 共同模式总结

**1. API Routes设计模式**
```typescript
// GET /api/products - 获取商品列表
// POST /api/products - 创建商品
// GET /api/products/[id] - 获取商品详情
// PUT /api/products/[id] - 更新商品
// DELETE /api/products/[id] - 删除商品
```

**2. Server Components + Client Components混合模式**
```typescript
// page.tsx (Server Component)
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  return (
    <div>
      <ProductDetail product={product} /> {/* Client Component */}
    </div>
  );
}
```

**3. 表单验证模式**
```typescript
// 使用Zod schema定义验证规则
const orderSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1).max(10),
  email: z.string().email(),
});

// 使用React Hook Form集成
const form = useForm<z.infer<typeof orderSchema>>({
  resolver: zodResolver(orderSchema),
});
```

**4. 支付流程模式**
```typescript
// 1. 前端创建支付会话
const response = await fetch('/api/checkout/stripe', {
  method: 'POST',
  body: JSON.stringify({ items, paymentMethod: 'stripe' }),
});

// 2. 跳转到支付页面
const { checkoutUrl } = await response.json();
window.location.href = checkoutUrl;

// 3. 支付成功后webhook回调更新订单状态
// POST /api/webhooks/stripe
```

### 可复用的组件

**shadcn/ui基础组件**（从`components/ui/`导入）
- Button、Card、Input、Form、Dialog、Toast等

**自定义组件**（在`components/shop/`、`components/admin/`中创建）
- ProductCard、ProductList、CartSidebar、CheckoutForm等

**工具函数**（在`lib/`中创建）
- 支付工具函数（`lib/payments/`）
- 数据验证schemas（`lib/validations/`）
- 通用工具函数（`lib/utils.ts`）

---

## 务实决策

### 基于优先级框架的技术选择

**可测试性优先**
- 选择Prisma：提供测试环境，易于模拟数据库
- 选择React Hook Form + Zod：表单逻辑可独立测试
- 选择Next.js API Routes：可以使用标准的HTTP测试库

**可读性优先**
- 选择Next.js标准目录结构：社区共识，易于理解
- 选择shadcn/ui：组件代码清晰，不依赖黑盒
- 选择TypeScript：类型注解提高代码可读性

**一致性优先**
- 遵循Next.js和shadcn/ui官方最佳实践
- 使用统一的代码风格（通过Prettier、ESLint配置）
- API接口设计遵循RESTful规范

**简单性优先**
- MVP阶段不使用复杂的状态管理（使用Context API）
- 图片存储使用`public/`目录，避免引入对象存储服务
- 不使用复杂的缓存策略，依赖Next.js的内置优化

**可逆性优先**
- 不绑定特定云服务商（使用Vercel但可迁移到其他平台）
- 数据库设计预留扩展空间
- 支付模块抽象接口，便于添加新的支付方式

### 简单设计原则的应用

**KISS原则（Keep It Simple, Stupid）**
- MVP只实现核心功能，不做过度设计
- API接口设计简单直观，遵循RESTful规范
- 组件职责单一，避免过度抽象

**YAGNI原则（You Aren't Gonna Need It）**
- 不实现用不到的功能（如用户系统、评价系统）
- 不引入不必要的依赖（如Redux、Redux Saga等）
- 数据库表设计只包含核心字段

**DRY原则（Don't Repeat Yourself）**
- 提取公共逻辑到工具函数（`lib/`目录）
- 使用shadcn/ui组件避免重复开发基础组件
- API错误处理统一封装

### 避免过度设计的具体措施

**避免过度抽象**
- 不创建通用的CRUD组件，根据实际需求编写具体组件
- 不抽象复杂的领域模型，直接使用Prisma生成的类型
- 不创建过多的中间层，保持代码扁平

**避免过早优化**
- MVP阶段不引入复杂的缓存策略
- 不过早优化数据库查询（使用Prisma默认查询即可）
- 不过早实现CDN、负载均衡等高级功能

**避免技术堆砌**
- 不使用GraphQL（RESTful足够满足需求）
- 不使用微服务架构（单体应用足够）
- 不使用复杂的状态管理方案（Context API足够）

---

## 后续扩展方向

### 短期扩展（3-6个月）
- 添加用户认证系统（NextAuth.js）
- 实现多语言支持（next-intl）
- 集成图片CDN（Cloudinary）
- 添加评价和评分系统

### 中期扩展（6-12个月）
- 扩展到北美市场（多货币支持）
- 实现会员体系
- 添加营销功能（优惠券、积分）
- 集成物流跟踪API

### 长期扩展（12个月+）
- 微服务化（支付、订单独立服务）
- 实现推荐系统
- 移动App开发
- 社交功能（收藏家社群）

---

## 部署和运维

### 部署方案
- **应用部署**：Docker + Nginx反向代理
- **数据库部署**：PostgreSQL Docker容器
- **环境变量**：`.env.local`文件（不提交到git）

### Docker部署架构

```
┌─────────────────────────────────────────┐
│         Nginx (反向代理)                │
│         :80 → :3000 (Next.js)          │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      Next.js App (Docker容器)          │
│      Port: 3000                         │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│    PostgreSQL (Docker容器)             │
│    Port: 5432                           │
└─────────────────────────────────────────┘
```

### Docker Compose配置

使用Docker Compose管理多个容器：

```yaml
version: '3.8'

services:
  # PostgreSQL数据库
  postgres:
    image: postgres:16-alpine
    container_name: shwan-doll-store-db
    restart: always
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - shwan-network

  # Next.js应用
  app:
    build: .
    container_name: shwan-doll-store-app
    restart: always
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: ${DATABASE_URL}
      NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL}
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY}
      STRIPE_WEBHOOK_SECRET: ${STRIPE_WEBHOOK_SECRET}
      PAYPAL_CLIENT_ID: ${PAYPAL_CLIENT_ID}
      PAYPAL_CLIENT_SECRET: ${PAYPAL_CLIENT_SECRET}
      ALIPAY_APP_ID: ${ALIPAY_APP_ID}
      ALIPAY_PRIVATE_KEY: ${ALIPAY_PRIVATE_KEY}
      WECHAT_MCH_ID: ${WECHAT_MCH_ID}
      WECHAT_API_KEY: ${WECHAT_API_KEY}
    depends_on:
      - postgres
    networks:
      - shwan-network

  # Nginx反向代理
  nginx:
    image: nginx:alpine
    container_name: shwan-doll-store-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro  # SSL证书（可选）
    depends_on:
      - app
    networks:
      - shwan-network

volumes:
  postgres_data:

networks:
  shwan-network:
    driver: bridge
```

### Dockerfile配置

```dockerfile
# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装pnpm
RUN npm install -g pnpm

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建应用
RUN pnpm build

# 运行阶段
FROM node:20-alpine AS runner

WORKDIR /app

# 安装pnpm
RUN npm install -g pnpm

# 复制必要的文件
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start"]
```

### Nginx配置

```nginx
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    server {
        listen 80;
        server_name localhost;

        client_max_body_size 10M;

        location / {
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # 静态文件缓存
        location /_next/static {
            proxy_pass http://app;
            proxy_cache_valid 200 60m;
        }

        # 图片缓存
        location /images {
            proxy_pass http://app;
            proxy_cache_valid 200 60m;
        }
    }

    # HTTPS配置（可选，使用SSL证书）
    # server {
    #     listen 443 ssl;
    #     server_name yourdomain.com;
    #
    #     ssl_certificate /etc/nginx/ssl/cert.pem;
    #     ssl_certificate_key /etc/nginx/ssl/key.pem;
    #
    #     location / {
    #         proxy_pass http://app;
    #         proxy_set_header Host $host;
    #         proxy_set_header X-Real-IP $remote_addr;
    #     }
    # }
}
```

### 本地开发流程

#### 1. 环境准备

创建`.env.local`文件：

```env
# 数据库配置
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=shiwan_doll_store
DATABASE_URL="postgresql://postgres:your_password_here@localhost:5432/shiwan_doll_store"

# 应用配置
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Stripe配置
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# PayPal配置
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id

# 支付宝配置
ALIPAY_APP_ID=your_app_id
ALIPAY_PRIVATE_KEY=your_private_key
ALIPAY_PUBLIC_KEY=alipay_public_key

# 微信支付配置
WECHAT_MCH_ID=your_mch_id
WECHAT_API_KEY=your_api_key
WECHAT_CERT_PATH=/path/to/cert
WECHAT_KEY_PATH=/path/to/key
```

#### 2. 启动开发环境

```bash
# 启动PostgreSQL容器
docker-compose up -d postgres

# 等待数据库启动
sleep 5

# 初始化数据库
pnpm prisma migrate dev

# 运行种子数据（可选）
pnpm prisma db seed

# 启动Next.js开发服务器
pnpm dev
```

#### 3. 生产环境部署

```bash
# 构建Docker镜像
docker-compose build

# 启动所有服务（包括Nginx）
docker-compose up -d

# 查看日志
docker-compose logs -f app

# 停止服务
docker-compose down

# 停止服务并删除数据卷（慎用）
docker-compose down -v
```

#### 4. 数据库管理

```bash
# 进入PostgreSQL容器
docker exec -it shwan-doll-store-db psql -U postgres -d shiwan_doll_store

# 备份数据库
docker exec shwan-doll-store-db pg_dump -U postgres shiwan_doll_store > backup.sql

# 恢复数据库
docker exec -i shwan-doll-store-db psql -U postgres shiwan_doll_store < backup.sql
```

### CI/CD流程（可选）

如果需要自动化部署，可以使用GitHub Actions：

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Build Docker image
        run: docker-compose build

      - name: Deploy to server
        run: |
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > deploy_key
          chmod 600 deploy_key
          scp -i deploy_key -r . user@server:/path/to/app
          ssh -i deploy_key user@server "cd /path/to/app && docker-compose up -d"
```

### 监控和日志

- **应用日志**：`docker-compose logs -f app`
- **Nginx日志**：`docker-compose logs -f nginx`
- **数据库日志**：`docker-compose logs -f postgres`
- **性能监控**：使用Next.js内置的Web Vitals（或集成Google Analytics）

### 备份策略

- **数据库备份**：每天自动备份PostgreSQL数据
- **代码备份**：代码存储在GitHub，Git版本控制
- **环境变量备份**：`.env.local`文件妥善保管，不提交到Git

### 安全注意事项

1. **防火墙配置**：只开放必要端口（80、443）
2. **SSL证书**：生产环境使用HTTPS（Let's Encrypt免费证书）
3. **定期更新**：定期更新Docker镜像和依赖包
4. **密码安全**：使用强密码，定期更换
5. **访问控制**：限制数据库访问IP，使用防火墙规则

### 故障恢复

- **容器重启**：Docker会自动重启失败的容器（`restart: always`）
- **数据恢复**：从备份文件恢复数据库
- **快速回滚**：使用Git回滚代码，重新部署

---

## 总结

本架构设计遵循"务实优先于教条"的原则，选择简单、可测试、易维护的技术栈，快速实现MVP版本。关键决策包括：

- 使用Next.js 14 App Router + shadcn/ui + Prisma构建全栈应用
- MVP阶段使用React Context API管理状态，避免过度设计
- 集成四种主流支付方式，提供统一的支付接口
- 采用Server Components + Client Components混合模式，兼顾性能和交互
- 预留扩展空间，支持后续功能迭代和全球化布局

架构简单清晰，易于理解和维护，符合1-2周快速上线的目标。
