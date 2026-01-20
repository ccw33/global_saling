#!/bin/bash

# 石湾陶瓷公仔项目 - 最终设置脚本
# 使用正确的配置：端口 5432，用户 yuanyuan

set -e

echo "🚀 石湾陶瓷公仔项目 - 数据库设置"
echo ""
echo "配置信息:"
echo "  - 端口: 5432"
echo "  - 用户: yuanyuan"
echo "  - 数据库: bulletin"
echo "  - Schema: shiwan_ceramics"
echo ""

# 步骤 1: 创建 schema
echo "📝 步骤 1/3: 创建 shiwan_ceramics schema..."
psql -d bulletin -p 5432 -f docs/create-schema-only.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema 创建成功！"
else
    echo "❌ Schema 创建失败"
    exit 1
fi

echo ""

# 步骤 2: 验证安装
echo "📝 步骤 2/3: 验证安装..."
psql -d bulletin -p 5432 -c "\dt shiwan_ceramics.*"

echo ""

# 步骤 3: 测试应用连接
echo "📝 步骤 3/3: 测试应用连接..."
cd frontend
node test-db.js

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 所有设置完成！"
    echo ""
    echo "下一步："
    echo "  npm run dev"
    echo ""
    echo "然后访问: http://localhost:3000/zh/"
else
    echo "❌ 数据库连接测试失败"
    exit 1
fi
