# Agile-Dev 文档管理规范

本文档定义了使用 agile-dev skill 进行开发时的文档创建、命名和管理规范，遵循这些规范可以避免文档冗余、提升查找效率。

## 核心原则

1. **单一来源** - 每种类型的文档只保留一份权威文档
2. **命名统一** - 遵循统一的命名规范，避免随意命名
3. **及时清理** - 临时文件使用后及时清理或归档
4. **清晰分类** - 核心文档、临时文档、归档文档明确分离

## 标准文档集

每个 feature 目录下应该只包含以下核心文档：

```
docs/feature/<feature>/
├── REQUIREMENTS.md      # 产品需求文档 (产品经理创建)
├── ARCHITECTURE.md      # 技术架构设计 (架构设计师创建)
├── IMPLEMENT_PLAN.md    # 开发实施计划 (开发规划师创建)
└── QA_TEST_PLAN.md      # QA测试计划 (QA工程师创建)
```

**项目根目录（最少必要集）：**
- `README.md` - 项目主文档
- `QUICK_START.md` - 快速开始指南
- `docs/SETUP.md` - 环境设置指南（可选）

**重要：**
- ❌ **禁止** 创建任何形式的状态文档（STATUS.md, CURRENT_STATUS.md, PROJECT_STATUS.md, DEVELOPMENT_STATUS.md, PROGRESS.md 等）
- ✅ **所有状态信息必须更新到** `docs/feature/<feature>/IMPLEMENT_PLAN.md` 的进度跟踪章节

## 文档命名规范

### 核心文档命名

核心文档使用固定的名称，不得随意添加前缀或后缀：

- `REQUIREMENTS.md` - 产品需求文档
- `ARCHITECTURE.md` - 技术架构设计
- `IMPLEMENT_PLAN.md` - 开发实施计划（包含进度跟踪）
- `QA_TEST_PLAN.md` - QA测试计划

**注意**：
- `IMPLEMENT_PLAN.md` 必须在顶部包含"进度跟踪"章节，用于记录所有项目状态和进度信息
- **禁止创建**任何形式的状态文档（STATUS.md, PROGRESS.md, CURRENT_STATUS.md 等）

### 临时文档命名

临时文档（脚本、测试文件等）必须包含日期后缀，便于识别和清理：

#### 临时脚本
- 格式：`tmp-<用途>-<YYYYMMDD>.sh`
- 示例：
  - ✅ `tmp-setup-debug-20250121.sh`
  - ✅ `tmp-test-connection-20250121.sh`
  - ❌ `setup-final.sh`
  - ❌ `setup-final-working.sh`

#### 诊断脚本
- 格式：`diagnose-<问题>-<YYYYMMDD>.sh`
- 示例：
  - ✅ `diagnose-db-connection-20250121.sh`
  - ✅ `diagnose-api-timeout-20250121.sh`
  - ❌ `diagnose.sh`

#### 测试脚本
- 格式：`test-<功能>-<YYYYMMDD>.sh` 或 `test-<功能>-<YYYYMMDD>.py`
- 示例：
  - ✅ `test-user-auth-20250121.sh`
  - ✅ `test-api-endpoints-20250121.py`
  - ❌ `quick_test.sh`
  - ❌ `test.sh`

#### JavaScript/Node.js 脚本
- 格式：`<操作>-<目标>-<YYYYMMDD>.js`
- 示例：
  - ✅ `check-db-schema-20250121.js`
  - ✅ `create-test-data-20250121.js`
  - ❌ `check-db.js`
  - ❌ `detect-postgres.js`

### 版本化脚本命名

如果需要保留多个版本的脚本，使用版本号而非 "final"、"working" 等模糊词汇：

- ❌ `setup-final.sh`
- ❌ `setup-final-working.sh`
- ❌ `setup-correct.sh`
- ✅ `setup-v1.sh`
- ✅ `setup-v2.sh`
- ✅ `setup-latest.sh`（总是指向最新版本）

### 禁止的命名模式

以下命名模式**严格禁止**使用：

