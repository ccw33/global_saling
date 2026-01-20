-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_en" TEXT,
    "name_zh_tw" TEXT,
    "description" TEXT NOT NULL,
    "description_en" TEXT,
    "description_zh_tw" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],
    "category" TEXT NOT NULL,
    "master" TEXT,
    "size" TEXT,
    "weight" TEXT,
    "material" TEXT,
    "story" TEXT,
    "story_en" TEXT,
    "story_zh_tw" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand_histories" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_en" TEXT,
    "title_zh_tw" TEXT,
    "content" TEXT NOT NULL,
    "content_en" TEXT,
    "content_zh_tw" TEXT,
    "period" TEXT NOT NULL,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "brand_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "masters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "bio_en" TEXT,
    "bio_zh_tw" TEXT,
    "style" TEXT NOT NULL,
    "style_en" TEXT,
    "style_zh_tw" TEXT,
    "avatar" TEXT,
    "artworks" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "masters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_stories" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "title_en" TEXT,
    "title_zh_tw" TEXT,
    "content" TEXT NOT NULL,
    "content_en" TEXT,
    "content_zh_tw" TEXT,
    "images" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_stories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_configs" (
    "id" TEXT NOT NULL,
    "wechat_id" TEXT,
    "wechat_qrcode" TEXT,
    "wechat_label" TEXT NOT NULL,
    "wechat_label_en" TEXT,
    "wechat_label_zh_tw" TEXT,
    "whatsapp_number" TEXT,
    "whatsapp_qrcode" TEXT,
    "whatsapp_label" TEXT NOT NULL,
    "whatsapp_label_en" TEXT,
    "whatsapp_label_zh_tw" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exchange_rates" (
    "id" TEXT NOT NULL,
    "from_currency" TEXT NOT NULL,
    "to_currency" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exchange_rates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exchange_rates_from_currency_to_currency_key" ON "exchange_rates"("from_currency", "to_currency");
