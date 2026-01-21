#!/bin/bash
# Pre-development Hook
# 用途：在开始新的 Epic 开发前，检查是否存在待验证文档
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

# 检查是否存在待验证文档
check_to_verify_file() {
    log_info "检查待验证文档..."

    # 查找所有 to_be_verify.md 文件
    local found_files=()
    while IFS= read -r -d '' file; do
        found_files+=("$file")
    done < <(find "$FEATURE_DIR" -name "to_be_verify.md" -type f -print0 2>/dev/null)

    if [ ${#found_files[@]} -eq 0 ]; then
        log_success "未发现待验证文档，可以开始新的 Epic 开发"
        return 0
    fi

    # 发现待验证文档
    log_error "发现 ${#found_files[@]} 个待验证文档，需要先处理用户验证！"
    echo ""
    echo "待验证文档位置："
    for file in "${found_files[@]}"; do
        echo "  - $file"
    done
    echo ""
    echo "请按照以下步骤处理："
    echo "  1. 询问用户是否已验证该 Epic 的功能"
    echo "  2. 如果验证通过："
    echo "     ✓ 删除待验证文档"
    echo "     ✓ 提交代码到 GitHub"
    echo "     ✓ 然后开始新的 Epic 开发"
    echo "  3. 如果发现问题："
    echo "     • 记录问题到 Bug 跟踪系统"
    echo "     • 安排修复工作"
    echo ""

    return 1
}

# 主函数
main() {
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║        Pre-Development Hook - Epic 开发前检查              ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""

    if check_to_verify_file; then
        exit 0
    else
        exit 1
    fi
}

main "$@"
