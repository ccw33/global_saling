#!/bin/bash

echo "==================================="
echo "石湾陶瓷电商网站 - 快速验证测试"
echo "==================================="

# 等待服务器启动
echo ""
echo "等待服务器启动..."
sleep 5

# 测试各个页面
test_page() {
  local url=$1
  local name=$2
  local status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)

  if [ "$status" = "200" ]; then
    echo "✅ $name: HTTP $status"
    return 0
  else
    echo "❌ $name: HTTP $status"
    return 1
  fi
}

echo ""
echo "测试各页面响应状态："
echo "-------------------"

test_page "http://localhost:3000/" "首页 (重定向)"
test_page "http://localhost:3000/zh" "中文首页"
test_page "http://localhost:3000/en" "英文首页"
test_page "http://localhost:3000/zh/products" "产品列表页"
test_page "http://localhost:3000/zh/about" "关于页面"
test_page "http://localhost:3000/zh/blog" "博客页面"
test_page "http://localhost:3000/zh/contact" "联系页面"

echo ""
echo "==================="
echo "测试完成"
echo "==================="
