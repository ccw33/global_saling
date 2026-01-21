#!/bin/bash
# Agile-dev 文档和脚本清理工具
# 用途：检测重复文档、归档临时文件、清理过期脚本
# 安全机制：只归档，不直接删除，需要用户确认

set -euo pipefail

# 默认配置
PROJECT_ROOT="${1:-.}"
ARCHIVE_DIR="$PROJECT_ROOT/.claude/archive"
TMP_FILE_AGE_DAYS=30
ARCHIVE_DATE=$(date +%Y%m%d)
ARCHIVE_PATH="$ARCHIVE_DIR/$ARCHIVE_DATE"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 重复的状态文档列表
DUPLICATE_STATUS_DOCS=(
    "CURRENT_STATUS.md"
    "PROJECT_STATUS.md"
    "DEVELOPMENT_STATUS.md"
    "DEVELOPMENT_PROGRESS.md"
    "DEVELOPMENT_REPORT.md"
    "PROGRESS.md"
    "CURRENT_STATE.md"
    "STATUS_REPORT.md"
)

# 临时脚本模式
TMP_SCRIPT_PATTERNS=(
    "tmp-*.sh"
    "tmp-*.js"
    "tmp-*.py"
    "diagnose.sh"
    "quick_test.sh"
    "test.sh"
    "test-connection-*.sh"
    "setup-final.sh"
    "setup-final-working.sh"
    "setup-correct.sh"
    "execute-now.sh"
    "execute-now-complete.sh"
    "detect-*.js"
    "detect-*.py"
    "check-*.js"
    "check-*.py"
)

