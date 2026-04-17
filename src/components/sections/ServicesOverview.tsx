"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Workflow, Users, BarChart3, Bot, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

const services = [
  {
    icon: Workflow,
    title: "AI Workflow Automation",
    description:
      "Automate repetitive business processes with intelligent workflows that learn, adapt, and execute flawlessly.",
    href: "/services#workflow",
    image: "/AI-Workflow-Automation.jpg",
  },
  {
    icon: Users,
    title: "CRM & Sales Automation",
    description:
      "Supercharge your sales pipeline with AI-driven lead scoring, follow-ups, and CRM enrichment.",
    href: "/services#crm",
    image: "/CRM-Sales-Automation.jpg",
  },
  {
    icon: BarChart3,
    title: "Data Pipeline & Reporting",
    description:
      "Connect your data sources, automate ETL pipelines, and generate real-time dashboards without code.",
    href: "/services#data",
    image: "/Data-Pipeline-Reporting.jpg",
  },
  {
    icon: Bot,
    title: "Custom AI Agents",
    description:
      "Purpose-built AI agents that handle customer support, document processing, and complex decision-making.",
    href: "/services#agents",
    image: "/Custom-AI-Agent-Development.jpg",
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
                <div className="glass h-full overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-[0_0_24px_0_rgba(0,212,255,0.12)]">
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-electric-blue/20 text-electric-blue backdrop-blur-sm border border-electric-blue/30">
                      <service.icon size={20} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-off-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
