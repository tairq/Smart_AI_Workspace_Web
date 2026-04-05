import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/lib/data/industries";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "AI Automation Solutions by Industry",
  description:
    "Explore how Smart AI Workspace delivers AI automation solutions tailored for healthcare, finance, e-commerce, legal, manufacturing, and more.",
};

export default function SolutionsPage() {
  return (
    <>
      <section className="gradient-mesh py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Solutions"
            title="AI Automation for Every Industry"
            subtitle="We tailor our automation solutions to the unique challenges, compliance requirements, and workflows of your industry."
          />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <Link key={ind.slug} href={`/solutions/${ind.slug}`} className="group block">
                <Card className="h-full">
                  <h3 className="font-display text-lg font-semibold text-off-white">
                    {ind.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">
                    {ind.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ind.stats.slice(0, 2).map((s) => (
                      <span key={s.label} className="rounded-full bg-accent-cyan/10 px-2.5 py-0.5 text-xs text-accent-cyan">
                        {s.value} {s.label}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-cyan opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowUpRight size={14} />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
