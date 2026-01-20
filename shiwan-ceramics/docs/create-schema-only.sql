-- 在现有 bulletin 数据库中创建 shiwan_ceramics schema
-- 此脚本不会创建数据库，只在现有数据库中添加 schema

-- 创建 schema
CREATE SCHEMA IF NOT EXISTS shiwan_ceramics;

-- 授权给 bulletin 用户
GRANT USAGE ON SCHEMA shiwan_ceramics TO bulletin;
GRANT ALL PRIVILEGES ON SCHEMA shiwan_ceramics TO bulletin;

-- 允许 bulletin 用户在 schema 中创建对象
ALTER DEFAULT PRIVILEGES IN SCHEMA shiwan_ceramics GRANT ALL ON TABLES TO bulletin;
ALTER DEFAULT PRIVILEGES IN SCHEMA shiwan_ceramics GRANT ALL ON SEQUENCES TO bulletin;

-- 创建分类表
CREATE TABLE IF NOT EXISTS shiwan_ceramics.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_zh TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description_zh TEXT,
    description_en TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建大师表
CREATE TABLE IF NOT EXISTS shiwan_ceramics.masters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_zh TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    biography_zh TEXT,
    biography_en TEXT,
    image_url TEXT,
    birth_year INTEGER,
    death_year INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建产品表
CREATE TABLE IF NOT EXISTS shiwan_ceramics.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_zh TEXT NOT NULL,
    name_en TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category_id UUID REFERENCES shiwan_ceramics.categories(id) ON DELETE SET NULL,
    master_id UUID REFERENCES shiwan_ceramics.masters(id) ON DELETE SET NULL,
    description_zh TEXT,
    description_en TEXT,
    price DECIMAL(10, 2) NOT NULL,
    height_cm DECIMAL(5, 2),
    width_cm DECIMAL(5, 2),
    depth_cm DECIMAL(5, 2),
    year_created INTEGER,
    images JSONB DEFAULT '[]'::JSONB,
    stock_quantity INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建博客表
CREATE TABLE IF NOT EXISTS shiwan_ceramics.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_zh TEXT NOT NULL,
    title_en TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content_zh TEXT,
    content_en TEXT,
    excerpt_zh TEXT,
    excerpt_en TEXT,
    featured_image TEXT,
    author_name TEXT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建更新时间戳的函数
CREATE OR REPLACE FUNCTION shiwan_ceramics.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 为每个表添加更新时间戳的触发器
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON shiwan_ceramics.categories
    FOR EACH ROW
    EXECUTE FUNCTION shiwan_ceramics.update_updated_at_column();

CREATE TRIGGER update_masters_updated_at
    BEFORE UPDATE ON shiwan_ceramics.masters
    FOR EACH ROW
    EXECUTE FUNCTION shiwan_ceramics.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON shiwan_ceramics.products
    FOR EACH ROW
    EXECUTE FUNCTION shiwan_ceramics.update_updated_at_column();

CREATE TRIGGER update_blogs_updated_at
    BEFORE UPDATE ON shiwan_ceramics.blogs
    FOR EACH ROW
    EXECUTE FUNCTION shiwan_ceramics.update_updated_at_column();

-- 插入示例数据

-- 插入分类数据
INSERT INTO shiwan_ceramics.categories (name_zh, name_en, slug, description_zh, description_en, display_order, is_active)
VALUES
    ('人物像', 'Figurines', 'figurines', '传统人物陶瓷公仔', 'Traditional figurine ceramics', 1, true),
    ('动物', 'Animals', 'animals', '石湾陶瓷动物系列', 'Shiwan ceramic animal series', 2, true),
    ('器皿', 'Vessels', 'vessels', '实用陶瓷器皿', 'Functional ceramic vessels', 3, true)
ON CONFLICT (slug) DO NOTHING;

