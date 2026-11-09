import { Link } from 'react-router-dom'

export function BrandMark({ inverted = false }: { inverted?: boolean }) {
  const ink = inverted ? 'text-cream' : 'text-forest-900'
  return (
    <Link to="/" className={`inline-flex flex-col leading-none ${ink}`} aria-label="KIN Wellness home">
      <span className="font-brand text-[1.7rem] font-semibold tracking-[0.08em]">KIN</span>
      <span className="mt-0.5 text-[0.6rem] font-medium tracking-label">WELLNESS</span>
    </Link>
  )
}
