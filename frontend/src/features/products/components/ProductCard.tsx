import { formatPrice } from '@/utils/format'
import { categoryMeta } from '../categories'
import type { Product } from '../types'

export function ProductCard({ product }: { product: Product }) {
  const meta = categoryMeta(product.category)
  const Icon = meta.icon

  return (
    <article className="flex h-full flex-col rounded-arch border border-line/60 bg-paper p-2">
      <div className={`grid h-44 place-items-center overflow-hidden rounded-arch ${meta.surface}`}>
        {product.image_url ? (
          <img src={product.image_url} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <Icon className={`size-10 ${meta.ink}`} strokeWidth={1.25} aria-hidden />
        )}
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
        <p className={`text-xs font-medium ${meta.ink}`}>{meta.label}</p>
        <h3 className="mt-1.5 text-lg leading-snug">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{product.short_description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="font-display text-xl text-forest-900">{formatPrice(product.price, product.currency)}</p>
            {product.pack_size && <p className="text-xs text-muted">{product.pack_size}</p>}
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs ${
              product.in_stock ? 'bg-sage-200 text-forest-700' : 'bg-line text-muted'
            }`}
          >
            {product.in_stock ? 'In stock' : 'Out of stock'}
          </span>
        </div>
      </div>
    </article>
  )
}
