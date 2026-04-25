# Tech Stack & Commands

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
