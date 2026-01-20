#!/bin/bash

# 快速测试 - 使用正确的 bulletin 用户配置

echo "🔍 测试 OrbStack PostgreSQL 连接（正确的配置）"
echo ""
echo "配置: localhost:5433, 用户: bulletin, 密码: bulletin"
echo ""

# 测试连接
if PGPASSWORD='bulletin' psql -h localhost -p 5433 -U bulletin -d postgres -c "SELECT version();" 2>&1 | grep -q "PostgreSQL"; then
    echo "✅ 连接成功！"
    echo ""

    # 列出所有数据库
    echo "可用数据库:"
    PGPASSWORD='bulletin' psql -h localhost -p 5433 -U bulletin -d postgres -c "\l" | grep -E "^\s+\w+" | awk '{print $1}'

    echo ""
    echo "✅ 配置正确！可以运行 setup-correct.sh 创建 schema"

    exit 0
else
    echo "❌ 连接失败"
    echo ""
    echo "请检查:"
    echo "1. OrbStack PostgreSQL 容器是否运行"
    echo "2. 端口映射是否正确 (5432 -> 5433)"
    echo "3. 用户 bulletin 是否存在"

    exit 1
fi
