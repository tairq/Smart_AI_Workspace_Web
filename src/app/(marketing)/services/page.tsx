import type { Metadata } from "next";
import Image from "next/image";
import {
  Workflow,
  Users,
  BarChart3,
  Bot,
  Check,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FAQ } from "@/components/shared/FAQ";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import {
  JsonLd,
  buildBreadcrumbList,
  buildFAQPage,
  buildService,
} from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Services",
  description:
    "AI Workflow Automation, CRM & Sales Automation, Data Pipeline & Reporting, and Custom AI Agent Development — tailored for B2B companies.",
  path: "/services",
});

const services = [
  {
    id: "workflow",
    icon: Workflow,
    title: "AI Workflow Automation",
    description:
      "Eliminate manual, repetitive tasks across your organization. We design end-to-end automation workflows that connect your tools, route data intelligently, and execute multi-step processes without human intervention.",
    details:
      "From employee onboarding to invoice processing, our automation workflows handle the heavy lifting so your team can focus on strategic work. We use n8n, custom APIs, and AI models to create systems that learn and improve over time.",
    features: [
      "Multi-step workflow orchestration across 200+ tools",
      "Error handling and automatic retry logic",
      "Conditional branching based on business rules",
      "Real-time monitoring and alerting dashboards",
      "Version control and rollback capabilities",
    ],
    image: "/AI-Workflow-Automation.jpg",
  },
  {
    id: "crm",
    icon: Users,
    title: "CRM & Sales Automation",
    description:
      "Supercharge your revenue engine. We build automated pipelines that score leads, enrich contact data, trigger personalized follow-ups, and sync everything back to your CRM in real time.",
    details:
      "Stop losing deals to slow response times and forgotten follow-ups. Our AI-powered sales automation ensures every lead gets the right message at the right time, while your team focuses on closing high-value opportunities.",
    features: [
      "AI-powered lead scoring and prioritization",
      "Automated email sequences and follow-up cadences",
      "Contact enrichment from 50+ data sources",
      "Pipeline analytics and conversion tracking",
      "Bi-directional CRM sync (Salesforce, HubSpot, Pipedrive)",
    ],
    image: "/CRM-Sales-Automation.jpg",
  },
  {
    id: "data",
    icon: BarChart3,
    title: "Data Pipeline & Reporting",
    description:
      "Transform raw data into actionable insights automatically. We build ETL pipelines that extract, clean, and deliver data to dashboards and stakeholders on schedule — no manual exports needed.",
    details:
      "Your data is scattered across dozens of tools. We unify it into a single source of truth with automated pipelines that run reliably, scale effortlessly, and adapt as your data sources change.",
    features: [
      "Automated ETL from databases, APIs, and spreadsheets",
      "Real-time and scheduled reporting dashboards",
      "Data quality validation and anomaly detection",
      "Cross-platform data synchronization",
      "Custom metrics and KPI tracking",
    ],
    image: "/Data-Pipeline-Reporting.jpg",
  },
  {
    id: "agents",
    icon: Bot,
    title: "Custom AI Agent Development",
    description:
      "Purpose-built AI agents that handle complex tasks autonomously — from customer support triage to document analysis and decision-making workflows.",
    details:
      "Our custom AI agents go beyond simple chatbots. They understand context, access your internal knowledge base, take actions across your tools, and escalate to humans only when truly necessary.",
    features: [
      "Natural language understanding tuned to your domain",
      "Multi-tool orchestration (email, CRM, databases, APIs)",
      "Knowledge base integration and retrieval-augmented generation",
      "Human-in-the-loop escalation workflows",
      "Performance analytics and continuous improvement",
    ],
    image: "/Custom-AI-Agent-Development.jpg",
  },
];

