import { getProducts, getBlogs } from '@/lib/strapi'
import Image from 'next/image'

interface HomePageProps {
  params: { lang: string }
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = params

  const [products, blogs] = await Promise.all([
    getProducts(lang, 1, 6),
    getBlogs(lang, 1, 3),
  ])

  const t = lang === 'zh' ? {
    title: '探索千年陶艺',
    subtitle: '传承石湾陶瓷文化，收藏精美陶瓷公仔',
    viewAll: '查看全部',
    featuredProducts: '精选产品',
    latestBlogs: '最新文章',
    readMore: '阅读更多',
    price: '价格',
  } : {
    title: 'Explore Millennium Ceramics',
    subtitle: 'Inherit Shiwan ceramic culture, collect exquisite ceramic dolls',
    viewAll: 'View All',
    featuredProducts: 'Featured Products',
    latestBlogs: 'Latest Articles',
    readMore: 'Read More',
    price: 'Price',
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.data.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative aspect-square bg-gray-100">
                  {product.images.length > 0 && (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-orange-600 mb-2">
                    ${product.price}
                  </p>
                  <a
                    href={`/${lang}/products/${product.slug}`}
                    className="block w-full text-center bg-orange-600 text-white py-2 px-4 rounded-md font-medium hover:bg-orange-700 transition-colors"
                  >
                    {t.viewAll}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href={`/${lang}/products`}
              className="inline-block bg-white text-gray-900 border-2 border-gray-900 py-3 px-8 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              {t.viewAll} &rarr;
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {t.featureedProducts}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.data.map((blog) => (
              <div key={blog.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                {blog.coverImage && (
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <Image
                      src={blog.coverImage.url}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {blog.publishedDate.split('T')[0]}
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>
                  <a
                    href={`/${lang}/blog/${blog.slug}`}
                    className="text-orange-600 font-medium hover:text-orange-700 transition-colors"
                  >
                    {t.readMore} &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
