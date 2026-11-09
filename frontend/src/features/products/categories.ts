import { Droplets, Pill, Sparkles, type LucideIcon } from 'lucide-react'
import type { ProductCategory } from './types'

export const PRODUCT_CATEGORIES: {
  value: ProductCategory
  label: string
  icon: LucideIcon
  surface: string
  ink: string
}[] = [
  { value: 'homeopathy', label: 'Homeopathy', icon: Droplets, surface: 'bg-care-mist', ink: 'text-care-mist-ink' },
  { value: 'hair_supplement', label: 'Hair supplements', icon: Sparkles, surface: 'bg-care-mint', ink: 'text-care-mint-ink' },
  { value: 'supplement', label: 'Supplements', icon: Pill, surface: 'bg-care-sand', ink: 'text-care-sand-ink' },
]

export function categoryMeta(value: ProductCategory) {
  return PRODUCT_CATEGORIES.find((c) => c.value === value) ?? PRODUCT_CATEGORIES[0]
}
