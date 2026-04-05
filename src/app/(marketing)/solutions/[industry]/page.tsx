import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { industries } from "@/lib/data/industries";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type Props = { params: Promise<{ industry: string }> };

export async function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry: slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) return {};
  return {
    title: `AI Automation for ${ind.name}`,
    description: ind.description,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { industry: slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) notFound();

  return (
    <>
      {/* Hero */}
      <section className="gradient-mesh py-24 md:py-32">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Solutions", href: "/solutions" },
              { label: ind.name },
            ]}
            className="mb-8"
          />
          <h1 className="font-display text-3xl font-bold text-pure-white sm:text-4xl md:text-5xl">
            {ind.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
            {ind.description}
          </p>
          <div className="mt-8">
            <Button href="/contact" size="lg">
              Get a Free Consultation <ArrowRight size={18} />
            </Button>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-navy-light py-12">
        <Container>
          <div className="grid grid-cols-3 gap-8 text-center">
            {ind.stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold text-accent-cyan md:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-muted md:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pain Points */}
      <section className="py-20 md:py-28">
        <Container>
          <h2 className="font-display text-2xl font-bold text-off-white sm:text-3xl">
            Challenges We Solve in {ind.name}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {ind.painPoints.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-muted">
                <Check size={18} className="mt-0.5 shrink-0 text-accent-cyan" />
                {p}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Use Cases */}
      <section className="bg-navy-light py-20 md:py-28">
        <Container>
          <h2 className="mb-10 font-display text-2xl font-bold text-off-white sm:text-3xl">
            How It Works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {ind.useCases.map((uc, i) => (
              <Card key={i} hover={false}>
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-electric-blue/15 text-xs font-bold text-electric-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base font-semibold text-off-white">{uc.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{uc.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Related Services */}
      <section className="py-20 md:py-28">
        <Container>
          <h2 className="mb-6 font-display text-2xl font-bold text-off-white sm:text-3xl">
            Related Services
          </h2>
          <div className="flex flex-wrap gap-3">
            {ind.relatedServices.map((s) => (
              <span key={s} className="rounded-full border border-white/10 px-4 py-2 text-sm text-light-gray">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/contact">
              Discuss Your {ind.name} Automation Needs <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
