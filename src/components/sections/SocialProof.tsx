"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/shared/Container";

const logos = [
  "TechCorp", "DataFlow", "ScaleUp", "InnovateCo", "SynergyAI",
  "PulseIQ", "Nextera", "CloudSync", "OptiPath", "VeloAI",
];

export function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section className="border-y border-white/5 bg-navy-light py-10" ref={ref}>
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted"
        >
          Trusted by 100+ B2B companies worldwide
        </motion.p>
      </Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-light to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-light to-transparent" />
        <div className="flex animate-marquee w-max gap-12 px-6">
          {[...logos, ...logos].map((name, i) => (
            <span
              key={i}
              className="flex h-10 items-center whitespace-nowrap font-display text-sm font-semibold text-muted/50 transition-colors hover:text-muted"
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
