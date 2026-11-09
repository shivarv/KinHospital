import { Link } from 'react-router-dom'
import { BrandMark } from './BrandMark'

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-forest-900 text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandMark inverted />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Personalised Ayurveda, nutrition and lifestyle guidance, online from wherever you are.
          </p>
        </div>
        <div>
          <h2 className="font-sans text-sm font-medium text-cream">Care</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="hover:text-cream" to="/book">Book a consultation</Link></li>
            <li><Link className="hover:text-cream" to="/diet-plan">Diet charts</Link></li>
            <li><Link className="hover:text-cream" to="/products">Wellness products</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-sm font-medium text-cream">Clinic</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>Online consultations worldwide</li>
            <li><Link className="hover:text-cream" to="/admin">Staff sign in</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs tracking-label text-cream/60">ROOT. REVIVE. THRIVE.</p>
      </div>
    </footer>
  )
}
