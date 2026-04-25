/**
 * Canonical author profile for Smart AI Workspace.
 *
 * Single source of truth referenced by:
 * - /about page (founder card)
 * - /about/tariq-osmani (author landing page)
 * - blog post bylines
 * - Person JSON-LD via buildPerson()
 *
 * No numerical credentials by design — bio + expertise areas only.
 */
export const tariqOsmani = {
  slug: "tariq-osmani",
  name: "Tariq Osmani",
  jobTitle: "Founder & AI Automation Consultant",
  email: "tosmani@smartaiworkspace.tech",
  photo: "/team/tariq-osmani.jpeg",
  shortBio:
    "Solo founder of Smart AI Workspace. I build custom AI agents, n8n workflows, and end-to-end automation for B2B teams.",
  longBio: [
    "I started Smart AI Workspace because I kept watching capable teams burn their best hours on work that software should already be doing — copy-pasting between tools, chasing approvals over email, manually reconciling data that lived in three different systems. The technology to fix it has existed for a while; what most teams need is someone who will sit with the actual workflow, design the right architecture, and ship something that runs reliably in production.",
    "Day to day I design and build AI-powered automation for B2B companies — custom agents on Claude and OpenAI, n8n workflow architectures that span CRMs, comms tools and data warehouses, and retrieval pipelines that let teams ask questions of their own knowledge base. I'm hands-on through the entire engagement: discovery, build, deployment, and the boring-but-critical observability that keeps automations alive after launch.",
    "Smart AI Workspace is intentionally founder-led. When you work with me you're not handed off to an account manager — you talk to the person writing the workflow. I write here regularly about what I'm shipping, what's actually working in production, and where the AI automation hype meets reality.",
  ],
  expertise: [
    "AI agent development (Claude, OpenAI)",
    "n8n workflow architecture",
    "B2B process automation",
    "RAG and retrieval pipelines",
    "Workflow integrations (Slack, HubSpot, Salesforce, Google Workspace)",
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/tariq-osmani",
    x: "https://x.com/Tariq_Osmani26",
    youtube: "https://www.youtube.com/@SmartAIWorkspace",
  },
} as const;

export type AuthorProfile = typeof tariqOsmani;
