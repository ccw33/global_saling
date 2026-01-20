#!/bin/bash

# 石湾陶瓷公仔项目 - 数据库初始化脚本
# 此脚本会创建数据库、用户和schema

set -e  # 遇到错误立即退出

echo "🚀 开始初始化数据库..."

echo "📝 步骤 1: 创建数据库和用户..."
psql -d postgres << EOF
CREATE DATABASE bulletin;
CREATE USER bulletin WITH PASSWORD 'bulletin';
GRANT ALL PRIVILEGES ON DATABASE bulletin TO bulletin;
EOF

echo "✅ 数据库和用户创建完成！"

echo "📝 步骤 2: 执行schema初始化脚本..."
psql -U bulletin -d bulletin -f docs/create-schema.sql

echo "✅ Schema初始化完成！"

echo "📝 步骤 3: 测试数据库连接..."
cd frontend
node test-db.js

echo ""
echo "🎉 数据库设置完成！"
echo "现在可以运行以下命令启动开发服务器："
echo "  cd frontend"
echo "  npm run dev"
