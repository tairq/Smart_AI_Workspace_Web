"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 500, suffix: "+", label: "Workflows Automated" },
  { value: 10, suffix: "x", label: "Average ROI" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 60, suffix: "%", label: "Cost Reduction" },
];

function StatItem({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref: countRef } = useCountUp(value);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="text-center"
    >
      <span ref={countRef} className="font-display text-4xl font-bold text-accent-cyan md:text-5xl">
        {count}
        {suffix}
      </span>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </motion.div>
  );
}

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass rounded-3xl px-8 py-12 md:px-16"
        >
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats.map((s, i) => (
              <StatItem key={s.label} {...s} delay={i * 0.1} />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
