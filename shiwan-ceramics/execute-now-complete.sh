#!/bin/bash

# 石湾陶瓷公仔项目 - 完整数据库设置脚本
# 创建用户、schema 和表

set -e

echo "🚀 石湾陶瓷公仔项目 - 数据库完整设置"
echo ""
echo "配置信息:"
echo "  - 端口: 5433"
echo "  - 数据库: bulletin"
echo "  - Schema: shiwan_ceramics"
echo "  - 用户: bulletin"
echo ""

# 步骤 1: 创建用户（需要 postgres 超级用户权限）
echo "📝 步骤 1/4: 创建 bulletin 用户..."
echo "需要 postgres 超级用户权限"

# 尝试创建用户
psql -d postgres -p 5433 << 'EOF' || echo "用户创建失败，可能已存在或权限不足"
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'bulletin') THEN
        CREATE USER bulletin WITH PASSWORD 'bulletin';
        RAISE NOTICE '用户 bulletin 创建成功';
    ELSE
        RAISE NOTICE '用户 bulletin 已存在';
    END IF;
END $$;
EOF

# 授予数据库权限
psql -d postgres -p 5433 -c "GRANT ALL PRIVILEGES ON DATABASE bulletin TO bulletin;" 2>/dev/null || echo "数据库权限授权失败（可能已完成）"

echo "✅ 用户设置完成"
echo ""

# 步骤 2: 创建 schema
echo "📝 步骤 2/4: 创建 shiwan_ceramics schema..."
PGPASSWORD='bulletin' psql -U bulletin -d bulletin -p 5433 -f docs/create-schema-only.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema 创建成功！"
else
    echo "❌ Schema 创建失败"
    exit 1
fi

echo ""

# 步骤 3: 验证安装
echo "📝 步骤 3/4: 验证安装..."
PGPASSWORD='bulletin' psql -U bulletin -d bulletin -p 5433 -c "\dt shiwan_ceramics.*"

echo ""

# 步骤 4: 测试应用连接
echo "📝 步骤 4/4: 测试应用连接..."
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
