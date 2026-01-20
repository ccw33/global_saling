# 🚀 石湾陶瓷公仔项目 - 数据库设置最终指南

## 当前配置
- **端口**: 5433
- **数据库**: bulletin（已存在）
- **用户**: bulletin（需要创建）
- **Schema**: shiwan_ceramics（需要创建）
- **密码**: bulletin

---

## 完整设置步骤（按顺序执行）

### 步骤 1: 创建 bulletin 用户

```bash
psql -d postgres -p 5433
```

在 `postgres=#` 提示符下执行：

```sql
CREATE USER bulletin WITH PASSWORD 'bulletin';
GRANT ALL PRIVILEGES ON DATABASE bulletin TO bulletin;
\q
```

### 步骤 2: 创建 schema 和表

```bash
cd /Users/yuanyuan/Desktop/MyProject/global_saling-claude-agile-skill/shiwan-ceramics
PGPASSWORD='bulletin' psql -U bulletin -d bulletin -p 5433 -f docs/create-schema-only.sql
```

预期输出：
```
NOTICE:  Schema: shiwan_ceramics created successfully!
...
 categories
    3
...
```

### 步骤 3: 验证安装

```bash
PGPASSWORD='bulletin' psql -U bulletin -d bulletin -p 5433 -c "\dt shiwan_ceramics.*"
```

应该看到 4 个表：
- categories
- masters
- products
- blogs

### 步骤 4: 测试应用连接

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

### 步骤 5: 启动开发服务器

```bash
npm run dev
```

### 步骤 6: 访问应用

打开浏览器访问：**http://localhost:3000/zh/**

---

## 常见错误和解决方案

### 错误 1: "role 'bulletin' does not exist"
**原因**: bulletin 用户尚未创建
**解决**: 执行步骤 1 创建用户

### 错误 2: "connection refused"
**原因**: PostgreSQL 未启动或端口错误
**解决**:
```bash
# 检查 PostgreSQL 状态
brew services list | grep postgres

# 如果未启动，启动它
brew services start postgresql@16

# 检查端口
psql -d postgres -p 5433 -c "SHOW port;"
```

### 错误 3: "authentication failed"
**原因**: 密码错误或认证方法问题
**解决**: 创建 .pgpass 文件
```bash
echo "localhost:5433:bulletin:bulletin:bulletin" > ~/.pgpass
chmod 600 ~/.pgpass
```

### 错误 4: "database 'bulletin' does not exist"
**原因**: bulletin 数据库不存在
**解决**:
```bash
psql -d postgres -p 5433 -c "CREATE DATABASE bulletin;"
```

### 错误 5: "schema already exists"
**原因**: shiwan_ceramics schema 已存在
**解决**: 删除后重建（可选）
```bash
PGPASSWORD='bulletin' psql -U bulletin -d bulletin -p 5433 -c "DROP SCHEMA IF EXISTS shiwan_ceramics CASCADE;"
# 然后重新执行步骤 2
```

---

## 快速重置脚本

如果需要重新开始，可以删除并重建：

```bash
# 删除 schema
PGPASSWORD='bulletin' psql -U bulletin -d bulletin -p 5433 -c "DROP SCHEMA IF EXISTS shiwan_ceramics CASCADE;"

# 重建
PGPASSWORD='bulletin' psql -U bulletin -d bulletin -p 5433 -f docs/create-schema-only.sql
```

---

## 验证清单

执行完所有步骤后，确认以下内容：

- [ ] bulletin 用户已创建
- [ ] bulletin 数据库存在
- [ ] shiwan_ceramics schema 已创建
- [ ] 4 个表已创建（categories, masters, products, blogs）
- [ ] 示例数据已插入
- [ ] node test-db.js 测试通过
- [ ] npm run dev 启动成功
- [ ] 可以访问 http://localhost:3000/zh/

---

## 下一步

完成数据库设置后：
1. ✅ Epic 1 完成！
2. 🎯 开始 Epic 2: 产品展示页面开发

---

## 需要帮助？

如果遇到问题：
1. 查看快速开始指南：`QUICK_START.md`
2. 查看详细设置：`docs/SCHEMA_SETUP.md`
3. 查看 PostgreSQL 设置：`docs/POSTGRESQL_SETUP.md`
4. 检查环境变量：`frontend/.env.local`
