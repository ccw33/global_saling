# 石湾陶瓷公仔项目 - 快速开始

> **项目状态**: Epic 1-3 已完成，目前完成度约 70%

---

## 🚀 快速启动（3 步）

### 1. 安装依赖

```bash
cd frontend
npm install
```

### 2. 配置数据库

如果数据库已设置，直接跳到步骤 3。

```bash
# 复制环境变量文件
cp .env.local.example .env.local

# 编辑 .env.local 配置数据库连接
# 详见: docs/SETUP.md
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问：**http://localhost:3000/zh/**

---

## 📋 数据库快速设置

### 使用 OrbStack PostgreSQL（推荐）

```bash
# 1. 启动 PostgreSQL 容器（如果还没有）
docker run -d \
  --name postgres-dev \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=bulletin_dev \
  -p 5433:5432 \
  postgres:16

# 2. 创建数据库和用户
psql -h localhost -p 5433 -U postgres -d postgres -c "
CREATE DATABASE bulletin_dev;
CREATE USER bulletin WITH PASSWORD 'bulletin';
GRANT ALL PRIVILEGES ON DATABASE bulletin_dev TO bulletin;
"

# 3. 执行 Schema 创建脚本
cd ..
psql -h localhost -p 5433 -U bulletin -d bulletin_dev -f docs/create-schema-only.sql
```

**详细设置指南**: 查看 `docs/SETUP.md`

---

## ✅ 验证安装

```bash
# 测试数据库连接
cd frontend
node test-db.js

# 预期输出:
# ✅ 数据库连接成功！
# ✅ Schema 访问成功！
```

---

## 📊 项目进度

| Epic | 名称 | 状态 |
|------|------|------|
| Epic 1 | 项目初始化 | ✅ 完成 |
| Epic 2 | 产品展示页面 | ✅ 完成 |
| Epic 3 | 博客模块 | ✅ 完成 |
| Epic 4 | 多语言和货币 | 🚧 部分完成 |
| Epic 5 | 联系表单 | 🚧 部分完成 |
| Epic 6 | SEO 优化 | ⏳ 待开始 |
| Epic 7 | 部署上线 | ⏳ 待开始 |

**详细进度**: 查看 `docs/feature/shiwan-ceramics-ecommerce/IMPLEMENT_PLAN.md`

---

## 🛠️ 开发命令

```bash
# 启动开发服务器
npm run dev

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 运行测试（如果有）
npm test
```

---

## 📚 重要文档

- **详细设置指南**: `docs/SETUP.md` ⭐️
- **实施计划**: `docs/feature/shiwan-ceramics-ecommerce/IMPLEMENT_PLAN.md`
- **需求文档**: `docs/feature/shiwan-ceramics-ecommerce/REQUIREMENTS.md`
- **架构设计**: `docs/feature/shiwan-ceramics-ecommerce/ARCHITECTURE.md`
- **项目主文档**: `README.md`

---

## ❓ 常见问题

### Q: 数据库连接失败
**A**: 查看 `docs/SETUP.md` 的"常见问题"章节

### Q: 端口被占用
**A**: 修改 `frontend/next.config.js` 中的端口配置

### Q: 依赖安装失败
**A**: 尝试 `rm -rf node_modules package-lock.json && npm install`

---

## 🎯 下一步

数据库设置完成后：

1. ✅ 验证数据库连接成功
2. ✅ 启动开发服务器
3. ✅ 继续开发 Epic 4: 多语言和货币功能

---

**祝开发顺利！🚀**
