# 🚀 新机器快速启动指南

> **最后更新**: 2025-01-20
> **当前状态**: Epic 1-2 已完成 (基础架构 + 产品展示功能)
> **Git Commit**: 664b085

---

## 📋 在新机器上开始的步骤

### 1. 克隆/拉取代码

```bash
cd /Users/yuanyuan/Desktop/MyProject/global_saling-claude-agile-skill
git pull
```

### 2. 进入前端目录

```bash
cd shiwan-ceramics/frontend
```

### 3. 安装依赖

```bash
npm install
```

### 4. 确认数据库运行

```bash
# 检查 PostgreSQL 是否在端口 5433 运行
psql -h localhost -p 5433 -U bulletin -d bulletin_dev -c "SELECT NOW();"

# 如果没有运行，启动 PostgreSQL（根据您的环境）
# OrbStack: 自动启动
# Docker: docker start postgres
```

### 5. 启动开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:3000 启动

---

## ✅ 验证安装

访问以下页面验证一切正常：

- ✅ 中文首页: http://localhost:3000/zh
- ✅ 英文首页: http://localhost:3000/en
- ✅ 产品列表: http://localhost:3000/zh/products
- ✅ 关于页面: http://localhost:3000/zh/about

---

## 📂 项目结构

```
frontend/
├── app/[lang]/          # 多语言页面
│   ├── products/        # 产品模块
│   ├── blog/           # 博客模块
│   ├── about/          # 关于页面
│   └── contact/        # 联系页面
├── components/          # React 组件
│   ├── layout/         # Header, Footer
│   ├── product/        # 产品组件
│   ├── blog/           # 博客组件
│   └── ui/             # UI 组件
├── contexts/           # Context (CurrencyProvider)
├── lib/                # 工具函数
│   ├── db.ts           # 数据库查询
│   ├── db-client.ts    # 数据库连接
│   └── currencies.ts   # 货币配置
└── types/              # TypeScript 类型
```

---

## 🎯 当前状态

### ✅ 已完成 (Epic 1-2)

- ✅ Next.js 16 + TypeScript + Tailwind CSS 4
- ✅ PostgreSQL 数据库集成
- ✅ 产品列表和详情页面
- ✅ 首页和关于页面
- ✅ 多语言支持 (中英文)
- ✅ 多货币支持 (USD/SGD/MYR/CNY)
- ✅ 响应式设计
- ✅ 所有核心组件

### 🚧 待完成 (Epic 3-7)

1. **Epic 3: 博客内容** - 创建 5 篇示例博客文章
2. **Epic 4: 翻译** - 翻译产品内容为英文
3. **Epic 5: 邮件** - 配置 Resend 邮件服务
4. **Epic 6: SEO** - 优化 SEO 和性能
5. **Epic 7: 部署** - 部署到 Vercel + Railway

---

## 🛠️ 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器 (端口 3000)
npm run build           # 构建生产版本
npm run start           # 启动生产服务器
npm run lint            # 代码检查

# 数据库测试
cd .. && node test-db.js  # 测试数据库连接

# E2E 测试
python3 test_app.py      # 运行端到端测试（需先安装 Playwright）
```

---

## 📝 重要文件

- `DEVELOPMENT_REPORT.md` - 详细开发报告
- `QA_HANDOFF.md` - QA 测试交付文档
- `docs/create-schema-only.sql` - 数据库 Schema 脚本
- `IMPLEMENT_PLAN.md` - 完整实施计划

---

## 🐛 可能遇到的问题

### 问题 1: PostgreSQL 连接失败

```bash
# 检查数据库是否运行
lsof -i :5433

# 如果没有运行，根据您的环境启动
# OrbStack: 在 OrbStack 中启动 PostgreSQL
# Docker: docker start <postgres-container-name>
```

### 问题 2: 端口 3000 被占用

```bash
# 查找占用端口的进程
lsof -i :3000

# 杀掉进程
kill -9 <PID>

# 或者使用其他端口
PORT=3001 npm run dev
```

### 问题 3: 依赖安装失败

```bash
# 清理缓存重试
rm -rf node_modules package-lock.json
npm install
```

---

## 🎨 下一步开发建议

根据敏捷开发流程，建议按以下顺序继续：

### 优先级 P0 (核心功能)

1. **测试当前功能** - 使用 webapp-testing skill 进行 E2E 测试
2. **添加示例数据** - 创建 20 个产品和 5 篇博客
3. **配置邮件服务** - 完成 Epic 5

### 优先级 P1 (增强功能)

4. **SEO 优化** - 完成 Epic 6
5. **部署上线** - 完成 Epic 7

---

## 📞 需要帮助？

- 查看详细文档: `DEVELOPMENT_REPORT.md`
- 查看实施计划: `IMPLEMENT_PLAN.md`
- 查看测试交付: `QA_HANDOFF.md`

---

**开发环境要求**:
- Node.js 20+
- PostgreSQL 12+ (端口 5433)
- npm 或 yarn

**当前分支**: main
**最新提交**: 664b085
**工作目录**: `shiwan-ceramics/frontend/`
