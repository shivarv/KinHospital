import { Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import { Button, EmptyState, ErrorMessage, SelectField, Spinner } from '@/components/ui'
import { findCareArea } from '@/features/care-areas'
import { formatDateTime } from '@/utils/format'
import { useAppointments, useClinicSettings, useUpdateAppointment } from '../hooks/useAdmin'
import type { Appointment, AppointmentStatus } from '../types'

const STATUS_OPTIONS: { value: AppointmentStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const STATUS_STYLE: Record<AppointmentStatus, string> = {
  pending: 'bg-care-sand text-care-sand-ink',
  confirmed: 'bg-care-green text-care-green-ink',
  completed: 'bg-care-mist text-care-mist-ink',
  cancelled: 'bg-line text-muted',
}

/** "Upcoming" includes appointments that started up to an hour ago. */
const upcomingFrom = () => new Date(Date.now() - 3600_000).toISOString()

export function AppointmentsPanel() {
  const [range, setRange] = useState<'upcoming' | 'all'>('upcoming')
  const [status, setStatus] = useState<AppointmentStatus | ''>('')
  // Captured when the range changes, so the query key stays stable between renders.
  const [startFrom, setStartFrom] = useState<string | undefined>(upcomingFrom)

  const chooseRange = (r: 'upcoming' | 'all') => {
    setRange(r)
    setStartFrom(r === 'upcoming' ? upcomingFrom() : undefined)
  }

  const { data: settings } = useClinicSettings()
  const { data: appointments, isPending, error } = useAppointments({ status: status || undefined, start_from: startFrom })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div role="group" aria-label="Date range" className="flex rounded-full border border-line bg-paper p-1">
          {(['upcoming', 'all'] as const).map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={range === r}
              onClick={() => chooseRange(r)}
              className={`rounded-full px-4 py-1.5 text-sm ${range === r ? 'bg-forest-700 text-cream' : 'text-muted'}`}
            >
              {r === 'upcoming' ? 'Upcoming' : 'All'}
            </button>
          ))}
        </div>
        <div className="w-48">
          <SelectField
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as AppointmentStatus | '')}
            options={[{ value: '', label: 'Any status' }, ...STATUS_OPTIONS]}
          />
        </div>
      </div>

      {isPending && <Spinner label="Loading appointments" />}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {appointments?.length === 0 && <EmptyState>No appointments match these filters.</EmptyState>}

      <ul className="space-y-4">
        {appointments?.map((a) => (
          <li key={a.id}>
            <AppointmentCard appointment={a} clinicTimeZone={settings?.timezone ?? 'UTC'} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function AppointmentCard({ appointment: a, clinicTimeZone }: { appointment: Appointment; clinicTimeZone: string }) {
  const update = useUpdateAppointment()
  const [notes, setNotes] = useState(a.admin_notes ?? '')

  return (
    <article className="rounded-2xl border border-line bg-paper p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-display text-lg text-forest-900">{formatDateTime(a.start_at, clinicTimeZone)}</p>
          <p className="text-xs text-muted">
            Clinic time · patient's time {formatDateTime(a.start_at, a.patient_timezone)} ({a.patient_timezone})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[a.status]}`}>{a.status}</span>
          <select
            aria-label={`Change status for ${a.full_name}`}
            value={a.status}
            disabled={update.isPending}
            onChange={(e) => update.mutate({ id: a.id, status: e.target.value as AppointmentStatus })}
            className="rounded-lg border border-line bg-paper px-2 py-1.5 text-sm"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-1 text-sm">
          <p className="font-medium text-ink">
            {a.full_name} <span className="font-normal text-muted">· {a.age} · {a.gender.replaceAll('_', ' ')} · {a.country}</span>
          </p>
          <p className="flex items-center gap-1.5 text-muted"><Phone className="size-3.5" aria-hidden /> {a.phone}</p>
          <p className="flex items-center gap-1.5 text-muted"><Mail className="size-3.5" aria-hidden /> {a.email}</p>
          {a.preferred_language && <p className="text-muted">Language: {a.preferred_language}</p>}
          <p className="text-xs text-muted">Ref {a.reference}</p>
        </div>
        <div className="space-y-3 text-sm">
          <ul className="flex flex-wrap gap-1.5">
            {a.concerns.map((c) => {
              const area = findCareArea(c)
              return (
                <li key={c} className={`rounded-full px-2.5 py-0.5 text-xs ${area ? `${area.tint.surface} ${area.tint.ink}` : 'bg-line text-muted'}`}>
                  {area?.title ?? 'Other'}
                </li>
              )
            })}
          </ul>
          <p className="whitespace-pre-line text-ink/85">{a.message}</p>
          <div className="flex gap-2">
            <input
              aria-label="Doctor's notes"
              placeholder="Add a private note"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-line bg-paper px-3 py-1.5 text-sm"
            />
            <Button
              size="sm"
              variant="secondary"
              disabled={update.isPending || notes === (a.admin_notes ?? '')}
              onClick={() => update.mutate({ id: a.id, admin_notes: notes || null })}
            >
              Save note
            </Button>
          </div>
          {update.error && <ErrorMessage>{update.error.message}</ErrorMessage>}
        </div>
      </div>
    </article>
  )
}
