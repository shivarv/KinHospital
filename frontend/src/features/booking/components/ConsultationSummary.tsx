import { CalendarDays, Check, Video } from 'lucide-react'
import { Spinner } from '@/components/ui'
import { formatPrice } from '@/utils/format'
import { useConsultationInfo } from '../hooks/useBooking'

const INCLUDES = [
  'Detailed health and lifestyle assessment',
  'Personalised Ayurveda-based guidance',
  'Diet and lifestyle recommendations',
  'An individual wellness plan',
  'Follow-up recommendations',
]

export function ConsultationSummary() {
  const { data: info, isPending } = useConsultationInfo()

  return (
    <aside className="rounded-arch bg-sage-200/70 px-7 pb-8 pt-14 text-center">
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-paper">
        <CalendarDays className="size-5 text-forest-700" strokeWidth={1.5} aria-hidden />
      </span>
      <h2 className="mt-4 text-xl">Initial consultation</h2>
      {isPending || !info ? (
        <div className="mt-4"><Spinner /></div>
      ) : (
        <>
          <p className="mt-2 font-display text-4xl text-forest-900">
            {formatPrice(info.consultation_fee, info.currency)}
          </p>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
            <Video className="size-4" aria-hidden />
            {info.consultation_duration_label}
          </p>
        </>
      )}
      <ul className="mt-7 space-y-2.5 text-left text-sm">
        {INCLUDES.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-forest-700" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  )
}
