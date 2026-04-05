import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { integrations } from "@/lib/data/integrations";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Smart AI Workspace with Salesforce, HubSpot, Slack, Shopify, and dozens more tools to automate your business workflows.",
};

export default function IntegrationsPage() {
  return (
    <>
      <section className="gradient-mesh py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow="Integrations"
            title="Connect Your Entire Stack"
            subtitle="We integrate with the tools you already use — so automation fits seamlessly into your existing workflow."
          />
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {integrations.map((int) => (
              <Link key={int.slug} href={`/integrations/${int.slug}`} className="group block">
                <Card className="h-full">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-off-white">
                        {int.name}
                      </h3>
                      <Badge className="mt-2">{int.category}</Badge>
                    </div>
                    <ArrowUpRight size={18} className="text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                    {int.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
