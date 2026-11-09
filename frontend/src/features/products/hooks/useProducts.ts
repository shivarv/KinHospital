import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/productsApi'

/** Public list of active products. Filtering by category happens client-side. */
export function useProducts() {
  return useQuery({ queryKey: ['products', 'public'], queryFn: () => productsApi.list() })
}
