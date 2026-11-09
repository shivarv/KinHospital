import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { BrandMark } from '@/components/layout/BrandMark'
import { AdminLoginForm, useAdminSession } from '@/features/admin'

export function AdminLoginPage() {
  const { isSignedIn } = useAdminSession()
  const navigate = useNavigate()
  const from = (useLocation().state as { from?: string } | null)?.from ?? '/admin'

  if (isSignedIn) return <Navigate to={from} replace />

  return (
    <div className="grid min-h-dvh place-items-center px-5">
      <div className="w-full max-w-sm rounded-3xl border border-line bg-paper p-8">
        <BrandMark />
        <h1 className="mt-8 text-2xl">Staff sign in</h1>
        <p className="mt-1 text-sm text-muted">Manage appointments, the doctor's schedule and products.</p>
        <div className="mt-6">
          <AdminLoginForm onSignedIn={() => navigate(from, { replace: true })} />
        </div>
      </div>
    </div>
  )
}
