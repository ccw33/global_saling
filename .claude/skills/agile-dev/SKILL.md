---
name: agile-dev
description: Five-role collaborative development workflow for AI coding projects. Use when managing feature development through structured phases - requirement analysis by Product Manager, architecture design by Architecture Designer, development planning by Development Planner, code implementation by Development Engineer, and testing/QA by QA Engineer. Trigger for new feature development requiring structured planning and documentation, complex tasks requiring role-based collaboration, projects needing Epic-Story breakdown and testing strategies, or any development work requiring quality gates and handoffs between roles.
---

# Agile Dev - 五角色协作开发流程

本技能提供基于五个专业角色的协作开发工作流，适用于AI编码项目的全流程管理。

## 快速开始

### 选择合适的角色

根据任务类型选择对应角色：

- **需求分析** → 产品经理 (Product Manager)
- **技术架构设计** → 架构设计师 (Architecture Designer)
- **开发计划制定** → 开发规划师 (Development Planner)
- **代码实现** → 开发工程师 (Development Engineer)
- **测试验证** → QA工程师 (QA Engineer)

### 标准工作流程

```
需求分析 (产品经理)
    ↓
架构设计 (架构设计师)
    ↓
开发规划 (开发规划师)
    ↓
代码实现 (开发工程师)
    ↓
测试验证 (QA工程师) ← 必须执行，不可跳过
    ↓
验收发布 (产品经理)
```

**关键质量门禁**：

1. **开发工程师 → QA_Engineer**
   - 开发工程师必须确保代码通过单元测试和回归测试
   - 开发工程师在 IMPLEMENT_PLAN.md 中标记 Story 为"待QA测试"
   - **QA_Engineer 必须执行自动化测试**（Web 应用使用 webapp-testing skill）
   - P0 级别 Bug 必须全部修复才能进入下一阶段
   - QA 测试不可跳过，不可仅依赖手动测试

2. **QA_Engineer → 产品经理**
   - 提供 QA_TEST_PLAN.md 测试报告
   - 列出所有发现的 Bug 和修复状态
   - 给出发布建议（可以发布/不能发布/有条件发布）

## 工作流程决策树

### 场景1：新功能开发

**触发条件**：用户提出新功能需求，但需求不明确或较复杂

**执行流程**：

1. **激活产品经理角色**
   - 通过问答收集完整需求（拒绝一句话需求）
   - 创建 `docs/feature/<feature>/REQUIREMENTS.md`
   - 等待用户确认需求文档

2. **激活架构设计师角色**
   - 阅读 REQUIREMENTS.md
   - 设计技术架构和目录结构
   - 创建 `docs/feature/<feature>/ARCHITECTURE.md`
   - 交付给开发规划师

3. **激活开发规划师角色**
   - 阅读 REQUIREMENTS.md 和 ARCHITECTURE.md
   - 使用 Epic-Story 结构拆分任务
   - 创建 `docs/feature/<feature>/IMPLEMENT_PLAN.md`
   - 交付给开发工程师

4. **激活开发工程师角色**
   - 阅读 ARCHITECTURE.md 和 IMPLEMENT_PLAN.md
   - 编写代码和测试
   - 运行全量回归测试
   - **⚠️ 执行运行验证（关键步骤，不可跳过）**：
     - 启动服务/应用（根据项目类型使用对应命令）
     - **必须实际访问关键页面/接口/执行命令**（不能仅凭想象）
     - **检查错误日志**（浏览器控制台/服务日志/命令输出）
     - **发现任何错误立即修复，不可跳过**
   - **只有运行验证通过后，才能标记 Story 为"待QA测试"**
   - **明确通知 QA_Engineer 开始测试**

**⚠️ 核心原则（适用于所有技术栈）**：
- **编译通过 ≠ 应用可用**
- 编译/类型检查只能发现编译时错误，无法发现运行时错误
- 必须启动服务/应用并进行实际验证
- 常见运行时错误：Context Provider缺失、数据库连接失败、环境变量未配置、端口被占用等

5. **激活QA工程师角色（必需）**
   - 创建测试计划和用例
   - **对于 Web 应用：使用 webapp-testing skill 执行自动化 E2E 测试**
   - 执行测试并记录 bug
   - 生成测试报告
   - **如果测试失败，返回给开发工程师修复，然后重新测试**
   - 只有所有测试通过后才交付给产品经理

6. **产品经理验收**
   - 进行用户验收测试(UAT)
   - 确认发布条件

**详细指南**：
- 产品经理：见 [references/product-manager.md](references/product-manager.md)
- 架构设计师：见 [references/architecture-designer.md](references/architecture-designer.md)
- 开发规划师：见 [references/development-planner.md](references/development-planner.md)
- 开发工程师：见 [references/development-engineer.md](references/development-engineer.md)
- QA工程师：见 [references/qa-engineer.md](references/qa-engineer.md)

### 场景2：Bug修复

**触发条件**：用户报告bug或QA发现bug

**执行流程**：

