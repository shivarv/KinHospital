import { Flower2, Leaf, Salad } from 'lucide-react'

/** Decorative arch composition for the home hero. */
export function HeroArt() {
  return (
    <div aria-hidden className="relative mx-auto h-[26rem] w-full max-w-md select-none sm:h-[30rem]">
      {/* Main arch */}
      <div className="absolute inset-y-0 left-[12%] w-[62%] overflow-hidden rounded-arch bg-gradient-to-b from-sage-200 to-sage-300">
        <Leaf className="absolute -right-6 top-16 size-56 rotate-12 text-forest-700/10" strokeWidth={0.75} />
        <p className="absolute left-6 top-10 font-script text-5xl leading-[0.9] text-forest-900 sm:text-6xl">
          Wellness
          <br />
          without
          <br />
          borders
        </p>
      </div>

      {/* Side arches */}
      <div className="absolute bottom-6 right-0 grid h-[46%] w-[34%] place-items-center rounded-arch bg-care-rose">
        <Flower2 className="size-12 text-care-rose-ink" strokeWidth={1} />
      </div>
      <div className="absolute bottom-0 left-0 grid h-[30%] w-[26%] place-items-center rounded-arch bg-care-sand">
        <Salad className="size-10 text-care-sand-ink" strokeWidth={1} />
      </div>

      {/* Book stack */}
      <div className="absolute bottom-10 left-[30%] w-[52%] space-y-1.5">
        {['Better habits', 'Brighter days', 'A healthier you'].map((t, i) => (
          <div
            key={t}
            className="rounded-md border border-forest-900/10 bg-paper px-4 py-2 font-display text-sm text-forest-900 shadow-[0_1px_0_rgba(23,59,44,0.08)]"
            style={{ marginLeft: `${i * 6}%` }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}
