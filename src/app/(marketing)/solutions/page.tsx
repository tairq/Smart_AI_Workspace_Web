import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { industries } from "@/lib/data/industries";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "AI Automation Solutions by Industry",
  description:
    "Explore how Smart AI Workspace delivers AI automation solutions tailored for real estate, e-commerce, manufacturing, logistics, and more.",
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
                <div className="glass h-full overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-[0_0_24px_0_rgba(0,212,255,0.12)]">
                  {ind.image && (
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={ind.image}
                        alt={ind.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
