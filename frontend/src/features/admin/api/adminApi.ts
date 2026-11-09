import type { Product, ProductInput } from '@/features/products'
import { httpClient } from '@/services/httpClient'
import type { Appointment, AppointmentStatus, ClinicSettings, Holiday, TokenResponse, WeeklyHours } from '../types'

const A = '/admin'

export const adminApi = {
  login: (username: string, password: string) =>
    httpClient.post<TokenResponse>(`${A}/auth/login`, { username, password }),

  settings: () => httpClient.get<ClinicSettings>(`${A}/settings`),
  updateSettings: (data: Partial<ClinicSettings>) => httpClient.patch<ClinicSettings>(`${A}/settings`, data),

  weeklyHours: () => httpClient.get<WeeklyHours[]>(`${A}/availability`),
  updateWeeklyHours: (days: WeeklyHours[]) => httpClient.put<WeeklyHours[]>(`${A}/availability`, days),

  holidays: () => httpClient.get<Holiday[]>(`${A}/holidays`),
  addHoliday: (date: string, reason: string | null) => httpClient.post<Holiday>(`${A}/holidays`, { date, reason }),
  removeHoliday: (id: number) => httpClient.delete(`${A}/holidays/${id}`),

  appointments: (filters: { status?: AppointmentStatus; start_from?: string }) => {
    const params = new URLSearchParams()
    if (filters.status) params.set('status', filters.status)
    if (filters.start_from) params.set('start_from', filters.start_from)
    const qs = params.toString()
    return httpClient.get<Appointment[]>(`${A}/appointments/${qs ? `?${qs}` : ''}`)
  },
  updateAppointment: (id: number, data: { status?: AppointmentStatus; admin_notes?: string | null }) =>
    httpClient.patch<Appointment>(`${A}/appointments/${id}`, data),

  products: () => httpClient.get<Product[]>(`${A}/products/`),
  createProduct: (data: ProductInput) => httpClient.post<Product>(`${A}/products/`, data),
  updateProduct: (id: number, data: Partial<ProductInput>) => httpClient.patch<Product>(`${A}/products/${id}`, data),
  deleteProduct: (id: number) => httpClient.delete(`${A}/products/${id}`),
}
