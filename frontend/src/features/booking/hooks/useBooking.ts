import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { bookingApi } from '../api/bookingApi'
import type { BookingRequest } from '../types'

export const bookingKeys = {
  info: ['consultation-info'] as const,
  slots: (date: string, tz: string) => ['consultation-slots', date, tz] as const,
}

export function useConsultationInfo() {
  return useQuery({ queryKey: bookingKeys.info, queryFn: bookingApi.info, staleTime: 5 * 60_000 })
}

export function useSlots(date: string, timeZone: string) {
  return useQuery({
    queryKey: bookingKeys.slots(date, timeZone),
    queryFn: () => bookingApi.slots(date, timeZone),
    enabled: Boolean(date && timeZone),
    staleTime: 0,
  })
}

export function useBookConsultation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: BookingRequest) => bookingApi.book(data),
    // Booked (or just-taken) slots should disappear from every slot list.
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['consultation-slots'] }),
  })
}
