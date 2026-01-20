# Supabase 设置指南

本指南将帮助您在5分钟内完成Supabase项目配置。

## 步骤1: 创建Supabase项目（2分钟）

1. 访问 [https://supabase.com](https://supabase.com)
2. 点击 "Start your project" 或 "Sign Up"
3. 使用GitHub账号登录（推荐）或邮箱注册
4. 点击 "New Project"
5. 填写项目信息：
   - **Name**: `shiwan-ceramics`（或任意名称）
   - **Database Password**: 设置一个强密码并保存
   - **Region**: 选择 `Southeast Asia (Singapore)`（推荐，接近目标用户）
6. 点击 "Create new project"
7. 等待项目创建完成（约1-2分钟）

## 步骤2: 执行数据库表结构（2分钟）

1. 在Supabase Dashboard中，进入您的项目
2. 点击左侧菜单的 **SQL Editor**
3. 点击 "New Query"
4. 复制 `docs/database-schema.sql` 文件的全部内容
5. 粘贴到SQL编辑器中
6. 点击 **Run** 或按 `Cmd+Enter` 执行
7. 确认看到 "Success. No rows returned" （表示表创建成功）

## 步骤3: 获取API凭证（1分钟）

1. 在Supabase Dashboard中，点击左侧菜单的 **Settings** → **API**
2. 找到以下信息并复制：
   - **Project URL**: 类似 `https://xxxxx.supabase.co`
   - **anon public**: 一个很长的字符串（这是公开密钥）

3. 打开 `frontend/.env.local` 文件
4. 将获取的凭证填入：
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## 步骤4: 测试连接（1分钟）

1. 启动Next.js开发服务器：
   ```bash
   cd frontend
   npm run dev
   ```

2. 访问 http://localhost:3000
3. 如果看到 "石湾陶瓷公仔" 页面正常显示，说明配置成功！

## 步骤5: 添加示例数据（可选）

在SQL Editor中执行以下SQL，添加测试数据：

```sql
-- 添加示例产品
INSERT INTO products (
  name_zh, name_en, slug, description_zh, description_en,
  category_id, price, stock, images, is_featured
) VALUES
(
  '钟馗捉鬼公仔',
  'Zhong Kui Figurine',
  'zhong-kui-figurine',
  '经典钟馗捉鬼题材，栩栩如生',
  'Classic Zhong Kui theme, lifelike details',
  (SELECT id FROM categories WHERE slug = 'classic'),
  299.99,
  10,
  ARRAY['/images/zhong-kui-1.jpg'],
  true
),
(
  '达摩祖师',
  'Bodhidharma',
  'bodhidharma',
  '禅宗达摩祖师像，神态庄严',
  'Bodhidharma statue, solemn expression',
  (SELECT id FROM categories WHERE slug = 'classic'),
  399.99,
  5,
  ARRAY['/images/bodhidharma-1.jpg'],
  true
);

-- 添加示例博客
INSERT INTO blogs (
  title_zh, title_en, slug, content_zh, content_en,
  excerpt_zh, excerpt_en, category, published_date
) VALUES
(
  '石湾陶艺的千年历史',
  'The Millennium History of Shiwan Ceramics',
  'shiwan-ceramics-history',
  '石湾陶艺起源于唐代，距今已有千年历史...',
  'Shiwan ceramics originated in the Tang Dynasty...',
  '探索石湾陶艺的起源与发展',
  'Explore the origins and development of Shiwan ceramics',
  '历史',
  '2025-01-18'
);
```

## 验证检查清单

- [ ] Supabase项目创建成功
- [ ] 数据库表创建完成（categories, masters, products, blogs）
- [ ] .env.local文件配置正确
- [ ] Next.js开发服务器启动无错误
- [ ] 可以访问 http://localhost:3000
- [ ] API连接测试通过（稍后开发阶段验证）

## 故障排除

### 问题1: 环境变量未生效
**解决方案**: 修改 `.env.local` 后，重启开发服务器（`Cmd+C` 然后重新运行 `npm run dev`）

### 问题2: API连接失败
**检查项**:
- 确保 `.env.local` 中的URL和key正确无误
- 确保Supabase项目已经启动（Dashboard可访问）
- 检查浏览器控制台的错误信息

### 问题3: SQL执行失败
**解决方案**:
- 确保复制了完整的SQL语句
- 检查是否有语法错误
- 在SQL Editor中查看错误提示

## 下一步

配置完成后，您可以继续开发：
- Story 2.1: 创建产品和分类相关的UI组件
- Story 2.2: 创建产品列表页面
- Story 2.3: 创建产品详情页面

所有数据库查询函数已经准备就绪在 `lib/db.ts` 文件中！
