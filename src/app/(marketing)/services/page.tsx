import type { Metadata } from "next";
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
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "AI Workflow Automation, CRM & Sales Automation, Data Pipeline & Reporting, and Custom AI Agent Development — tailored for B2B companies.",
};

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
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-mesh py-24 md:py-32">
        <Container>
          <SectionHeading
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

              {/* Features */}
              <div className="flex-1">
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
    </>
  );
}
