"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      className={cn(
        "glass rounded-2xl p-6 md:p-8",
        hover && "transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.1)] hover:border-accent-cyan/20",
        className,
      )}
      {...(hover
        ? {
            whileHover: { y: -4 },
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }
        : {})}
    >
      {children}
    </motion.div>
  );
}
