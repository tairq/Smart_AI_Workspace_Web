"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Workflow, Users, BarChart3, Bot, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

const services = [
  {
    icon: Workflow,
    title: "AI Workflow Automation",
    description:
      "Automate repetitive business processes with intelligent workflows that learn, adapt, and execute flawlessly.",
    href: "/services#workflow",
  },
  {
    icon: Users,
    title: "CRM & Sales Automation",
    description:
      "Supercharge your sales pipeline with AI-driven lead scoring, follow-ups, and CRM enrichment.",
    href: "/services#crm",
  },
  {
    icon: BarChart3,
    title: "Data Pipeline & Reporting",
    description:
      "Connect your data sources, automate ETL pipelines, and generate real-time dashboards without code.",
    href: "/services#data",
  },
  {
    icon: Bot,
    title: "Custom AI Agents",
    description:
      "Purpose-built AI agents that handle customer support, document processing, and complex decision-making.",
    href: "/services#agents",
  },
];

export function ServicesOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="Intelligent Automation, End to End"
          subtitle="From discovery to deployment, we build automation systems that transform how your business operates."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={service.href} className="group block h-full">
                <Card className="h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-electric-blue/10 text-electric-blue transition-colors group-hover:bg-electric-blue/20">
                    <service.icon size={24} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-off-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowUpRight size={14} />
                  </span>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
