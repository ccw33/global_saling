# 石湾陶瓷公仔独立站 - Strapi CMS

> Strapi 5.x + TypeScript + SQLite/PostgreSQL

## 项目简介

这是石湾陶瓷公仔跨境电商独立站的 Strapi CMS 后端项目，用于管理产品、博客、大师等内容。

## 技术栈

- **CMS框架**: Strapi 5.x
- **语言**: TypeScript
- **数据库**: SQLite (开发环境) / PostgreSQL (生产环境)
- **部署**: Railway / Fly.io

## 开发环境设置

### 前置要求

- Node.js 20+
- npm 9+
- nvm (用于切换 Node.js 版本)

### 切换 Node.js 版本

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20
```

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:1337/admin

## 可用命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 运行 Strapi 控制台
npm run console

# 部署到 Strapi Cloud
npm run deploy
```

## 管理员账户

首次访问 http://localhost:1337/admin 时，需要创建管理员账户。

## 数据库配置

### 开发环境（SQLite）

默认使用 SQLite 数据库，无需额外配置。

### 生产环境（PostgreSQL）

更新 `.env` 文件：

```bash
DATABASE_CLIENT=postgres
DATABASE_HOST=your_database_host
DATABASE_PORT=5432
DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_database_username
DATABASE_PASSWORD=your_database_password
DATABASE_SSL=false
```

安装 PostgreSQL 客户端：

```bash
npm install pg
```

## 项目结构

```
cms/
├── src/
│   ├── api/                # API 定义
│   │   ├── product/        # 产品内容类型
│   │   ├── category/       # 分类内容类型
│   │   ├── blog/           # 博客内容类型
│   │   └── master/         # 大师内容类型
│   ├── plugins/            # 自定义插件
│   └── ...                # 其他 Strapi 目录
├── config/                # Strapi 配置
│   ├── admin.ts
│   ├── api.ts
│   ├── database.ts
│   └── ...
├── public/                # 静态资源
└── .env                   # 环境变量
```

## 环境变量

环境变量已自动生成（.env 文件），主要包含：

- `HOST`: 服务器地址
- `PORT`: 服务器端口
- `APP_KEYS`: 应用密钥
- `API_TOKEN_SALT`: API Token 盐
- `ADMIN_JWT_SECRET`: Admin JWT 密钥
- `TRANSFER_TOKEN_SALT`: Transfer Token 盐
- `ENCRYPTION_KEY`: 加密密钥
- `DATABASE_CLIENT`: 数据库客户端
- `DATABASE_HOST`: 数据库主机
- `DATABASE_PORT`: 数据库端口
- `DATABASE_NAME`: 数据库名称
- `DATABASE_USERNAME`: 数据库用户名
- `DATABASE_PASSWORD`: 数据库密码

## 相关文档

- [需求文档](../docs/feature/shiwan-doll-website/REQUIREMENTS.md)
- [架构设计](../docs/feature/shiwan-doll-website/ARCHITECTURE.md)
- [实施计划](../docs/feature/shiwan-doll-website/IMPLEMENT_PLAN.md)

## 开发指南

### 内容类型创建

使用 Strapi Admin UI 的 Content Type Builder 创建内容类型，或手动编写 schema 文件。

### API 配置

在 `config/api.ts` 中配置全局 API 设置，如 CORS、响应中间件等。

### 数据库迁移

```bash
# 创建迁移
npx strapi generate:migration migration-name

# 运行迁移
npx strapi db:migrate

# 重置数据库（谨慎使用）
npx strapi db:reset
```

## 许可证

MIT
