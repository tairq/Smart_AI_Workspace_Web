# Smart AI Workspace — Website

## Project Overview

**Company**: Smart AI Workspace
**Industry**: B2B AI Automation Services
**Target Audience**: Businesses looking to streamline operations with AI-powered workflows and automation
**Website Purpose**: Marketing site + lead generation for AI automation consulting/services

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Package Manager**: pnpm
- **Linting**: ESLint with next config
- **Backend**: n8n (workflow automation — handles forms, integrations, business logic)
- **MCP Server**: n8n-mcp (bridges Claude Code ↔ n8n for building/managing workflows)
- **Deployment**: TBD (Vercel recommended)

## Folder Structure

```
src/
├── app/                    # Next.js App Router — pages and API routes
│   ├── (marketing)/        # Route group: about, services, pricing, contact, blog
│   └── api/                # API route handlers
├── components/
│   ├── layout/             # Header, Footer, Navigation
│   ├── sections/           # Page sections (Hero, CTA, Features, Testimonials)
│   ├── shared/             # Reusable components (Button, Card, Modal)
│   └── ui/                 # Design system primitives / atoms
├── lib/                    # Utilities, helpers, constants
├── hooks/                  # Custom React hooks
├── services/               # External API clients and integrations
├── config/                 # Site metadata, navigation config, feature flags
├── brand-assets/           # Images, fonts, icons (static assets)
├── styles/                 # Additional CSS modules beyond globals.css
└── types/                  # Shared TypeScript type definitions

.claude/skills/             # Custom Claude Code skill prompts
docs/                       # Project documentation
```

## Coding Conventions

- **Components**: PascalCase filenames (`HeroSection.tsx`), default exports
- **Utilities/hooks**: camelCase filenames (`useMediaQuery.ts`, `formatDate.ts`)
- **Styles**: Tailwind utility classes; use `cn()` from `src/lib/utils.ts` for conditional classes
- **Imports**: Use `@/` alias for `src/` (e.g., `import { cn } from "@/lib/utils"`)
- **Types**: Co-locate types with their module; shared types go in `src/types/`
- **API routes**: Use Next.js Route Handlers in `src/app/api/`
- **No default exports** for non-page/layout components (pages/layouts require default exports per Next.js)

## Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

## Environment Variables

See `.env.example` for all required variables. Never commit `.env.local`.

## Important Context

- This is a B2B services site, not a SaaS product — focus on marketing, trust signals, and lead conversion
- SEO matters: use Next.js metadata API, semantic HTML, proper heading hierarchy
- Performance matters: optimize images with `next/image`, minimize client components
- The `(marketing)` route group shares a layout with Header/Footer — use it for all public pages
- Site config lives in `src/config/site.ts` — update it for metadata changes

## n8n Backend

The website backend is powered by **n8n workflows** instead of traditional API code. n8n handles:
- Contact form submissions
- Lead capture and CRM integrations
- Email notifications
- Any third-party service integrations

**Setup**: The n8n-mcp server is configured in `.mcp.json`. Set `N8N_API_URL` and `N8N_API_KEY` in `.env.local` to connect to your n8n instance.

**Skills**: Seven n8n-specific Claude Code skills are installed in `.claude/skills/` — they activate automatically when working on n8n workflows (expressions, node config, validation, patterns, JS/Python code nodes).

**Architecture**: Next.js API routes call n8n webhooks. The website never talks to external services directly — n8n orchestrates everything behind webhook endpoints.
