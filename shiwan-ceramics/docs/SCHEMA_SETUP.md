# 数据库 Schema 设置指南

本项目使用现有的 `bulletin` 数据库，并在其中创建专用的 `shiwan_ceramics` schema。

## Schema 信息

- **Schema 名称**: `shiwan_ceramics`
- **所在数据库**: `bulletin`
- **数据库用户**: `bulletin`
- **端口**: 5432（PostgreSQL 默认端口）

## 快速设置

### 方法 1: 使用自动化脚本（推荐）

```bash
cd /Users/yuanyuan/Desktop/MyProject/global_saling-claude-agile-skill/shiwan-ceramics
chmod +x setup-schema.sh
./setup-schema.sh
```

### 方法 2: 手动执行 SQL

```bash
# 执行 schema 创建脚本
psql -U bulletin -d bulletin -f docs/create-schema-only.sql
```

## 验证安装

### 1. 检查 schema 是否创建成功
```bash
psql -U bulletin -d bulletin -c "\dn shiwan_ceramics"
```

### 2. 查看所有表
```bash
psql -U bulletin -d bulletin -c "\dt shiwan_ceramics.*"
```

应该看到 4 个表：
- `categories` - 分类表
- `masters` - 大师表
- `products` - 产品表
- `blogs` - 博客表

### 3. 查看示例数据
```bash
psql -U bulletin -d bulletin -c "SELECT * FROM shiwan_ceramics.categories;"
psql -U bulletin -d bulletin -c "SELECT * FROM shiwan_ceramics.masters;"
psql -U bulletin -d bulletin -c "SELECT * FROM shiwan_ceramics.products LIMIT 2;"
```

## 测试应用连接

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

## 启动开发服务器

```bash
cd frontend
npm run dev
```

访问：http://localhost:3000/zh/

## Schema 结构说明

### 表关系

```
shiwan_ceramics.categories (分类)
    ↑
    | (1:N)
    |
shiwan_ceramics.products (产品) ← shiwan_ceramics.masters (大师)
                                        (1:N)

shiwan_ceramics.blogs (博客) - 独立表
```

### 权限设置

Schema 使用 `bulletin` 用户访问，具有以下权限：
- `USAGE` on schema
- `ALL PRIVILEGES` on all tables
- `ALL PRIVILEGES` on all sequences

## 常见问题

### Q: 如何删除 schema？
```bash
psql -U bulletin -d bulletin -c "DROP SCHEMA IF EXISTS shiwan_ceramics CASCADE;"
```

### Q: 如何清空所有数据但保留表结构？
```bash
psql -U bulletin -d bulletin << EOF
TRUNCATE TABLE shiwan_ceramics.blogs CASCADE;
TRUNCATE TABLE shiwan_ceramics.products CASCADE;
TRUNCATE TABLE shiwan_ceramics.masters CASCADE;
TRUNCATE TABLE shiwan_ceramics.categories CASCADE;
EOF
```

### Q: 如何重置示例数据？
```bash
psql -U bulletin -d bulletin -f docs/create-schema-only.sql
```

### Q: 连接失败怎么办？
1. 检查 PostgreSQL 是否运行：`brew services list | grep postgres`
2. 检查端口是否正确（默认 5432）：`psql -U bulletin -d bulletin -c "SELECT version();"`
3. 检查密码：确保 `.env.local` 中的密码正确

## 数据库管理工具

### 命令行
```bash
# 连接到数据库
psql -U bulletin -d bulletin

# 在 psql 中执行
\dt shiwan_ceramics.*          # 查看所有表
\d shiwan_ceramics.products    # 查看表结构
SELECT * FROM shiwan_ceramics.categories;  # 查询数据
\q                             # 退出
```

### 推荐的图形界面工具
- **pgAdmin** - 免费，PostgreSQL 官方工具
- **DBeaver** - 免费，支持多种数据库
- **TablePlus** - macOS，界面简洁美观

## 下一步

Schema 设置完成后：
1. ✅ 测试数据库连接
2. ✅ 启动开发服务器
3. ✅ 开始开发 Epic 2: 产品展示页面
