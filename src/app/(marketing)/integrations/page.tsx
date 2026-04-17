import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";
import { integrations } from "@/lib/data/integrations";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { IntegrationIcon } from "@/components/shared/IntegrationIcon";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Smart AI Workspace with Salesforce, HubSpot, Slack, Shopify, and hundreds more tools to automate your business workflows.",
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
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <IntegrationIcon slug={int.slug} brandColor={int.brandColor} size={24} />
                      <div>
                        <h3 className="font-display text-lg font-semibold text-off-white leading-tight">
                          {int.name}
                        </h3>
                        <Badge className="mt-2">{int.category}</Badge>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-muted opacity-0 transition-opacity group-hover:opacity-100 shrink-0 mt-1"
                    />
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted line-clamp-3">
                    {int.description}
                  </p>
                </Card>
              </Link>
            ))}

            {/* +400 more apps card */}
            <div className="group block">
              <Card className="h-full flex flex-col items-center justify-center text-center py-8 border-dashed border-accent-cyan/30 bg-accent-cyan/5 hover:bg-accent-cyan/10 transition-colors cursor-default">
                <div className="flex items-center justify-center rounded-xl mb-4 w-14 h-14 bg-accent-cyan/10 border border-accent-cyan/30">
                  <Zap size={24} className="text-accent-cyan" />
                </div>
                <p className="text-4xl font-bold text-gradient mb-1">+400</p>
                <p className="text-lg font-semibold text-off-white mb-2">More Apps</p>
                <p className="text-sm text-muted leading-relaxed max-w-[220px]">
                  Native n8n integrations covering every category — CRM, finance, DevOps, AI, marketing, and beyond.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-cyan hover:text-white transition-colors"
                >
                  Request an integration <ArrowUpRight size={14} />
                </Link>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
