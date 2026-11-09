import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageIntro } from '@/components/layout/PageIntro'
import {
  BeforeYouConsult,
  BookingForm,
  BookingSuccess,
  ConsultationSummary,
  HowItWorks,
  type BookingConfirmation,
} from '@/features/booking'
import { findCareArea } from '@/features/care-areas'

export function BookConsultationPage() {
  const [params] = useSearchParams()
  const focus = findCareArea(params.get('focus'))
  const [booking, setBooking] = useState<BookingConfirmation | null>(null)

  const onBooked = (confirmation: BookingConfirmation) => {
    setBooking(confirmation)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (booking) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <BookingSuccess booking={booking} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-12 md:pt-16">
      <PageIntro title="Book your online consultation">
        <p>
          Take the first step towards a healthier, more balanced you. Times are shown in your own time zone, so
          there's nothing to convert.
        </p>
      </PageIntro>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[20rem_1fr]">
        <div className="space-y-6 lg:sticky lg:top-24">
          <ConsultationSummary />
        </div>
        <div className="rounded-3xl border border-line bg-paper p-6 sm:p-9">
          <BookingForm initialFocus={focus?.slug} onBooked={onBooked} />
        </div>
      </div>

      <section className="pt-20">
        <h2 className="text-3xl">How it works</h2>
        <div className="mt-10"><HowItWorks /></div>
      </section>

      <div className="pt-16">
        <BeforeYouConsult />
      </div>
    </div>
  )
}
