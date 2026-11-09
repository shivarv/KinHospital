import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAdminSession } from './adminSessionContext'

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { isSignedIn } = useAdminSession()
  const location = useLocation()
  if (!isSignedIn) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  return children
}
