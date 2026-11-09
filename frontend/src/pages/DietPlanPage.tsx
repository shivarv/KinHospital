import { PageIntro } from '@/components/layout/PageIntro'
import { ButtonLink } from '@/components/ui'
import { DietPlanForm } from '@/features/diet-plan'

export function DietPlanPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-12 md:pt-16">
      <PageIntro title="Customised diet charts">
        <p>Nutrition plans made for your goals. Choose a concern and your diet, then download a one-day plan as a PDF.</p>
      </PageIntro>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_20rem]">
        <div className="rounded-3xl border border-line bg-paper p-6 sm:p-9">
          <DietPlanForm />
        </div>
        <aside className="rounded-arch bg-care-sand px-7 pb-8 pt-14 lg:sticky lg:top-24">
          <h2 className="text-xl">Want a plan made just for you?</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/80">
            These charts are general guidance. In a consultation, your practitioner builds a plan around your health
            history, reports, routine and food preferences.
          </p>
          <ButtonLink to="/book" variant="secondary" className="mt-6">Book consultation</ButtonLink>
        </aside>
      </div>
    </div>
  )
}
