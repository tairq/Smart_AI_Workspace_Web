import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { glossaryTerms } from "@/lib/data/glossary";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type Props = { params: Promise<{ term: string }> };

export async function generateStaticParams() {
  return glossaryTerms.map((t) => ({ term: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term: slug } = await params;
  const t = glossaryTerms.find((g) => g.slug === slug);
  if (!t) return {};
  return {
    title: `What is ${t.term}?`,
    description: t.definition,
  };
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term: slug } = await params;
  const t = glossaryTerms.find((g) => g.slug === slug);
  if (!t) notFound();

  const related = glossaryTerms.filter((g) => t.relatedTerms.includes(g.slug));

  return (
    <>
      {/* Header */}
      <section className="gradient-mesh py-24 md:py-32">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Glossary", href: "/glossary" },
              { label: t.term },
            ]}
            className="mb-8"
          />
          <h1 className="font-display text-3xl font-bold text-pure-white sm:text-4xl md:text-5xl">
            What is {t.term}?
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
            {t.definition}
          </p>
        </Container>
      </section>

      {/* Explanation */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-off-white">
              How It Works
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-light-gray">
              {t.explanation}
            </p>
          </div>
        </Container>
      </section>

      {/* Benefits + Use Cases */}
      <section className="bg-navy-light py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-3xl grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-display text-xl font-bold text-off-white">
                Key Benefits
              </h2>
              <ul className="space-y-3">
                {t.benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-light-gray">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent-cyan" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 font-display text-xl font-bold text-off-white">
                Common Use Cases
              </h2>
              <ul className="space-y-3">
                {t.useCases.map((uc) => (
                  <li key={uc} className="flex gap-3 text-sm text-light-gray">
                    <ArrowRight size={16} className="mt-0.5 shrink-0 text-electric-blue" />
                    {uc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Terms */}
      {related.length > 0 && (
        <section className="py-20 md:py-28">
          <Container>
            <h2 className="mb-8 font-display text-2xl font-bold text-off-white">
              Related Terms
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/glossary/${r.slug}`} className="group block">
                  <Card>
                    <h3 className="font-display text-base font-semibold text-off-white group-hover:text-accent-cyan transition-colors">
                      {r.term}
                    </h3>
                    <p className="mt-2 text-sm text-muted line-clamp-2">{r.definition}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy-light py-16">
        <Container className="text-center">
          <h2 className="font-display text-2xl font-bold text-off-white">
            Need Help with {t.term}?
          </h2>
          <p className="mt-2 text-sm text-muted">
            Our team builds custom {t.term.toLowerCase()} solutions for B2B companies.
          </p>
          <div className="mt-6">
            <Button href="/contact">
              Talk to an Expert <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
