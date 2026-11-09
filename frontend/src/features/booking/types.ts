import type { CareAreaSlug } from '@/features/care-areas'

/** Mirrors backend `PublicClinicSettings`. */
export interface ConsultationInfo {
  clinic_name: string
  timezone: string
  slot_minutes: number
  booking_window_days: number
  consultation_fee: string
  currency: string
  consultation_duration_label: string
}

export interface Slot {
  start: string // UTC ISO
  end: string
  label: string // e.g. "9:30 AM" in the patient's time zone
}

export type Gender = 'female' | 'male' | 'other' | 'prefer_not_to_say'
export type Concern = CareAreaSlug | 'other'

export interface BookingRequest {
  full_name: string
  age: number
  gender: Gender
  country: string
  phone: string
  email: string
  preferred_language: string | null
  patient_timezone: string
  start_at: string
  concerns: Concern[]
  message: string
}

export interface BookingConfirmation {
  reference: string
  full_name: string
  email: string
  start_at: string
  end_at: string
  patient_timezone: string
  status: string
}
