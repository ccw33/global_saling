-- 石湾陶瓷公仔独立站 - 数据库Schema和表结构
-- Schema: shiwan_ceramics
-- 在本地PostgreSQL中执行此脚本

-- ============================================
-- 1. 创建专用Schema
-- ============================================
CREATE SCHEMA IF NOT EXISTS shiwan_ceramics;

-- 设置默认搜索路径
SET search_path TO shiwan_ceramics, public;

-- ============================================
-- 2. 创建枚举类型
-- ============================================
CREATE TYPE shiwan_ceramics.locale AS ENUM ('zh', 'en');

-- ============================================
-- 3. 分类表 (categories)
-- ============================================
CREATE TABLE shiwan_ceramics.categories (
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
CREATE INDEX idx_categories_slug ON shiwan_ceramics.categories(slug);
CREATE INDEX idx_categories_active ON shiwan_ceramics.categories(is_active);

-- 添加注释
COMMENT ON TABLE shiwan_ceramics.categories IS '产品分类表';
COMMENT ON COLUMN shiwan_ceramics.categories.name_zh IS '中文名称';
COMMENT ON COLUMN shiwan_ceramics.categories.name_en IS '英文名称';
COMMENT ON COLUMN shiwan_ceramics.categories.slug IS 'URL友好的唯一标识';

-- ============================================
-- 4. 大师表 (masters)
-- ============================================
CREATE TABLE shiwan_ceramics.masters (
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

CREATE INDEX idx_masters_slug ON shiwan_ceramics.masters(slug);
CREATE INDEX idx_masters_active ON shiwan_ceramics.masters(is_active);

COMMENT ON TABLE shiwan_ceramics.masters IS '陶艺大师表';
COMMENT ON COLUMN shiwan_ceramics.masters.biography_zh IS '中文传记';
COMMENT ON COLUMN shiwan_ceramics.masters.era IS '年代（清末/民国/现代）';

-- ============================================
-- 5. 产品表 (products)
-- ============================================
CREATE TABLE shiwan_ceramics.products (
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
  category_id UUID REFERENCES shiwan_ceramics.categories(id) ON DELETE SET NULL,
  master_id UUID REFERENCES shiwan_ceramics.masters(id) ON DELETE SET NULL,

  -- 价格和库存
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,

  -- 媒体（JSON数组存储多图URL）
  images JSONB DEFAULT '[]'::JSONB,

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

CREATE INDEX idx_products_slug ON shiwan_ceramics.products(slug);
CREATE INDEX idx_products_category ON shiwan_ceramics.products(category_id);
CREATE INDEX idx_products_master ON shiwan_ceramics.products(master_id);
CREATE INDEX idx_products_active ON shiwan_ceramics.products(is_active);
CREATE INDEX idx_products_featured ON shiwan_ceramics.products(is_featured);

COMMENT ON TABLE shiwan_ceramics.products IS '产品表';
COMMENT ON COLUMN shiwan_ceramics.products.price IS '价格（美元）';
COMMENT ON COLUMN shiwan_ceramics.products.images IS '产品图片URL数组（JSON）';

-- ============================================
-- 6. 博客文章表 (blogs)
-- ============================================
CREATE TABLE shiwan_ceramics.blogs (
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

CREATE INDEX idx_blogs_slug ON shiwan_ceramics.blogs(slug);
CREATE INDEX idx_blogs_published ON shiwan_ceramics.blogs(is_published);
CREATE INDEX idx_blogs_date ON shiwan_ceramics.blogs(published_date DESC);

COMMENT ON TABLE shiwan_ceramics.blogs IS '博客文章表';
COMMENT ON COLUMN shiwan_ceramics.blogs.content_zh IS '中文内容（支持Markdown）';

-- ============================================
-- 7. 创建更新时间触发器函数
-- ============================================
CREATE OR REPLACE FUNCTION shiwan_ceramics.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为所有表添加触发器
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON shiwan_ceramics.categories
FOR EACH ROW EXECUTE FUNCTION shiwan_ceramics.update_updated_at_column();

CREATE TRIGGER update_masters_updated_at
BEFORE UPDATE ON shiwan_ceramics.masters
FOR EACH ROW EXECUTE FUNCTION shiwan_ceramics.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON shiwan_ceramics.products
FOR EACH ROW EXECUTE FUNCTION shiwan_ceramics.update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON shiwan_ceramics.blogs
FOR EACH ROW EXECUTE FUNCTION shiwan_ceramics.update_updated_at_column();

-- ============================================
-- 8. 授权bulletin用户访问此schema
-- ============================================
GRANT USAGE ON SCHEMA shiwan_ceramics TO bulletin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA shiwan_ceramics TO bulletin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA shiwan_ceramics TO bulletin;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA shiwan_ceramics TO bulletin;

-- 允许bulletin用户在未来创建的表上也拥有权限
ALTER DEFAULT PRIVILEGES IN SCHEMA shiwan_ceramics GRANT ALL ON TABLES TO bulletin;
ALTER DEFAULT PRIVILEGES IN SCHEMA shiwan_ceramics GRANT ALL ON SEQUENCES TO bulletin;
ALTER DEFAULT PRIVILEGES IN SCHEMA shiwan_ceramics GRANT ALL ON FUNCTIONS TO bulletin;

-- ============================================
-- 9. 插入示例数据
-- ============================================

-- 示例分类
INSERT INTO shiwan_ceramics.categories (name_zh, name_en, slug, description_zh, description_en, display_order) VALUES
('传统经典系列', 'Classic Collection', 'classic', '复刻清末民国大师作品，传承经典工艺', 'Replicas of late Qing and Republican master works', 1),
('现代创新系列', 'Modern Collection', 'modern', '适合当代家居审美的创新设计', 'Modern designs for contemporary homes', 2),
('限量定制', 'Limited Edition', 'limited', '高端客户专属限量定制服务', 'Exclusive limited edition service', 3);

-- 示例大师
INSERT INTO shiwan_ceramics.masters (name_zh, name_en, slug, biography_zh, biography_en, birth_year, death_year, era) VALUES
('潘玉书', 'Pan Yushu', 'pan-yushu', '清末民初石湾陶塑一代宗师，擅长人物塑造', 'Master of Shiwan ceramics in late Qing and Republican era, expert in character sculpting', 1875, 1939, '清末民国'),
('陈渭岩', 'Chen Weiyan', 'chen-weiyan', '石湾陶塑艺术大师，作品栩栩如生', 'Master of Shiwan ceramic art, lifelike creations', 1890, 1950, '民国');

-- 示例产品
INSERT INTO shiwan_ceramics.products (
  name_zh, name_en, slug, description_zh, description_en, story_zh, story_en,
  category_id, master_id, price, stock, images, is_featured
)
SELECT
  '钟馗捉鬼公仔',
  'Zhong Kui Figurine',
  'zhong-kui-figurine',
  '经典钟馗捉鬼题材，栩栩如生，气势非凡',
  'Classic Zhong Kui theme, lifelike details, imposing presence',
  '取材于传统钟馗捉鬼传说，展现石湾陶塑的独特神韵',
  'Based on the traditional legend of Zhong Kui capturing ghosts, showcasing the unique charm of Shiwan ceramics',
  c.id,
  m.id,
  299.99,
  10,
  '["https://example.com/images/zhong-kui-1.jpg", "https://example.com/images/zhong-kui-2.jpg"]'::JSONB,
  true
FROM shiwan_ceramics.categories c, shiwan_ceramics.masters m
WHERE c.slug = 'classic' AND m.slug = 'pan-yushu'
LIMIT 1;

INSERT INTO shiwan_ceramics.products (
  name_zh, name_en, slug, description_zh, description_en, story_zh, story_en,
  category_id, price, stock, images, is_featured
)
SELECT
  '达摩祖师',
  'Bodhidharma',
  'bodhidharma',
  '禅宗达摩祖师像，神态庄严，面壁九年的故事',
  'Bodhidharma statue, solemn expression, the story of 9 years of meditation',
  '表现达摩面壁九年的修行场景，体现禅宗精神',
  'Depicting Bodhidharma''s 9 years of meditation, embodying the spirit of Zen Buddhism',
  c.id,
  199.99,
  5,
  '["https://example.com/images/bodhidharma-1.jpg"]'::JSONB,
  true
FROM shiwan_ceramics.categories c
WHERE c.slug = 'classic'
LIMIT 1;

-- 示例博客
INSERT INTO shiwan_ceramics.blogs (
  title_zh, title_en, slug, content_zh, content_en,
  excerpt_zh, excerpt_en, category, published_date
) VALUES
(
  '石湾陶艺的千年历史',
  'The Millennium History of Shiwan Ceramics',
  'shiwan-ceramics-history',
  '石湾陶艺起源于唐代，距今已有千年历史。作为中国岭南地区的重要陶瓷艺术形式，石湾陶塑以其生动传神的人物造型和丰富釉色而闻名于世...',
  'Shiwan ceramics originated in the Tang Dynasty and has a history of over a thousand years. As an important ceramic art form in the Lingnan region of China...',
  '探索石湾陶艺的起源与发展，了解这一独特的艺术形式',
  'Explore the origins and development of Shiwan ceramics',
  '历史',
  '2025-01-18'
),
(
  '大师介绍：潘玉书',
  'Master Profile: Pan Yushu',
  'master-profile-pan-yushu',
  '潘玉书（1875-1939），原名潘显山，字玉书，是清末民初石湾陶塑的一代宗师...',
  'Pan Yushu (1875-1939), originally named Pan Xianshan, was a master of Shiwan ceramics in the late Qing and Republican era...',
  '了解潘玉书大师的生平和艺术成就',
  'Learn about Master Pan Yushu''s life and artistic achievements',
  '大师介绍',
  '2025-01-18'
);

-- ============================================
-- 10. 创建视图（简化查询）
-- ============================================

-- 产品列表视图（包含分类和大师信息）
CREATE OR REPLACE VIEW shiwan_ceramics.products_list AS
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
FROM shiwan_ceramics.products p
LEFT JOIN shiwan_ceramics.categories c ON p.category_id = c.id
LEFT JOIN shiwan_ceramics.masters m ON p.master_id = m.id
WHERE p.is_active = true;

-- 博客列表视图
CREATE OR REPLACE VIEW shiwan_ceramics.blogs_list AS
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
FROM shiwan_ceramics.blogs
WHERE is_published = true;

-- ============================================
-- 完成
-- ============================================
-- 验证安装
SELECT
  'Schema: shiwan_ceramics created successfully!' as status,
  COUNT(*) as category_count
FROM shiwan_ceramics.categories;

SELECT
  'Tables created:' as info,
  tablename
FROM pg_tables
WHERE schemaname = 'shiwan_ceramics'
ORDER BY tablename;

SELECT
  'Sample data inserted:' as info,
  COUNT(*) as sample_products
FROM shiwan_ceramics.products;
