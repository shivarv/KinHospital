import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { setAuthToken } from '@/services/httpClient'
import { adminApi } from '../api/adminApi'
import { AdminSessionContext } from './adminSessionContext'

const STORAGE_KEY = 'kin.admin.session'

interface StoredSession {
  token: string
  expiresAt: string
}

function readStored(): StoredSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const session = JSON.parse(raw) as StoredSession
    return new Date(session.expiresAt).getTime() > Date.now() ? session : null
  } catch {
    return null
  }
}

function writeStored(session: StoredSession | null) {
  try {
    if (session) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage unavailable (private mode): the session lives in memory only.
  }
}

/** Holds the admin token for this browser tab and attaches it to API calls. */
export function AdminSessionProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()
  const [session, setSession] = useState<StoredSession | null>(readStored)

  const signOut = useCallback(() => {
    writeStored(null)
    setAuthToken(null)
    setSession(null)
    queryClient.removeQueries({ queryKey: ['admin'] })
  }, [queryClient])

  // Keep the HTTP client in sync during render so child queries have the token immediately.
  setAuthToken(session?.token ?? null, signOut)

  const signIn = useCallback(async (username: string, password: string) => {
    const res = await adminApi.login(username, password)
    const next = { token: res.access_token, expiresAt: res.expires_at }
    writeStored(next)
    setSession(next)
  }, [])

  const value = useMemo(() => ({ isSignedIn: session !== null, signIn, signOut }), [session, signIn, signOut])
  return <AdminSessionContext.Provider value={value}>{children}</AdminSessionContext.Provider>
}
