"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";

export function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-electric-blue via-electric-blue/80 to-accent-cyan px-8 py-16 text-center md:px-16 md:py-24"
        >
          <div className="relative z-10">
            <h2 className="font-display text-3xl font-bold text-pure-white sm:text-4xl md:text-5xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-pure-white/80">
              Book a free automation audit and discover how much time and money
              your team can save with intelligent workflows.
            </p>
            <div className="mt-8">
              <Button
                href="/contact"
                size="lg"
                className="bg-pure-white text-electric-blue hover:bg-off-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Book Your Free Audit
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
          {/* Decorative circles */}
          <motion.div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-accent-cyan/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>
      </Container>
    </section>
  );
}
