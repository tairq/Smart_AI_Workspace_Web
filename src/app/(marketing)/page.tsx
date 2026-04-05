import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "AI-Powered Business Automation",
  description:
    "Smart AI Workspace helps B2B companies automate workflows, cut costs by up to 60%, and scale operations with custom AI agents and intelligent automation.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ServicesOverview />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
