import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing",
  description:
    "Transparent pricing for AI automation, CRM automation, data pipelines, and custom AI agent development — scoped to your workflows and goals.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main>
      <h1>Pricing</h1>
    </main>
  );
}