const servicesFaqs = [
  {
    question: "How long does a typical AI automation project take?",
    answer:
      "Most engagements run 4 to 10 weeks from discovery to a fully deployed, monitored workflow. Simple integrations (lead-routing, single-system automation) can ship in two to three weeks. Multi-system AI agents with retrieval and human-in-the-loop review typically take eight weeks or more. We scope each project against your specific tools and data, so you get a fixed timeline before any build work starts.",
  },
  {
    question: "Do you replace our existing tools or work with them?",
    answer:
      "We work with what you already have. Smart AI Workspace integrates with 200+ business tools — Salesforce, HubSpot, Slack, Notion, Google Workspace, Microsoft 365, custom APIs, and most major SaaS platforms. Tool consolidation only happens if it directly removes friction or cost; we never force a migration to justify the project.",
  },
  {
    question: "What does AI automation typically cost?",
    answer:
      "Pricing is project-based and scoped to outcomes, not hours. A workflow automation engagement usually starts in the low five figures; a custom AI agent with knowledge-base integration and ongoing tuning sits higher. After the first discovery call you get a written proposal with fixed deliverables, milestones, and total cost — no hourly billing, no surprise change orders.",
  },
  {
    question: "How do you handle data security and privacy?",
    answer:
      "Customer data stays inside your infrastructure wherever possible. We deploy n8n self-hosted or in your cloud account, use OAuth scopes limited to what each workflow needs, encrypt credentials at rest, and route AI calls through providers that contractually do not train on your data. We sign NDAs and DPAs before any integration work begins.",
  },
  {
    question: "What happens if a workflow breaks or an API changes?",
    answer:
      "Every workflow ships with error handling, retry logic, and alerting baked in. If an upstream API changes or a node fails, you get notified before your team does — and we include 30 days of post-launch support to fix anything that drifts. Ongoing support and monitoring plans are available for workflows you depend on every day.",
  },
  {
    question: "Can you build automations without engineering resources on our side?",
    answer:
      "Yes. Most of our clients have no in-house engineering team. We handle architecture, build, deployment, and documentation end to end, and train one or two of your operators on how to monitor and pause workflows. You stay in control without needing to hire a developer to run it.",
  },
];

export default function ServicesPage() {
  const pageUrl = `${siteConfig.url}/services`;
  const crumbs = buildBreadcrumbList([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: pageUrl },
  ]);
  const serviceNodes = services.map((s) =>
    buildService({
      name: s.title,
      description: `${s.description} ${s.details}`,
      url: `${pageUrl}#${s.id}`,
      features: s.features,
    }),
  );

  return (
    <>
      <JsonLd
        data={[...serviceNodes, crumbs, buildFAQPage(servicesFaqs)]}
      />
      {/* Hero */}
      <section className="gradient-mesh py-24 md:py-32">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Our Services"
            title="Automation That Drives Results"
            subtitle="We don't just automate tasks — we transform how your business operates. Every solution is custom-built for your workflows, your tools, and your goals."
          />
        </Container>
      </section>

      {/* Service sections */}
      {services.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 md:py-28 ${i % 2 === 1 ? "bg-navy-light" : ""}`}
        >
          <Container>
            <div
              className={`flex flex-col items-start gap-12 lg:flex-row lg:gap-16 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-electric-blue/10 text-electric-blue">
                  <service.icon size={28} />
                </div>
                <h2 className="font-display text-2xl font-bold text-off-white sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {service.description}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted/80">
                  {service.details}
                </p>
                <div className="mt-8">
                  <Button href="/contact" size="md">
                    Get Started <ArrowRight size={16} />
                  </Button>
                </div>
              </div>

              {/* Image + Features */}
              <div className="flex flex-1 flex-col gap-4">
                <div className="relative h-52 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                </div>
                <div className="glass rounded-2xl p-6 md:p-8">
                  <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-accent-cyan">
                    Key Capabilities
                  </h3>
                  <ul className="space-y-4">
                    {service.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm text-light-gray">
                        <Check
                          size={18}
                          className="mt-0.5 shrink-0 text-accent-cyan"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <FAQ
        items={servicesFaqs}
        title="Frequently Asked Questions"
        eyebrow="FAQs"
      />
    </>
  );
}
