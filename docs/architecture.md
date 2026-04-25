# Architecture

## Routing

All public pages live in `src/app/(marketing)/` and share a Header/Footer layout via `src/app/(marketing)/layout.tsx`. Static pages: `/`, `/services`, `/about`, `/contact`, `/pricing`, `/blog`, `/solutions`, `/integrations`, `/glossary`.

## Programmatic SEO Pages

Three dynamic route segments are statically generated at build time from data files:

| Route | Data file | Slug source |
|---|---|---|
| `/solutions/[industry]` | `src/lib/data/industries.ts` | `industry.slug` |
| `/integrations/[tool]` | `src/lib/data/integrations.ts` | `integration.slug` |
| `/glossary/[term]` | `src/lib/data/glossary.ts` | `term.slug` |

To add a new industry/integration/term, add an entry to the corresponding data file — the page, sitemap, and static params update automatically.

## Contact Form → n8n

`POST /api/contact` validates input server-side (allowlist, length limits, rate limiting) then POSTs to `N8N_CONTACT_WEBHOOK_URL`. If the env var is unset, the route returns success without forwarding (safe for local dev). Rate limit: 5 requests/IP/hour (in-memory; replace with Upstash Redis for multi-instance prod).

`GET /api/health` — minimal health check endpoint.

## Key Shared Components

- **`Button`** — polymorphic: renders `<a>` when `href` prop is present, `<button>` otherwise. Variants: `primary`, `secondary`, `ghost`. Sizes: `sm`, `md`, `lg`.
- **`Container`** — `max-w-7xl` centered wrapper with responsive horizontal padding.
- **`SectionWrapper`** — client component; wraps page sections in a `<motion.section>` that fades in when scrolled into view (`useInView`, fires once). Accepts optional `id` for anchor links. Adds `py-24 md:py-32` by default.
- **`SectionHeading`** — client component; staggered-animated `<h2>` block. Props: `title` (required), `eyebrow`, `subtitle`, `align` (`"center"` | `"left"`, default `"center"`).
- **`Card`** — glass-morphism card; `hover` prop (default `true`) adds lift + cyan border glow on hover.
- **`Breadcrumbs`** — navigation breadcrumbs for dynamic pages.
