import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ButtonLink } from '@/components/ui'
import { BrandMark } from './BrandMark'

const NAV = [
  { to: '/book', label: 'Consultation' },
  { to: '/diet-plan', label: 'Diet charts' },
  { to: '/products', label: 'Products' },
]

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-[0.95rem] transition-colors ${isActive ? 'text-forest-900 font-medium' : 'text-muted hover:text-forest-900'}`

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <BrandMark />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <ButtonLink to="/book" size="sm">
            Book consultation
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="rounded-full p-2 text-forest-900 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line/70 px-5 pb-5 md:hidden">
          <ul className="flex flex-col gap-1 pt-3">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={linkClass} onClick={() => setOpen(false)}>
                  <span className="block py-2">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <ButtonLink to="/book" className="mt-3 w-full" onClick={() => setOpen(false)}>
            Book consultation
          </ButtonLink>
        </nav>
      )}
    </header>
  )
}
