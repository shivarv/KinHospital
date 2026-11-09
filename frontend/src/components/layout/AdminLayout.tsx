import { CalendarClock, ClipboardList, LogOut, Package } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAdminSession } from '@/features/admin'
import { BrandMark } from './BrandMark'

const NAV = [
  { to: '/admin/appointments', label: 'Appointments', icon: ClipboardList },
  { to: '/admin/schedule', label: 'Schedule', icon: CalendarClock },
  { to: '/admin/products', label: 'Products', icon: Package },
]

export function AdminLayout() {
  const { signOut } = useAdminSession()

  return (
    <div className="min-h-dvh md:grid md:grid-cols-[15rem_1fr]">
      <aside className="border-b border-line bg-paper px-5 py-5 md:min-h-dvh md:border-b-0 md:border-r">
        <div className="flex items-center justify-between md:block">
          <BrandMark />
          <p className="text-xs text-muted md:mt-2">Admin</p>
        </div>
        <nav aria-label="Admin" className="mt-6 flex gap-1 overflow-x-auto md:flex-col">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm ${
                  isActive ? 'bg-sage-200 font-medium text-forest-900' : 'text-muted hover:bg-sage-100'
                }`
              }
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={signOut}
            className="flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-muted hover:bg-sage-100 md:mt-6"
          >
            <LogOut className="size-4" aria-hidden />
            Sign out
          </button>
        </nav>
      </aside>
      <main className="min-w-0 px-5 py-8 md:px-10">
        <Outlet />
      </main>
    </div>
  )
}
