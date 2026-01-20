# 🚀 石湾陶瓷公仔项目 - 数据库设置快速指南

## 📋 当前配置

- **数据库名**: `bulletin`（已存在）
- **Schema 名**: `shiwan_ceramics`（待创建）
- **用户**: `bulletin`
- **端口**: 5432
- **密码**: bulletin

## ⚡ 请在您的终端中执行以下命令

### 步骤 1: 创建 Schema（必需）

```bash
cd /Users/yuanyuan/Desktop/MyProject/global_saling-claude-agile-skill/shiwan-ceramics
psql -U bulletin -d bulletin -f docs/create-schema-only.sql
```

如果提示输入密码，输入：`bulletin`

### 步骤 2: 验证安装（可选但推荐）

```bash
# 查看 schema
psql -U bulletin -d bulletin -c "\dn shiwan_ceramics"

# 查看所有表（应该看到 4 个表）
psql -U bulletin -d bulletin -c "\dt shiwan_ceramics.*"

# 查看示例数据
psql -U bulletin -d bulletin -c "SELECT name_zh, name_en FROM shiwan_ceramics.categories;"
```

### 步骤 3: 测试应用连接

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

### 步骤 4: 启动开发服务器

```bash
cd frontend
npm run dev
```

### 步骤 5: 访问应用

打开浏览器访问：**http://localhost:3000/zh/**

---

## ❓ 常见问题

### Q: 提示 "psql: command not found"
**A**: PostgreSQL 未安装或不在 PATH 中。请确保已安装 PostgreSQL：
```bash
brew install postgresql@16
```

### Q: 提示 "connection refused"
**A**: PostgreSQL 服务未启动：
```bash
brew services start postgresql@16
# 或
brew services list | grep postgres
```

### Q: 提示 "authentication failed" 或要求密码
**A**: 创建 `.pgpass` 文件以避免每次输入密码：
```bash
echo "localhost:5432:bulletin:bulletin:bulletin" > ~/.pgpass
chmod 600 ~/.pgpass
```

### Q: 端口不是 5432
**A**: 检查您的 PostgreSQL 端口：
```bash
# 查看 PostgreSQL 监听的端口
psql -U bulletin -d bulletin -c "SHOW port;"

# 如果是其他端口（如 5433），修改 frontend/.env.local:
# POSTGRES_PORT=5433
```

### Q: 提示 "schema already exists"
**A**: Schema 已创建，可以直接跳到步骤 3 测试连接。或者删除重建：
```bash
psql -U bulletin -d bulletin -c "DROP SCHEMA IF EXISTS shiwan_ceramics CASCADE;"
# 然后重新执行步骤 1
```

---

## 📊 Schema 结构说明

创建的 4 个表：

1. **categories** - 分类表（人物像、动物、器皿等）
2. **masters** - 陶艺大师表（刘泽棉、黄松坚等）
3. **products** - 产品表（陶瓷公仔作品）
4. **blogs** - 博客文章表

所有表都已包含示例数据，可以直接用于开发和测试。

---

## 🎯 完成后下一步

数据库设置完成后：

1. ✅ 验证数据库连接成功
2. ✅ 启动开发服务器
3. ✅ 开始 **Epic 2: 产品展示页面开发**

---

## 📞 需要帮助？

如果遇到其他问题：

1. 查看详细设置指南：`docs/SCHEMA_SETUP.md`
2. 查看 PostgreSQL 设置指南：`docs/POSTGRESQL_SETUP.md`
3. 检查 PostgreSQL 日志（如有错误）
4. 确认环境变量配置正确：`frontend/.env.local`
