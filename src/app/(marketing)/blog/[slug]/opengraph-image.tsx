import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/data/blog";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgTemplate,
} from "@/lib/seo/og-template";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Smart AI Workspace — Blog Post";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow="Blog"
        title={post?.meta.title ?? "Smart AI Workspace Blog"}
        description={post?.meta.excerpt}
      />
    ),
    { ...size }
  );
}
