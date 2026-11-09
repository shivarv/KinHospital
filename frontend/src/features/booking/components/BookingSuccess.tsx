import { CircleCheck } from 'lucide-react'
import { ButtonLink } from '@/components/ui'
import { formatDateTime } from '@/utils/format'
import type { BookingConfirmation } from '../types'

export function BookingSuccess({ booking }: { booking: BookingConfirmation }) {
  return (
    <section aria-live="polite" className="rounded-3xl border border-line bg-paper p-8 text-center sm:p-12">
      <CircleCheck className="mx-auto size-12 text-forest-700" strokeWidth={1.25} aria-hidden />
      <h2 className="mt-5 text-3xl">Consultation booked</h2>
      <p className="mx-auto mt-3 max-w-md text-muted">
        Thank you, {booking.full_name.split(' ')[0]}. We'll confirm your appointment at{' '}
        <span className="text-ink">{booking.email}</span> and share the video link before your session.
      </p>

      <dl className="mx-auto mt-8 grid max-w-md gap-4 rounded-2xl bg-sage-100 p-5 text-left sm:grid-cols-2">
        <div>
          <dt className="text-xs text-muted">Booking reference</dt>
          <dd className="mt-1 font-medium tracking-wide text-forest-900">{booking.reference}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Your time</dt>
          <dd className="mt-1 font-medium text-forest-900">
            {formatDateTime(booking.start_at, booking.patient_timezone)}
          </dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/diet-plan" variant="secondary">Get a free diet chart</ButtonLink>
        <ButtonLink to="/" variant="ghost">Back to home</ButtonLink>
      </div>
    </section>
  )
}
