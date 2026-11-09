import type { Gender } from '../types'

export const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]

export const LANGUAGE_OPTIONS = [
  'English', 'Hindi', 'Tamil', 'Malayalam', 'Telugu', 'Kannada', 'Marathi', 'Bengali', 'Gujarati', 'Arabic',
].map((l) => ({ value: l, label: l }))

export const COUNTRIES = [
  'India', 'United Arab Emirates', 'United Kingdom', 'United States', 'Canada', 'Australia', 'Singapore',
  'Malaysia', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'Sri Lanka', 'Nepal', 'Bangladesh',
  'New Zealand', 'Ireland', 'Germany', 'France', 'Netherlands', 'Switzerland', 'Sweden', 'Norway', 'Denmark',
  'Italy', 'Spain', 'Belgium', 'Austria', 'Poland', 'South Africa', 'Kenya', 'Nigeria', 'Mauritius',
  'Japan', 'South Korea', 'Hong Kong', 'Thailand', 'Indonesia', 'Philippines', 'Maldives', 'Fiji', 'Other',
].map((c) => ({ value: c, label: c }))

/** Every IANA zone the browser knows, with readable labels. */
export function timeZoneOptions(): { value: string; label: string }[] {
  const zones = typeof Intl.supportedValuesOf === 'function' ? Intl.supportedValuesOf('timeZone') : ['UTC']
  return zones.map((z) => ({ value: z, label: z.replaceAll('_', ' ') }))
}
