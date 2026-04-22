# Toolkit Lite

A privacy-first browser toolkit with three tools: **Invoice Generator**, **Business Card Maker**, and **Cover Letter Builder**. Everything runs entirely in your browser — no backend, no accounts, no analytics, no AI. Your data lives only in `localStorage`.

## Tech stack

- **React 19** + **TypeScript** (strict)
- **React Router 7** in framework mode (SSR-capable) — config-based routes in `app/routes.ts`
- **Vite** (from the official template)
- **Tailwind CSS v4** via `@tailwindcss/vite` — the only styling layer. No component libraries. Every primitive (Button, Input, Select, Tabs, Modal, Toast, Card, etc.) is hand-built with Tailwind + native HTML / ARIA.
- **lucide-react** — icons
- **zod** — schema validation for persisted data
- **@react-pdf/renderer** — PDF preview + download
- **html-to-image** — PNG export for business cards
- **clsx** + **tailwind-merge** — the `cn()` helper

No state manager. A tiny pub/sub service layer + `useSyncExternalStore` + React hooks.

## Getting started

```bash
npm install
npm run dev        # start dev server
npm run build      # production build
npm run typecheck  # tsc + router typegen
npm run start      # serve the built output
```

Open http://localhost:5173 and pick a tool from the navigation.

## Routing

Routes are registered in `app/routes.ts` via the `route()` / `index()` helpers — one dedicated file per feature (no dynamic slugs).

```ts
// app/routes.ts
export default [
  index("routes/home.tsx"),
  route("invoice-generator", "routes/invoice-generator.tsx"),
  route("business-card", "routes/business-card.tsx"),
  route("cover-letter", "routes/cover-letter.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
```

Each `routes/<feature>.tsx` is a thin wrapper: it sets `meta()` and lazy-imports the feature entry via `React.lazy` + `<Suspense>` so heavy PDF code is only loaded when a tool is opened.

## Folder structure

```
app/
  root.tsx
  app.css                   @import "tailwindcss"; + CSS vars for theme
  routes.ts                 route config (framework mode)
  routes/                   thin route wrappers (home, tools, 404)
  components/
    ui/                     hand-built Tailwind primitives
    layout/                 AppShell, Navbar, Footer, ThemeToggle
    common/                 Loader, EmptyState, PageHeader
  features/
    invoice-generator/      self-contained feature slice
    business-card/          self-contained feature slice
    cover-letter/           self-contained feature slice
  config/                   site + route constants
  hooks/                    shared hooks (use-local-storage, use-debounce, use-is-client)
  lib/                      cn() + formatters + downloadBlob
  services/                 pub/sub stores that persist to localStorage
```

Every feature folder contains its own `components/`, `templates/` (PDF + map), `hooks/`, `types.ts`, and an `index.tsx` entry component.

## Data & privacy

- All three tools persist their state in `localStorage` under versioned keys:
  - `toolkit-lite:invoice:v1`
  - `toolkit-lite:business-card:v1`
  - `toolkit-lite:cover-letter:v1`
- The theme preference is stored under `toolkit-lite:theme`.
- Nothing is ever sent to a server.
- Clearing your browser storage (or the in-app "Reset" button) wipes your data instantly.

## Exports

- **Invoice Generator** — PDF (3 templates: classic, modern, minimal)
- **Business Card Maker** — PDF (front + back, 3.5×2 in) and PNG of the current side (via `html-to-image`)
- **Cover Letter Builder** — PDF (3 templates: classic, modern, professional)

## Accessibility

- All primitives expose labels, `aria-*` attributes, focus-visible outlines, and keyboard navigation.
- The `<Modal>` component traps focus, restores focus on close, and locks body scroll.
- The `<Tabs>` component supports `ArrowLeft/Right/Up/Down`, `Home`, `End`.

## License

MIT — use it however you like.