# 用法说明
usage() {
    cat << EOF
用法: $0 [选项] [项目路径]

选项:
    -h, --help          显示此帮助信息
    -c, --check         仅检查，不执行清理
    -a, --archive       归档临时文件和重复文档
    -r, --report        生成清理报告
    --dry-run           模拟运行，显示将要执行的操作
    --force             跳过确认直接执行（不推荐）

示例:
    $0 --check                    # 检查项目中的重复文档和临时文件
    $0 --archive                  # 归档重复文档和临时文件
    $0 --report                   # 生成详细报告
    $0 --archive /path/to/project  # 清理指定项目

EOF
}

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查重复的状态文档
check_duplicate_status_docs() {
    local duplicates=()

    log_info "检查重复的状态文档..."

    for doc in "${DUPLICATE_STATUS_DOCS[@]}"; do
        if [ -f "$PROJECT_ROOT/$doc" ]; then
            duplicates+=("$doc")
        fi
    done

    if [ ${#duplicates[@]} -eq 0 ]; then
        log_success "未发现重复的状态文档"
        return 0
    else
        log_warning "发现 ${#duplicates[@]} 个重复的状态文档："
        printf '  - %s\n' "${duplicates[@]}"
        return 1
    fi
}

# 检查临时脚本
check_temp_scripts() {
    local temp_scripts=()

    log_info "检查临时脚本文件..."

    for pattern in "${TMP_SCRIPT_PATTERNS[@]}"; do
        # 使用 find 查找匹配的文件
        while IFS= read -r -d '' file; do
            temp_scripts+=("$file")
        done < <(find "$PROJECT_ROOT" -maxdepth 1 -name "$pattern" -print0 2>/dev/null)
    done

    if [ ${#temp_scripts[@]} -eq 0 ]; then
        log_success "未发现临时脚本文件"
        return 0
    else
        log_warning "发现 ${#temp_scripts[@]} 个临时脚本文件："
        printf '  - %s\n' "${temp_scripts[@]}"
        return 1
    fi
}

# 检查过期的归档文件
check_old_archives() {
    log_info "检查过期归档文件（超过 $TMP_FILE_AGE_DAYS 天）..."

    if [ ! -d "$ARCHIVE_DIR" ]; then
        log_info "归档目录不存在"
        return 0
    fi

    local old_archives=()
    while IFS= read -r -d '' dir; do
        old_archives+=("$(basename "$dir")")
    done < <(find "$ARCHIVE_DIR" -maxdepth 1 -type d -mtime +$TMP_FILE_AGE_DAYS -print0 2>/dev/null)

    if [ ${#old_archives[@]} -eq 0 ]; then
        log_success "未发现过期归档文件"
        return 0
    else
        log_warning "发现 ${#old_archives[@]} 个过期归档目录："
        printf '  - %s\n' "${old_archives[@]}"
        return 1
    fi
}

# 归档重复文档
archive_duplicate_docs() {
    local docs_to_archive=("$@")

    if [ ${#docs_to_archive[@]} -eq 0 ]; then
        return 0
    fi

    log_info "归档重复的状态文档..."

    # 创建归档目录
    mkdir -p "$ARCHIVE_PATH"

    # 归档每个文档
    for doc in "${docs_to_archive[@]}"; do
        local src="$PROJECT_ROOT/$doc"
        local dest="$ARCHIVE_PATH/$doc"

        if [ -f "$src" ]; then
            mv "$src" "$dest"
            log_success "已归档: $doc -> $ARCHIVE_PATH/"
        fi
    done

    # 创建归档说明
    cat > "$ARCHIVE_PATH/README.md" << EOF
# 归档文档 - $ARCHIVE_DATE

这些文档在清理过程中被识别为重复或过时文档，已被归档保留。

## 归档的文档

$(printf '- %s\n' "${docs_to_archive[@]}")

## 归档原因

- 重复的状态文档（应统一使用 STATUS.md）
- 临时脚本文件
- 过期的设置文档

## 恢复方法

如需恢复某个文档，执行：
\`\`\`bash
mv $ARCHIVE_PATH/<文件名> $PROJECT_ROOT/
\`\`\`

## 删除确认

这些归档文件将在 $TMP_FILE_AGE_DAYS 天后自动删除。
如需立即删除，执行：
\`\`\`bash
rm -rf $ARCHIVE_PATH
\`\`\`
EOF
}

# 归档临时脚本
archive_temp_scripts() {
    local scripts_to_archive=("$@")

    if [ ${#scripts_to_archive[@]} -eq 0 ]; then
        return 0
    fi

    log_info "归档临时脚本..."

    # 创建归档目录的 scripts 子目录
    local scripts_archive_dir="$ARCHIVE_PATH/scripts"
    mkdir -p "$scripts_archive_dir"

    # 归档每个脚本
    for script in "${scripts_to_archive[@]}"; do
        local basename=$(basename "$script")
        local dest="$scripts_archive_dir/$basename"

        if [ -f "$script" ]; then
            mv "$script" "$dest"
            log_success "已归档: $basename -> scripts/"
        fi
    done
}

# 生成清理报告
generate_report() {
    local report_file="$PROJECT_ROOT/.claude/cleanup-report-$(date +%Y%m%d-%H%M%S).md"

    log_info "生成清理报告..."

    mkdir -p "$(dirname "$report_file")"

    cat > "$report_file" << EOF
# 文档清理报告

生成时间: $(date)

## 项目信息

- 项目路径: $PROJECT_ROOT
- 归档目录: $ARCHIVE_PATH

## 检查结果

### 重复的状态文档

EOF

    # 检查并报告重复文档
    for doc in "${DUPLICATE_STATUS_DOCS[@]}"; do
        if [ -f "$PROJECT_ROOT/$doc" ]; then
            echo "- [ ] $doc" >> "$report_file"
        fi
    done

    cat >> "$report_file" << EOF

### 临时脚本文件

EOF

    # 检查并报告临时脚本
    for pattern in "${TMP_SCRIPT_PATTERNS[@]}"; do
        find "$PROJECT_ROOT" -maxdepth 1 -name "$pattern" -exec echo "- [ ] {}" \; 2>/dev/null >> "$report_file" || true
    done

    cat >> "$report_file" << EOF

## 建议

1. **统一状态文档**: 将所有状态信息合并到 STATUS.md
2. **清理临时脚本**: 删除不再需要的临时脚本
3. **使用规范命名**: 新脚本使用带日期的命名规范
4. **定期归档**: 定期运行清理脚本保持项目整洁

## 清理命令

\`\`\`bash
# 检查重复文档
$0 --check

# 归档重复文档和临时脚本
$0 --archive

# 查看此报告
cat $report_file
\`\`\`

## 参考

详见文档管理规范: [documentation-standards.md](.claude/skills/agile-dev/references/documentation-standards.md)
EOF

    log_success "报告已生成: $report_file"
}

# 交互式确认
confirm_action() {
    local message="$1"

    if [ "$FORCE" = "true" ]; then
        return 0
    fi

    echo ""
    read -p "$(echo -e ${YELLOW}确认执行此操作? [y/N]${NC} )" -n 1 -r
    echo ""
    [[ $REPLY =~ ^[Yy]$ ]]
}

# 主函数
main() {
    local mode="check"
    local dry_run=false
    FORCE=false

    # 解析参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                usage
                exit 0
                ;;
            -c|--check)
                mode="check"
                shift
                ;;
            -a|--archive)
                mode="archive"
                shift
                ;;
            -r|--report)
                mode="report"
                shift
                ;;
            --dry-run)
                dry_run=true
                shift
                ;;
            --force)
                FORCE=true
                shift
                ;;
            -*)
                log_error "未知选项: $1"
                usage
                exit 1
                ;;
            *)
                PROJECT_ROOT="$1"
                shift
                ;;
        esac
    done

    # 验证项目目录
    if [ ! -d "$PROJECT_ROOT" ]; then
        log_error "项目目录不存在: $PROJECT_ROOT"
        exit 1
    fi

    log_info "项目路径: $PROJECT_ROOT"
    log_info "归档目录: $ARCHIVE_PATH"
    echo ""

    # 执行检查
    local has_duplicates=0
    local has_temp_scripts=0

    check_duplicate_status_docs || has_duplicates=1
    check_temp_scripts || has_temp_scripts=1
    check_old_archives

    echo ""

    # 根据模式执行操作
    case $mode in
        check)
            if [ $has_duplicates -eq 0 ] && [ $has_temp_scripts -eq 0 ]; then
                log_success "项目文档整洁，无需清理"
            else
                log_warning "发现需要清理的文件，请使用 --archive 选项进行归档"
            fi
            ;;
        archive)
            if [ $has_duplicates -eq 0 ] && [ $has_temp_scripts -eq 0 ]; then
                log_info "没有需要归档的文件"
                exit 0
            fi

            if [ "$dry_run" = true ]; then
                log_info "模拟运行模式（不会实际移动文件）"
                exit 0
            fi

            if confirm_action "归档重复文档和临时脚本？"; then
                # 收集需要归档的文件
                local docs_to_archive=()
                local scripts_to_archive=()

                for doc in "${DUPLICATE_STATUS_DOCS[@]}"; do
                    if [ -f "$PROJECT_ROOT/$doc" ]; then
                        docs_to_archive+=("$doc")
                    fi
                done

                for pattern in "${TMP_SCRIPT_PATTERNS[@]}"; do
                    while IFS= read -r -d '' file; do
                        scripts_to_archive+=("$file")
                    done < <(find "$PROJECT_ROOT" -maxdepth 1 -name "$pattern" -print0 2>/dev/null)
                done

                # 执行归档
                archive_duplicate_docs "${docs_to_archive[@]:-}"
                archive_temp_scripts "${scripts_to_archive[@]:-}"

                log_success "归档完成"
                log_info "归档位置: $ARCHIVE_PATH"
            else
                log_info "取消归档操作"
            fi
            ;;
        report)
            generate_report
            ;;
    esac
}

# 运行主函数
main "$@"
