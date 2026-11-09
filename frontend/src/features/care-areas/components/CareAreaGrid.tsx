import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CARE_AREAS } from '../data'

/** The 8 focus areas. Each links to booking with that area pre-ticked. */
export function CareAreaGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARE_AREAS.map(({ slug, title, summary, details, icon: Icon, tint }) => (
        <li key={slug}>
          <Link
            to={`/book?focus=${slug}`}
            className="group flex h-full flex-col rounded-arch border border-line/60 bg-paper p-2 transition-colors hover:border-forest-500/40"
          >
            <div className={`flex h-36 items-end justify-center rounded-arch ${tint.surface}`}>
              <span className="mb-[-1.75rem] grid size-14 place-items-center rounded-full border-4 border-paper bg-paper">
                <Icon className={`size-6 ${tint.ink}`} strokeWidth={1.5} aria-hidden />
              </span>
            </div>
            <div className="flex flex-1 flex-col px-4 pb-4 pt-9 text-center">
              <h3 className="text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{summary}</p>
              <ul className="mt-4 space-y-1 text-left text-sm text-ink/80">
                {details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className={`mt-2 size-1 shrink-0 rounded-full ${tint.chip}`} aria-hidden />
                    {d}
                  </li>
                ))}
              </ul>
              <span className={`mt-auto inline-flex items-center justify-center gap-1.5 pt-5 text-sm font-medium ${tint.ink}`}>
                Book for this
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
