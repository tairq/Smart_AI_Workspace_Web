import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { industries } from "@/lib/data/industries";
import { integrations } from "@/lib/data/integrations";
import { glossaryTerms } from "@/lib/data/glossary";
import { getAllPosts } from "@/lib/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/services",
    "/about",
    "/contact",
    "/solutions",
    "/integrations",
    "/glossary",
    "/blog",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const solutionPages = industries.map((i) => ({
    url: `${siteConfig.url}/solutions/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const integrationPages = integrations.map((i) => ({
    url: `${siteConfig.url}/integrations/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const glossaryPages = glossaryTerms.map((t) => ({
    url: `${siteConfig.url}/glossary/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogPages = getAllPosts().map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...solutionPages, ...integrationPages, ...glossaryPages, ...blogPages];
}
