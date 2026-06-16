# Smart AI Workspace — Website

> B2B marketing and lead generation site for Smart AI Workspace, an AI automation consultancy helping businesses replace manual processes with intelligent, scalable workflows.

🌐 **Live site:** [smartaiworkspace.tech](https://smartaiworkspace.tech)

---

## About This Project

Smart AI Workspace is a freelance AI automation practice run by **Tariq Osmani** — an AI Automation Developer with 8+ years in IT and 11 certifications from Anthropic and AWS.

This website serves as the company's primary marketing presence and client acquisition hub, showcasing services, case studies, and automation capabilities across n8n, Claude API, OpenAI, RAG pipelines, and multi-agent workflows.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Package Manager | pnpm |
| Backend / Automation | n8n (self-hosted on VPS) |
| AI Integration | Claude API (Anthropic) |
| SEO | Next.js Metadata API + programmatic SEO pages |
| Dev Tooling | ESLint, Puppeteer (screenshot QA) |

---

## Architecture Highlights

### Multi-Agent Claude Code Setup
This repo uses a structured **Claude Code multi-agent architecture** with three specialized sub-agents:

| Agent | Responsibility |
|---|---|
| `blog-publisher` | MDX blog posts, editing, cross-posting to Medium / dev.to |
| `n8n-builder` | n8n workflow creation, validation, deployment, webhooks |
| `website-dev` | Next.js pages, components, API routes, SEO, styling |

The main Claude thread acts as an **orchestrator** — delegating tasks to the right agent and passing context between them for cross-cutting workflows.

### n8n Backend Integration
API routes connect directly to a self-hosted n8n instance for:
- Contact form processing
- Lead capture automation
- Workflow triggers from the website

### Programmatic SEO
Service and use-case pages are generated programmatically from data files, with auto-generated `sitemap.ts` and `robots.ts` for full crawlability.

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Lint
pnpm lint
```

Open [http://localhost:3000](http://localhost:3000) to view locally.

---

## Services Showcased

- n8n workflow automation
- AI agent development (Claude API, OpenAI)
- RAG pipeline implementation
- Multi-agent system design
- Google Cloud Vertex AI & Amazon Bedrock integrations
- CRM and business process automation

---

## About the Developer

**Tariq Osmani** | AI Automation Developer | Smart AI Workspace

- 8+ years in IT and data systems
- 11 certifications — Anthropic (Claude API, MCP, Prompt Engineering) + AWS (Bedrock, Cloud Practitioner)
- Specializing in n8n, AI agents, RAG pipelines, and end-to-end business automation
- 📧 tariqosmani25@gmail.com
- 🔗 [Upwork Profile](https://www.upwork.com)
- 💼 [LinkedIn](https://linkedin.com)

---

*Built with Next.js 16 + TypeScript + Tailwind CSS v4*
