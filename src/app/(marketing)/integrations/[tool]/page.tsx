import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { integrations } from "@/lib/data/integrations";
import { siteConfig } from "@/config/site";
import { JsonLd, buildBreadcrumbList } from "@/lib/seo/jsonld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/shared/Container";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type Props = { params: Promise<{ tool: string }> };

export async function generateStaticParams() {
  return integrations.map((i) => ({ tool: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tool: slug } = await params;
  const int = integrations.find((i) => i.slug === slug);
  if (!int) return {};
  return buildPageMetadata({
    title: `${int.name} Integration`,
    description: int.metaDescription,
    path: `/integrations/${slug}`,
  });
}

export default async function IntegrationPage({ params }: Props) {
  const { tool: slug } = await params;
  const int = integrations.find((i) => i.slug === slug);
  if (!int) notFound();

  const related = integrations.filter((i) => int.relatedIntegrations.includes(i.slug));

  const pageUrl = `${siteConfig.url}/integrations/${slug}`;
  const crumbs = buildBreadcrumbList([
    { name: "Home", url: siteConfig.url },
    { name: "Integrations", url: `${siteConfig.url}/integrations` },
    { name: int.name, url: pageUrl },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />
      {/* Hero */}
      <section className="gradient-mesh py-24 md:py-32">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Integrations", href: "/integrations" },
              { label: int.name },
            ]}
            className="mb-8"
          />
          <Badge className="mb-4">{int.category}</Badge>
          <h1 className="font-display text-3xl font-bold text-pure-white sm:text-4xl md:text-5xl">
            {int.name} + Smart AI Workspace
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted md:text-lg">
            {int.description}
          </p>
          <div className="mt-8">
            <Button href="/contact" size="lg">
              Set Up This Integration <ArrowRight size={18} />
            </Button>
          </div>
        </Container>
      </section>

      {/* Use Cases */}
      <section className="py-20 md:py-28">
        <Container>
          <h2 className="mb-8 font-display text-2xl font-bold text-off-white sm:text-3xl">
            What You Can Automate
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {int.useCases.map((uc) => (
              <li key={uc} className="flex gap-3 text-sm text-light-gray">
                <Check size={18} className="mt-0.5 shrink-0 text-accent-cyan" />
                {uc}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Setup Steps */}
      <section className="bg-navy-light py-20 md:py-28">
        <Container>
          <h2 className="mb-8 font-display text-2xl font-bold text-off-white sm:text-3xl">
            Getting Started
          </h2>
          <div className="space-y-4">
            {int.setupSteps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric-blue/15 text-xs font-bold text-electric-blue">
                  {i + 1}
                </span>
                <p className="pt-1 text-sm text-light-gray">{step}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related Integrations */}
      {related.length > 0 && (
        <section className="py-20 md:py-28">
          <Container>
            <h2 className="mb-8 font-display text-2xl font-bold text-off-white sm:text-3xl">
              Related Integrations
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/integrations/${r.slug}`} className="group block">
                  <Card>
                    <h3 className="font-display text-base font-semibold text-off-white">{r.name}</h3>
                    <Badge className="mt-2">{r.category}</Badge>
                    <p className="mt-2 text-sm text-muted line-clamp-2">{r.description}</p>
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
            Ready to connect {int.name}?
          </h2>
          <p className="mt-2 text-sm text-muted">
            Our team will set up the integration and build custom workflows tailored to your needs.
          </p>
          <div className="mt-6">
            <Button href="/contact">
              Get Started <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
