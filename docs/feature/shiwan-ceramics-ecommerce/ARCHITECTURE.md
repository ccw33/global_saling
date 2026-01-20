# 石湾陶瓷公仔独立站架构设计

> 创建日期：2025-01-18
> 状态：待确认
> 架构设计师：Claude

---

## 技术框架选型

### 前端框架：Next.js 14 (App Router)

**选择理由**：
1. **SEO友好** - 服务器端渲染（SSR）和静态生成（SSG），完美满足视频引流后的SEO需求
2. **性能优秀** - 自动图片优化、代码分割、内置性能优化
3. **开发效率** - React生态丰富，组件化开发，TypeScript支持
4. **多语言支持** - 内置i18n支持，易于实现中英双语
5. **部署简单** - 可部署到Vercel、Netlify等平台，一键发布

### Headless CMS：Strapi 4.x

**选择理由**：
1. **内容管理友好** - 非技术用户可轻松管理产品和博客内容
2. **RESTful API** - 提供标准的API接口，与Next.js无缝集成
3. **多语言支持** - 原生支持多语言内容管理
4. **开源免费** - 自主部署，无月费，数据完全掌控
5. **插件丰富** - 可扩展性强，支持后续电商功能

### 数据库：PostgreSQL

**选择理由**：
1. **关系型数据** - 产品、分类、博客等内容关系清晰
2. **稳定性高** - 成熟稳定，适合生产环境
3. **Strapi原生支持** - Strapi默认推荐数据库

### 样式方案：Tailwind CSS

**选择理由**：
1. **开发效率** - 工具类优先，快速构建UI
2. **响应式设计** - 内置响应式工具类
3. **性能优秀** - 生产环境自动清理未使用的CSS
4. **维护简单** - 样式统一，易于修改

### 表单处理：Resend + React Hook Form

**选择理由**：
1. **邮件发送** - Resend提供现代化的邮件API
2. **表单管理** - React Hook Form轻量高效
3. **无需后端** - 可通过Serverless Functions处理表单提交

### 部署方案

**前端部署**：Vercel
- 免费SSL证书
- 自动CI/CD
- 全球CDN
- 零配置部署

**CMS部署**：Railway / Fly.io
- 简单易用
- 支持PostgreSQL
- 自动扩展
- 成本低廉（$5-20/月）

---

## 项目目录结构

```
shiwan-ceramics/
├── frontend/                    # Next.js 前端应用
│   ├── app/                     # App Router目录
│   │   ├── [lang]/             # 语言路由
│   │   │   ├── (home)/         # 首页
│   │   │   ├── products/       # 产品页面
│   │   │   ├── blog/           # 博客页面
│   │   │   └── about/          # 关于页面
│   │   ├── api/                # API路由（表单提交等）
│   │   ├── layout.tsx          # 根布局
│   │   └── globals.css         # 全局样式
│   ├── components/             # 可复用组件
│   │   ├── ui/                 # 基础UI组件
│   │   ├── product/            # 产品相关组件
│   │   ├── blog/               # 博客相关组件
│   │   └── layout/             # 布局组件
│   ├── lib/                    # 工具函数
│   │   ├── strapi.ts           # Strapi API客户端
│   │   └── utils.ts            # 通用工具函数
│   ├── types/                  # TypeScript类型定义
│   ├── public/                 # 静态资源
│   ├── next.config.js          # Next.js配置
│   ├── tailwind.config.ts      # Tailwind配置
│   └── package.json
│
├── cms/                        # Strapi CMS（可选独立仓库）
│   ├── src/
│   │   ├── api/                # API定义
│   │   │   ├── product/        # 产品内容类型
│   │   │   ├── category/       # 分类内容类型
│   │   │   ├── blog/           # 博客内容类型
│   │   │   └── master/         # 大师内容类型
│   │   └── plugins/            # 自定义插件
│   ├── config/                 # Strapi配置
│   └── package.json
│
└── docs/                       # 项目文档
    ├── api.md                  # API文档
    ├── deployment.md           # 部署文档
    └── content-guide.md        # 内容管理指南
```

---

## 高层架构思路

### 整体架构

```
┌─────────────┐
│   用户浏览器   │
└──────┬──────┘
       │ HTTPS
       ↓
┌─────────────────┐
│  Vercel CDN     │ ← Next.js静态页面 + Serverless Functions
│  (全球边缘节点)   │
└────────┬────────┘
         │ API调用
         ↓
┌─────────────────┐
│  Strapi CMS     │ ← 内容管理API（REST/GraphQL）
│  (Railway)      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  PostgreSQL     │ ← 数据存储
│  (Railway)      │
└─────────────────┘

外部服务：
- Resend (邮件发送)
- Vercel Analytics (访问统计)
```

