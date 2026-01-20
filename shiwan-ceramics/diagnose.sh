#!/bin/bash

echo "🔍 石湾陶瓷应用诊断工具"
echo "========================"
echo ""

# 1. 检查开发服务器
echo "1️⃣  检查开发服务器..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "   ✅ 开发服务器正在运行"
else
    echo "   ❌ 开发服务器未运行"
    echo "   请运行: cd frontend && npm run dev"
    exit 1
fi

# 2. 检查数据库连接
echo ""
echo "2️⃣  检查 PostgreSQL 数据库..."
if psql -h localhost -p 5433 -U bulletin -d bulletin_dev -c "SELECT 1;" > /dev/null 2>&1; then
    echo "   ✅ PostgreSQL 可连接"

    # 检查 schema
    SCHEMA_CHECK=$(psql -h localhost -p 5433 -U bulletin -d bulletin_dev -t -c "SELECT COUNT(*) FROM information_schema.schemata WHERE schema_name = 'shiwan_ceramics';" 2>&1 | tr -d ' ')
    if [ "$SCHEMA_CHECK" = "1" ]; then
        echo "   ✅ shiwan_ceramics schema 存在"
    else
        echo "   ❌ shiwan_ceramics schema 不存在"
    fi
else
    echo "   ❌ PostgreSQL 不可连接"
    echo "   请检查 OrbStack 或本地 PostgreSQL 是否运行"
fi

# 3. 检查页面可访问性
echo ""
echo "3️⃣  检查页面可访问性..."
PAGES=(
    "/zh"
    "/zh/products"
    "/zh/blog"
    "/zh/about"
    "/zh/contact"
)

for page in "${PAGES[@]}"; do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$page")
    if [ "$STATUS" = "200" ]; then
        echo "   ✅ $page - HTTP $STATUS"
    else
        echo "   ❌ $page - HTTP $STATUS"
    fi
done

# 4. 检查环境变量
echo ""
echo "4️⃣  检查环境变量配置..."
cd frontend
if [ -f .env.local ]; then
    echo "   ✅ .env.local 文件存在"

    if grep -q "POSTGRES_HOST" .env.local; then
        echo "   ✅ POSTGRES_HOST 已配置"
    else
        echo "   ⚠️  POSTGRES_HOST 未配置（将使用默认值）"
    fi
else
    echo "   ⚠️  .env.local 文件不存在（将使用默认配置）"
fi

echo ""
echo "========================"
echo "✅ 诊断完成"
echo ""
echo "💡 如果页面无法访问，请检查："
echo "   1. 开发服务器是否正在运行"
echo "   2. 浏览器控制台是否有错误信息"
echo "   3. 数据库连接是否正常"
