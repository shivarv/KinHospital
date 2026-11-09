---
name: tailwind
description: Tailwind CSS v4 usage in the KinHospital frontend. Use when styling React components, adding theme tokens, or touching frontend/src/styles or vite.config.ts.
---

# Tailwind CSS v4 (KinHospital)

## Setup (already done — don't redo)

- Installed via the Vite plugin: `@tailwindcss/vite` registered in `frontend/vite.config.ts`.
- Entry stylesheet `frontend/src/styles/index.css` starts with `@import "tailwindcss";`.
- v4 is CSS-first: there is **no `tailwind.config.js`** and no `postcss.config.js`. Don't create them.

## Theme customization

Add design tokens in `index.css` with `@theme`; they become utilities automatically:

```css
@import "tailwindcss";

@theme {
  --color-brand-500: oklch(0.6 0.15 250);
  --font-display: "Inter", sans-serif;
}
/* → bg-brand-500, text-brand-500, font-display */
```

Custom utilities use `@utility name { ... }`, not `@layer utilities`.

## Rules

- Style with utility classes in JSX `className`. Avoid custom CSS unless a utility truly can't express it.
- Repeated class combos → extract a component in `components/ui/`, not an `@apply` class.
- Use theme tokens (`bg-brand-500`) instead of arbitrary values (`bg-[#1f6feb]`) for anything reused.
- Dark mode: use the `dark:` variant.
- Responsive: mobile-first, then `sm: md: lg:` overrides.
- v4 renames to remember: `shadow-sm` → `shadow-xs`, `shadow` → `shadow-sm`, `rounded` → `rounded-sm`, `outline-none` → `outline-hidden`, `ring` → `ring-3`.
- For anything unsure about v4 syntax, look up current docs (context7) rather than relying on v3 knowledge.
