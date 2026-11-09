import { useState, type FormEvent } from 'react'
import { Button, CheckboxField, ErrorMessage, SelectField, TextAreaField, TextField } from '@/components/ui'
import { PRODUCT_CATEGORIES, type Product, type ProductInput } from '@/features/products'

const EMPTY: ProductInput = {
  name: '',
  category: 'homeopathy',
  short_description: '',
  description: null,
  pack_size: null,
  price: '',
  currency: 'USD',
  image_url: null,
  in_stock: true,
  is_active: true,
  sort_order: 0,
}

interface ProductFormProps {
  product?: Product
  pending: boolean
  error?: string
  onSubmit: (data: ProductInput) => void
  onCancel: () => void
}

export function ProductForm({ product, pending, error, onSubmit, onCancel }: ProductFormProps) {
  const [form, setForm] = useState<ProductInput>(() => {
    if (!product) return EMPTY
    const { id: _id, ...rest } = product
    return rest
  })

  const set = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))
  const text = (key: 'description' | 'pack_size' | 'image_url') => (e: { target: { value: string } }) =>
    set(key, e.target.value.trim() === '' ? null : e.target.value)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({ ...form, currency: form.currency.toUpperCase() })
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-forest-500/30 bg-sage-100/60 p-6 sm:grid-cols-2">
      <h3 className="text-lg sm:col-span-2">{product ? `Edit ${product.name}` : 'New product'}</h3>
      <TextField label="Name" required minLength={2} maxLength={150} value={form.name} onChange={(e) => set('name', e.target.value)} />
      <SelectField
        label="Category"
        value={form.category}
        onChange={(e) => set('category', e.target.value as ProductInput['category'])}
        options={PRODUCT_CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
      />
      <div className="sm:col-span-2">
        <TextField
          label="Short description"
          required
          minLength={2}
          maxLength={255}
          value={form.short_description}
          onChange={(e) => set('short_description', e.target.value)}
        />
      </div>
      <div className="sm:col-span-2">
        <TextAreaField label="Full description (optional)" value={form.description ?? ''} onChange={text('description')} />
      </div>
      <TextField label="Price" type="number" required min={0} step="0.01" value={form.price} onChange={(e) => set('price', e.target.value)} />
      <TextField label="Currency" required minLength={3} maxLength={3} value={form.currency} onChange={(e) => set('currency', e.target.value)} />
      <TextField label="Pack size (optional)" placeholder="60 tablets" maxLength={60} value={form.pack_size ?? ''} onChange={text('pack_size')} />
      <TextField
        label="Display order"
        type="number"
        hint="Lower numbers show first."
        value={form.sort_order}
        onChange={(e) => set('sort_order', Number(e.target.value))}
      />
      <div className="sm:col-span-2">
        <TextField label="Image URL (optional)" type="url" maxLength={500} value={form.image_url ?? ''} onChange={text('image_url')} />
      </div>
      <div className="flex flex-wrap gap-6 sm:col-span-2">
        <CheckboxField label="In stock" checked={form.in_stock} onChange={(v) => set('in_stock', v)} />
        <CheckboxField label="Show on website" checked={form.is_active} onChange={(v) => set('is_active', v)} />
      </div>
      {error && <div className="sm:col-span-2"><ErrorMessage>{error}</ErrorMessage></div>}
      <div className="flex gap-3 sm:col-span-2">
        <Button type="submit" disabled={pending}>{pending ? 'Saving…' : product ? 'Save changes' : 'Add product'}</Button>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}
