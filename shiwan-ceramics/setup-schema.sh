#!/bin/bash

# 石湾陶瓷公仔项目 - Schema 初始化脚本
# 在现有 bulletin 数据库中创建 shiwan_ceramics schema

set -e

echo "🚀 开始初始化 shiwan_ceramics schema..."
echo "📝 这将在现有的 bulletin 数据库中创建 schema"
echo ""

# 检查 schema 是否已存在
echo "📝 检查 schema 是否已存在..."
EXISTING=$(psql -U bulletin -d bulletin -tAc "SELECT 1 FROM information_schema.schemata WHERE schema_name='shiwan_ceramics'" 2>/dev/null || echo "")

if [ "$EXISTING" = "1" ]; then
    echo "⚠️  Schema 'shiwan_ceramics' 已存在"
    read -p "是否删除并重新创建? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📝 删除现有 schema..."
        psql -U bulletin -d bulletin -c "DROP SCHEMA IF EXISTS shiwan_ceramics CASCADE;"
        echo "✅ 已删除现有 schema"
    else
        echo "❌ 取消操作"
        exit 1
    fi
fi

# 执行 schema 创建脚本
echo "📝 执行 schema 创建脚本..."
psql -U bulletin -d bulletin -f docs/create-schema-only.sql

echo ""
echo "✅ Schema 初始化完成！"
echo ""
echo "📊 验证安装..."
psql -U bulletin -d bulletin -c "\dt shiwan_ceramics.*"

echo ""
echo "📝 下一步："
echo "  1. 测试数据库连接: cd frontend && node test-db.js"
echo "  2. 启动开发服务器: cd frontend && npm run dev"
echo ""
