import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "AI-Powered Business Automation",
  description:
    "Smart AI Workspace helps B2B companies automate workflows, cut costs by up to 60%, and scale operations with custom AI agents and intelligent automation.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
