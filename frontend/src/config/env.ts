/** Typed access to build-time environment variables. */
export const env = {
  /** API base path. The Vite dev server proxies /api to the backend. */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api/v1',
} as const