❌ **状态文档重复命名：**
- STATUS.md
- CURRENT_STATUS.md
- PROJECT_STATUS.md
- DEVELOPMENT_STATUS.md
- DEVELOPMENT_PROGRESS.md
- PROGRESS.md
- CURRENT_STATE.md
- **任何形式的状态文档都禁止创建**

❌ **脚本模糊命名：**
- setup-final.sh
- setup-final-working.sh
- execute-now.sh
- execute-now-complete.sh
- quick_test.sh
- test.sh
- diagnose.sh
- detect.js
- check.js

❌ **指南文档重复命名：**
- FINAL_SETUP_GUIDE.md
- NEW_MACHINE_SETUP.md
- 如果已有 SETUP.md，不要创建重复的设置指南
- 所有设置信息应该整合到 `docs/SETUP.md`

## 文档创建检查清单

在创建任何文档之前，必须确认：

### 核心文档检查

- [ ] 是否已存在同类型的核心文档？
- [ ] 文档名称是否符合标准命名规范？
- [ ] 文档位置是否正确（feature 目录或项目根目录）？
- [ ] 是否避免了创建重复的状态文档？

### 临时文档检查

- [ ] 文档名称是否包含日期后缀？
- [ ] 文档名称是否清晰描述用途？
- [ ] 是否使用了禁止的命名模式？
- [ ] 是否计划在使用后清理或归档？

## 文档生命周期管理

### 创建阶段

1. **核心文档**：使用标准名称，放在正确位置
2. **临时文档**：使用带日期后缀的名称
3. **使用模板**：优先使用提供的文档模板确保结构一致

### 使用阶段

1. **定期更新**：核心文档随项目进展更新
2. **维护索引**：保持 docs/INDEX.md 的准确性
3. **标记状态**：使用统一的标记（✅ 已完成、⏳ 进行中、⏸ 未开始）

### 清理阶段

1. **临时文件**：使用完成后立即清理或归档
2. **重复文档**：合并到权威文档，删除重复版本
3. **过时文档**：移动到 .claude/archive/ 目录

### 归档规则

- 归档目录：`.claude/archive/YYYYMMDD/`
- 保留期限：至少 30 天
- 归档内容：
  - 临时脚本和测试文件
  - 重复的状态文档
  - 过期的设置指南
  - 旧版本的脚本

## 文档索引

每个项目应维护 `docs/INDEX.md` 文档索引，包含：

```markdown
# 项目文档索引

## 核心文档
- README.md - 项目主文档
- QUICK_START.md - 快速开始指南
- docs/SETUP.md - 环境设置指南
- docs/feature/<feature>/REQUIREMENTS.md - 产品需求
- docs/feature/<feature>/ARCHITECTURE.md - 技术架构
- docs/feature/<feature>/IMPLEMENT_PLAN.md - 实施计划（包含进度跟踪）
- docs/feature/<feature>/QA_TEST_PLAN.md - 测试计划

## 功能文档
- docs/feature/feature-a/REQUIREMENTS.md - Feature A 需求
- docs/feature/feature-b/ARCHITECTURE.md - Feature B 架构

## 临时文档（可清理）
- [列出临时文件及其用途]

## 归档文档
- docs/archives/ - 已归档的历史文档
```

## 自动化工具

### 清理脚本

使用 `.claude/skills/agile-dev/scripts/cleanup-artifacts.sh` 自动清理：

```bash
# 检测重复文档
.claude/skills/agile-dev/scripts/cleanup-artifacts.sh --check

# 归档临时文件（安全模式，移动到 archive）
.claude/skills/agile-dev/scripts/cleanup-artifacts.sh --archive

# 显示清理报告
.claude/skills/agile-dev/scripts/cleanup-artifacts.sh --report
```

### 会话钩子

- **session-start.sh** - 会话开始时检查文档健康状态
- **session-end.sh** - 会话结束时提示清理建议

## 文档健康检查

定期运行文档健康检查：

```bash
.claude/skills/agile-dev/scripts/check-doc-health.sh
```

