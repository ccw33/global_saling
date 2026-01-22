import { prisma } from '@/lib/db'
import { ProductCard } from '@/components/shop/product-card'

export const revalidate = 3600

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">商品列表</h1>
          <p className="text-muted-foreground">
            浏览我们的精选石湾陶瓷公仔，每一件都是独一无二的艺术品
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              暂无商品，敬请期待
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
