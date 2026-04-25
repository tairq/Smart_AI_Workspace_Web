import { ImageResponse } from "next/og";
import { glossaryTerms } from "@/lib/data/glossary";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgTemplate,
} from "@/lib/seo/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Smart AI Workspace — Glossary";

export async function generateStaticParams() {
  return glossaryTerms.map((t) => ({ term: t.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { term: slug } = await params;
  const t = glossaryTerms.find((g) => g.slug === slug);

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="Glossary"
        title={t ? `What is ${t.term}?` : "AI & Automation Glossary"}
        description={t?.definition}
        footerRight="AI Glossary"
      />
    ),
    { ...size }
  );
}
