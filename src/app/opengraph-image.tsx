import { ImageResponse } from "next/og";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgTemplate,
} from "@/lib/seo/og-template";
import { siteConfig } from "@/config/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = siteConfig.name;

export default async function Image() {
  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="AI Automation Agency"
        title="Streamline operations with intelligent workflows & custom AI agents."
        description={siteConfig.description}
      />
    ),
    { ...size }
  );
}
