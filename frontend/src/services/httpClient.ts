import { env } from '@/config/env'

/** Any non-2xx API response. `message` is safe to show to users. */
export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type FastApiValidationError = { loc: (string | number)[]; msg: string }

function messageFrom(status: number, body: unknown): string {
  const detail = (body as { detail?: unknown } | null)?.detail
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0] as FastApiValidationError
    const field = first.loc?.at(-1)
    return field ? `${String(field).replaceAll('_', ' ')}: ${first.msg.replace(/^Value error, /, '')}` : first.msg
  }
  if (status >= 500) return 'The server ran into a problem. Try again in a moment.'
  return `Request failed (${status})`
}

let authToken: string | null = null
let onUnauthorized: (() => void) | null = null

/** Used by the admin session to attach its bearer token to requests. */
export function setAuthToken(token: string | null, handleUnauthorized?: () => void) {
  authToken = token
  onUnauthorized = handleUnauthorized ?? null
}

async function send(path: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers)
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
  if (authToken) headers.set('Authorization', `Bearer ${authToken}`)

  let response: Response
  try {
    response = await fetch(`${env.apiBaseUrl}${path}`, { ...init, headers })
  } catch {
    throw new ApiError(0, "Can't reach the server. Check your connection and try again.")
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    if (response.status === 401 && authToken) onUnauthorized?.()
    throw new ApiError(response.status, messageFrom(response.status, body))
  }
  return response
}

async function json<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await send(path, init)
  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}

export const httpClient = {
  get: <T>(path: string) => json<T>(path),
  post: <T>(path: string, body: unknown) => json<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => json<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) => json<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path: string) => json<void>(path, { method: 'DELETE' }),
  /** Raw binary download (e.g. PDFs). */
  blob: async (path: string) => {
    const response = await send(path)
    return response.blob()
  },
}
