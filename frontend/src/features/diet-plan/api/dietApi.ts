import { httpClient } from '@/services/httpClient'
import type { DietCondition, DietType } from '../types'

export const dietApi = {
  conditions: () => httpClient.get<DietCondition[]>('/diet/conditions'),
  chart: (condition: string, dietType: DietType, name?: string) => {
    const params = new URLSearchParams({ condition, diet_type: dietType })
    if (name?.trim()) params.set('name', name.trim())
    return httpClient.blob(`/diet/chart?${params.toString()}`)
  },
}
