import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUTPUT_DIR = "./docs/seo-audit";
const SITEMAP_URL = "https://www.smartaiworkspace.tech/sitemap.xml";
const CONCURRENCY = 8;
const UA = "SmartAIWorkspace-SEO-Audit/1.0 (+https://www.smartaiworkspace.tech)";

mkdirSync(OUTPUT_DIR, { recursive: true });

function dec(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function attr(tag, name) {
  const re = new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i");
  const m = tag.match(re);
  return m ? dec(m[1]) : null;
}

function extract(url, html, status) {
  const rec = { url, status, finalUrl: null };

  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const head = headMatch ? headMatch[1] : html;
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : html;

  // Title
  const titleMatch = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  rec.title = titleMatch ? dec(stripTags(titleMatch[1])) : null;
  rec.titleLen = rec.title ? rec.title.length : 0;

  // Meta tags
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]);
  const getMeta = (name, by = "name") => {
    for (const m of metas) {
      const a = attr(m, by);
      if (a && a.toLowerCase() === name.toLowerCase()) return attr(m, "content");
    }
    return null;
  };

  rec.metaDescription = getMeta("description");
  rec.metaLen = rec.metaDescription ? rec.metaDescription.length : 0;
  rec.metaKeywords = getMeta("keywords");
  rec.robotsMeta = getMeta("robots");
  rec.viewport = getMeta("viewport");
  rec.themeColor = getMeta("theme-color");
  rec.author = getMeta("author");

  // OpenGraph
  rec.og = {
    title: getMeta("og:title", "property"),
    description: getMeta("og:description", "property"),
    image: getMeta("og:image", "property"),
    type: getMeta("og:type", "property"),
    url: getMeta("og:url", "property"),
    siteName: getMeta("og:site_name", "property"),
    locale: getMeta("og:locale", "property"),
  };

  // Twitter
  rec.twitter = {
    card: getMeta("twitter:card"),
    title: getMeta("twitter:title"),
    description: getMeta("twitter:description"),
    image: getMeta("twitter:image"),
  };

  // Canonical
  const canonMatch = head.match(/<link\b[^>]*rel\s*=\s*["']canonical["'][^>]*>/i);
  rec.canonical = canonMatch ? attr(canonMatch[0], "href") : null;

  // Alternates / hreflang
  rec.hreflang = [...head.matchAll(/<link\b[^>]*rel\s*=\s*["']alternate["'][^>]*>/gi)]
    .map((m) => ({ hreflang: attr(m[0], "hreflang"), href: attr(m[0], "href") }))
    .filter((h) => h.hreflang);

  // JSON-LD
  rec.jsonLd = [];
  const ldMatches = [...html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const m of ldMatches) {
    try {
      const parsed = JSON.parse(m[1].trim());
      const nodes = Array.isArray(parsed) ? parsed : [parsed];
      for (const n of nodes) {
        rec.jsonLd.push(n["@type"] || (n["@graph"] ? "@graph" : "unknown"));
      }
    } catch {
      rec.jsonLd.push("INVALID");
    }
  }

  // Headings
  const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => dec(stripTags(m[1])));
  const h2s = [...body.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => dec(stripTags(m[1])));
  const h3s = [...body.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi)].map((m) => dec(stripTags(m[1])));
  rec.h1Count = h1s.length;
  rec.h1Text = h1s;
  rec.h2Count = h2s.length;
  rec.h2Text = h2s.slice(0, 15);
  rec.h3Count = h3s.length;

  // Images & alt
  const imgs = [...body.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  rec.imgCount = imgs.length;
  rec.imgMissingAlt = imgs.filter((i) => {
    const a = attr(i, "alt");
    return a === null;
  }).length;
  rec.imgEmptyAlt = imgs.filter((i) => attr(i, "alt") === "").length;

  // Links
  const links = [...body.matchAll(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi)].map((m) => m[1]);
  rec.internalLinks = links.filter((h) => h.startsWith("/") || h.includes("smartaiworkspace.tech")).length;
  rec.externalLinks = links.filter((h) => /^https?:\/\//i.test(h) && !h.includes("smartaiworkspace.tech")).length;
  rec.mailtoLinks = links.filter((h) => h.startsWith("mailto:")).length;

  // Word count (from body text)
  const bodyText = stripTags(body);
  rec.wordCount = bodyText.split(/\s+/).filter(Boolean).length;

  // HTML lang
  const htmlTagMatch = html.match(/<html[^>]*>/i);
  rec.htmlLang = htmlTagMatch ? attr(htmlTagMatch[0], "lang") : null;

  // Quick grep for noindex / nofollow
  rec.hasNoindex = /noindex/i.test(rec.robotsMeta || "");
  rec.hasNofollow = /nofollow/i.test(rec.robotsMeta || "");

  return rec;
}

async function fetchOne(url) {
  const start = Date.now();
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml" },
    });
    const html = await res.text();
    const rec = extract(url, html, res.status);
    rec.finalUrl = res.url;
    rec.bytes = html.length;
    rec.durationMs = Date.now() - start;
    rec.redirected = res.url !== url;
    return rec;
  } catch (err) {
    return { url, status: 0, error: err.message, durationMs: Date.now() - start };
  }
}

async function parallelMap(items, concurrency, fn) {
  const results = [];
  let i = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (i < items.length) {
      const idx = i++;
      const r = await fn(items[idx], idx);
      results[idx] = r;
      process.stdout.write(`[${idx + 1}/${items.length}] ${items[idx]} -> ${r.status || r.error}\n`);
    }
  });
  await Promise.all(workers);
  return results;
}

