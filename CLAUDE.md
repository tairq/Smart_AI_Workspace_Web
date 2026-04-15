# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Smart AI Workspace — Website

## Project Overview

**Company**: Smart AI Workspace
**Industry**: B2B AI Automation Services
**Target Audience**: Businesses looking to streamline operations with AI-powered workflows and automation
**Website Purpose**: Marketing site + lead generation for AI automation consulting/services

## Tech Stack

- **Framework**: Next.js 16 (App Router) — see `AGENTS.md` for breaking-change warnings vs. older Next.js versions
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Font**: Josefin Sans (Google Fonts) — loaded via `next/font/google`, exposed as `--font-syne` / `--font-inter-tight` CSS vars, usable as `font-sans` / `font-display` Tailwind classes
- **Package Manager**: pnpm
- **Animation**: Framer Motion
- **Backend**: n8n (workflow automation — handles forms, integrations, business logic)
- **MCP Server**: n8n-mcp (bridges Claude Code ↔ n8n for building/managing workflows)
- **Deployment**: TBD (Vercel recommended)

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

## Architecture

### Routing

All public pages live in `src/app/(marketing)/` and share a Header/Footer layout via `src/app/(marketing)/layout.tsx`. Static pages: `/`, `/services`, `/about`, `/contact`, `/pricing`, `/blog`, `/solutions`, `/integrations`, `/glossary`.

### Programmatic SEO Pages

Three dynamic route segments are statically generated at build time from data files:

| Route | Data file | Slug source |
|---|---|---|
| `/solutions/[industry]` | `src/lib/data/industries.ts` | `industry.slug` |
| `/integrations/[tool]` | `src/lib/data/integrations.ts` | `integration.slug` |
| `/glossary/[term]` | `src/lib/data/glossary.ts` | `term.slug` |

To add a new industry/integration/term, add an entry to the corresponding data file — the page, sitemap, and static params update automatically.

### Contact Form → n8n

`POST /api/contact` validates input server-side (allowlist, length limits, rate limiting) then POSTs to `N8N_CONTACT_WEBHOOK_URL`. If the env var is unset, the route returns success without forwarding (safe for local dev). Rate limit: 5 requests/IP/hour (in-memory; replace with Upstash Redis for multi-instance prod).

`GET /api/health` — minimal health check endpoint.

### Key Shared Components

- **`Button`** — polymorphic: renders `<a>` when `href` prop is present, `<button>` otherwise. Variants: `primary`, `secondary`, `ghost`. Sizes: `sm`, `md`, `lg`.
- **`Container`** — `max-w-7xl` centered wrapper with responsive horizontal padding.
- **`SectionWrapper`** — client component; wraps page sections in a `<motion.section>` that fades in when scrolled into view (`useInView`, fires once). Accepts optional `id` for anchor links. Adds `py-24 md:py-32` by default.
- **`SectionHeading`** — client component; staggered-animated `<h2>` block. Props: `title` (required), `eyebrow`, `subtitle`, `align` (`"center"` | `"left"`, default `"center"`).
- **`Card`** — glass-morphism card; `hover` prop (default `true`) adds lift + cyan border glow on hover.
- **`Breadcrumbs`** — navigation breadcrumbs for dynamic pages.

## Coding Conventions

- **Components**: PascalCase filenames, named exports for UI/shared/section components; default exports only for Next.js pages and layouts
- **Utilities/hooks**: camelCase filenames (`useCountUp.ts`)
- **Styles**: Tailwind utility classes; use `cn()` from `@/lib/utils` for conditional classes
- **Imports**: `@/` alias for `src/`
- **Types**: Co-locate with module; shared types in `src/types/`

### Design Tokens (Tailwind custom colors)

Defined in `globals.css` via `@theme inline`. Don't substitute with raw hex values:

| Token | Hex |
|---|---|
| `electric-blue` | `#0066FF` |
| `accent-cyan` | `#00D4FF` |
| `navy` | `#0B1426` |
| `navy-light` | `#0F1B2E` |
| `charcoal` | `#1A2332` |
| `pure-white` | `#FFFFFF` |
| `off-white` | `#F1F5F9` |
| `light-gray` | `#CBD5E0` |
| `muted` | `#94A3B8` |

### CSS Utility Classes

Defined in `globals.css` — use these instead of inline styles:

- `gradient-mesh` — hero/section gradient mesh background (radial gradients via pseudo-elements)
- `glass` — semi-transparent dark panel with `backdrop-filter: blur(16px)` and subtle cyan border
- `glass-strong` — heavier blur/opacity variant of `glass`
- `text-gradient` — cyan-to-blue gradient text (uses `-webkit-background-clip`)
- `glow-cyan` / `glow-blue` — box-shadow glow effects for cards/elements
- `dot-grid` — radial dot-pattern background (32px grid)
- `animate-marquee` — infinite horizontal scroll at 30s (used in SocialProof ticker)
- `grain` — noise texture overlay (applied to `<body>`)

## Site Config

Global metadata and social links live in `src/config/site.ts`. Navigation items live in `src/config/navigation.ts`. Update these (not inline values) for site-wide changes.

## Environment Variables

See `.env.example` for all required variables. Key ones:

- `N8N_CONTACT_WEBHOOK_URL` — n8n webhook for contact form submissions
- `N8N_API_URL` / `N8N_API_KEY` — n8n instance connection for MCP server

## Important Context

- B2B services site, not SaaS — prioritize marketing, trust signals, lead conversion
- SEO: use Next.js metadata API (`generateMetadata`), semantic HTML, proper heading hierarchy
- Performance: prefer Server Components; only use `"use client"` when interactivity is required. `SectionWrapper` and `SectionHeading` are already client components — wrapping server content in them is fine, but avoid unnecessary nesting.
- `src/app/sitemap.ts` and `src/app/robots.ts` are auto-generated — they pull from data files

## n8n Backend

Next.js API routes call n8n webhooks. The website never calls external services directly — n8n orchestrates everything. The n8n-mcp server (`.mcp.json`) lets you build and manage workflows directly from Claude Code.

Seven n8n-specific Claude Code skills are in `.claude/skills/` and activate automatically when working on n8n workflows (expressions, node config, validation, patterns, JS/Python code nodes).

## Screenshot Workflow

Puppeteer is installed at `C:/Users/ast/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/ast/.cache/puppeteer/`.

Always screenshot from localhost: `node screenshot.mjs http://localhost:3000`

Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).

Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`

`screenshot.mjs` lives in the project root. Use it as-is.

After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.

When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"

Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing
