import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us — Book a Discovery Call",
  description:
    "Tell me about your automation challenges and I'll show you what's possible — send a message or book a 30-minute discovery call with Smart AI Workspace.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
