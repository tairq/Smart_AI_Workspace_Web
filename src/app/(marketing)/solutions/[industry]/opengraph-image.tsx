import { ImageResponse } from "next/og";
import { industries } from "@/lib/data/industries";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgTemplate,
} from "@/lib/seo/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Smart AI Workspace — Industry Solution";

export async function generateStaticParams() {
  return industries.map((i) => ({ industry: i.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const ind = industries.find((i) => i.slug === slug);

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={ind ? `Solutions · ${ind.name}` : "Solutions"}
        title={ind?.headline ?? "AI Automation Solutions by Industry"}
        description={ind?.description}
        footerRight="Industry Solution"
      />
    ),
    { ...size }
  );
}
