#!/bin/bash
# Post-QA Hook
# 用途：QA工程师完成Epic测试后，验证是否已生成待验证文档
# 触发时机：仅在 Epic 级别触发（Story 级别不触发）

set -euo pipefail

# 颜色输出
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 获取项目根目录
PROJECT_ROOT="${1:-.}"
FEATURE_DIR="$PROJECT_ROOT/docs/feature"

log_warning() {
    echo -e "${YELLOW}[警告]${NC} $1"
}

log_error() {
    echo -e "${RED}[错误]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[通过]${NC} $1"
}

log_info() {
    echo -e "${BLUE}[检查]${NC} $1"
}

# 检查是否已生成待验证文档
check_verify_document_generated() {
    log_info "检查待验证文档是否已生成..."

    # 查找所有 to_be_verify.md 文件
    local found_files=()
    while IFS= read -r -d '' file; do
        found_files+=("$file")
    done < <(find "$FEATURE_DIR" -name "to_be_verify.md" -type f -print0 2>/dev/null)

    if [ ${#found_files[@]} -eq 0 ]; then
        log_error "未发现待验证文档！"
        echo ""
        echo "QA工程师完成 Epic 测试后，必须生成待验证文档。"
        echo ""
        echo "请执行以下操作："
        echo "  1. 创建待验证文档：docs/feature/<feature>/to_be_verify.md"
        echo "  2. 填写Epic概要、验证方法、测试报告等信息"
        echo "  3. 告知用户验证方法"
        echo ""
        echo "参考模板："
        echo "  .claude/skills/agile-dev/templates/TO_BE_VERIFY.template.md"
        echo ""

        return 1
    fi

    # 发现待验证文档
    log_success "发现 ${#found_files[@]} 个待验证文档"
    echo ""
    echo "待验证文档位置："
    for file in "${found_files[@]}"; do
        echo "  - $file"
    done
    echo ""
    echo "下一步："
    echo "  ✓ 告知用户验证方法"
    echo "  ✓ 等待用户验证（开发工程师会在开始新Epic时检查）"
    echo ""

    return 0
}

# 主函数
main() {
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║        Post-QA Hook - Epic 测试后检查                     ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""

    if check_verify_document_generated; then
        exit 0
    else
        exit 1
    fi
}

main "$@"