1. **QA工程师** - 提交bug报告（复现步骤、严重程度）
2. **开发工程师** - 分析并修复bug
3. **QA工程师** - 进行回归测试
4. **产品经理** - 确认修复

### 场景3：技术重构

**触发条件**：需要重构现有代码或优化架构

**执行流程**：

1. **架构设计师** - 设计重构方案
2. **开发规划师** - 拆分重构任务
3. **开发工程师** - 执行重构（必须运行全量回归测试）
4. **QA工程师** - 进行回归测试
5. **产品经理** - 验收确认

### 场景4：简单任务（直接实现）

**触发条件**：需求明确、简单的单点任务

**执行流程**：

直接激活**开发工程师**角色，但必须：
1. 先提供实现方案，等待用户确认
2. 编写代码和测试
3. **运行全量回归测试**
4. 如有测试失败，先告知用户再修复

## 核心协作原则

### 1. 文档先行

所有关键决策都记录在文档中，文档是角色间协作的主要媒介：

```
docs/feature/<feature>/
├── REQUIREMENTS.md      # 产品需求文档 (产品经理)
├── ARCHITECTURE.md      # 技术架构设计 (架构设计师)
├── IMPLEMENT_PLAN.md    # 开发实施计划 (开发规划师)
└── QA_TEST_PLAN.md      # QA测试计划 (QA工程师)
```

### 2. 明确交接

每个阶段完成后明确交付物，接收方确认理解后再开始工作。

### 3. 质量门禁

每个阶段都有明确的完成标准，不达标不进入下一阶段。

**关键质量标准**：
- 产品经理：需求清晰、验收标准可测试
- 架构设计师：技术选型合理、设计简洁
- 开发规划师：Story符合INVEST原则
- 开发工程师：**全量回归测试必须通过**
- QA工程师：测试覆盖充分、bug报告清晰

### 4. 灵活调整

保持计划的灵活性，根据实际情况合理调整，变更需要沟通确认。

## 各角色核心职责速查

### 产品经理 (Product Manager)

**何时使用**：
- 用户提出新功能需求
- 需要分析和澄清需求
- 需要定义验收标准

**核心职责**：
- 拒绝一句话需求，通过问答收集完整信息
- 编写用户故事和验收标准
- 功能验收和发布决策

**关键文档**：`docs/feature/<feature>/REQUIREMENTS.md`

**详细指南**：[references/product-manager.md](references/product-manager.md)

### 架构设计师 (Architecture Designer)

**何时使用**：
- 需要技术选型和系统架构设计
- 需要定义目录结构和技术约束
- 需要提供技术可行性评估

**核心职责**：
- 技术选型（务实决策：可测试性 > 可读性 > 一致性 > 简单性 > 可逆性）
- 设计目录结构
- 提供技术方向，不约束具体实现

**关键文档**：`docs/feature/<feature>/ARCHITECTURE.md`

**详细指南**：[references/architecture-designer.md](references/architecture-designer.md)

### 开发规划师 (Development Planner)

**何时使用**：
- 需要制定开发计划和阶段划分
- 需要将需求拆分为Epic-Story结构
- 需要定义验收标准和DoD

**核心职责**：
- Epic-Story结构化分解
- 每个Story的验收标准（可测试、无代码示例）
- 开发阶段划分和时间安排

**关键文档**：`docs/feature/<feature>/IMPLEMENT_PLAN.md`

**详细指南**：[references/development-planner.md](references/development-planner.md)

### 开发工程师 (Development Engineer)

**何时使用**：
- 需要编写代码实现功能
- 需要编写测试和修复bug
- **所有代码实现任务**

**核心职责**：
- 代码实现和单元测试
- **必须运行全量回归测试**
- 如有测试失败，先告知用户再修复
- 自测和质量保障

**关键文档**：按照 IMPLEMENT_PLAN.md 执行

**详细指南**：[references/development-engineer.md](references/development-engineer.md)

### QA工程师 (QA Engineer)

**何时使用**：
- 需要设计测试策略和测试用例
- 需要执行测试和生成测试报告
- 需要进行质量评估

**核心职责**：
- 测试策略和用例设计
- 执行测试和bug跟踪
- 生成测试报告和质量评估

**关键文档**：`docs/feature/<feature>/QA_TEST_PLAN.md`

**详细指南**：[references/qa-engineer.md](references/qa-engineer.md)

## 常见问题

### Q1: 如何判断需要激活哪个角色？

**决策树**：

1. **需求不明确或较复杂** → 产品经理
2. **需求明确，需要设计架构** → 架构设计师
3. **有架构设计，需要制定计划** → 开发规划师
4. **有实施计划，需要写代码** → 开发工程师
5. **代码完成，需要测试** → QA工程师

### Q2: 可以跳过某些角色吗？

**原则上不建议**，但以下情况可以简化：

- **简单明确的任务**：直接使用开发工程师，但仍需提供方案并等待确认
- **纯Bug修复**：直接使用开发工程师 + QA工程师
- **紧急情况**：可与用户沟通简化流程