检查项：
- 重复的状态文档
- 未使用日期后缀的临时文件
- 孤立的文档（未被索引引用）
- 过大的文档文件（>1MB）

## 示例对比

### 状态文档管理

❌ **错误示例**（产生 17+ 个重复文档）：
```
STATUS.md
CURRENT_STATUS.md
PROJECT_STATUS.md
DEVELOPMENT_STATUS.md
DEVELOPMENT_PROGRESS.md
PROGRESS.md
CURRENT_STATE.md
...
```

✅ **正确示例**（方案 B：整合到 IMPLEMENT_PLAN.md）：
```
# 项目根目录
README.md
QUICK_START.md
docs/SETUP.md

# 状态信息在 IMPLEMENT_PLAN.md 中
docs/feature/<feature>/IMPLEMENT_PLAN.md  # 包含进度跟踪章节
```

**说明**：所有状态信息、进度跟踪都记录在 `IMPLEMENT_PLAN.md` 顶部的"进度跟踪"章节中。

### 脚本文件管理

❌ **错误示例**（产生 16+ 个混乱脚本）：
```
setup-final.sh
setup-final-working.sh
setup-correct.sh
execute-now.sh
execute-now-complete.sh
diagnose.sh
quick_test.sh
detect-postgres.js
check-db.js
...
```

✅ **正确示例**（清晰命名和归档）：
```
setup-latest.sh          # 最新版本设置脚本
test-integration-20250121.sh  # 集成测试（带日期）
.claude/archive/20250120/     # 旧脚本已归档
  ├── setup-v1.sh
  ├── setup-v2.sh
  └── tmp-debug-20250120.sh
```

## 最佳实践

### 1. 文档创建前思考

**问自己：**
- 这个文档是否真的必要？
- 是否已有类似的文档？
- 文档名称是否清晰？
- 是否使用了标准命名？

### 2. 文档更新原则

- **及时性**：重要决策和变更立即更新到文档
- **准确性**：确保文档内容与实际代码一致
- **单一性**：避免在多处维护相同信息

### 3. 临时文件管理

- **用完即删**：临时脚本使用后立即清理
- **定期归档**：每周归档一次不再使用的文件
- **标记明确**：使用清晰的文件名和日期

### 4. 协作文档管理

- **明确分工**：每个文档有明确的责任人
- **版本控制**：重要文档变更使用 git 提交说明
- **冲突解决**：遇到文档冲突及时沟通

## 常见问题

### Q1: 我应该创建多个状态文档来跟踪不同方面的进度吗？

**答：** 不应该。**禁止创建任何形式的状态文档**（STATUS.md, CURRENT_STATUS.md, PROGRESS.md 等）。所有状态信息、进度跟踪必须更新到 `docs/feature/<feature>/IMPLEMENT_PLAN.md` 顶部的"进度跟踪"章节中。

### Q2: 临时脚本需要保存到 git 吗？

**答：** 一般不需要。临时脚本应该添加到 `.gitignore`，使用后直接删除或归档到 `docs/archives/`。

### Q3: 如何处理需要保留多个版本的脚本？

**答：** 使用版本号命名（v1, v2, v3）或保留最新的为 `-latest`，旧版本归档到 `docs/archives/`。

### Q4: 发现别人创建了不符合规范的文档怎么办？

**答：** 运行清理脚本检测并建议整改，或者手动将重复文档归档到 `docs/archives/`。

### Q5: 什么样的文档应该归档而不是删除？

**答：** 以下情况应该归档：
- 可能需要参考的历史文档
- 记录了重要决策的过时文档
- 需要审计追踪的文档

## 参考资源

- [Agile-Dev SKILL.md](../SKILL.md) - 主要技能文档
- [文档模板](../templates/) - 标准文档模板
- [清理脚本](../scripts/cleanup-artifacts.sh) - 自动化清理工具
- [会话钩子](../hooks/) - 文档管理钩子

## 更新日志

- **2025-01-21** - 初始版本，定义 agile-dev 文档管理规范
