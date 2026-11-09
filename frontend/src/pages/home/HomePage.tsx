import { ArrowRight, CalendarCheck, FileText, Flower2, Globe, Leaf, Salad, ShoppingBag, Soup } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui'
import { HowItWorks } from '@/features/booking'
import { CareAreaGrid } from '@/features/care-areas'
import { HeroArt } from './HeroArt'

const HIGHLIGHTS = [
  { icon: Leaf, label: 'Ayurveda-based care' },
  { icon: Soup, label: 'Customised diet charts' },
  { icon: Flower2, label: 'Lifestyle guidance' },
  { icon: Globe, label: 'Consult from anywhere' },
]

// Edit these figures to match the clinic's real numbers.
const STATS = [
  { value: '10,000+', label: 'Patients supported worldwide' },
  { value: '20+', label: 'Experienced team members' },
  { value: '15+', label: 'Countries, from India and the UAE to the UK and USA' },
  { value: '95%', label: 'Patient satisfaction' },
]

const SERVICES = [
  {
    icon: CalendarCheck,
    title: 'Consultation',
    text: 'A one-to-one video consultation with personalised Ayurveda, diet and lifestyle guidance.',
    cta: 'Book consultation',
    to: '/book',
    surface: 'bg-care-green',
  },
  {
    icon: FileText,
    title: 'Customised diet charts',
    text: 'Pick a concern like hair fall, acne or thyroid, choose veg or non-veg, and download your chart.',
    cta: 'Get your diet chart',
    to: '/diet-plan',
    surface: 'bg-care-sand',
  },
  {
    icon: ShoppingBag,
    title: 'Wellness products',
    text: 'Homeopathy remedies, hair supplements and everyday supplements, chosen by our practitioners.',
    cta: 'See products',
    to: '/products',
    surface: 'bg-care-mint',
  },
]

export function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div>
          <p className="text-xs font-medium tracking-label text-forest-500">ROOT. REVIVE. THRIVE.</p>
          <h1 className="mt-5 text-5xl leading-[1.05] sm:text-6xl">Holistic care for a brighter you</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Personalised Ayurveda, nutrition and lifestyle guidance from KIN practitioners, by video, wherever you
            are in the world.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/book" size="lg">Book consultation</ButtonLink>
            <ButtonLink to="/diet-plan" size="lg" variant="secondary">Get a diet chart</ButtonLink>
          </div>
          <ul className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col gap-2 text-sm text-ink/80">
                <Icon className="size-5 text-forest-700" strokeWidth={1.5} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>
        <HeroArt />
      </section>

      {/* Stats */}
      <section aria-label="KIN in numbers" className="border-y border-line bg-paper">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-5 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.value} className="px-3 md:border-l md:border-line md:first:border-l-0">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-4xl text-forest-900">{s.value}</span>
                <span className="mt-1 block max-w-48 text-sm text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <h2 className="max-w-xl text-4xl">Everything you need, in one place</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, text, cta, to, surface }) => (
            <li key={title} className="flex flex-col rounded-3xl border border-line bg-paper p-7">
              <span className={`grid size-12 place-items-center rounded-full ${surface}`}>
                <Icon className="size-5 text-forest-700" strokeWidth={1.5} aria-hidden />
              </span>
              <h3 className="mt-6 text-2xl">{title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{text}</p>
              <ButtonLink to={to} className="mt-7 self-start" icon={<ArrowRight className="size-4" aria-hidden />}>
                {cta}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </section>

      {/* Focus areas */}
      <section className="mx-auto max-w-6xl px-5 pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl">Choose your focus</h2>
            <p className="mt-3 text-muted">
              Evidence-informed care for every chapter of life. Pick an area to book a consultation about it.
            </p>
          </div>
          <Link to="/book" className="text-sm font-medium text-forest-700 underline-offset-4 hover:underline">
            Not sure? Book a general consultation
          </Link>
        </div>
        <div className="mt-10">
          <CareAreaGrid />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 pt-24">
        <h2 className="text-4xl">How it works</h2>
        <div className="mt-10">
          <HowItWorks />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-6xl px-5 pt-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest-900 px-8 py-14 text-center sm:px-16">
          <Salad className="absolute -left-8 -top-8 size-48 text-cream/5" strokeWidth={0.75} aria-hidden />
          <p className="font-script text-4xl text-sage-300">Your wellness journey starts here</p>
          <h2 className="mx-auto mt-3 max-w-xl text-3xl text-cream sm:text-4xl">
            Talk to a KIN practitioner from the comfort of home
          </h2>
          <ButtonLink to="/book" size="lg" variant="light" className="mt-8">
            Book consultation
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
