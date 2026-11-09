import { ButtonLink } from '@/components/ui'

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="text-4xl">We couldn't find that page</h1>
      <p className="mt-4 text-muted">The link may be out of date. Head back home or book a consultation.</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink to="/">Go home</ButtonLink>
        <ButtonLink to="/book" variant="secondary">Book consultation</ButtonLink>
      </div>
    </div>
  )
}
