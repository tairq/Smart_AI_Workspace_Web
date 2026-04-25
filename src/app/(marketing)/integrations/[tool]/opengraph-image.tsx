import { ImageResponse } from "next/og";
import { integrations } from "@/lib/data/integrations";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgTemplate,
} from "@/lib/seo/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Smart AI Workspace — Integration";

export async function generateStaticParams() {
  return integrations.map((i) => ({ tool: i.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool: slug } = await params;
  const int = integrations.find((i) => i.slug === slug);

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={int ? `Integration · ${int.category}` : "Integration"}
        title={
          int
            ? `${int.name} + Smart AI Workspace`
            : "Integrate your stack with Smart AI Workspace"
        }
        description={int?.description}
        accentColor={int?.brandColor}
        footerRight={int ? `${int.name} Integration` : "Integrations"}
      />
    ),
    { ...size }
  );
}
