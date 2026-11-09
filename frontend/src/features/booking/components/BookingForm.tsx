import { useMemo, useState, type FormEvent } from 'react'
import { Button, CheckboxField, ErrorMessage, SelectField, TextAreaField, TextField } from '@/components/ui'
import { CARE_AREAS, type CareAreaSlug } from '@/features/care-areas'
import { ApiError } from '@/services/httpClient'
import { browserTimeZone, isoDateInZone } from '@/utils/format'
import { COUNTRIES, GENDER_OPTIONS, LANGUAGE_OPTIONS, timeZoneOptions } from '../data/options'
import { useBookConsultation, useConsultationInfo } from '../hooks/useBooking'
import type { BookingConfirmation, Concern, Gender } from '../types'
import { SlotPicker } from './SlotPicker'

const CONCERN_OPTIONS: { value: Concern; label: string }[] = [
  ...CARE_AREAS.map((a) => ({ value: a.slug, label: a.title })),
  { value: 'other', label: 'Other' },
]

/** "2026-11-08" -> "2026-11-09" (calendar arithmetic, no time zone involved). */
function nextDay(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + 1)
  return d.toISOString().slice(0, 10)
}

interface BookingFormProps {
  initialFocus?: CareAreaSlug
  onBooked: (confirmation: BookingConfirmation) => void
}

export function BookingForm({ initialFocus, onBooked }: BookingFormProps) {
  const { data: info } = useConsultationInfo()
  const book = useBookConsultation()
  const zones = useMemo(() => timeZoneOptions(), [])

  const [timeZone, setTimeZone] = useState(browserTimeZone)
  const [date, setDate] = useState(() => isoDateInZone(browserTimeZone()))
  const [slot, setSlot] = useState<string | null>(null)
  const [concerns, setConcerns] = useState<Concern[]>(initialFocus ? [initialFocus] : [])
  const [formError, setFormError] = useState<string | null>(null)
  const [details, setDetails] = useState({
    full_name: '',
    age: '',
    gender: '' as Gender | '',
    country: '',
    phone: '',
    email: '',
    preferred_language: 'English',
    message: '',
  })

  const set = (field: keyof typeof details) => (e: { target: { value: string } }) =>
    setDetails((prev) => ({ ...prev, [field]: e.target.value }))

  const toggleConcern = (value: Concern, checked: boolean) =>
    setConcerns((prev) => (checked ? [...prev, value] : prev.filter((c) => c !== value)))

  const minDate = isoDateInZone(timeZone)
  const maxDate = isoDateInZone(timeZone, info?.booking_window_days ?? 30)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)
    if (!slot) return setFormError('Pick a time for your consultation.')
    if (concerns.length === 0) return setFormError('Tick at least one area you would like help with.')
    if (!details.gender) return setFormError('Select your gender.')

    book.mutate(
      {
        ...details,
        gender: details.gender,
        age: Number(details.age),
        preferred_language: details.preferred_language || null,
        patient_timezone: timeZone,
        start_at: slot,
        concerns,
      },
      {
        onSuccess: onBooked,
        onError: (err) => {
          if (err instanceof ApiError && err.status === 409) setSlot(null)
        },
      },
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10" noValidate={false}>
      <section aria-labelledby="when-heading" className="space-y-5">
        <h2 id="when-heading" className="text-2xl">Choose a time</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Your time zone"
            hint="Times below are shown in this zone."
            value={timeZone}
            onChange={(e) => {
              setTimeZone(e.target.value)
              setDate(isoDateInZone(e.target.value))
              setSlot(null)
            }}
            options={zones}
          />
          <TextField
            label="Date"
            type="date"
            required
            min={minDate}
            max={maxDate}
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
              setSlot(null)
            }}
          />
        </div>
        <SlotPicker
          date={date}
          timeZone={timeZone}
          value={slot}
          onChange={setSlot}
          onNextDay={date < maxDate ? () => setDate(nextDay(date)) : undefined}
        />
      </section>

      <section aria-labelledby="about-heading" className="space-y-5">
        <h2 id="about-heading" className="text-2xl">About you</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Full name" required autoComplete="name" value={details.full_name} onChange={set('full_name')} />
          <TextField label="Age" type="number" required min={0} max={120} value={details.age} onChange={set('age')} />
          <SelectField label="Gender" required placeholder="Select" value={details.gender} onChange={set('gender')} options={GENDER_OPTIONS} />
          <SelectField label="Country" required placeholder="Select" value={details.country} onChange={set('country')} options={COUNTRIES} />
          <TextField
            label="Phone / WhatsApp"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={details.phone}
            onChange={set('phone')}
          />
          <TextField label="Email" type="email" required autoComplete="email" value={details.email} onChange={set('email')} />
          <SelectField
            label="Preferred language"
            value={details.preferred_language}
            onChange={set('preferred_language')}
            options={LANGUAGE_OPTIONS}
          />
        </div>
      </section>

      <section aria-labelledby="concern-heading" className="space-y-5">
        <div>
          <h2 id="concern-heading" className="text-2xl">What would you like help with?</h2>
          <p className="mt-1 text-sm text-muted">This helps your doctor prepare. Tick all that apply.</p>
        </div>
        <fieldset className="grid gap-3 sm:grid-cols-2">
          <legend className="sr-only">Areas of concern</legend>
          {CONCERN_OPTIONS.map((o) => (
            <CheckboxField
              key={o.value}
              label={o.label}
              checked={concerns.includes(o.value)}
              onChange={(checked) => toggleConcern(o.value, checked)}
            />
          ))}
        </fieldset>
        <TextAreaField
          label="Tell us briefly about your main concern"
          required
          minLength={3}
          maxLength={2000}
          placeholder="For example: irregular periods for 6 months, tired most days"
          value={details.message}
          onChange={set('message')}
        />
      </section>

      <div className="space-y-4 border-t border-line pt-6">
        {(formError || book.error) && <ErrorMessage>{formError ?? book.error?.message}</ErrorMessage>}
        <Button type="submit" size="lg" disabled={book.isPending} className="w-full sm:w-auto">
          {book.isPending ? 'Booking…' : 'Book consultation'}
        </Button>
      </div>
    </form>
  )
}
