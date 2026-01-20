#!/bin/bash

# OrbStack PostgreSQL 完整设置脚本
# 必须使用 -h localhost 进行 TCP 连接

set -e

echo "🚀 石湾陶瓷公仔项目 - OrbStack PostgreSQL 设置"
echo ""
echo "配置信息:"
echo "  - 端口: 5433 (OrbStack 映射)"
echo "  - 连接方式: TCP/IP (必须使用 -h localhost)"
echo "  - 用户: postgres"
echo "  - 数据库: bulletin"
echo "  - Schema: shiwan_ceramics"
echo ""

# 步骤 1: 测试连接
echo "📝 步骤 1/5: 测试 OrbStack PostgreSQL 连接..."
if psql -h localhost -p 5433 -U postgres -d postgres -c "SELECT version();" > /dev/null 2>&1; then
    echo "✅ 连接成功！"
else
    echo "❌ 连接失败"
    echo ""
    echo "请检查:"
    echo "1. OrbStack PostgreSQL 容器是否运行"
    echo "2. 端口映射是否正确 (5432 -> 5433)"
    echo "3. 运行: docker ps | grep postgres"
    exit 1
fi

echo ""

# 步骤 2: 创建 bulletin 数据库
echo "📝 步骤 2/5: 创建 bulletin 数据库..."
psql -h localhost -p 5433 -U postgres -d postgres -c "CREATE DATABASE bulletin;" 2>/dev/null || echo "数据库可能已存在"

# 授权
psql -h localhost -p 5433 -U postgres -d postgres << 'EOF'
-- 授予 postgres 用户所有权限
GRANT ALL PRIVILEGES ON DATABASE bulletin TO postgres;

-- 连接到 bulletin 数据库并授予 schema 权限
\c bulletin
GRANT ALL ON SCHEMA public TO postgres;
EOF

echo "✅ 数据库创建完成"
echo ""

# 步骤 3: 创建 shiwan_ceramics schema
echo "📝 步骤 3/5: 创建 shiwan_ceramics schema..."
psql -h localhost -p 5433 -U postgres -d bulletin -f docs/create-schema-only.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema 创建成功！"
else
    echo "❌ Schema 创建失败"
    exit 1
fi

echo ""

# 步骤 4: 验证安装
echo "📝 步骤 4/5: 验证安装..."
psql -h localhost -p 5433 -U postgres -d bulletin -c "\dt shiwan_ceramics.*"

echo ""

# 步骤 5: 更新 .env.local
echo "📝 步骤 5/5: 更新应用配置..."
cat > frontend/.env.local << 'ENVEOF'
# PostgreSQL Database Configuration
# OrbStack PostgreSQL

POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USER=postgres
POSTGRES_PASSWORD=
POSTGRES_DB=bulletin
POSTGRES_SCHEMA=shiwan_ceramics

NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENVEOF

echo "✅ 配置文件已更新"
echo ""

# 测试应用连接
echo "📝 测试应用连接..."
cd frontend
node test-db.js

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 所有设置完成！"
    echo ""
    echo "配置摘要:"
    echo "  - 主机: localhost:5433"
    echo "  - 用户: postgres"
    echo "  - 数据库: bulletin"
    echo "  - Schema: shiwan_ceramics"
    echo ""
    echo "下一步:"
    echo "  npm run dev"
    echo ""
    echo "然后访问: http://localhost:3000/zh/"
else
    echo "❌ 数据库连接测试失败"
    echo ""
    echo "请检查配置文件: frontend/.env.local"
    exit 1
fi
