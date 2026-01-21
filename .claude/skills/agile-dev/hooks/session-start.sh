#!/bin/bash
# Agile-dev 会话开始钩子
# 用途：在会话开始时检查文档健康状态，提示清理建议

set -euo pipefail

PROJECT_ROOT="${1:-.}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLEANUP_SCRIPT="$SCRIPT_DIR/../scripts/cleanup-artifacts.sh"

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[会话开始]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[提醒]${NC} $1"
}

# 检查文档健康
check_doc_health() {
    log_info "检查项目文档健康状态..."

    if [ -x "$CLEANUP_SCRIPT" ]; then
        "$CLEANUP_SCRIPT" --check "$PROJECT_ROOT" || true
    else
        log_warning "清理脚本未找到或不可执行"
    fi
}

# 显示当前文档结构
show_doc_structure() {
    log_info "当前项目文档结构："

    echo ""
    echo "核心文档："
    [ -f "$PROJECT_ROOT/STATUS.md" ] && echo "  ✅ STATUS.md"
    [ -f "$PROJECT_ROOT/README.md" ] && echo "  ✅ README.md"

    echo ""
    echo "功能文档："
    if [ -d "$PROJECT_ROOT/docs/feature" ]; then
        find "$PROJECT_ROOT/docs/feature" -name "REQUIREMENTS.md" -o -name "ARCHITECTURE.md" -o -name "IMPLEMENT_PLAN.md" -o -name "QA_TEST_PLAN.md" 2>/dev/null | while read -r file; do
            echo "  📄 $(basename $(dirname "$file"))/$(basename "$file")"
        done
    fi

    echo ""
}

# 提供清理建议
suggest_cleanup() {
    log_info "文档管理提示："

    echo ""
    echo "创建新文档前，请遵循以下规范："
    echo "  1. 状态文档统一使用 STATUS.md"
    echo "  2. 临时脚本必须包含日期后缀（如 tmp-xxx-YYYYMMDD.sh）"
    echo "  3. 避免创建重复的状态文档"
    echo ""
    echo "运行清理检查："
    echo "  bash .claude/skills/agile-dev/scripts/cleanup-artifacts.sh --check"
    echo ""
}

# 主函数
main() {
    echo ""
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║        Agile-Dev 会话开始 - 文档健康检查                 ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""

    check_doc_health
    echo ""
    show_doc_structure
    suggest_cleanup
}

main "$@"