### 数据流设计

#### 内容管理流程
```
管理员登录 Strapi
  ↓
创建/编辑产品、博客内容
  ↓
上传图片到 Strapi 媒体库
  ↓
设置语言版本（中文/英文）
  ↓
发布内容
  ↓
Strapi 自动生成 API
  ↓
Next.js 通过 API 获取内容
  ↓
页面生成（SSG/SSR）
  ↓
用户访问网站
```

#### 用户访问流程
```
用户访问网站
  ↓
选择语言（中文/英文）
  ↓
Next.js 根据语言路由渲染页面
  ↓
从 Strapi API 获取对应语言的内容
  ↓
展示产品/博客
  ↓
用户提交表单
  ↓
Vercel Serverless Function 处理
  ↓
通过 Resend 发送邮件通知
```

### 多语言实现方案

#### URL结构
```
/                          → 重定向到 /zh
/zh                        → 中文首页
/en                        → 英文首页
/zh/products               → 中文产品列表
/en/products               → 英文产品列表
/zh/products/slug          → 中文产品详情
/en/products/slug          → 英文产品详情
```

#### 内容管理
- Strapi内置国际化功能
- 每个内容类型支持多语言版本
- API通过locale参数过滤语言

#### 货币切换
- 前端JavaScript实现货币转换
- 基于固定汇率（可在CMS配置）
- 实时更新价格显示

---

## 技术约束

### 必须使用的技术/框架
1. **前端框架** - Next.js 14 (App Router)
2. **TypeScript** - 全程使用TypeScript，类型安全
3. **CMS** - Strapi 4.x
4. **数据库** - PostgreSQL
5. **样式** - Tailwind CSS
6. **部署** - Vercel（前端）+ Railway（CMS）

### 必须避免的反模式
1. ❌ 不要使用Client-side Rendering（CSR）做SEO关键页面
2. ❌ 不要硬编码内容，所有内容必须通过Strapi管理
3. ❌ 不要直接在组件中fetch数据，使用Server Components
4. ❌ 不要忽略TypeScript类型检查
5. ❌ 不要使用CSS-in-JS（性能问题）

### 关键技术要求

#### 性能要求
- 首屏加载 < 2秒（LCP）
- 首次输入延迟 < 100ms（FID）
- 累积布局偏移 < 0.1（CLS）
- Lighthouse性能分数 > 90

#### SEO要求
- 所有页面支持SSR或SSG
- 语义化HTML5标签
- 结构化数据（JSON-LD）
- Meta标签完整
- 生成sitemap.xml
- 生成robots.txt

#### 可访问性要求
- 颜色对比度符合WCAG AA标准
- 支持键盘导航
- 图片alt文本
- ARIA标签合理使用

---

## 向现有代码学习

### Next.js App Router最佳实践

#### Server Components优先
```typescript
// ✅ 正确：默认使用Server Component
export default async function ProductPage() {
  const products = await getProducts() // 直接在组件中fetch
  return <ProductList products={products} />
}

// ❌ 错误：不必要的Client Component
'use client'
export default function ProductPage() {
  const [products, setProducts] = useState()
  useEffect(() => {
    fetch('/api/products').then(...)
  }, [])
  // ...
}
```

#### 数据获取模式
```typescript
// lib/strapi.ts - 统一的API客户端
export async function getProducts(locale: string) {
  const response = await fetch(
    `${STRAPI_URL}/api/products?locale=${locale}&populate=*`,
    { next: { revalidate: 3600 } } // ISR缓存1小时
  )
  return response.json()
}
```

### Strapi内容模型设计原则

#### 产品内容类型
```javascript
{
  // 基础字段
  name: { type: 'string', required: true },
  slug: { type: 'uid', required: true },

  // 多语言内容
  description: { type: 'richtext' },
  story: { type: 'richtext' }, // 产品故事

  // 关系
  category: { type: 'relation', target: 'api::category.category' },
  master: { type: 'relation', target: 'api::master.master' },
  images: { type: 'media', multiple: true },

  // 价格和库存
  price: { type: 'decimal' },
  stock: { type: 'integer' },

  // SEO字段
  metaTitle: { type: 'string' },
  metaDescription: { type: 'text' }
}
```

---

## 务实决策

### 基于优先级框架的技术选择

#### 1. 可测试性 - 优先
- 组件化设计，易于单元测试
- API层抽象，易于集成测试
- 使用Playwright做E2E测试

#### 2. 可读性 - 优先
- 清晰的文件结构和命名
- TypeScript类型文档
- 注释关键业务逻辑

#### 3. 一致性 - 优先
- 统一的代码风格（ESLint + Prettier）
- 统一的API调用模式
- 统一的错误处理

