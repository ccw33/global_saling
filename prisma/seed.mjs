import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  const products = [
    {
      name: '关羽像 - 传统经典款',
      slug: 'guan-yu-statue',
      description: '石湾传统陶瓷关羽像，展现忠义勇武的英雄气概。采用传统石湾陶艺技法，造型威严，神态生动。',
      price: 280.00,
      stock: 10,
      category: '传统经典系列',
      images: [
        'https://images.unsplash.com/photo-1555664444-778a69022365?w=800',
      ],
    },
    {
      name: '钟馗捉鬼 - 镇宅辟邪',
      slug: 'zhong-kui-catch-ghost',
      description: '石湾陶瓷钟馗像，造型生动传神，寓意镇宅辟邪，保平安。适合家居装饰和收藏。',
      price: 350.00,
      stock: 5,
      category: '传统经典系列',
      images: [
        'https://images.unsplash.com/photo-1555664444-778a69022365?w=800',
      ],
    },
    {
      name: '现代艺术陶瓷花瓶',
      slug: 'modern-art-vase',
      description: '现代简约风格陶瓷花瓶，将传统石湾陶艺与现代设计理念相结合，适合现代家居装饰。',
      price: 150.00,
      stock: 15,
      category: '现代创新系列',
      images: [
        'https://images.unsplash.com/photo-1555664444-778a69022365?w=800',
      ],
    },
    {
      name: '石湾猫 - 可爱吉祥',
      slug: 'shiwan-cat',
      description: '石湾陶瓷猫公仔，造型可爱活泼，寓意招财进宝，生活美满。',
      price: 88.00,
      stock: 20,
      category: '现代创新系列',
      images: [
        'https://images.unsplash.com/photo-1555664444-778a69022365?w=800',
      ],
    },
    {
      name: '潘玉书风格仕女',
      slug: 'pan-yushu-lady',
      description: '大师潘玉书风格陶瓷仕女像，造型优美，线条流畅，展现东方女性的温婉之美。',
      price: 580.00,
      stock: 3,
      category: '大师复刻款',
      images: [
        'https://images.unsplash.com/photo-1555664444-778a69022365?w=800',
      ],
    },
    {
      name: '陈渭岩风格罗汉',
      slug: 'chen-weiyan-arhat',
      description: '大师陈渭岩风格陶瓷罗汉像，神态各异，栩栩如生，展现了石湾陶艺的高超技法。',
      price: 420.00,
      stock: 4,
      category: '大师复刻款',
      images: [
        'https://images.unsplash.com/photo-1555664444-778a69022365?w=800',
      ],
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