-- 插入大师数据
INSERT INTO shiwan_ceramics.masters (name_zh, name_en, slug, biography_zh, biography_en, birth_year, is_active)
VALUES
    ('刘泽棉', 'Liu Zemian', 'liu-zemian', '中国工艺美术大师，石湾陶艺名家', 'Chinese arts and crafts master, renowned Shiwan ceramic artist', 1937, true),
    ('黄松坚', 'Huang Songjian', 'huang-songjian', '广东省工艺美术大师', 'Guangdong arts and crafts master', 1940, true)
ON CONFLICT (slug) DO NOTHING;

-- 插入产品数据
INSERT INTO shiwan_ceramics.products (
    name_zh, name_en, slug,
    category_id, master_id,
    description_zh, description_en,
    price, height_cm, width_cm, depth_cm,
    year_created, images, stock_quantity, is_featured, is_active
)
SELECT
    '钟馗醉酒', 'Drunk Zhong Kui', 'drunk-zhong-kui',
    c.id, m.id,
    '传统钟馗醉酒题材，神态生动', 'Traditional drunk Zhong Kui theme, vivid expression',
    2880.00, 28.5, 18.0, 12.0,
    2023, '["https://via.placeholder.com/400"]'::JSONB, 5, true, true
FROM shiwan_ceramics.categories c, shiwan_ceramics.masters m
WHERE c.slug = 'figurines' AND m.slug = 'liu-zemian'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO shiwan_ceramics.products (
    name_zh, name_en, slug,
    category_id, master_id,
    description_zh, description_en,
    price, height_cm, width_cm, depth_cm,
    year_created, images, stock_quantity, is_featured, is_active
)
SELECT
    '雄鹰展翅', 'Spreading Eagle', 'spreading-eagle',
    c.id, m.id,
    '雄鹰展翅高飞，气势磅礴', 'Eagle spreading wings, majestic and powerful',
    1680.00, 32.0, 22.0, 15.0,
    2023, '["https://via.placeholder.com/400"]'::JSONB, 3, true, true
FROM shiwan_ceramics.categories c, shiwan_ceramics.masters m
WHERE c.slug = 'animals' AND m.slug = 'huang-songjian'
ON CONFLICT (slug) DO NOTHING;

-- 插入博客数据
INSERT INTO shiwan_ceramics.blogs (
    title_zh, title_en, slug,
    content_zh, content_en,
    excerpt_zh, excerpt_en,
    featured_image, author_name,
    is_published, published_at
)
VALUES
    ('石湾陶瓷的历史', 'History of Shiwan Ceramics', 'history-of-shiwan-ceramics',
    '石湾陶瓷有着500多年的历史...'::TEXT, 'Shiwan ceramics has a history of over 500 years...'::TEXT,
    '了解石湾陶瓷的悠久历史', 'Learn about the long history of Shiwan ceramics',
    'https://via.placeholder.com/800x400', '刘泽棉',
    true, NOW()),
    ('如何鉴赏陶瓷公仔', 'How to Appreciate Ceramic Figurines', 'how-to-appreciate-ceramic-figurines',
    '鉴赏陶瓷公仔需要从多个方面考量...'::TEXT, 'Appreciating ceramic figurines requires considering multiple aspects...'::TEXT,
    '陶瓷公仔鉴赏指南', 'Guide to appreciating ceramic figurines',
    'https://via.placeholder.com/800x400', '黄松坚',
    true, NOW())
ON CONFLICT (slug) DO NOTHING;

-- 验证数据
DO $$
BEGIN
    RAISE NOTICE 'Schema: shiwan_ceramics created successfully!';

    SELECT COUNT(*) INTO STRICT category_count FROM shiwan_ceramics.categories;
    RAISE NOTICE 'Categories: %', category_count;

    SELECT COUNT(*) INTO STRICT master_count FROM shiwan_ceramics.masters;
    RAISE NOTICE 'Masters: %', master_count;

    SELECT COUNT(*) INTO STRICT product_count FROM shiwan_ceramics.products;
    RAISE NOTICE 'Products: %', product_count;

    SELECT COUNT(*) INTO STRICT blog_count FROM shiwan_ceramics.blogs;
    RAISE NOTICE 'Blogs: %', blog_count;
END $$;