#### 4. 简单性 - 核心原则
- **MVP阶段避免过度抽象**
- 不引入状态管理库（直接使用Server Components）
- 不引入复杂的表单验证库（使用原生HTML5验证）
- 不引入UI组件库（用Tailwind手写简单组件）

#### 5. 可逆性 - 考虑未来
- Strapi可随时导出数据
- Next.js生态成熟，迁移成本低
- 模块化设计，易于替换组件

### 简单设计原则的应用

#### ❌ 过度设计示例
```
/
├── src/
│   ├── features/
│   │   ├── product/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   └── blog/
│   │       └── ... (重复的结构)
│   ├── shared/
│   │   ├── ui/
│   │   ├── components/
│   │   └── utils/
│   └── store/
```
**问题**：过度抽象，文件层级太深

#### ✅ 简单设计示例
```
/
├── app/           # 路由和页面
├── components/    # 组件（扁平化）
├── lib/           # 工具函数
└── types/         # 类型定义
```
**优势**：一目了然，易于理解和修改

### MVP阶段避免的功能

#### 第一版不包含
- ❌ 用户认证系统（留到第二版）
- ❌ 购物车和支付（留到第二版）
- ❌ 复杂的搜索功能（简单的分类筛选即可）
- ❌ 用户评论和评分（留到后续）
- ❌ 数据分析集成（用Vercel Analytics即可）

#### 第一版简化实现
- 联系表单：直接用Resend发送邮件，不存数据库
- 多语言切换：简单的语言路由，不用复杂的i18n库
- 货币转换：前端JavaScript简单计算，不用后端API

---

## 安全考虑

### 基础安全措施
1. **HTTPS强制** - Vercel自动提供SSL证书
2. **环境变量** - API密钥存储在环境变量中
3. **Strapi权限** - 管理员账户需要强密码
4. **表单验证** - 前后端双重验证
5. **CORS配置** - 限制API访问来源

### 后续扩展（第二版考虑）
- 支付安全（PCI DSS合规）
- 用户数据保护（GDPR合规）
- CSRF防护
- Rate Limiting

---

## 性能优化策略

### 图片优化
- 使用Next.js Image组件自动优化
- WebP格式优先
- 响应式图片（srcset）
- 懒加载（below the fold）

### 代码分割
- App Router自动路由分割
- 动态导入大型组件
- 第三方库按需加载

### 缓存策略
- 静态页面生成（SSG）
- 增量静态再生（ISR）
- Vercel Edge Network CDN缓存

---

## 监控和维护

### 关键指标监控
- Vercel Analytics - 页面访问统计
- Vercel Speed Insights - 性能监控
- Google Search Console - SEO监控
- 错误日志（Sentry可选，第一阶段用console.log）

### 维护计划
- 每周检查Strapi备份
- 每月更新依赖包
- 定期检查SSL证书有效期（Vercel自动续期）

---

## 开发环境设置

### 本地开发
```bash
# 前端
cd frontend
npm install
npm run dev    # http://localhost:3000

# CMS
cd cms
npm install
npm run dev    # http://localhost:1337
```

### 环境变量
```bash
# .env.local (前端)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# .env (CMS)
HOST=localhost
PORT=1337
DATABASE_URL=postgresql://...
APP_KEYS=...
```

---

## 成本估算

### MVP阶段月度成本
- Vercel（前端）：$0（免费额度足够）
- Railway（CMS + DB）：$5-20/月
- Resend（邮件）：$0-20/月（3000封免费/月）
- 域名：$10-15/年
- **总计**：约$10-40/月

### 第二阶段（增加支付功能后）
- Vercel：$20/月（Pro计划）
- Railway：$20-50/月
- Resend：$20-50/月
- Stripe支付：交易额的2.9% + $0.30
- **总计**：约$60-120/月 + 支付手续费

---

## 风险评估

### 技术风险
1. **Strapi学习曲线** - 团队需要熟悉Headless CMS概念
2. **API集成复杂度** - 需要处理API错误、重试逻辑
3. **多语言内容维护** - 内容翻译工作量大

### 缓解措施
- 提供详细的CMS使用文档
- 使用TypeScript减少API错误
- MVP阶段只做中英双语

---

## 下一步

确认架构设计后，将交付给**开发规划师**制定详细的实施计划，包括：
- Epic-Story拆分
- 开发阶段划分
- 验收标准定义
- 开发时间估算

---

## 参考资料

- [Next.js官方文档](https://nextjs.org/docs)
- [Strapi官方文档](https://docs.strapi.io/)
- [Tailwind CSS文档](https://tailwindcss.com/docs)
- [Vercel部署指南](https://vercel.com/docs)
