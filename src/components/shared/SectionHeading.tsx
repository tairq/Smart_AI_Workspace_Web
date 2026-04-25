"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const HeadingTag = as === "h1" ? motion.h1 : motion.h2;

  return (
    <div
      ref={ref}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-4 font-display text-xs font-bold uppercase tracking-[0.2em] text-accent-cyan"
        >
          {eyebrow}
        </motion.p>
      )}
      <HeadingTag
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
        className="font-display text-3xl font-bold tracking-tight text-off-white sm:text-4xl md:text-5xl"
      >
        {title}
      </HeadingTag>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
          className="mt-4 max-w-2xl text-base text-muted md:text-lg mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
