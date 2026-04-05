import type { Metadata } from "next";
import { Lightbulb, Shield, Target, Handshake } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Smart AI Workspace is a B2B AI automation company helping businesses streamline operations with intelligent workflows, custom agents, and data-driven automation.",
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

const team = [
  { name: "Alex Morgan", role: "CEO & Founder" },
  { name: "Priya Sharma", role: "Head of AI Engineering" },
  { name: "David Kim", role: "VP of Operations" },
  { name: "Lisa Chen", role: "Lead Automation Architect" },
  { name: "James Rivera", role: "Head of Client Success" },
  { name: "Aisha Patel", role: "Senior Solutions Engineer" },
];

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
            eyebrow="About Us"
            title="Building the Future of Business Automation"
            subtitle="We're a team of AI engineers, automation architects, and business strategists on a mission to make intelligent automation accessible to every B2B company."
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
            <p className="mt-6 text-sm text-muted">— SmartAI Workspace Team</p>
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

      {/* Team */}
      <section className="bg-navy-light py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our Team"
            title="The People Behind the Automation"
            subtitle="Engineers, strategists, and problem-solvers who live and breathe AI automation."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <Card key={member.name} hover={false} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-electric-blue/15 font-display text-xl font-bold text-electric-blue">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="font-display text-base font-semibold text-off-white">{member.name}</h3>
                <p className="mt-1 text-sm text-muted">{member.role}</p>
              </Card>
            ))}
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
