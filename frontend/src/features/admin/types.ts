export interface TokenResponse {
  access_token: string
  token_type: string
  expires_at: string
}

export interface ClinicSettings {
  clinic_name: string
  timezone: string
  slot_minutes: number
  booking_window_days: number
  min_notice_minutes: number
  consultation_fee: string
  currency: string
  consultation_duration_label: string
}

export interface WeeklyHours {
  day_of_week: number // 0 = Monday
  is_available: boolean
  start_time: string // "HH:MM" or "HH:MM:SS"
  end_time: string
}

export interface Holiday {
  id: number
  date: string
  reason: string | null
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export interface Appointment {
  id: number
  reference: string
  full_name: string
  age: number
  gender: string
  country: string
  phone: string
  email: string
  preferred_language: string | null
  patient_timezone: string
  start_at: string
  end_at: string
  concerns: string[]
  message: string
  status: AppointmentStatus
  admin_notes: string | null
  created_at: string
}
