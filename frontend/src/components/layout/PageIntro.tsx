import type { ReactNode } from 'react'

/** Standard page heading block for inner pages. */
export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl leading-tight sm:text-5xl">{title}</h1>
      {children && <div className="mt-4 text-lg leading-relaxed text-muted">{children}</div>}
    </div>
  )
}
