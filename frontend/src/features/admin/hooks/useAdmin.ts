import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ProductInput } from '@/features/products'
import { adminApi } from '../api/adminApi'
import type { AppointmentStatus, ClinicSettings, WeeklyHours } from '../types'

export const adminKeys = {
  settings: ['admin', 'settings'] as const,
  weeklyHours: ['admin', 'weekly-hours'] as const,
  holidays: ['admin', 'holidays'] as const,
  appointments: (filters: object) => ['admin', 'appointments', filters] as const,
  products: ['admin', 'products'] as const,
}

// Settings & schedule ------------------------------------------------------

export function useClinicSettings() {
  return useQuery({ queryKey: adminKeys.settings, queryFn: adminApi.settings })
}

export function useUpdateClinicSettings() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<ClinicSettings>) => adminApi.updateSettings(data),
    onSuccess: (data) => {
      qc.setQueryData(adminKeys.settings, data)
      qc.invalidateQueries({ queryKey: ['consultation-info'] })
    },
  })
}

export function useWeeklyHours() {
  return useQuery({ queryKey: adminKeys.weeklyHours, queryFn: adminApi.weeklyHours })
}

export function useUpdateWeeklyHours() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (days: WeeklyHours[]) => adminApi.updateWeeklyHours(days),
    onSuccess: (data) => qc.setQueryData(adminKeys.weeklyHours, data),
  })
}

export function useHolidays() {
  return useQuery({ queryKey: adminKeys.holidays, queryFn: adminApi.holidays })
}

export function useAddHoliday() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ date, reason }: { date: string; reason: string | null }) => adminApi.addHoliday(date, reason),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.holidays }),
  })
}

export function useRemoveHoliday() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminApi.removeHoliday(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.holidays }),
  })
}

// Appointments -------------------------------------------------------------

export function useAppointments(filters: { status?: AppointmentStatus; start_from?: string }) {
  return useQuery({ queryKey: adminKeys.appointments(filters), queryFn: () => adminApi.appointments(filters) })
}

export function useUpdateAppointment() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number; status?: AppointmentStatus; admin_notes?: string | null }) =>
      adminApi.updateAppointment(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'appointments'] }),
  })
}

// Products -----------------------------------------------------------------

export function useAdminProducts() {
  return useQuery({ queryKey: adminKeys.products, queryFn: adminApi.products })
}

function useProductMutation<TVars>(fn: (vars: TVars) => Promise<unknown>) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: adminKeys.products })
      qc.invalidateQueries({ queryKey: ['products', 'public'] })
    },
  })
}

export const useCreateProduct = () => useProductMutation((data: ProductInput) => adminApi.createProduct(data))
export const useUpdateProduct = () =>
  useProductMutation(({ id, data }: { id: number; data: Partial<ProductInput> }) => adminApi.updateProduct(id, data))
export const useDeleteProduct = () => useProductMutation((id: number) => adminApi.deleteProduct(id))
