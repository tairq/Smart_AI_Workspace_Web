import { siteConfig } from "@/config/site";
import { tariqOsmani } from "@/lib/data/author";
import type { BlogPost } from "@/lib/data/blog";
import type { GlossaryTerm } from "@/lib/data/glossary";

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;
const PERSON_ID = `${siteConfig.url}/about/${tariqOsmani.slug}#person`;

export function buildOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo-new.png`,
    },
    sameAs: [siteConfig.links.linkedin],
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.links.email,
      contactType: "customer support",
      areaServed: "Worldwide",
      availableLanguage: ["en"],
    },
  };
}

export function buildWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": ORG_ID },
  };
}

export function buildPerson() {
  const personUrl = `${siteConfig.url}/about/${tariqOsmani.slug}`;
  const image = tariqOsmani.photo.startsWith("http")
    ? tariqOsmani.photo
    : `${siteConfig.url}${tariqOsmani.photo}`;

  const sameAs = [
    tariqOsmani.social.linkedin,
    tariqOsmani.social.x,
    tariqOsmani.social.youtube,
  ].filter((u) => typeof u === "string" && u.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: tariqOsmani.name,
    jobTitle: tariqOsmani.jobTitle,
    image,
    url: personUrl,
    description: tariqOsmani.shortBio,
    sameAs,
    worksFor: { "@id": ORG_ID },
    knowsAbout: [...tariqOsmani.expertise],
  };
}

type ArticleAuthor = { name: string; url?: string };

export function buildArticle(
  post: BlogPost,
  url: string,
  author?: ArticleAuthor,
) {
  const image = post.coverImage
    ? post.coverImage.startsWith("http")
      ? post.coverImage
      : `${siteConfig.url}${post.coverImage}`
    : `${siteConfig.url}/logo-new.png`;

  const authorNode = author
    ? {
        "@type": "Person" as const,
        name: author.name,
        ...(author.url ? { url: author.url } : {}),
      }
    : { "@id": PERSON_ID };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.excerpt,
    image,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: authorNode,
    publisher: { "@id": ORG_ID },
    keywords: post.tags,
    url,
  };
}

export function buildBreadcrumbList(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

type ServiceInput = { name: string; description: string; url?: string };

export function buildServiceItemList(services: ServiceInput[], pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: pageUrl,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        serviceType: s.name,
        areaServed: "Worldwide",
        provider: { "@id": ORG_ID },
        ...(s.url ? { url: s.url } : {}),
      },
    })),
  };
}

export function buildFAQPage(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: i.answer,
      },
    })),
  };
}

export function buildDefinedTerm(term: GlossaryTerm, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": url,
    name: term.term,
    description: term.definition,
    url,
    inDefinedTermSet: `${siteConfig.url}/glossary`,
  };
}

type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

export function JsonLd({ data }: { data: JsonLdData }) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : data;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
