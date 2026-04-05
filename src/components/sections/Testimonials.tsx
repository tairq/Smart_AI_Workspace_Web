"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

const testimonials = [
  {
    quote:
      "SmartAI Workspace automated our entire lead qualification process. What used to take our team 20 hours a week now runs on autopilot.",
    name: "Sarah Chen",
    title: "VP of Operations",
    company: "ScaleUp Inc.",
  },
  {
    quote:
      "The custom AI agent they built for our support team handles 70% of tickets autonomously. Our response time dropped from 4 hours to under 5 minutes.",
    name: "Marcus Johnson",
    title: "CTO",
    company: "DataFlow Systems",
  },
  {
    quote:
      "We replaced 12 manual reporting workflows with a single automated pipeline. The ROI was visible within the first month.",
    name: "Elena Rodriguez",
    title: "Head of Analytics",
    company: "Nextera Global",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-navy-light" ref={ref}>
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          subtitle="Real results from real businesses that trusted us to transform their operations."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card hover={false} className="h-full flex flex-col">
                <Quote size={24} className="mb-4 text-electric-blue/40" />
                <p className="flex-1 text-sm leading-relaxed text-light-gray">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-electric-blue/20 font-display text-sm font-bold text-electric-blue">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-off-white">{t.name}</p>
                    <p className="text-xs text-muted">
                      {t.title}, {t.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
