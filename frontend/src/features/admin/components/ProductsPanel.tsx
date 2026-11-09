import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button, EmptyState, ErrorMessage, Spinner } from '@/components/ui'
import { categoryMeta, type Product, type ProductInput } from '@/features/products'
import { formatPrice } from '@/utils/format'
import { useAdminProducts, useCreateProduct, useDeleteProduct, useUpdateProduct } from '../hooks/useAdmin'
import { ProductForm } from './ProductForm'

type Editing = { mode: 'new' } | { mode: 'edit'; product: Product } | null

export function ProductsPanel() {
  const { data: products, isPending, error } = useAdminProducts()
  const create = useCreateProduct()
  const update = useUpdateProduct()
  const remove = useDeleteProduct()
  const [editing, setEditing] = useState<Editing>(null)

  const close = () => {
    setEditing(null)
    create.reset()
    update.reset()
  }

  const onSubmit = (data: ProductInput) => {
    if (editing?.mode === 'edit') update.mutate({ id: editing.product.id, data }, { onSuccess: close })
    else create.mutate(data, { onSuccess: close })
  }

  const onDelete = (p: Product) => {
    if (window.confirm(`Delete "${p.name}"? This can't be undone. To hide it instead, untick "Show on website".`)) {
      remove.mutate(p.id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted">Products shown on the public Products page. Hidden products stay here.</p>
        {!editing && (
          <Button onClick={() => setEditing({ mode: 'new' })} icon={<Plus className="size-4" aria-hidden />}>
            Add product
          </Button>
        )}
      </div>

      {editing && (
        <ProductForm
          key={editing.mode === 'edit' ? editing.product.id : 'new'}
          product={editing.mode === 'edit' ? editing.product : undefined}
          pending={create.isPending || update.isPending}
          error={(create.error ?? update.error)?.message}
          onSubmit={onSubmit}
          onCancel={close}
        />
      )}

      {isPending && <Spinner label="Loading products" />}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {remove.error && <ErrorMessage>{remove.error.message}</ErrorMessage>}
      {products?.length === 0 && <EmptyState>No products yet. Add your first one.</EmptyState>}

      {products && products.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-line bg-paper">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="border-b border-line text-xs text-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Product</th>
                <th scope="col" className="px-4 py-3 font-medium">Category</th>
                <th scope="col" className="px-4 py-3 font-medium">Price</th>
                <th scope="col" className="px-4 py-3 font-medium">Status</th>
                <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {products.map((p) => (
                <tr key={p.id} className={p.is_active ? '' : 'text-muted'}>
                  <td className="px-4 py-3">
                    <p className="font-medium">{p.name}</p>
                    {p.pack_size && <p className="text-xs text-muted">{p.pack_size}</p>}
                  </td>
                  <td className="px-4 py-3">{categoryMeta(p.category).label}</td>
                  <td className="px-4 py-3">{formatPrice(p.price, p.currency)}</td>
                  <td className="px-4 py-3">
                    {p.is_active ? (p.in_stock ? 'Live' : 'Live · out of stock') : 'Hidden'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button size="sm" variant="ghost" aria-label={`Edit ${p.name}`} onClick={() => setEditing({ mode: 'edit', product: p })}>
                        <Pencil className="size-4" aria-hidden />
                      </Button>
                      <Button size="sm" variant="ghost" aria-label={`Delete ${p.name}`} disabled={remove.isPending} onClick={() => onDelete(p)}>
                        <Trash2 className="size-4" aria-hidden />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
