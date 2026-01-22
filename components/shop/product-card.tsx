import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    description: string
    price: number
    stock: number
    images: string[]
    category?: string | null
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { id, name, slug, description, price, stock, images } = product
  const imageUrl = images[0] || '/placeholder-product.png'

  return (
    <Link href={`/products/${slug}`}>
      <div className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-2xl font-bold text-white">已售罄</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              ${price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">
              库存: {stock}
            </span>
          </div>

          {category && (
            <div className="mt-3">
              <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                {category}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
