---
name: react
description: KinHospital frontend conventions for React 19 + TypeScript + Vite. Use when creating or editing anything under frontend/src — components, pages, feature modules, hooks, services, or types.
---

# React (KinHospital frontend)

Stack: React 19, TypeScript (strict, `verbatimModuleSyntax`, `erasableSyntaxOnly`), Vite, Tailwind CSS v4. Import alias `@/` → `frontend/src/`.

## Folder structure

```
src/
  main.tsx          # entry point; renders <App/>
  app/              # App root, providers, routing (app-wide wiring only)
  components/
    ui/             # generic, reusable, presentational (Button, Input, Modal)
    layout/         # page chrome (header, sidebar, shell)
  features/<name>/  # one folder per domain feature — see below
  pages/            # route-level screens; compose features, no business logic
  hooks/            # shared hooks used by 2+ features
  services/         # shared infrastructure (HTTP client, storage)
  config/           # env access and constants
  types/            # shared cross-feature types
  utils/            # pure helper functions
  assets/           # images, icons
  styles/           # global CSS (Tailwind entry)
```

### Feature module layout

```
features/<name>/
  api/          # calls to the backend for this feature
  components/   # components used only by this feature
  hooks/        # state/data hooks for this feature
  types.ts      # feature types (mirror backend schemas)
  index.ts      # public API — the ONLY file other modules import from
```

## Rules

- Import a feature only through its `index.ts` (`@/features/<name>`), never its internals.
- Features must not import from other features' internals; promote shared code to `components/`, `hooks/`, `services/`, or `utils/`.
- Pages assemble features; keep logic in feature hooks.
- Function components + named exports only (`export function X`). No default exports except where a tool requires it.
- Use `import type` for type-only imports. No TS `enum` — use string-literal unions.
- One component per file; file name = component name (PascalCase). Hooks: `useX.ts`.
- Style with Tailwind utility classes (see the `tailwind` skill); no CSS modules or inline style objects.
- Keep `npm run build` and `npm run lint` passing.
