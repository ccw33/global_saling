#!/bin/bash

# 石湾陶瓷公仔项目 - 一键设置脚本
# 在现有 bulletin 数据库中创建 shiwan_ceramics schema

echo "🚀 开始设置石湾陶瓷公仔项目数据库..."
echo ""

# 步骤 1: 创建 schema
echo "📝 步骤 1/3: 创建 shiwan_ceramics schema..."
psql -U bulletin -d bulletin -f docs/create-schema-only.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema 创建成功！"
else
    echo "❌ Schema 创建失败"
    exit 1
fi

echo ""

# 步骤 2: 验证安装
echo "📝 步骤 2/3: 验证安装..."
psql -U bulletin -d bulletin -c "\dt shiwan_ceramics.*"

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
    echo "  cd frontend"
    echo "  npm run dev"
    echo ""
    echo "然后访问: http://localhost:3000/zh/"
else
    echo "❌ 数据库连接测试失败"
    exit 1
fi
