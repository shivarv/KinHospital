import { httpClient } from '@/services/httpClient'
import type { BookingConfirmation, BookingRequest, ConsultationInfo, Slot } from '../types'

export const bookingApi = {
  info: () => httpClient.get<ConsultationInfo>('/consultations/info'),
  slots: (date: string, timeZone: string) =>
    httpClient.get<Slot[]>(
      `/consultations/slots?${new URLSearchParams({ date, tz: timeZone }).toString()}`,
    ),
  book: (data: BookingRequest) => httpClient.post<BookingConfirmation>('/consultations/bookings', data),
}
