import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  authorName?: string;
  tags?: string[];
  absoluteTitle?: boolean;
};

export function buildPageMetadata(input: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${input.path}`;
  const ogType = input.type ?? "website";
  const titleField = input.absoluteTitle ? { absolute: input.title } : input.title;

  return {
    title: titleField,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: siteConfig.name,
      type: ogType,
      ...(input.image ? { images: [{ url: input.image, width: 1200, height: 630 }] } : {}),
      ...(ogType === "article" && input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(ogType === "article" && input.authorName ? { authors: [input.authorName] } : {}),
      ...(ogType === "article" && input.tags ? { tags: input.tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      ...(input.image ? { images: [input.image] } : {}),
    },
  };
}
