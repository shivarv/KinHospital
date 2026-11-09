export type ProductCategory = 'homeopathy' | 'hair_supplement' | 'supplement'

/** Mirrors backend `ProductRead`. */
export interface Product {
  id: number
  name: string
  category: ProductCategory
  short_description: string
  description: string | null
  pack_size: string | null
  price: string
  currency: string
  image_url: string | null
  in_stock: boolean
  is_active: boolean
  sort_order: number
}

export type ProductInput = Omit<Product, 'id'>
