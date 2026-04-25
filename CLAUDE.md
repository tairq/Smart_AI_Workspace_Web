# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Smart AI Workspace — Website

## Project Overview

**Company**: Smart AI Workspace
**Industry**: B2B AI Automation Services
**Target Audience**: Businesses looking to streamline operations with AI-powered workflows and automation
**Website Purpose**: Marketing site + lead generation for AI automation consulting/services

## Documentation Index

When working on a topic below, read the linked file for full details.

- **Tech stack & commands** → [docs/tech-stack.md](docs/tech-stack.md)
  Next.js 16, Tailwind v4, pnpm; `pnpm dev`, `pnpm build`, `pnpm lint`.
- **Architecture** → [docs/architecture.md](docs/architecture.md)
  Routing, programmatic SEO pages, contact form flow, shared components (Button, Card, SectionWrapper, etc.).
- **Coding conventions & styling** → [docs/coding-conventions.md](docs/coding-conventions.md)
  Naming, imports, Tailwind design tokens (custom colors), CSS utility classes (`glass`, `text-gradient`, etc.).
- **Configuration** → [docs/configuration.md](docs/configuration.md)
  Site config files, environment variables.
- **n8n backend** → [docs/n8n-backend.md](docs/n8n-backend.md)
  How API routes talk to n8n; n8n-mcp server; related `.claude/skills/`.
- **Screenshot workflow** → [docs/screenshot-workflow.md](docs/screenshot-workflow.md)
  Puppeteer setup and `screenshot.mjs` usage for visual QA.

## Sub-agents — Delegation Routing

Three project sub-agents own distinct domains. **Delegate by default** rather than working directly in the main thread.

| If the task is about… | Delegate to | Agent file |
|---|---|---|
| Blog posts (MDX in `src/content/blog/`), drafting/editing, cross-posting to Medium/dev.to | `blog-publisher` | [.claude/agents/blog-publisher.md](.claude/agents/blog-publisher.md) |
| n8n workflows (create/update/validate/deploy), node config, webhooks, credentials on `n8n.smartaiworkspace.tech` | `n8n-builder` | [.claude/agents/n8n-builder.md](.claude/agents/n8n-builder.md) |
| Next.js pages, components, layouts, API routes, styling, SEO metadata, `pnpm` commands | `website-dev` | [.claude/agents/website-dev.md](.claude/agents/website-dev.md) |

**Delegation rules:**
- When the task fits cleanly into one domain, invoke that agent via the Agent tool — don't do the work in the main thread.
- For **cross-cutting tasks** (e.g. "publish this post and trigger the syndication workflow"), the main thread orchestrates: invoke agents sequentially in the right order, pass context between them.
- Each agent is scope-restricted by `tools:` frontmatter. If an agent refuses a task as out-of-scope, re-route to the right one — don't bypass the restriction.
- **Trivial read-only questions** (reading a single file, quick grep) don't need delegation — answer directly.
- If the user explicitly names an agent ("use the blog agent…"), always honor that over auto-routing.

## Important Context

- B2B services site, not SaaS — prioritize marketing, trust signals, lead conversion
- SEO: use Next.js metadata API (`generateMetadata`), semantic HTML, proper heading hierarchy
- Performance: prefer Server Components; only use `"use client"` when interactivity is required. `SectionWrapper` and `SectionHeading` are already client components — wrapping server content in them is fine, but avoid unnecessary nesting.
- `src/app/sitemap.ts` and `src/app/robots.ts` are auto-generated — they pull from data files
