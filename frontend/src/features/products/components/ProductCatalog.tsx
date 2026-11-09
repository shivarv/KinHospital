import { useState } from 'react'
import { EmptyState, ErrorMessage, Spinner } from '@/components/ui'
import { PRODUCT_CATEGORIES } from '../categories'
import { useProducts } from '../hooks/useProducts'
import type { ProductCategory } from '../types'
import { ProductCard } from './ProductCard'

type Filter = ProductCategory | 'all'

export function ProductCatalog() {
  const { data: products, isPending, error } = useProducts()
  const [filter, setFilter] = useState<Filter>('all')

  const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All products' },
    ...PRODUCT_CATEGORIES.map((c) => ({ value: c.value, label: c.label })),
  ]
  const visible = products?.filter((p) => filter === 'all' || p.category === filter) ?? []

  return (
    <div className="space-y-8">
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === f.value
                ? 'border-forest-700 bg-forest-700 text-cream'
                : 'border-line bg-paper text-ink hover:border-forest-500'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isPending && <Spinner label="Loading products" />}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {products && visible.length === 0 && <EmptyState>No products in this category yet.</EmptyState>}

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  )
}
