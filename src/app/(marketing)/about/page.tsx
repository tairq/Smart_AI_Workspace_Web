import type { Metadata } from "next";
import Image from "next/image";
import { Lightbulb, Shield, Target, Handshake } from "lucide-react";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Solo-founded B2B AI automation consultancy building custom workflows, intelligent agents, and n8n-powered integrations. Book a free discovery call.",
  alternates: {
    canonical: "/about",
  },
};

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We push boundaries with cutting-edge AI and automation technology, always seeking better solutions.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Security, transparency, and reliability are non-negotiable. Your data and operations are safe with us.",
  },
  {
    icon: Target,
    title: "Results",
    description: "Every automation we build is measured by real business outcomes — time saved, costs reduced, revenue gained.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    description: "We work alongside your team, not above it. Long-term relationships built on shared success.",
  },
];

const founder = {
  name: "Tariq Osmani",
  role: "Founder & CEO",
  email: "tosmani@smartaiworkspace.tech",
  bio: "Builder, automation architect, and AI enthusiast. Tariq founded Smart AI Workspace to help businesses escape manual work and operate at the speed of AI. He personally leads every client engagement — from initial workflow audit to production deployment.",
  photo: "/team/tariq.jpg",
};

const partners = [
  "OpenAI", "Anthropic", "n8n", "Make", "Zapier",
  "Salesforce", "HubSpot", "Slack", "Google Cloud", "AWS",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-mesh py-24 md:py-32">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="About Us"
            title="Building the Future of Business Automation"
            subtitle="Smart AI Workspace is a founder-led studio on a mission to make intelligent automation accessible to every B2B company — built by someone who does the work, not delegates it."
          />
        </Container>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <blockquote className="font-display text-xl font-medium leading-relaxed text-off-white md:text-2xl">
              &ldquo;We believe every business deserves to operate at the speed of AI — not because technology demands it, but because your team&apos;s time is too valuable for manual work.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm text-muted">— Tariq Osmani, Founder & CEO</p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-navy-light py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-off-white sm:text-3xl">
              Our Story
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
              <p>
                Smart AI Workspace was born from a simple observation: businesses were drowning in manual processes that AI could handle in seconds. Spreadsheet exports, copy-paste data entry, forgotten follow-ups, and reporting that took days instead of minutes.
              </p>
              <p>
                We started by automating our own workflows, then helped a handful of companies do the same. The results were staggering — 60% cost reductions, 10x faster turnaround times, and teams that could finally focus on work that required human creativity and judgment.
              </p>
              <p>
                Today, we partner with B2B companies across industries to design, build, and maintain intelligent automation systems. From simple workflow automation to complex AI agent development, we turn operational bottlenecks into competitive advantages.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our Values"
            title="What Drives Us"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title} hover={false}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-cyan/10 text-accent-cyan">
                  <v.icon size={24} />
                </div>
                <h3 className="font-display text-lg font-semibold text-off-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Founder */}
      <section className="bg-navy-light py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="The Founder"
            title="The Person Behind the Automation"
            subtitle="Founder-led means you work directly with the person who built the system — no hand-offs, no account managers."
          />
          <div className="mx-auto max-w-2xl">
            <Card hover={false} className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left sm:items-start">
              {/* Photo */}
              <div className="relative shrink-0">
                <div className="h-64 w-64 rounded-2xl overflow-hidden bg-electric-blue/15 ring-2 ring-electric-blue/30">
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    width={256}
                    height={256}
                    className="h-full w-full object-cover object-top"
                    quality={100}
                    priority
                    unoptimized
                  />
                </div>
                {/* Online indicator */}
                <span className="absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full bg-green-400 ring-2 ring-charcoal" />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-cyan mb-1">
                  {founder.role}
                </p>
                <h3 className="font-display text-2xl font-bold text-pure-white">
                  {founder.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {founder.bio}
                </p>
                <p className="mt-2 text-xs text-muted">
                  <a href={`mailto:${founder.email}`} className="hover:text-accent-cyan transition-colors">
                    {founder.email}
                  </a>
                </p>
                <div className="mt-4 flex gap-3 sm:justify-start justify-center">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted transition hover:bg-white/10 hover:text-off-white"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={15} />
                  </a>
                  <a
                    href="https://x.com/Tariq_Osmani26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted transition hover:bg-white/10 hover:text-off-white"
                    aria-label="Twitter / X"
                  >
                    <FaXTwitter size={15} />
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Tech Partners */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Tech Partners"
            title="Powered by Industry Leaders"
          />
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((name) => (
              <span
                key={name}
                className="font-display text-sm font-semibold text-muted/40 transition-colors hover:text-muted"
              >
                {name}
              </span>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
