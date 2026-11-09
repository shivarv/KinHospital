import { Check } from 'lucide-react'

const CHECKLIST = [
  'Your main concern and how long you have had it',
  'Current medicines and supplements',
  'Recent reports: blood tests, scans',
  'A rough outline of your daily routine',
  "For women's health: cycle details",
  'For skin and hair: clear photos',
]

export function BeforeYouConsult() {
  return (
    <div className="rounded-3xl border border-line bg-paper p-7">
      <h2 className="text-xl">Before your first consultation</h2>
      <p className="mt-1 text-sm text-muted">Having these ready makes your session more useful.</p>
      <ul className="mt-5 grid gap-2.5 text-sm sm:grid-cols-2">
        {CHECKLIST.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check className="mt-0.5 size-4 shrink-0 text-forest-700" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
