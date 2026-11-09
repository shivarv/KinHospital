import { createContext, useContext } from 'react'

export interface AdminSessionValue {
  isSignedIn: boolean
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => void
}

export const AdminSessionContext = createContext<AdminSessionValue | null>(null)

export function useAdminSession(): AdminSessionValue {
  const ctx = useContext(AdminSessionContext)
  if (!ctx) throw new Error('useAdminSession must be used inside <AdminSessionProvider>')
  return ctx
}
