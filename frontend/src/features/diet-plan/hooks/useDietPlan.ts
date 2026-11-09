import { useMutation, useQuery } from '@tanstack/react-query'
import { saveBlob } from '@/utils/format'
import { dietApi } from '../api/dietApi'
import type { DietType } from '../types'

export function useDietConditions() {
  return useQuery({ queryKey: ['diet-conditions'], queryFn: dietApi.conditions, staleTime: 10 * 60_000 })
}

export function useDownloadDietChart() {
  return useMutation({
    mutationFn: async ({ condition, dietType, name }: { condition: string; dietType: DietType; name?: string }) => {
      const blob = await dietApi.chart(condition, dietType, name)
      saveBlob(blob, `kin-diet-chart-${condition}-${dietType === 'veg' ? 'veg' : 'non-veg'}.pdf`)
    },
  })
}
