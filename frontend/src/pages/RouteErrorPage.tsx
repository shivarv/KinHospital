import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { buttonClasses } from '@/components/ui'

export function RouteErrorPage() {
  const error = useRouteError()
  const detail = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : null

  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-4xl">This page didn't load</h1>
      <p className="mt-4 text-muted">
        Something went wrong while showing this page{detail ? ` (${detail})` : ''}. Reload to try again.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <button type="button" className={buttonClasses()} onClick={() => window.location.reload()}>
          Reload page
        </button>
        <a href="/" className={buttonClasses('secondary')}>Go home</a>
      </div>
    </div>
  )
}
