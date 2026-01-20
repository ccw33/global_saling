#!/bin/bash

# 石湾陶瓷公仔项目 - 正确的设置脚本
# 使用正确的 OrbStack 配置：用户 bulletin，密码 bulletin，端口 5433

set -e

echo "🚀 石湾陶瓷公仔项目 - 数据库设置"
echo ""
echo "配置信息:"
echo "  - 主机: localhost"
echo "  - 端口: 5433 (OrbStack)"
echo "  - 用户: bulletin"
echo "  - 密码: bulletin"
echo "  - 数据库: bulletin"
echo "  - Schema: shiwan_ceramics"
echo ""

# 步骤 1: 测试连接
echo "📝 步骤 1/4: 测试数据库连接..."
if PGPASSWORD='bulletin' psql -h localhost -p 5433 -U bulletin -d postgres -c "SELECT version();" > /dev/null 2>&1; then
    echo "✅ 连接成功！"
else
    echo "❌ 连接失败，请检查 OrbStack 是否运行"
    exit 1
fi

echo ""

# 步骤 2: 创建 shiwan_ceramics schema
echo "📝 步骤 2/4: 创建 shiwan_ceramics schema..."
PGPASSWORD='bulletin' psql -h localhost -p 5433 -U bulletin -d bulletin -f docs/create-schema-only.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema 创建成功！"
else
    echo "❌ Schema 创建失败"
    exit 1
fi

echo ""

# 步骤 3: 验证安装
echo "📝 步骤 3/4: 验证安装..."
PGPASSWORD='bulletin' psql -h localhost -p 5433 -U bulletin -d bulletin -c "\dt shiwan_ceramics.*"

echo ""

# 步骤 4: 测试应用连接
echo "📝 步骤 4/4: 测试应用连接..."
cd frontend
node test-db.js

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 所有设置完成！"
    echo ""
    echo "配置摘要:"
    echo "  POSTGRES_HOST=localhost"
    echo "  POSTGRES_PORT=5433"
    echo "  POSTGRES_USER=bulletin"
    echo "  POSTGRES_PASSWORD=bulletin"
    echo "  POSTGRES_DB=bulletin"
    echo "  POSTGRES_SCHEMA=shiwan_ceramics"
    echo ""
    echo "下一步:"
    echo "  npm run dev"
    echo ""
    echo "然后访问: http://localhost:3000/zh/"
else
    echo "❌ 数据库连接测试失败"
    exit 1
fi