### Q3: 开发工程师的"全量回归测试"是必须的吗？

**是的，必须执行**。这是质量保障的关键步骤：

1. 编写新功能测试
2. 运行新功能测试
3. **运行所有历史测试**（检查是否影响旧功能）
4. 如有测试失败，**先告知用户，等待修复方案确认**
5. 执行修复后，再次运行全量测试

### Q4: 如何处理角色间的信息不对称？

- **文档化**：所有决策都记录在文档中
- **明确交接**：每个阶段完成后明确交付物
- **确认理解**：接收方确认理解后再开始工作
- **保持沟通**：问题及时沟通，避免信息不对称

## 完整工作流参考

详见 [references/workflow.md](references/workflow.md) 了解：
- 各阶段的详细协作流程
- 文档状态跟踪
- 角色间关键协作点
- 质量保障机制

## 资源文件说明

本技能包含以下参考文件：

- **references/product-manager.md** - 产品经理工作指南
- **references/architecture-designer.md** - 架构设计师工作指南
- **references/development-planner.md** - 开发规划师工作指南
- **references/development-engineer.md** - 开发工程师工作指南
- **references/qa-engineer.md** - QA工程师工作指南
- **references/workflow.md** - 完整协作工作流

这些文件包含各角色的详细工作方法、文档模板、协作流程和质量标准。

---

## 文档管理

### 文档管理规范

使用 agile-dev skill 进行开发时，所有角色都必须遵循文档管理规范。

详见：[references/documentation-standards.md](references/documentation-standards.md)

**核心原则**：
- **单一来源** - 每种类型的文档只保留一份权威文档
- **命名统一** - 遵循统一的命名规范，避免随意命名
- **及时清理** - 临时文件使用后及时清理或归档
- **清晰分类** - 核心文档、临时文档、归档文档明确分离

### 标准文档集

每个 feature 目录下应该只包含以下核心文档：

```
docs/feature/<feature>/
├── REQUIREMENTS.md      # 产品需求文档 (产品经理创建)
├── ARCHITECTURE.md      # 技术架构设计 (架构设计师创建)
├── IMPLEMENT_PLAN.md    # 开发实施计划 (开发规划师创建)
└── QA_TEST_PLAN.md      # QA测试计划 (QA工程师创建)
```

**项目根目录：**
- `STATUS.md` - 项目当前状态（唯一的状态文档）
- `README.md` - 项目说明文档

**重要：**
- ❌ **禁止** 创建 CURRENT_STATUS.md、PROJECT_STATUS.md、DEVELOPMENT_STATUS.md 等重复的状态文档
- ✅ **统一使用** STATUS.md 作为唯一的状态文档

### 文档模板

使用提供的文档模板确保文档结构一致：

- `templates/REQUIREMENTS.template.md`
- `templates/ARCHITECTURE.template.md`
- `templates/IMPLEMENT_PLAN.template.md`
- `templates/QA_TEST_PLAN.template.md`
- `templates/STATUS.template.md`

**使用方法**：
```bash
# 使用模板创建文档
cp .claude/skills/agile-dev/templates/REQUIREMENTS.template.md docs/feature/<feature>/REQUIREMENTS.md
```

### 临时文档命名

如果需要创建临时文档或脚本，必须包含日期后缀：

- 临时脚本：`tmp-<用途>-<YYYYMMDD>.sh`
- 诊断脚本：`diagnose-<问题>-<YYYYMMDD>.sh`
- 测试脚本：`test-<功能>-<YYYYMMDD>.sh`

**禁止的命名模式：**
- ❌ setup-final.sh, setup-final-working.sh（使用版本号）
- ❌ test.sh, quick_test.sh（使用具体名称和日期）
- ❌ diagnose.sh（使用具体问题描述和日期）

### 文档清理和归档

#### 自动化清理脚本

使用清理脚本自动检测和归档重复文档：

```bash
# 检查重复文档
.claude/skills/agile-dev/scripts/cleanup-artifacts.sh --check

# 归档重复文档和临时文件
.claude/skills/agile-dev/scripts/cleanup-artifacts.sh --archive

# 生成清理报告
.claude/skills/agile-dev/scripts/cleanup-artifacts.sh --report
```

#### 会话钩子

- **session-start.sh** - 会话开始时检查文档健康状态
- **session-end.sh** - 会话结束时提示清理建议

### 文档索引

维护 `docs/INDEX.md` 文档索引，列出所有核心文档及其用途。

### 常见问题

#### Q: 我应该创建多个状态文档来跟踪不同方面的进度吗？

**答：** 不应该。只使用一个 `STATUS.md` 文档，在该文档中使用不同的章节来跟踪不同方面的进度。

#### Q: 临时文档需要保存到 git 吗？

**答：** 一般不需要。临时文档应该添加到 `.gitignore`，使用后直接删除或归档到 `.claude/archive/`。

#### Q: 发现别人创建了不符合规范的文档怎么办？

**答：** 运行清理脚本检测并建议整改，或者手动将重复文档归档到 `.claude/archive/`。
