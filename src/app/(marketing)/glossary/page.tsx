import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { glossaryTerms } from "@/lib/data/glossary";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "AI & Automation Glossary",
  description:
    "Learn key AI and automation concepts — from workflow automation and ETL to AI agents and conversational AI. A comprehensive glossary for business leaders.",
  path: "/glossary",
});

export default function GlossaryPage() {
  const sorted = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <>
      <section className="gradient-mesh py-24 md:py-32">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Glossary"
            title="AI & Automation Glossary"
            subtitle="Key terms and concepts explained clearly for business leaders and technical teams alike."
          />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="divide-y divide-white/5">
            {sorted.map((term) => (
              <Link
                key={term.slug}
                href={`/glossary/${term.slug}`}
                className="group flex items-start justify-between gap-4 py-6 transition-colors hover:bg-white/[0.02] -mx-4 px-4 rounded-lg"
              >
                <div>
                  <h3 className="font-display text-base font-semibold text-off-white group-hover:text-accent-cyan transition-colors">
                    {term.term}
                  </h3>
                  <p className="mt-1 text-sm text-muted line-clamp-2">
                    {term.definition}
                  </p>
                </div>
                <ArrowUpRight size={18} className="mt-1 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
