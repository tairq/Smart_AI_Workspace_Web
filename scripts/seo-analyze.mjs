import { readFileSync, writeFileSync } from "fs";

const data = JSON.parse(readFileSync("./docs/seo-audit/raw-pages.json", "utf8"));
const pages = data.pages;

// Group by template type
const templateOf = (url) => {
  const u = new URL(url);
  const p = u.pathname.replace(/\/$/, "") || "/";
  if (p === "/") return "home";
  if (p.startsWith("/blog/")) return "blog-post";
  if (p === "/blog") return "blog-list";
  if (p.startsWith("/solutions/")) return "solution";
  if (p === "/solutions") return "solutions-list";
  if (p.startsWith("/integrations/")) return "integration";
  if (p === "/integrations") return "integrations-list";
  if (p.startsWith("/glossary/")) return "glossary-term";
  if (p === "/glossary") return "glossary-list";
  return p.replace(/^\//, "");
};

// Find duplicate titles / descriptions
const byTitle = {};
const byDesc = {};
for (const p of pages) {
  if (p.title) (byTitle[p.title] ||= []).push(p.url);
  if (p.metaDescription) (byDesc[p.metaDescription] ||= []).push(p.url);
}
const dupTitles = Object.entries(byTitle).filter(([, v]) => v.length > 1);
const dupDescs = Object.entries(byDesc).filter(([, v]) => v.length > 1);

// Specific issue lists
const noH1Pages = pages.filter((p) => p.h1Count === 0).map((p) => p.url);
const multH1Pages = pages.filter((p) => p.h1Count > 1).map((p) => p.url);
const longTitles = pages.filter((p) => p.titleLen > 60).map((p) => ({ url: p.url, len: p.titleLen, title: p.title }));
const shortTitles = pages.filter((p) => p.title && p.titleLen < 30).map((p) => ({ url: p.url, len: p.titleLen, title: p.title }));
const longDescs = pages.filter((p) => p.metaLen > 160).map((p) => ({ url: p.url, len: p.metaLen }));
const shortDescs = pages.filter((p) => p.metaDescription && p.metaLen < 70).map((p) => ({ url: p.url, len: p.metaLen }));
const thin = pages.filter((p) => p.wordCount < 300).map((p) => ({ url: p.url, words: p.wordCount }));

// Template aggregation
const byTemplate = {};
for (const p of pages) {
  const t = templateOf(p.url);
  (byTemplate[t] ||= []).push(p);
}
const templateSummary = Object.entries(byTemplate).map(([t, ps]) => ({
  template: t,
  count: ps.length,
  avgWordCount: Math.round(ps.reduce((s, p) => s + p.wordCount, 0) / ps.length),
  avgTitleLen: Math.round(ps.reduce((s, p) => s + p.titleLen, 0) / ps.length),
  avgMetaLen: Math.round(ps.reduce((s, p) => s + p.metaLen, 0) / ps.length),
  avgInternalLinks: Math.round(ps.reduce((s, p) => s + (p.internalLinks || 0), 0) / ps.length),
  canonicalCoverage: ps.filter((p) => p.canonical).length,
  jsonLdCoverage: ps.filter((p) => p.jsonLd.length > 0).length,
  ogImageCoverage: ps.filter((p) => p.og.image).length,
  h1Coverage: ps.filter((p) => p.h1Count === 1).length,
}));

// Scoring
const total = pages.length;
const pct = (n) => Math.round((n / total) * 100);
const scores = {};

// Indexability: 100 if all 200 OK, no noindex, robots.txt present, canonical on all
const indexOk = pages.filter((p) => p.status === 200 && !p.hasNoindex).length;
const canonOk = pages.filter((p) => p.canonical).length;
scores.indexability = Math.round((pct(indexOk) * 0.5 + pct(canonOk) * 0.5));

// On-page: title + meta + h1 quality
const titleOk = pages.filter((p) => p.title && p.titleLen >= 30 && p.titleLen <= 60).length;
const metaOk = pages.filter((p) => p.metaDescription && p.metaLen >= 70 && p.metaLen <= 160).length;
const h1Ok = pages.filter((p) => p.h1Count === 1).length;
scores.onPage = Math.round((pct(titleOk) + pct(metaOk) + pct(h1Ok)) / 3);

// Structured data
const ldOk = pages.filter((p) => p.jsonLd.length > 0).length;
scores.structuredData = pct(ldOk);

// Content depth
const contentOk = pages.filter((p) => p.wordCount >= 300).length;
scores.contentDepth = pct(contentOk);

// Social / OG
const ogOk = pages.filter((p) => p.og.image).length;
const twOk = pages.filter((p) => p.twitter.card).length;
scores.socialOg = Math.round((pct(ogOk) + pct(twOk)) / 2);

// Internal linking: avg internal links per page (target 15+)
const avgLinks = pages.reduce((s, p) => s + (p.internalLinks || 0), 0) / pages.length;
scores.internalLinking = Math.min(100, Math.round((avgLinks / 15) * 100));

// Accessibility (image alts + link text proxy)
const imgAltRatio = 1 - pages.reduce((s, p) => s + (p.imgMissingAlt || 0), 0) / Math.max(1, pages.reduce((s, p) => s + (p.imgCount || 0), 0));
scores.accessibilitySEO = Math.round(imgAltRatio * 100);

// AI readiness
scores.aiReadiness = data.llmsTxtStatus === 200 ? 100 : 40; // robots.txt already allows AI bots per exploration

const summary = {
  generatedAt: new Date().toISOString(),
  urlCount: total,
  scores,
  overall: Math.round(
    (scores.indexability + scores.onPage + scores.structuredData + scores.contentDepth +
      scores.socialOg + scores.internalLinking + scores.accessibilitySEO + scores.aiReadiness) / 8,
  ),
  issues: {
    dupTitlesCount: dupTitles.length,
    dupDescsCount: dupDescs.length,
    dupTitles: dupTitles.map(([t, urls]) => ({ title: t, urls })),
    dupDescs: dupDescs.map(([d, urls]) => ({ desc: d.slice(0, 80) + "...", urls })),
    noH1Pages,
    multH1Pages,
    longTitles,
    shortTitles,
    longDescs,
    shortDescs,
    thin,
    noCanonical: pages.filter((p) => !p.canonical).length,
    noJsonLd: pages.filter((p) => p.jsonLd.length === 0).length,
    noOgImage: pages.filter((p) => !p.og.image).length,
  },
  templateSummary,
  infrastructure: {
    robotsTxt: data.robotsTxtStatus === 200 ? "present" : "MISSING",
    llmsTxt: data.llmsTxtStatus === 200 ? "present" : "MISSING",
    securityTxt: data.securityTxtStatus === 200 ? "present" : "MISSING",
    favicon: data.faviconStatus === 200 ? "present" : "MISSING",
  },
};

writeFileSync("./docs/seo-audit/analysis.json", JSON.stringify(summary, null, 2));

console.log("=== Pillar Scores ===");
for (const [k, v] of Object.entries(scores)) console.log(`${k}: ${v}/100`);
console.log(`\nOVERALL: ${summary.overall}/100`);
console.log(`\n=== Dup titles: ${dupTitles.length}, Dup descriptions: ${dupDescs.length} ===`);
console.log("\n=== No H1 pages ===");
noH1Pages.forEach((u) => console.log("  " + u));
console.log("\n=== Long titles (>60) ===");
longTitles.forEach((p) => console.log(`  [${p.len}] ${p.url}\n     "${p.title}"`));
console.log("\n=== Template coverage ===");
console.table(templateSummary.map((t) => ({
  template: t.template,
  n: t.count,
  wordsAvg: t.avgWordCount,
  titleAvg: t.avgTitleLen,
  metaAvg: t.avgMetaLen,
  canon: `${t.canonicalCoverage}/${t.count}`,
  json: `${t.jsonLdCoverage}/${t.count}`,
  ogImg: `${t.ogImageCoverage}/${t.count}`,
  h1: `${t.h1Coverage}/${t.count}`,
})));
