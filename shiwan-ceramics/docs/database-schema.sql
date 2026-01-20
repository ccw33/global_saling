-- 石湾陶瓷公仔独立站 - 数据库表结构
-- 在Supabase的SQL Editor中执行此脚本

-- ============================================
-- 1. 分类表 (categories)
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 多语言字段
  name_zh TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description_zh TEXT,
  description_en TEXT,

  -- 排序和显示
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- 创建索引
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);

-- ============================================
-- 2. 大师表 (masters)
-- ============================================
CREATE TABLE masters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 多语言字段
  name_zh TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  biography_zh TEXT,
  biography_en TEXT,

  -- 媒体
  photo_url TEXT,

  -- 元数据
  birth_year INTEGER,
  death_year INTEGER,
  era TEXT, -- 如：清末、民国、现代

  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_masters_slug ON masters(slug);
CREATE INDEX idx_masters_active ON masters(is_active);

-- ============================================
-- 3. 产品表 (products)
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 多语言字段
  name_zh TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description_zh TEXT,
  description_en TEXT,
  story_zh TEXT, -- 产品故事
  story_en TEXT,

  -- 关联
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  master_id UUID REFERENCES masters(id) ON DELETE SET NULL,

  -- 价格和库存
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,

  -- 媒体
  images TEXT[] DEFAULT ARRAY[]::TEXT[], -- 多张图片URL

  -- 显示
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,

  -- SEO
  meta_title_zh TEXT,
  meta_title_en TEXT,
  meta_description_zh TEXT,
  meta_description_en TEXT
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_master ON products(master_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_featured ON products(is_featured);

-- ============================================
-- 4. 博客文章表 (blogs)
-- ============================================
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 多语言字段
  title_zh TEXT NOT NULL,
  title_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content_zh TEXT NOT NULL,
  content_en TEXT NOT NULL,
  excerpt_zh TEXT,
  excerpt_en TEXT,

  -- 媒体
  cover_image_url TEXT,

  -- 元数据
  author TEXT DEFAULT '石湾陶瓷',
  published_date DATE DEFAULT CURRENT_DATE,

  -- 分类（可选）
  category TEXT, -- 如：历史、大师介绍、工艺

  -- 显示
  is_published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,

  -- SEO
  meta_title_zh TEXT,
  meta_title_en TEXT,
  meta_description_zh TEXT,
  meta_description_en TEXT
);

CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_published ON blogs(is_published);
CREATE INDEX idx_blogs_date ON blogs(published_date DESC);

-- ============================================
-- 5. 启用行级安全策略 (RLS)
-- ============================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE masters ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- 允许所有读取操作（公开数据）
CREATE POLICY "允许公开查看分类" ON categories FOR SELECT USING (true);
CREATE POLICY "允许公开查看大师" ON masters FOR SELECT USING (true);
CREATE POLICY "允许公开查看产品" ON products FOR SELECT USING (true);
CREATE POLICY "允许公开查看博客" ON blogs FOR SELECT USING (true);

-- ============================================
-- 6. 创建更新时间触发器
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_masters_updated_at BEFORE UPDATE ON masters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 7. 插入示例数据（可选）
-- ============================================

-- 示例分类
INSERT INTO categories (name_zh, name_en, slug, description_zh, description_en, display_order) VALUES
('传统经典系列', 'Classic Collection', 'classic', '复刻清末民国大师作品，传承经典工艺', 'Replicas of late Qing and Republican master works', 1),
('现代创新系列', 'Modern Collection', 'modern', '适合当代家居审美的创新设计', 'Modern designs for contemporary homes', 2),
('限量定制', 'Limited Edition', 'limited', '高端客户专属限量定制服务', 'Exclusive limited edition service', 3);

-- 示例大师
INSERT INTO masters (name_zh, name_en, slug, biography_zh, biography_en, birth_year, death_year, era) VALUES
('潘玉书', 'Pan Yushu', 'pan-yushu', '清末民初石湾陶塑一代宗师', 'Master of Shiwan ceramics in late Qing and Republican era', 1875, 1939, '清末民国'),
('陈渭岩', 'Chen Weiyan', 'chen-weiyan', '石湾陶塑艺术大师', 'Master of Shiwan ceramic art', 1890, 1950, '民国');

-- ============================================
-- 8. 创建视图（简化API查询）
-- ============================================

-- 产品列表视图（包含分类和大师信息）
CREATE OR REPLACE VIEW products_list AS
SELECT
  p.id,
  p.slug,
  p.name_zh,
  p.name_en,
  p.description_zh,
  p.description_en,
  p.story_zh,
  p.story_en,
  p.price,
  p.stock,
  p.images,
  p.is_featured,
  p.is_active,
  p.display_order,
  p.created_at,
  p.updated_at,
  c.id as category_id,
  c.name_zh as category_name_zh,
  c.name_en as category_name_en,
  c.slug as category_slug,
  m.id as master_id,
  m.name_zh as master_name_zh,
  m.name_en as master_name_en,
  m.slug as master_slug,
  m.photo_url as master_photo_url
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN masters m ON p.master_id = m.id
WHERE p.is_active = true;

-- 博客列表视图
CREATE OR REPLACE VIEW blogs_list AS
SELECT
  id,
  slug,
  title_zh,
  title_en,
  excerpt_zh,
  excerpt_en,
  content_zh,
  content_en,
  cover_image_url,
  author,
  published_date,
  category,
  is_published,
  display_order,
  created_at,
  updated_at
FROM blogs
WHERE is_published = true;

-- ============================================
-- 完成
-- ============================================
-- 执行完成后，您将拥有：
-- ✅ 4个核心表：categories, masters, products, blogs
-- ✅ 所有表支持中英文字段
-- ✅ 自动更新时间戳
-- ✅ 行级安全策略（RLS）
-- ✅ 索引优化
-- ✅ 2个视图简化查询
