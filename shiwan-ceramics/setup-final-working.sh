#!/bin/bash

# 石湾陶瓷公仔项目 - 最终正确设置脚本
# 使用 bulletin_dev 数据库

set -e

echo "🚀 石湾陶瓷公仔项目 - 数据库设置"
echo ""
echo "✅ 最终正确配置:"
echo "  - 主机: localhost"
echo "  - 端口: 5433 (OrbStack)"
echo "  - 用户: bulletin"
echo "  - 密码: bulletin"
echo "  - 数据库: bulletin_dev"
echo "  - Schema: shiwan_ceramics"
echo ""

# 步骤 1: 创建 shiwan_ceramics schema
echo "📝 步骤 1/3: 创建 shiwan_ceramics schema..."
PGPASSWORD='bulletin' psql -h localhost -p 5433 -U bulletin -d bulletin_dev -f docs/create-schema-only.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema 创建成功！"
else
    echo "❌ Schema 创建失败"
    exit 1
fi

echo ""

# 步骤 2: 验证安装
echo "📝 步骤 2/3: 验证安装..."
PGPASSWORD='bulletin' psql -h localhost -p 5433 -U bulletin -d bulletin_dev -c "\dt shiwan_ceramics.*"

echo ""

# 步骤 3: 测试应用连接
echo "📝 步骤 3/3: 测试应用连接..."
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
    echo "  POSTGRES_DB=bulletin_dev"
    echo "  POSTGRES_SCHEMA=shiwan_ceramics"
    echo ""
    echo "下一步:"
    echo "  npm run dev"
    echo ""
    echo "然后访问: http://localhost:3000/zh/"
    echo ""
    echo "✅ Epic 1 完成！准备开始 Epic 2: 产品展示页面"
else
    echo "❌ 数据库连接测试失败"
    exit 1
fi
