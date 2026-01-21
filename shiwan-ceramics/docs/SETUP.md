# 石湾陶瓷公仔项目 - 环境设置指南

> 本文档整合了所有环境设置相关的信息，包括新机器设置、数据库设置、验证和测试。

---

## 📋 目录

1. [快速开始](#快速开始)
2. [新机器设置](#新机器设置)
3. [PostgreSQL 数据库设置](#postgresql-数据库设置)
4. [Supabase 设置（可选）](#supabase-设置可选)
5. [验证和测试](#验证和测试)
6. [常见问题](#常见问题)

---

## 🚀 快速开始

### 前置条件

- Node.js 18.x 或 20.x LTS
- npm 包管理器
- Git
- PostgreSQL (端口 5433)

### 1. 克隆项目（如果还没有）

```bash
git clone <repository-url>
cd shiwan-ceramics
```

### 2. 安装依赖

```bash
cd frontend
npm install
```

### 3. 配置环境变量

复制 `.env.local.example` 为 `.env.local`：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local`：

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USER=bulletin
POSTGRES_PASSWORD=bulletin
POSTGRES_DB=bulletin_dev
POSTGRES_SCHEMA=shiwan_ceramics
```

### 4. 设置数据库

详见下面的 [PostgreSQL 数据库设置](#postgresql-数据库设置) 章节。

### 5. 启动开发服务器

```bash
npm run dev
```

访问：**http://localhost:3000/zh/**

---

## 💻 新机器设置

### macOS 设置

#### 1. 安装 Homebrew（如果还没有）

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### 2. 安装 Node.js

```bash
brew install node@20
node --version  # 应该显示 v20.x.x
```

#### 3. 安装 Git

```bash
brew install git
git --version
```

#### 4. 安装 PostgreSQL

**选项 A: 使用 Homebrew**

```bash
brew install postgresql@16
brew services start postgresql@16
```

**选项 B: 使用 OrbStack（推荐用于开发）**

OrbStack 提供 Docker 化的 PostgreSQL，端口映射为 5433：

```bash
# 启动 PostgreSQL 容器
docker run -d \
  --name postgres-dev \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=bulletin_dev \
  -p 5433:5432 \
  postgres:16
```

#### 5. 安装 VS Code（推荐）

```bash
brew install --cask visual-studio-code
```

### Linux/Ubuntu 设置

```bash
# 更新包管理器
sudo apt update

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 Git
sudo apt install -y git

# 安装 PostgreSQL
sudo apt install -y postgresql-16
sudo systemctl start postgresql
```

---

## 🗄️ PostgreSQL 数据库设置

### 方案 A: 使用 OrbStack PostgreSQL（推荐）

#### 1. 确认 PostgreSQL 容器运行

```bash
docker ps | grep postgres
```

#### 2. 连接并创建数据库

```bash
# 连接到 PostgreSQL（注意使用 -h localhost）
psql -h localhost -p 5433 -U postgres -d postgres
```

在 psql 提示符下：

```sql
-- 创建数据库
CREATE DATABASE bulletin_dev;

-- 创建用户
CREATE USER bulletin WITH PASSWORD 'bulletin';

-- 授权
GRANT ALL PRIVILEGES ON DATABASE bulletin_dev TO bulletin;

-- 退出
\q
```

#### 3. 执行 Schema 创建脚本

```bash
cd /path/to/shiwan-ceramics
psql -h localhost -p 5433 -U bulletin -d bulletin_dev -f docs/create-schema-only.sql
```

**重要**: 使用 OrbStack 时必须加 `-h localhost` 参数，否则会尝试使用 Unix socket 连接而失败。

### 方案 B: 使用本地 PostgreSQL

#### 1. 确认 PostgreSQL 服务运行

```bash
brew services list | grep postgres
# 或
sudo systemctl status postgresql
```

#### 2. 创建数据库和用户

```bash
# 连接到 PostgreSQL
psql -U postgres

# 在 psql 提示符下
CREATE DATABASE bulletin_dev;
CREATE USER bulletin WITH PASSWORD 'bulletin';
GRANT ALL PRIVILEGES ON DATABASE bulletin_dev TO bulletin;
\q
```

#### 3. 执行 Schema 创建脚本

```bash
cd /path/to/shiwan-ceramics
psql -U bulletin -d bulletin_dev -f docs/create-schema-only.sql
```

### Schema 结构说明

创建的 4 个表：

1. **categories** - 分类表（人物像、动物、器皿等）
2. **masters** - 陶艺大师表（刘泽棉、黄松坚等）
3. **products** - 产品表（陶瓷公仔作品）
4. **blogs** - 博客文章表

所有表都已包含示例数据，可以直接用于开发和测试。

---

## 🔮 Supabase 设置（可选）

> Supabase 是一个 Firebase 的开源替代方案，提供 PostgreSQL + 认证 + 存储 + API。

### 1. 创建 Supabase 项目

1. 访问 https://supabase.com
2. 创建账户并登录
3. 点击 "New Project"
4. 填写项目信息：
   - Name: `shiwan-ceramics`
   - Database Password: （选择一个强密码）
   - Region: 选择最近的区域

### 2. 获取数据库连接信息

在 Supabase 项目仪表板中：

1. 进入 Settings → Database
2. 复制以下信息：
   - Host: `[project-id].supabase.co`
   - Port: `5432`
   - User: `postgres`
   - Password: （你在步骤1设置的密码）
   - Database Name: `postgres`

### 3. 创建 Schema 和表

在 Supabase SQL Editor 中执行：

```sql
-- 创建 schema
CREATE SCHEMA shiwan_ceramics;

-- 创建表（执行 docs/create-schema-only.sql 的内容）
```

### 4. 配置环境变量

更新 `.env.local`：

```env
POSTGRES_HOST=[project-id].supabase.co
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=[your-database-password]
POSTGRES_DB=postgres
POSTGRES_SCHEMA=shiwan_ceramics
```

---

## ✅ 验证和测试

### 1. 验证数据库连接

#### 方法 A: 使用 psql

```bash
# OrbStack PostgreSQL
psql -h localhost -p 5433 -U bulletin -d bulletin_dev

# 本地 PostgreSQL
psql -U bulletin -d bulletin_dev

# Supabase
psql -h [project-id].supabase.co -p 5432 -U postgres -d postgres
```

#### 方法 B: 查看表结构

```sql
-- 查看 schema
\dn shiwan_ceramics

-- 查看所有表
\dt shiwan_ceramics.*

-- 查看分类数据
SELECT * FROM shiwan_ceramics.categories;

-- 退出
\q
```

### 2. 测试应用连接

```bash
cd frontend
node test-db.js
```

预期输出：

```
🔌 正在连接数据库...
✅ 数据库连接成功！
✅ Schema 访问成功！
   分类数量: 3
   大师数量: 2
   产品数量: 2
   博客数量: 2
```

### 3. 启动开发服务器

```bash
cd frontend
npm run dev
```

访问：**http://localhost:3000/zh/**

### 4. 测试关键功能

- [ ] 首页加载正常
- [ ] 产品列表显示正常
- [ ] 产品详情页打开正常
- [ ] 博客列表显示正常
- [ ] 语言切换正常
- [ ] 联系表单可以打开

---

## ❓ 常见问题

### Q1: 提示 "psql: command not found"

**A**: PostgreSQL 未安装或不在 PATH 中。

```bash
# macOS
brew install postgresql@16

# Ubuntu/Debian
sudo apt install postgresql-16
```

### Q2: 提示 "connection refused"

**A**: PostgreSQL 服务未启动或端口不对。

```bash
# 检查 PostgreSQL 是否运行
ps aux | grep postgres
# 或
docker ps | grep postgres  # OrbStack

# 检查端口
netstat -an | grep 5433

# 启动服务
brew services start postgresql@16  # macOS
# 或
sudo systemctl start postgresql  # Linux
```

### Q3: 提示 "authentication failed"

**A**: 用户名或密码错误。

检查 `.env.local` 配置是否正确。对于 OrbStack，默认用户是 `postgres`，密码也是 `postgres`。

### Q4: OrbStack 连接失败

**A**: 必须使用 `-h localhost` 参数。

```bash
# ✅ 正确
psql -h localhost -p 5433 -U postgres -d bulletin_dev

# ❌ 错误（缺少 -h localhost）
psql -p 5433 -U postgres -d bulletin_dev
```

### Q5: 提示 "schema already exists"

**A**: Schema 已经创建过，可以直接跳过。或删除重建：

```sql
DROP SCHEMA IF EXISTS shiwan_ceramics CASCADE;
```

然后重新执行创建脚本。

### Q6: Node.js 版本不兼容

**A**: 确保使用 Node.js 18.x 或 20.x LTS。

```bash
node --version  # 应该显示 v18.x.x 或 v20.x.x

# 如果版本不对，使用 nvm 安装
nvm install 20
nvm use 20
```

### Q7: npm install 失败

**A**: 尝试清理缓存并重新安装。

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

---

## 📊 数据库管理工具（推荐）

### 命令行工具

```bash
# 连接数据库
psql -h localhost -p 5433 -U bulletin -d bulletin_dev

# 常用命令
\l                          # 列出所有数据库
\dt shiwan_ceramics.*       # 列出 shiwan_ceramics schema 的所有表
\d shiwan_ceramics.products # 查看 products 表结构
\q                          # 退出
```

### 图形界面工具（可选）

1. **pgAdmin** - PostgreSQL 官方图形界面
   - 下载: https://www.pgadmin.org/download/
   - 免费开源

2. **DBeaver** - 通用数据库工具
   - 下载: https://dbeaver.io/download/
   - 支持多种数据库

3. **TablePlus** - macOS 数据库工具
   - 下载: https://tableplus.com/
   - 界面简洁美观

---

## 🔄 数据备份和恢复

### 备份数据库

```bash
pg_dump -h localhost -p 5433 -U bulletin -d bulletin_dev > backup.sql
```

### 恢复数据库

```bash
psql -h localhost -p 5433 -U bulletin -d bulletin_dev < backup.sql
```

---

## 📚 相关文档

- **需求文档**: `docs/feature/shiwan-ceramics-ecommerce/REQUIREMENTS.md`
- **架构设计**: `docs/feature/shiwan-ceramics-ecommerce/ARCHITECTURE.md`
- **实施计划**: `docs/feature/shiwan-ceramics-ecommerce/IMPLEMENT_PLAN.md`
- **快速开始**: `QUICK_START.md`
- **项目主文档**: `README.md`

---

## 🆘 需要帮助？

如果遇到其他问题：

1. 检查 PostgreSQL 日志（如有错误）
2. 确认环境变量配置正确：`frontend/.env.local`
3. 查看 [常见问题](#常见问题) 章节
4. 查看项目文档目录：`docs/`
