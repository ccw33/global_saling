# PostgreSQL 数据库设置指南

本指南将帮助您设置本地 PostgreSQL 数据库并初始化石湾陶瓷公仔项目所需的数据库结构。

## ⚠️ 快速开始（如果数据库不存在）

如果您还没有创建数据库，请按照以下步骤操作：

```bash
# 1. 以 postgres 超级用户身份连接
psql -h localhost -p 5433 -U postgres

# 2. 创建数据库和用户
CREATE DATABASE bulletin;
CREATE USER bulletin WITH PASSWORD 'bulletin';
GRANT ALL PRIVILEGES ON DATABASE bulletin TO bulletin;

# 3. 退出
\q

# 4. 执行初始化脚本
cd /Users/yuanyuan/Desktop/MyProject/global_saling-claude-agile-skill/shiwan-ceramics
psql -h localhost -p 5433 -U bulletin -d bulletin -f docs/create-schema.sql
```

## 前提条件

### 1. 确认 PostgreSQL 正在运行

首先确认您的 PostgreSQL 服务正在端口 5433 上运行：

```bash
# 检查 PostgreSQL 进程
ps aux | grep postgres

# 或者尝试连接
psql -h localhost -p 5433 -U postgres
```

如果连接成功，您应该看到 PostgreSQL 提示符：
```
postgres=>
```

### 2. 创建数据库和用户（如果不存在）

如果 `bulletin` 数据库和用户不存在，请使用 `postgres` 超级用户创建：

```bash
# 以 postgres 超级用户身份连接
psql -h localhost -p 5433 -U postgres

# 创建数据库和用户
CREATE DATABASE bulletin;
CREATE USER bulletin WITH PASSWORD 'bulletin';
GRANT ALL PRIVILEGES ON DATABASE bulletin TO bulletin;

# 退出
\q
```

## 执行数据库初始化脚本

### 方法 1: 使用 psql 命令行

```bash
cd /Users/yuanyuan/Desktop/MyProject/global_saling-claude-agile-skill/shiwan-ceramics

# 执行初始化脚本
psql -h localhost -p 5433 -U bulletin -d bulletin -f docs/create-schema.sql
```

### 方法 2: 使用 psql 交互式

```bash
# 连接到数据库
psql -h localhost -p 5433 -U bulletin -d bulletin

# 在 psql 提示符下执行
\i docs/create-schema.sql

# 或者复制粘贴 SQL 内容
```

## 验证安装

执行脚本后，您应该看到三个验证查询的结果。验证是否成功：

```sql
-- 查看 schema
\dn shiwan_ceramics

-- 查看表
\dt shiwan_ceramics.*

-- 查看分类数据
SELECT * FROM shiwan_ceramics.categories;

-- 查看大师数据
SELECT * FROM shiwan_ceramics.masters;

-- 查看产品数据
SELECT * FROM shiwan_ceramics.products;
```

预期结果：
- ✅ Schema `shiwan_ceramics` 已创建
- ✅ 4 个表：categories, masters, products, blogs
- ✅ 每个表都有示例数据

## 测试 Next.js 连接

### 1. 确认环境变量配置

检查 `frontend/.env.local` 文件：

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USER=bulletin
POSTGRES_PASSWORD=bulletin
POSTGRES_DB=bulletin
POSTGRES_SCHEMA=shiwan_ceramics
```

### 2. 创建测试脚本

创建临时测试文件 `frontend/test-db.js`：

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'bulletin',
  password: 'bulletin',
  database: 'bulletin',
});

async function testConnection() {
  try {
    console.log('🔌 正在连接数据库...');
    const res = await pool.query('SELECT NOW()');
    console.log('✅ 数据库连接成功！');
    console.log('   服务器时间:', res.rows[0].now);

    const res2 = await pool.query('SELECT COUNT(*) FROM shiwan_ceramics.categories');
    console.log('✅ Schema 访问成功！');
    console.log('   分类数量:', res2.rows[0].count);

    await pool.end();
    console.log('✅ 测试完成！');
  } catch (err) {
    console.error('❌ 连接失败:', err.message);
    process.exit(1);
  }
}

testConnection();
```

### 3. 运行测试

```bash
cd frontend
node test-db.js
```

如果看到 `✅ 测试完成！`，说明数据库配置正确。

### 4. 删除测试文件

```bash
rm frontend/test-db.js
```

## 常见问题

### 问题 1: 连接被拒绝

```
error: connection refused
```

**解决方案**:
- 检查 PostgreSQL 是否运行：`ps aux | grep postgres`
- 检查端口是否正确：`netstat -an | grep 5433`
- 检查防火墙设置

### 问题 2: 认证失败

```
error: password authentication failed
```

**解决方案**:
- 确认用户名和密码正确
- 检查 `pg_hba.conf` 文件的认证配置
- 可能需要重启 PostgreSQL 服务

### 问题 3: 权限不足

```
ERROR: permission denied for schema shiwan_ceramics
```

**解决方案**:
```sql
-- 以 postgres 超级用户身份连接
psql -h localhost -p 5433 -U postgres -d bulletin

-- 重新授权
GRANT USAGE ON SCHEMA shiwan_ceramics TO bulletin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA shiwan_ceramics TO bulletin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA shiwan_ceramics TO bulletin;
```

### 问题 4: Schema 不存在

```
ERROR: schema "shiwan_ceramics" does not exist
```

**解决方案**:
- 确认已执行 `create-schema.sql` 脚本
- 重新执行脚本：`psql -h localhost -p 5433 -U bulletin -d bulletin -f docs/create-schema.sql`

## 下一步

数据库设置完成后：

1. ✅ 确认测试脚本运行成功
2. ✅ 启动 Next.js 开发服务器：`cd frontend && npm run dev`
3. ✅ 访问 http://localhost:3000 确认应用正常运行
4. ✅ 继续开发 Epic 2: 产品展示页面

## 数据库管理工具（推荐）

### 命令行工具
```bash
# 连接数据库
psql -h localhost -p 5433 -U bulletin -d bulletin

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

## 数据备份和恢复

### 备份数据库

```bash
pg_dump -h localhost -p 5433 -U bulletin -d bulletin > backup.sql
```

### 恢复数据库

```bash
psql -h localhost -p 5433 -U bulletin -d bulletin < backup.sql
```

## 需要帮助？

如果遇到问题：
1. 检查 PostgreSQL 日志：`/usr/local/var/log/postgresql@5433.log` (macOS)
2. 确认防火墙设置
3. 检查环境变量配置
4. 查看项目文档：`docs/feature/shiwan-ceramics-ecommerce/ARCHITECTURE.md`
