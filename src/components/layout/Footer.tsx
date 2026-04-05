"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/shared/Container";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "AI Workflow Automation", href: "/services#workflow" },
  { label: "CRM & Sales Automation", href: "/services#crm" },
  { label: "Data Pipeline & Reporting", href: "/services#data" },
  { label: "Custom AI Agents", href: "/services#agents" },
];

const resourceLinks = [
  { label: "Solutions", href: "/solutions" },
  { label: "Integrations", href: "/integrations" },
  { label: "Glossary", href: "/glossary" },
];

const socials = [
  { icon: ExternalLink, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: ExternalLink, href: siteConfig.links.twitter, label: "Twitter" },
  { icon: Mail, href: `mailto:${siteConfig.links.email}`, label: "Email" },
];

const colVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer className="border-t border-white/5 bg-navy-light" ref={ref}>
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            custom={0}
            variants={colVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <p className="font-display text-lg font-bold text-off-white">
              Smart<span className="text-accent-cyan">AI</span> Workspace
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              AI-powered automation for modern business. We help companies
              streamline operations, cut costs, and scale faster.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-muted transition-colors hover:bg-accent-cyan/10 hover:text-accent-cyan"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            custom={1}
            variants={colVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-off-white">
              Company
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-accent-cyan"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            custom={2}
            variants={colVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-off-white">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-accent-cyan"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources + Contact */}
          <motion.div
            custom={3}
            variants={colVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-off-white">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-accent-cyan"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-off-white">
                Contact
              </h4>
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="text-sm text-muted transition-colors hover:text-accent-cyan"
              >
                {siteConfig.links.email}
              </a>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted transition-colors hover:text-off-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted transition-colors hover:text-off-white">
              Terms of Service
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
