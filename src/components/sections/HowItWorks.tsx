"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, FileText, Cog, FlaskConical, Rocket } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

const steps = [
  {
    num: "01",
    icon: Phone,
    title: "Discovery Call",
    description:
      "We deep-dive into your business to understand your goals, pain points, and the biggest automation opportunities.",
  },
  {
    num: "02",
    icon: FileText,
    title: "Planning & Scope",
    description:
      "We deliver a full proposal, statement of work, timeline, and project roadmap — transparent and agreed before any work begins.",
  },
  {
    num: "03",
    icon: Cog,
    title: "Build & Develop",
    description:
      "Our team designs and builds your custom AI automation solution with regular progress updates and milestone check-ins.",
  },
  {
    num: "04",
    icon: FlaskConical,
    title: "Test & Review",
    description:
      "Full quality assurance, edge-case testing, and a client review round to ensure everything works exactly as expected.",
  },
  {
    num: "05",
    icon: Rocket,
    title: "Deploy & Handover",
    description:
      "We deploy live, provide full documentation, training, and ensure your team is fully set up to operate the solution independently.",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-navy-light" ref={ref}>
      <Container>
        <SectionHeading
          eyebrow="Our Process"
          title="From First Call to Full Deployment"
          subtitle="A proven 5-step process that delivers results on time, on scope, and on budget — every single project."
        />
        <div className="relative grid gap-8 md:grid-cols-5">
          {/* Connecting line (desktop) */}
          <div className="absolute top-10 left-[10%] right-[10%] hidden h-px bg-gradient-to-r from-electric-blue via-accent-cyan to-electric-blue md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent-cyan bg-navy">
                <span className="font-display text-lg font-bold text-accent-cyan">
                  {step.num}
                </span>
              </div>
              <h3 className="font-display text-sm font-semibold text-off-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
