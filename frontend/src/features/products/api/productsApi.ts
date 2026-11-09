import { httpClient } from '@/services/httpClient'
import type { Product, ProductCategory } from '../types'

export const productsApi = {
  list: (category?: ProductCategory) =>
    httpClient.get<Product[]>(category ? `/products/?category=${category}` : '/products/'),
}
