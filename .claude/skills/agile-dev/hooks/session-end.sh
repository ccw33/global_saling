#!/bin/bash
# Agile-dev 会话结束钩子
# 用途：在会话结束时检测临时文件，提示清理建议

set -euo pipefail

PROJECT_ROOT="${1:-.}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLEANUP_SCRIPT="$SCRIPT_DIR/../scripts/cleanup-artifacts.sh"

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[会话结束]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[提醒]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[完成]${NC} $1"
}

# 检测临时文件
detect_temp_files() {
    log_info "检测临时文件..."

    local temp_count=0

    # 检测临时脚本
    local patterns=(
        "tmp-*.sh"
        "tmp-*.js"
        "tmp-*.py"
        "diagnose.sh"
        "quick_test.sh"
        "test-connection-*.sh"
    )

    for pattern in "${patterns[@]}"; do
        local count=$(find "$PROJECT_ROOT" -maxdepth 1 -name "$pattern" 2>/dev/null | wc -l | tr -d ' ')
        temp_count=$((temp_count + count))
    done

    echo $temp_count
}

# 检测重复文档
detect_duplicates() {
    local duplicates=0

    # 检测重复的状态文档（包括 STATUS.md 本身，因为现在禁止创建）
    local status_docs=(
        "STATUS.md"
        "CURRENT_STATUS.md"
        "PROJECT_STATUS.md"
        "DEVELOPMENT_STATUS.md"
        "DEVELOPMENT_PROGRESS.md"
        "PROGRESS.md"
    )

    for doc in "${status_docs[@]}"; do
        if [ -f "$PROJECT_ROOT/$doc" ]; then
            duplicates=$((duplicates + 1))
        fi
    done

    echo $duplicates
}

# 生成清理建议
generate_cleanup_suggestions() {
    local temp_files=$1
    local duplicates=$2

    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║        会话结束 - 清理建议                                ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""

    if [ $temp_files -eq 0 ] && [ $duplicates -eq 0 ]; then
        log_success "项目文档整洁，无需清理"
        return 0
    fi

    if [ $temp_files -gt 0 ]; then
        log_warning "发现 $temp_files 个临时文件"
        echo ""
        echo "建议操作："
        echo "  1. 删除不再需要的临时脚本"
        echo "  2. 重要的脚本重命名并添加日期后缀"
        echo "  3. 归档到 .claude/archive/ 目录"
    fi

    if [ $duplicates -gt 0 ]; then
        log_warning "发现 $duplicates 个重复的状态文档"
        echo ""
        echo "建议操作："
        echo "  1. 将所有状态信息更新到 IMPLEMENT_PLAN.md 的进度跟踪章节"
        echo "  2. 删除所有状态文档（包括 STATUS.md）"
        echo "  3. 运行清理脚本自动归档"
    fi

    echo ""
    echo "快速清理命令："
    echo ""
    echo "  # 仅检查（安全模式）"
    echo "  bash .claude/skills/agile-dev/scripts/cleanup-artifacts.sh --check"
    echo ""
    echo "  # 归档重复文档和临时文件"
    echo "  bash .claude/skills/agile-dev/scripts/cleanup-artifacts.sh --archive"
    echo ""
    echo "  # 生成详细报告"
    echo "  bash .claude/skills/agile-dev/scripts/cleanup-artifacts.sh --report"
    echo ""
}

# 更新文档索引
update_doc_index() {
    local index_file="$PROJECT_ROOT/docs/INDEX.md"

    if [ ! -f "$index_file" ]; then
        return 0
    fi

    log_info "文档索引已存在: docs/INDEX.md"
}

# 主函数
main() {
    local temp_files=$(detect_temp_files)
    local duplicates=$(detect_duplicates)

    generate_cleanup_suggestions "$temp_files" "$duplicates"
    update_doc_index

    if [ $temp_files -gt 0 ] || [ $duplicates -gt 0 ]; then
        log_info "建议在下次会话前执行清理操作"
    fi
}

main "$@"
