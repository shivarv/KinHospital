export type DietType = 'veg' | 'nonveg'

/** Mirrors backend `DietConditionRead`. */
export interface DietCondition {
  slug: string
  name: string
  summary: string
}