console.log("Fetching sitemap...");
const sitemapXml = await (await fetch(SITEMAP_URL, { headers: { "User-Agent": UA } })).text();
const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log(`Found ${urls.length} URLs in sitemap.`);

const pages = await parallelMap(urls, CONCURRENCY, fetchOne);

// Also fetch robots.txt
const robotsRes = await fetch("https://www.smartaiworkspace.tech/robots.txt", { headers: { "User-Agent": UA } });
const robotsTxt = await robotsRes.text();

// Check for llms.txt presence
const llmsRes = await fetch("https://www.smartaiworkspace.tech/llms.txt", { headers: { "User-Agent": UA } });
const llmsStatus = llmsRes.status;

// Check for security.txt
const securityRes = await fetch("https://www.smartaiworkspace.tech/.well-known/security.txt", { headers: { "User-Agent": UA } });
const securityStatus = securityRes.status;

// Check for favicon
const faviconRes = await fetch("https://www.smartaiworkspace.tech/favicon.ico", { headers: { "User-Agent": UA } });
const faviconStatus = faviconRes.status;

const out = {
  generatedAt: new Date().toISOString(),
  sitemapUrl: SITEMAP_URL,
  urlCount: urls.length,
  robotsTxt,
  robotsTxtStatus: robotsRes.status,
  llmsTxtStatus: llmsStatus,
  securityTxtStatus: securityStatus,
  faviconStatus,
  pages,
};

writeFileSync(join(OUTPUT_DIR, "raw-pages.json"), JSON.stringify(out, null, 2));
console.log(`\nWrote ${pages.length} pages to ${OUTPUT_DIR}/raw-pages.json`);

// Quick summary
const issues = {
  noTitle: pages.filter((p) => !p.title).length,
  titleTooLong: pages.filter((p) => p.titleLen > 60).length,
  titleTooShort: pages.filter((p) => p.title && p.titleLen < 30).length,
  noMetaDesc: pages.filter((p) => !p.metaDescription).length,
  metaTooLong: pages.filter((p) => p.metaLen > 160).length,
  metaTooShort: pages.filter((p) => p.metaDescription && p.metaLen < 70).length,
  noCanonical: pages.filter((p) => !p.canonical).length,
  noH1: pages.filter((p) => p.h1Count === 0).length,
  multipleH1: pages.filter((p) => p.h1Count > 1).length,
  noJsonLd: pages.filter((p) => p.jsonLd.length === 0).length,
  noOgImage: pages.filter((p) => !p.og.image).length,
  noTwitterCard: pages.filter((p) => !p.twitter.card).length,
  thinContent: pages.filter((p) => p.wordCount < 300).length,
  imgMissingAlt: pages.reduce((s, p) => s + (p.imgMissingAlt || 0), 0),
  nonIndexable: pages.filter((p) => p.hasNoindex).length,
  brokenStatus: pages.filter((p) => p.status !== 200).length,
};

console.log("\n=== Issue Summary ===");
for (const [k, v] of Object.entries(issues)) {
  console.log(`${k}: ${v}`);
}
