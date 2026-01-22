# 石湾公仔海外独立站 Epic 1 测试计划

> 测试范围：项目初始化和基础配置
> 测试日期：2026-01-22
> QA工程师：QA_Engineer

---

## 测试范围

### Epic 1: 项目初始化和基础配置

**包含的Stories**:
- Story 1.1: 创建Next.js项目和基础配置
- Story 1.2: 配置Docker和PostgreSQL
- Story 1.3: 配置Prisma ORM

**功能模块**:
- Next.js项目结构和配置
- shadcn/ui基础组件
- PostgreSQL数据库容器
- Prisma ORM和数据库模型

---

## 测试策略

### 功能测试
- 项目结构符合ARCHITECTURE.md设计
- Next.js开发服务器可以正常启动
- PostgreSQL数据库容器可以正常运行
- Prisma Client可以成功连接数据库
- 数据库迁移文件正确生成

### 接口测试
- N/A（Epic 1主要涉及基础设施）

### 性能测试
- Next.js服务启动时间 < 10秒
- 首页加载时间 < 3秒

### 安全测试
- 环境变量正确配置
- 数据库连接安全

### 兼容性测试
- Node.js 18+兼容性
- Docker环境兼容性

---

## 测试环境

### 环境配置
- 操作系统：macOS (Darwin)
- Node.js版本：v25.1.0
- npm版本：11.6.2
- Docker版本：可用
- 数据库：PostgreSQL 16 Alpine (Docker容器，端口5434）

### 测试数据准备
- 空数据库（新初始化）
- 测试环境变量（.env.local）

### 依赖服务状态
- PostgreSQL容器：需要启动
- Next.js开发服务器：需要启动

---

## 测试用例

### Story 1.1: 创建Next.js项目和基础配置

#### 测试用例 [TC-001]

**测试场景**: 验证Next.js项目结构和配置

**前置条件**:
- [x] 项目已创建
- [x] 依赖已安装

**测试步骤**:
1. 检查项目根目录结构
2. 验证package.json依赖配置
3. 验证tsconfig.json配置
4. 验证tailwind.config.ts配置
5. 验证shadcn/ui组件已创建

**预期结果**:
- 项目包含app/、components/、lib/等必要目录
- package.json包含next、react、tailwindcss等依赖
- TypeScript配置正确
- Tailwind CSS配置正确
- shadcn/ui基础组件（Button、Card、Input）已创建

**实际结果**: 记录实际测试结果

**测试状态**: 待测试

**备注**: N/A

---

#### 测试用例 [TC-002]

**测试场景**: 验证Next.js开发服务器可以正常启动

**前置条件**:
- [x] 项目依赖已安装

**测试步骤**:
1. 执行`npm run dev`启动开发服务器
2. 等待服务器启动完成
3. 访问http://localhost:3000
4. 检查页面是否正常显示

**预期结果**:
- 服务器成功启动，监听在3000端口
- 访问首页显示"石湾公仔海外独立站"标题
- 无控制台错误

**实际结果**: 记录实际测试结果

**测试状态**: 待测试

**备注**: 需要处理Watchpack警告

---

#### 测试用例 [TC-003]

**测试场景**: 验证代码质量检查

**前置条件**:
- [x] 代码已编写

**测试步骤**:
1. 执行`npm run lint`检查代码规范
2. 执行`npm run type-check`进行类型检查

**预期结果**:
- ESLint检查通过，无warning或error
- TypeScript类型检查通过，无编译错误

**实际结果**: 记录实际测试结果

**测试状态**: 待测试

**备注**: N/A

---

### Story 1.2: 配置Docker和PostgreSQL

#### 测试用例 [TC-004]

**测试场景**: 验证Docker PostgreSQL容器可以正常启动

**前置条件**:
- [x] Docker已安装
- [x] docker-compose.yml已配置

**测试步骤**:
1. 执行`docker-compose up -d postgres`启动容器
2. 等待容器启动
3. 执行`docker ps | grep shiwan`检查容器状态
4. 查看容器日志确认数据库就绪

**预期结果**:
- 容器成功启动并运行
- 容器名称为`shiwan-doll-store-db`
- 数据库监听在端口5434
- 日志显示"database system is ready to accept connections"

**实际结果**: 记录实际测试结果

**测试状态**: 待测试

**备注**: 注意端口冲突问题（已使用5434端口）

---

#### 测试用例 [TC-005]

**测试场景**: 验证数据库连接

**前置条件**:
- [x] PostgreSQL容器已启动
- [x] 环境变量已配置

**测试步骤**:
1. 执行`docker exec shiwan-doll-store-db psql -U postgres -d shiwan_doll_store -c "SELECT version();"`
2. 验证返回PostgreSQL版本信息

**预期结果**:
- 成功连接到数据库
- 返回PostgreSQL版本信息（16.11）

**实际结果**: 记录实际测试结果

**测试状态**: 待测试

**备注**: N/A

---

### Story 1.3: 配置Prisma ORM

#### 测试用例 [TC-006]

**测试场景**: 验证Prisma安装和初始化

**前置条件**:
- [x] 数据库已启动
- [x] 环境变量已配置

**测试步骤**:
1. 检查prisma目录和schema.prisma文件
2. 验证schema.prisma包含Product、Order、OrderItem模型
3. 执行`npx prisma generate`生成Prisma Client

**预期结果**:
- prisma/schema.prisma文件存在且语法正确
- 数据库模型定义完整
- Prisma Client成功生成

**实际结果**: 记录实际测试结果

**测试状态**: 待测试

**备注**: N/A

---

#### 测试用例 [TC-007]

**测试场景**: 验证数据库迁移

**前置条件**:
- [x] Prisma已初始化
- [x] schema.prisma已配置

**测试步骤**:
1. 执行`npx prisma migrate dev --name init`创建迁移
2. 检查migrations目录是否生成
3. 验证迁移文件包含正确的SQL语句

**预期结果**:
- 迁移成功创建和应用
- migrations/目录包含迁移文件
- 数据库表结构符合schema定义

**实际结果**: 记录实际测试结果

**测试状态**: 待测试

**备注**: N/A

---

#### 测试用例 [TC-008]

**测试场景**: 验证Prisma Client数据库连接

**前置条件**:
- [x] 数据库已启动
- [x] Prisma Client已生成

**测试步骤**:
1. 创建测试脚本连接数据库
2. 执行查询测试（如`prisma.product.findMany()`）
3. 验证查询结果

**预期结果**:
- 成功连接到数据库
- 查询正常执行（空结果集）
- 无连接错误

**实际结果**: 记录实际测试结果

**测试状态**: 待测试

**备注**: N/A

---

#### 测试用例 [TC-009]

**测试场景**: 验证lib/db.ts配置

**前置条件**:
- [x] Prisma Client已生成

**测试步骤**:
1. 检查lib/db.ts文件
2. 验证Prisma Client正确导出
3. 验证全局单例模式

**预期结果**:
- lib/db.ts文件存在
- Prisma Client正确导出
- 使用全局单例避免重复连接

**实际结果**: 记录实际测试结果

**测试状态**: 待测试

**备注**: N/A

---

### 集成测试

#### 测试用例 [TC-010]

**测试场景**: 完整的开发环境测试

**前置条件**:
- [x] 所有基础设施已配置

**测试步骤**:
1. 启动PostgreSQL容器
2. 验证数据库连接
3. 启动Next.js开发服务器
4. 访问首页
5. 检查浏览器控制台

**预期结果**:
- 所有服务正常启动
- 首页可正常访问
- 无控制台错误
- 开发环境可正常使用

**实际结果**: 记录实际测试结果

**测试状态**: 待测试

**备注**: N/A

---

## Bug报告

### Bug [BUG-001]

**标题**: Watchpack警告（非阻塞）

**严重程度**: P3 (轻微)

**复现步骤**:
1. 执行`npm run dev`
2. 观察控制台输出

**预期结果**: 服务器正常启动，无警告

**实际结果**: 出现Watchpack警告：`Error: ETIMEDOUT: connection timed out, lstat '/Users/chenchaowen/OrbStack'`

**环境信息**:
- 操作系统：macOS
- Node.js版本：v25.1.0
- Next.js版本：14.2.21
- 测试环境：开发环境
- 相关日志：见控制台输出

**附件**:
- 截图/录屏：N/A
- 日志文件：N/A

**影响**: 不影响功能，仅是OrbStack（Docker替代方案）的文件系统监视问题

---

## 测试报告

### 测试执行情况

- 总用例数：10
- 通过：待统计
- 失败：待统计
- 阻塞：待统计

### 测试覆盖率

- 功能覆盖率：待统计
- 场景覆盖率：待统计

### 发现的缺陷

- P0: 0个
- P1: 0个
- P2: 0个
- P3: 1个（Watchpack警告，非阻塞）

### 质量评估结论

- [ ] 可以发布
- [ ] 不能发布
- [ ] 有条件发布

### 发布建议

待测试完成后提供
