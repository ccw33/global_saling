#!/bin/bash

# 快速测试 OrbStack PostgreSQL 连接

echo "🔍 测试 OrbStack PostgreSQL 连接..."
echo ""

# 测试不同的连接方式
echo "测试 1: TCP 连接到 localhost:5433 (postgres 用户)"
if psql -h localhost -p 5433 -U postgres -d postgres -c "SELECT version();" 2>&1 | grep -q "PostgreSQL"; then
    echo "✅ 成功！"
    echo ""

    # 列出所有数据库
    echo "可用数据库:"
    psql -h localhost -p 5433 -U postgres -d postgres -c "\l" | grep -v "^$" | grep -v "List of databases" | grep -v " rows)" | grep -v "^---" | head -10

    exit 0
else
    echo "❌ 失败"
    echo ""
    echo "请检查:"
    echo "1. OrbStack PostgreSQL 容器是否运行"
    echo "2. 运行: docker ps | grep postgres"
    echo "3. 检查 OrbStack 设置"
    exit 1
fi
