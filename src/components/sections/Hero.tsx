"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/shared/Container";

// cx=260, cy=260 center — nodes placed by angle + radius
const CX = 260;
const CY = 260;

const NODES = [
  { label: "AI",   angle: -140, r: 170, color: "#0066FF" },
  { label: "n8n",  angle:  -30, r: 180, color: "#00D4FF" },
  { label: "CRM",  angle:  155, r: 165, color: "#4B6EF6" },
  { label: "AUTO", angle:   30, r: 178, color: "#00D4FF" },
];

function pt(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

function AutomationDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative w-[520px] h-[520px]"
    >
      <svg
        width="520"
        height="520"
        viewBox="0 0 520 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          {/* Central core gradient */}
          <radialGradient id="hg-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1A4FCC" />
            <stop offset="60%" stopColor="#0A2A7A" />
            <stop offset="100%" stopColor="#061640" />
          </radialGradient>
          {/* Outer glow */}
          <radialGradient id="hg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
          </radialGradient>
          {/* Background ambient */}
          <radialGradient id="hg-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#003399" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#003399" stopOpacity="0" />
          </radialGradient>
          <filter id="hg-blur-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" result="blur" />
          </filter>
          <filter id="hg-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
          </filter>
        </defs>

        {/* Wide ambient background glow */}
        <circle cx={CX} cy={CY} r={220} fill="url(#hg-bg)" />

        {/* Outer dashed orbit ring */}
        <circle
          cx={CX} cy={CY} r={175}
          stroke="#0066FF" strokeWidth="0.8"
          strokeOpacity="0.18" strokeDasharray="5 8"
          fill="none"
        />

        {/* Lines from core edge to each satellite */}
        {NODES.map((n) => {
          const end = pt(n.angle, n.r - 32);
          const start = pt(n.angle, 92);
          return (
            <motion.line
              key={n.label + "-line"}
              x1={start.x} y1={start.y}
              x2={end.x}   y2={end.y}
              stroke={n.color}
              strokeWidth="1"
              strokeOpacity="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            />
          );
        })}

        {/* Animated travelling dots along each line */}
        {NODES.map((n, i) => {
          const start = pt(n.angle, 92);
          const end   = pt(n.angle, n.r - 32);
          return (
            <motion.circle
              key={n.label + "-dot"}
              r={3.5}
              fill={n.color}
              animate={{
                cx: [start.x, end.x, start.x],
                cy: [start.y, end.y, start.y],
                opacity: [0, 1, 0.9, 1, 0],
              }}
              transition={{
                duration: 2.6,
                delay: 1.5 + i * 0.55,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Satellite node circles */}
        {NODES.map((n, i) => {
          const pos = pt(n.angle, n.r);
          return (
            <motion.g
              key={n.label}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 1.2 + i * 0.12, ease: "backOut" }}
            >
              {/* Outer soft ring */}
              <circle cx={pos.x} cy={pos.y} r={32} stroke={n.color} strokeWidth="1" strokeOpacity="0.2" fill="none" />
              {/* Main node circle */}
              <circle cx={pos.x} cy={pos.y} r={26} fill="#0B1A36" stroke={n.color} strokeWidth="1.5" strokeOpacity="0.65" />
              {/* Label */}
              <text
                x={pos.x} y={pos.y + 5}
                textAnchor="middle"
                fill={n.color}
                fontSize="11.5"
                fontWeight="700"
                fontFamily="'Josefin Sans', system-ui, sans-serif"
                letterSpacing="0.5"
              >
                {n.label}
              </text>
            </motion.g>
          );
        })}

        {/* Central glow bloom */}
        <circle cx={CX} cy={CY} r={110} fill="url(#hg-glow)" filter="url(#hg-blur-glow)" />

        {/* Outer orbital ring of core */}
        <motion.circle
          cx={CX} cy={CY} r={96}
          stroke="#00D4FF" strokeWidth="1.2"
          strokeOpacity="0.4" fill="none"
          animate={{ strokeOpacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner ring */}
        <circle cx={CX} cy={CY} r={80} stroke="#0066FF" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />

        {/* Core filled circle */}
        <circle cx={CX} cy={CY} r={74} fill="url(#hg-core)" />

        {/* Subtle inner glow on core */}
        <circle cx={CX} cy={CY} r={74} fill="#1855CC" fillOpacity="0.12" filter="url(#hg-soft)" />


      </svg>

      {/* Robot icon — centered on the core circle (CX=260, CY=260, r=74) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.0, ease: "backOut" }}
        className="absolute"
        style={{ left: 260 - 50, top: 260 - 50, width: 100, height: 100 }}
      >
        <Image
          src="/robot-icon.png"
          alt="Smart AI Workspace"
          width={100}
          height={100}
          className="object-contain"
        />
      </motion.div>

      {/* Corner brackets as divs — easier to position */}
      {[
        { top: "12px",  left: "12px",  borderTop: true,  borderLeft: true  },
        { top: "12px",  right: "12px", borderTop: true,  borderRight: true },
        { bottom: "12px", left: "12px",  borderBottom: true, borderLeft: true  },
        { bottom: "12px", right: "12px", borderBottom: true, borderRight: true },
      ].map((s, i) => (
        <div
          key={i}
          className="absolute w-5 h-5"
          style={{
            top: s.top,
            left: s.left,
            right: (s as { right?: string }).right,
            bottom: (s as { bottom?: string }).bottom,
            borderTop:    s.borderTop    ? "1.5px solid rgba(0,102,255,0.35)" : undefined,
            borderLeft:   s.borderLeft   ? "1.5px solid rgba(0,102,255,0.35)" : undefined,
            borderRight:  (s as { borderRight?: boolean }).borderRight  ? "1.5px solid rgba(0,102,255,0.35)" : undefined,
            borderBottom: (s as { borderBottom?: boolean }).borderBottom ? "1.5px solid rgba(0,102,255,0.35)" : undefined,
          }}
        />
      ))}
    </motion.div>
  );
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-mesh dot-grid overflow-hidden">
      <Container className="relative z-10 py-24 md:py-32">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 px-4 py-1.5 text-xs font-medium text-accent-cyan">
              <Sparkles size={14} />
              AI-Powered Business Automation
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-pure-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Automate Smarter.{" "}
            <br />
            <span className="text-gradient">Grow Faster.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            We build intelligent automation systems that eliminate manual work,
            reduce costs by up to 60%, and help your team focus on what actually
            moves the needle.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact" size="lg">
              Get Started
              <ArrowRight size={18} />
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore Services
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Automation hub diagram */}
      <div className="pointer-events-none absolute right-[-40px] top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
        <AutomationDiagram />
      </div>
    </section>
  );
}
