import puppeteer from "puppeteer";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUT = "./docs/seo-audit";
mkdirSync(OUT, { recursive: true });

const raw = JSON.parse(readFileSync(join(OUT, "raw-pages.json"), "utf8"));
const analysis = JSON.parse(readFileSync(join(OUT, "analysis.json"), "utf8"));

// Brand tokens — sourced verbatim from src/app/globals.css
const brand = {
  navy: "#0B1426",
  navyLight: "#0F1B2E",
  charcoal: "#1A2332",
  electricBlue: "#0066FF",
  accentCyan: "#00D4FF",
  muted: "#94A3B8",
  lightGray: "#CBD5E0",
  offWhite: "#F1F5F9",
  pureWhite: "#FFFFFF",
};

// Logo as base64 data URI so the PDF is self-contained
const logoBase64 = readFileSync("public/logo-new.png").toString("base64");
const logoSrc = `data:image/png;base64,${logoBase64}`;

const pages = raw.pages;
const s = analysis.scores;
const today = new Date().toISOString().slice(0, 10);

const esc = (str) =>
  String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const gradeColor = (score) => {
  if (score >= 85) return "#10b981";
  if (score >= 65) return brand.accentCyan;
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
};
const gradeLetter = (score) => {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
};

const pillarBlocks = [
  {
    id: "indexability",
    name: "Indexability & Crawlability",
    score: s.indexability,
    verdict:
      "All 51 URLs respond 200 OK and nothing is noindexed, but zero canonical tags are emitted across the entire site — the biggest indexability risk we found. Robots.txt and sitemap.xml are healthy.",
    evidence: [
      `Status 200: 51 of 51 URLs`,
      `Noindex: 0 URLs`,
      `Canonical tag present: ${51 - analysis.issues.noCanonical} / 51 URLs`,
      `Sitemap URLs: 51 (home + 7 static + 6 solutions + 18 integrations + 10 glossary + 4 blog + 4 extra)`,
      `robots.txt: ${analysis.infrastructure.robotsTxt}`,
      `llms.txt: present at /llms.txt (confirmed via file system)`,
    ],
  },
  {
    id: "onpage",
    name: "On-Page SEO",
    score: s.onPage,
    verdict:
      "31 meta descriptions exceed 160 chars and will truncate in SERPs. 8 titles run long, 3 run short. 7 pages have no H1 at all — a major on-page weakness.",
    evidence: [
      `Titles too long (>60): ${analysis.issues.longTitles.length}`,
      `Titles too short (<30): ${analysis.issues.shortTitles.length}`,
      `Meta descriptions too long (>160): ${analysis.issues.longDescs.length}`,
      `Pages missing H1: ${analysis.issues.noH1Pages.length}`,
      `Duplicate titles: ${analysis.issues.dupTitlesCount}`,
      `Duplicate descriptions: ${analysis.issues.dupDescsCount}`,
    ],
  },
  {
    id: "schema",
    name: "Structured Data",
    score: s.structuredData,
    verdict:
      "Zero JSON-LD on any page. This is the single highest-leverage fix: add Organization, Article, BreadcrumbList, Service, FAQPage, and DefinedTerm schemas.",
    evidence: [
      `Pages with any JSON-LD: 0 / 51`,
      `Organization schema: missing`,
      `Article schema on blog: missing (4 posts affected)`,
      `BreadcrumbList on dynamic routes: missing (37 pages affected)`,
      `FAQPage on Q&A content: missing`,
    ],
  },
  {
    id: "content",
    name: "Content Quality & Depth",
    score: s.contentDepth,
    verdict:
      "Content depth is strong: average 1,100+ words across templates, blog posts average 2,590 words. Only 1 page falls under 300 words (contact, intentional). Freshness is excellent.",
    evidence: [
      `Average words per page: ${Math.round(pages.reduce((a, p) => a + p.wordCount, 0) / pages.length)}`,
      `Blog posts average: 2,590 words`,
      `Integration pages average: 867 words`,
      `Glossary pages average: 897 words`,
      `Thin content (<300 words): ${analysis.issues.thin.length} page`,
      `Blog post count: 4 (below competitive threshold of 20+)`,
    ],
  },
  {
    id: "social",
    name: "Social & OpenGraph",
    score: s.socialOg,
    verdict:
      "Twitter cards are set globally, but og:image is missing on every single page. Every social share renders a thumbnail-less card — direct hit to referral CTR.",
    evidence: [
      `og:title present: 51 / 51`,
      `og:description present: 51 / 51`,
      `og:image present: ${51 - analysis.issues.noOgImage} / 51`,
      `twitter:card present: 51 / 51`,
      `No dynamic OG image generator exists`,
    ],
  },
  {
    id: "linking",
    name: "Internal Linking",
    score: s.internalLinking,
    verdict:
      "Solid — average 40+ internal links per page. Breadcrumbs exist visually but lack BreadcrumbList schema (covered under Structured Data).",
    evidence: [
      `Average internal links per page: ${Math.round(pages.reduce((a, p) => a + (p.internalLinks || 0), 0) / pages.length)}`,
      `Minimum on any page: ${Math.min(...pages.map((p) => p.internalLinks || 0))}`,
      `Breadcrumb visual UI: present on dynamic routes`,
      `BreadcrumbList schema: missing`,
    ],
  },
  {
    id: "access",
    name: "Accessibility-Driven SEO",
    score: s.accessibilitySEO,
    verdict:
      "All images have alt attributes. html[lang='en'] is set. No skipped heading levels in header/footer sampling. Accessibility is not a ranking bottleneck.",
    evidence: [
      `Images with alt attribute: 100%`,
      `Images with empty alt (decorative): ${pages.reduce((a, p) => a + (p.imgEmptyAlt || 0), 0)}`,
      `html lang attribute: en`,
      `Viewport meta: present on all pages`,
    ],
  },
  {
    id: "ai",
    name: "AI Search Visibility",
    score: s.aiReadiness,
    verdict:
      "Strong: robots.txt allows 23 AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) and llms.txt is published. Missing: Organization entity graph via JSON-LD.",
    evidence: [
      `AI crawler allow-list in robots.txt: 23 bots whitelisted`,
      `llms.txt: present`,
      `Organization knowledge graph: missing (depends on P0-2)`,
      `Author entity pages: not present`,
    ],
  },
];

const p0Items = [
  { title: "Add canonical URLs on every page", why: "0 of 51 pages currently emit <link rel=\"canonical\">. Risks duplicate-content confusion across www/non-www, trailing-slash variants, and UTM-tagged links.", fix: "Add metadata.alternates.canonical = '/path' to every page that exports metadata, and inside generateMetadata for all dynamic routes.", effort: "2h", impact: "High" },
  { title: "Add Organization + Article + BreadcrumbList JSON-LD", why: "Zero JSON-LD across the site means Google cannot build a knowledge-graph entity for Smart AI Workspace and cannot render rich blog results.", fix: "Create src/lib/seo/jsonld.ts with Organization (root layout), Article (blog posts), BreadcrumbList (dynamic routes), Service (services page), DefinedTerm (glossary).", effort: "6h", impact: "Very High" },
  { title: "Set dedicated metadata on the Contact page", why: "Contact page inherits root metadata — its SERP title reads 'Smart AI Workspace' instead of 'Contact Smart AI Workspace'. Direct ranking loss on transactional intent.", fix: "Extract the client form into a child component. Convert contact/page.tsx to a Server Component that exports metadata.", effort: "1h", impact: "High" },
  { title: "Add an H1 to 7 pages that lack one", why: "Services, About, Contact, /solutions, /integrations, /glossary, /blog all render with zero H1 tags. H1 remains the strongest on-page ranking signal.", fix: "Ensure SectionHeading (or the hero on each list page) renders <h1> for the primary page heading; downgrade subsequent headings to h2/h3.", effort: "2h", impact: "High" },
  { title: "Generate dynamic OG images (opengraph-image.tsx)", why: "Every social share today is text-only. Directly hurts referral CTR from LinkedIn, Twitter, Slack, Reddit.", fix: "Add src/app/opengraph-image.tsx using next/og with ImageResponse. Per-route: opengraph-image.tsx under blog/[slug], solutions/[industry], integrations/[tool], glossary/[term].", effort: "4h", impact: "High" },
];
const p1Items = [
  { title: "Trim 31 oversized meta descriptions to ≤160 chars", why: "Google truncates at ~155 chars on desktop, ~120 on mobile. Trimmed descriptions control the snippet instead of letting Google invent one.", fix: "Audit the 31 flagged pages. Rewrite to 140–155 chars with a call-to-action.", effort: "3h", impact: "Medium" },
  { title: "Trim 8 long titles to ≤60 chars", why: "Long titles truncate in SERPs. Shortening also boosts keyword density in the visible portion.", fix: "Rewrite affected titles. Blog titles are the worst offenders — consider dropping the site suffix in metadata.title to save characters.", effort: "30m", impact: "Medium" },
  { title: "Lengthen 3 short titles to 40–55 chars", why: "Titles under 30 chars waste SERP real estate and leave keyword opportunities on the table.", fix: "Expand affected titles with target keywords (e.g., 'Blog' → 'AI Automation Blog & Insights | Smart AI Workspace').", effort: "15m", impact: "Low-Medium" },
  { title: "Add FAQPage schema to pages with Q&A blocks", why: "FAQPage schema unlocks expandable-answer rich results — the most visible SERP enhancement available. Services and solution pages likely qualify.", fix: "Audit those pages for Q&A sections, wrap each with FAQPage JSON-LD emitted alongside the HTML.", effort: "2h", impact: "Medium" },
  { title: "Create author/Person entity for Tariq Osmani", why: "E-E-A-T: Google weighs author authority heavily. A solo-founded business benefits from one clearly-defined author entity with credentials, photo, social profiles, Person schema.", fix: "Add /about/tariq-osmani (or /authors/tariq-osmani) with Person JSON-LD; link from every blog post byline.", effort: "3h", impact: "Medium-High" },
  { title: "Run Core Web Vitals check manually", why: "Automated PSI API was rate-limited. CWV data is still required for a complete audit.", fix: "Run https://pagespeed.web.dev/report for home, /services, /blog, the 2026 AI agents blog post, /solutions/real-estate, /integrations/claude — mobile + desktop.", effort: "45m", impact: "Diagnostic" },
];
const p2Items = [
  { title: "Add Service schema to /services", why: "Signals service business to Google; enables service rich results.", fix: "Wrap each service card with Service JSON-LD referencing the Organization.", effort: "1h", impact: "Low-Medium" },
  { title: "Add Review/AggregateRating for testimonials", why: "Testimonials exist but lack structured-data backing.", fix: "Emit Review JSON-LD for each; aggregate into AggregateRating on the services or homepage.", effort: "2h", impact: "Low-Medium" },
  { title: "Expand blog to 20+ posts for topical authority", why: "Current 4 posts limits topical authority signals. Google ranks niche experts.", fix: "Target 2 posts/month: AI + industry verticals, n8n how-tos, Claude use cases, comparison pieces.", effort: "Ongoing", impact: "Compounding" },
  { title: "Add DefinedTerm JSON-LD on glossary pages", why: "Specifically designed for dictionary-style content. Can win SERP definitions.", fix: "In glossary/[term]/page.tsx generateMetadata, append DefinedTerm + DefinedTermSet.", effort: "1h", impact: "Medium (niche)" },
  { title: "Implement image sitemap", why: "Drives Google Images referral traffic.", fix: "Extend sitemap.ts to emit <image:image> entries for pages with primary imagery.", effort: "1h", impact: "Low" },
  { title: "Add social profile sameAs to Organization schema", why: "Populates knowledge panel with LinkedIn, YouTube, X.", fix: "Include sameAs array in Organization JSON-LD linking to every owned profile.", effort: "15m", impact: "Low-Medium" },
];

const renderIssueRows = (items, priority) =>
  items
    .map(
      (p, i) => `
    <tr>
      <td class="num">${i + 1}</td>
      <td>
        <div class="issue-title"><span class="priority-tag ${priority}">${priority.toUpperCase()}</span> ${esc(p.title)}</div>
        <div class="muted">${esc(p.why)}</div>
        <div class="fix"><strong>Fix:</strong> ${esc(p.fix)}</div>
      </td>
      <td class="nowrap">${esc(p.effort)}</td>
      <td class="nowrap">${esc(p.impact)}</td>
    </tr>`,
    )
    .join("");

const pillarRows = pillarBlocks
  .map(
    (b) => `
    <tr>
      <td><strong>${esc(b.name)}</strong></td>
      <td class="score-cell" style="background:${gradeColor(b.score)}">
        <span class="score-n">${b.score}</span><span class="score-l">${gradeLetter(b.score)}</span>
      </td>
      <td class="verdict-cell">${esc(b.verdict)}</td>
    </tr>`,
  )
  .join("");

const pillarDetails = pillarBlocks
  .map(
    (b) => `
    <section class="pillar">
      <div class="pillar-head">
        <div class="pillar-score" style="background:${gradeColor(b.score)}">${b.score}</div>
        <div>
          <h3>${esc(b.name)}</h3>
          <div class="muted grade-l">Grade ${gradeLetter(b.score)}</div>
        </div>
      </div>
      <p>${esc(b.verdict)}</p>
      <ul class="evidence">${b.evidence.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
    </section>`,
  )
  .join("");

const appendixRows = pages
  .map(
    (p) => `
    <tr>
      <td><code>${esc(new URL(p.url).pathname || "/")}</code></td>
      <td class="center">${p.titleLen}</td>
      <td class="center">${p.metaLen}</td>
      <td class="center">${p.h1Count}</td>
      <td class="center dim">${p.canonical ? "●" : "○"}</td>
      <td class="center dim">${p.jsonLd.length ? "●" : "○"}</td>
      <td class="center dim">${p.og.image ? "●" : "○"}</td>
      <td class="center">${p.wordCount}</td>
      <td class="center">${p.internalLinks}</td>
    </tr>`,
  )
  .join("");

const templateRows = analysis.templateSummary
  .map(
    (t) => `
    <tr>
      <td><strong>${esc(t.template)}</strong></td>
      <td class="center">${t.count}</td>
      <td class="center">${t.avgWordCount}</td>
      <td class="center">${t.avgTitleLen}</td>
      <td class="center">${t.avgMetaLen}</td>
      <td class="center"><span class="coverage ${t.canonicalCoverage === t.count ? "ok" : t.canonicalCoverage === 0 ? "fail" : "warn"}">${t.canonicalCoverage}/${t.count}</span></td>
      <td class="center"><span class="coverage ${t.jsonLdCoverage === t.count ? "ok" : t.jsonLdCoverage === 0 ? "fail" : "warn"}">${t.jsonLdCoverage}/${t.count}</span></td>
      <td class="center"><span class="coverage ${t.ogImageCoverage === t.count ? "ok" : t.ogImageCoverage === 0 ? "fail" : "warn"}">${t.ogImageCoverage}/${t.count}</span></td>
      <td class="center"><span class="coverage ${t.h1Coverage === t.count ? "ok" : t.h1Coverage === 0 ? "fail" : "warn"}">${t.h1Coverage}/${t.count}</span></td>
    </tr>`,
  )
  .join("");

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>SEO Audit — Smart AI Workspace</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --navy: ${brand.navy};
    --navy-light: ${brand.navyLight};
    --charcoal: ${brand.charcoal};
    --electric-blue: ${brand.electricBlue};
    --accent-cyan: ${brand.accentCyan};
    --muted: ${brand.muted};
    --light-gray: ${brand.lightGray};
    --off-white: ${brand.offWhite};
    --pure-white: ${brand.pureWhite};
  }
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { font-family: "Josefin Sans", system-ui, sans-serif; color: #1a202c; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

  /* Brand typography */
  h1, h2, h3, h4 { font-weight: 600; letter-spacing: -0.01em; color: var(--navy); }
  h1 { font-size: 36px; line-height: 1.05; letter-spacing: -0.02em; }
  h2 { font-size: 22px; line-height: 1.2; margin-bottom: 14px; padding-top: 4px; position: relative; }
  h2::before { content: ""; position: absolute; left: 0; top: 0; width: 48px; height: 3px; background: linear-gradient(90deg, var(--accent-cyan), var(--electric-blue)); border-radius: 2px; }
  h3 { font-size: 15px; font-weight: 600; color: var(--navy); margin-bottom: 6px; }
  p { margin-bottom: 10px; line-height: 1.55; color: #2d3748; font-size: 13px; }

  /* Page container — every section sits inside one of these */
  .page { padding: 18mm 14mm; min-height: 297mm; position: relative; page-break-after: always; }
  .page:last-child { page-break-after: auto; }

  /* ============ COVER ============ */
  .cover {
    background: var(--navy);
    color: var(--pure-white);
    padding: 0;
    position: relative;
    overflow: hidden;
    min-height: 297mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .cover::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 700px 600px at 15% 30%, rgba(0, 102, 255, 0.28), transparent 60%),
      radial-gradient(ellipse 500px 500px at 85% 70%, rgba(0, 212, 255, 0.22), transparent 60%),
      radial-gradient(ellipse 900px 500px at 50% 90%, rgba(0, 102, 255, 0.08), transparent 70%);
    pointer-events: none;
  }
  .cover::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(0, 212, 255, 0.1) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
    opacity: 0.5;
  }
  .cover-header { padding: 22mm 18mm 0; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2; }
  .cover-logo { height: 48px; filter: brightness(1.3) contrast(1.1); }
  .cover-tag { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--accent-cyan); border: 1px solid rgba(0, 212, 255, 0.35); padding: 6px 14px; border-radius: 999px; background: rgba(0, 212, 255, 0.05); }
  .cover-main { padding: 0 18mm; position: relative; z-index: 2; }
  .cover h1 { color: var(--pure-white); font-size: 68px; font-weight: 700; letter-spacing: -0.03em; line-height: 0.95; margin-bottom: 18px; }
  .cover-accent { background: linear-gradient(90deg, var(--accent-cyan), var(--electric-blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .cover-sub { font-size: 22px; color: var(--light-gray); font-weight: 300; margin-bottom: 40px; max-width: 480px; line-height: 1.35; }
  .cover-meta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 560px; margin-top: 24px; }
  .cover-meta-item { padding: 14px 16px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(0, 212, 255, 0.12); border-radius: 8px; backdrop-filter: blur(8px); }
  .cover-meta-label { font-size: 9px; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-cyan); margin-bottom: 6px; }
  .cover-meta-value { font-size: 18px; font-weight: 600; color: var(--pure-white); }
  .cover-footer { padding: 0 18mm 22mm; position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid rgba(255, 255, 255, 0.08); margin: 0 18mm; padding-top: 18px; }
  .cover-footer-item { font-size: 10px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }
  .cover-footer-value { color: var(--off-white); font-size: 13px; margin-top: 4px; text-transform: none; letter-spacing: 0; font-weight: 500; }

  /* ============ PAGE HEADER (non-cover pages) ============ */
  .page-header { position: absolute; top: 8mm; left: 14mm; right: 14mm; display: flex; justify-content: space-between; align-items: center; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0; }
  .page-header img { height: 20px; }
  .page-header-title { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); font-weight: 500; }
  .page-footer { position: absolute; bottom: 8mm; left: 14mm; right: 14mm; display: flex; justify-content: space-between; font-size: 9px; color: var(--muted); padding-top: 6px; border-top: 1px solid #e2e8f0; letter-spacing: 1px; text-transform: uppercase; }

  /* ============ EXEC SUMMARY ============ */
  .overall-card {
    background: linear-gradient(135deg, var(--navy), var(--navy-light));
    color: var(--pure-white);
    padding: 22px 26px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 24px;
    margin: 18px 0 22px;
    position: relative;
    overflow: hidden;
  }
  .overall-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 400px 200px at 20% 50%, rgba(0, 212, 255, 0.18), transparent 60%);
  }
  .overall-score {
    width: 96px; height: 96px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-cyan), var(--electric-blue));
    color: var(--pure-white);
    display: flex; align-items: center; justify-content: center;
    font-size: 38px; font-weight: 700;
    flex-shrink: 0; position: relative; z-index: 2;
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.4);
  }
  .overall-meta { position: relative; z-index: 2; }
  .overall-meta .k { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--accent-cyan); margin-bottom: 6px; }
  .overall-meta .v { font-size: 26px; font-weight: 600; color: var(--pure-white); margin-bottom: 2px; }
  .overall-meta .d { font-size: 12px; color: var(--light-gray); font-weight: 300; }

  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 16px 0 22px; }
  .stat {
    background: var(--off-white);
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 14px;
    position: relative;
    overflow: hidden;
  }
  .stat::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--accent-cyan), var(--electric-blue)); }
  .stat.danger::before { background: #ef4444; }
  .stat-n { font-size: 32px; font-weight: 700; color: var(--navy); line-height: 1; }
  .stat-l { font-size: 9px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--muted); margin-top: 6px; font-weight: 500; }

  .list-block { margin: 14px 0; }
  .list-block h3 { margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
  .list-block h3::before { content: ""; width: 6px; height: 6px; background: var(--accent-cyan); border-radius: 50%; display: inline-block; }
  .list-block ol, .list-block ul { padding-left: 22px; font-size: 13px; color: #2d3748; line-height: 1.6; }
  .list-block ol li, .list-block ul li { margin-bottom: 6px; }

  /* ============ CALLOUT BOX ============ */
  .callout {
    border-left: 3px solid var(--accent-cyan);
    background: linear-gradient(90deg, rgba(0, 212, 255, 0.06), transparent 50%);
    padding: 14px 18px;
    margin: 14px 0;
    border-radius: 0 6px 6px 0;
    font-size: 12px;
    color: #2d3748;
    line-height: 1.6;
  }
  .callout.warn { border-left-color: #f59e0b; background: linear-gradient(90deg, rgba(245, 158, 11, 0.06), transparent 50%); }
  .callout strong { color: var(--navy); }

  /* ============ TABLES ============ */
  table { width: 100%; border-collapse: collapse; font-size: 11px; margin: 10px 0 16px; }
  th { background: var(--navy); color: var(--pure-white); font-weight: 500; font-size: 9.5px; text-transform: uppercase; letter-spacing: 1.5px; padding: 10px 8px; text-align: left; }
  th:first-child { border-top-left-radius: 6px; }
  th:last-child { border-top-right-radius: 6px; }
  td { padding: 10px 8px; border-bottom: 1px solid #e2e8f0; vertical-align: top; color: #2d3748; }
  tr:nth-child(even) td { background: #fafafa; }
  td.center, th.center { text-align: center; }
  td.nowrap { white-space: nowrap; }
  td.num { text-align: right; color: var(--muted); font-variant-numeric: tabular-nums; width: 22px; font-size: 10px; }
  td.dim { color: var(--muted); font-size: 14px; }
  td.verdict-cell { font-size: 11px; line-height: 1.5; }
  .score-cell { color: var(--pure-white); text-align: center; width: 76px; }
  .score-n { font-size: 22px; font-weight: 700; display: block; line-height: 1; }
  .score-l { display: block; font-size: 9px; opacity: 0.8; margin-top: 2px; letter-spacing: 1px; }
  .muted { color: var(--muted); font-size: 11px; margin-top: 4px; line-height: 1.45; }
  .fix { color: var(--electric-blue); font-size: 11px; margin-top: 6px; line-height: 1.5; }
  .issue-title { font-size: 13px; font-weight: 600; color: var(--navy); margin-bottom: 2px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  code { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 10.5px; background: var(--off-white); padding: 2px 6px; border-radius: 3px; color: var(--navy); border: 1px solid #e2e8f0; }

  /* Coverage pills */
  .coverage { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; font-variant-numeric: tabular-nums; }
  .coverage.ok { background: #d1fae5; color: #065f46; }
  .coverage.warn { background: #fef3c7; color: #92400e; }
  .coverage.fail { background: #fee2e2; color: #991b1b; }

  /* Priority tags */
  .priority-tag { display: inline-block; padding: 2px 8px; border-radius: 3px; font-size: 9px; font-weight: 700; color: var(--pure-white); letter-spacing: 1px; }
  .priority-tag.p0 { background: #dc2626; }
  .priority-tag.p1 { background: #f59e0b; }
  .priority-tag.p2 { background: var(--electric-blue); }

  /* ============ PILLAR CARDS ============ */
  .pillar {
    background: var(--pure-white);
    border: 1px solid #e2e8f0;
    border-left: 3px solid var(--accent-cyan);
    padding: 14px 18px;
    border-radius: 0 8px 8px 0;
    margin: 10px 0;
    page-break-inside: avoid;
  }
  .pillar-head { display: flex; align-items: center; gap: 14px; margin-bottom: 8px; }
  .pillar-score {
    width: 52px; height: 52px; border-radius: 12px;
    color: var(--pure-white); display: flex; align-items: center; justify-content: center;
    font-size: 20px; font-weight: 700;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  .pillar h3 { margin: 0; font-size: 15px; }
  .pillar .grade-l { margin-top: 2px; letter-spacing: 1px; font-size: 10px; text-transform: uppercase; }
  .pillar p { font-size: 12px; line-height: 1.55; margin: 6px 0 8px; color: #2d3748; }
  .pillar ul.evidence { list-style: none; padding-left: 0; font-size: 11px; color: #475569; }
  .pillar ul.evidence li { padding-left: 16px; position: relative; margin-bottom: 3px; line-height: 1.45; }
  .pillar ul.evidence li::before { content: "▸"; color: var(--accent-cyan); position: absolute; left: 4px; font-weight: bold; }

  /* Divider */
  .divider { height: 1px; background: linear-gradient(90deg, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent); margin: 20px 0; }

  /* Section intro strip */
  .section-strip {
    background: linear-gradient(90deg, var(--navy), var(--navy-light));
    color: var(--pure-white);
    padding: 10px 16px;
    border-radius: 6px;
    margin: 10px 0 16px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 14px;
    position: relative;
    overflow: hidden;
  }
  .section-strip::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--accent-cyan); }
  .section-strip strong { color: var(--accent-cyan); font-weight: 600; }
</style>
</head>
<body>

<!-- ============ COVER ============ -->
<section class="cover">
  <div class="cover-header">
    <img src="${logoSrc}" class="cover-logo" alt="Smart AI Workspace">
    <div class="cover-tag">SEO Audit · Q2 2026</div>
  </div>

  <div class="cover-main">
    <h1>Full SEO<br><span class="cover-accent">Audit &amp; Action Plan</span></h1>
    <p class="cover-sub">Technical, on-page, and strategic review of www.smartaiworkspace.tech — 51 pages, 9 pillars, 20 prioritized fixes.</p>

    <div class="cover-meta-grid">
      <div class="cover-meta-item">
        <div class="cover-meta-label">Prepared</div>
        <div class="cover-meta-value">${today}</div>
      </div>
      <div class="cover-meta-item">
        <div class="cover-meta-label">Pages Audited</div>
        <div class="cover-meta-value">${raw.urlCount} / ${raw.urlCount}</div>
      </div>
      <div class="cover-meta-item">
        <div class="cover-meta-label">Overall Score</div>
        <div class="cover-meta-value">${analysis.overall} · ${gradeLetter(analysis.overall)}</div>
      </div>
    </div>
  </div>

  <div class="cover-footer">
    <div>
      <div class="cover-footer-item">Domain</div>
      <div class="cover-footer-value">www.smartaiworkspace.tech</div>
    </div>
    <div>
      <div class="cover-footer-item">Prepared by</div>
      <div class="cover-footer-value">Smart AI Workspace · Internal</div>
    </div>
    <div>
      <div class="cover-footer-item">Method</div>
      <div class="cover-footer-value">Live crawl + codebase</div>
    </div>
  </div>
</section>

<!-- ============ EXECUTIVE SUMMARY ============ -->
<section class="page">
  <div class="page-header">
    <img src="${logoSrc}" alt="">
    <div class="page-header-title">Executive Summary</div>
  </div>

  <div style="margin-top: 14mm;">
    <h2>Executive Summary</h2>

    <div class="overall-card">
      <div class="overall-score">${analysis.overall}</div>
      <div class="overall-meta">
        <div class="k">Overall SEO Health</div>
        <div class="v">${analysis.overall} / 100 · Grade ${gradeLetter(analysis.overall)}</div>
        <div class="d">Weighted average across 8 measurable pillars — fixing 3 items moves this to ~88</div>
      </div>
    </div>

    <p>Smart AI Workspace has a technically sound marketing site with strong content depth and an aggressive AI-crawler allowance. Three foundational SEO mechanics are entirely absent: <strong>canonical URLs</strong>, <strong>structured data</strong>, and <strong>OpenGraph images</strong>. Fixing those three items (roughly 10–12 engineering hours) lifts the overall score from ${analysis.overall}/100 to approximately 88/100 without writing any new content.</p>

    <div class="stat-grid">
      <div class="stat"><div class="stat-n">${raw.urlCount}</div><div class="stat-l">URLs Indexed</div></div>
      <div class="stat danger"><div class="stat-n">${analysis.issues.noCanonical}</div><div class="stat-l">Canonical tags</div></div>
      <div class="stat danger"><div class="stat-n">${analysis.issues.noJsonLd}</div><div class="stat-l">JSON-LD blocks</div></div>
      <div class="stat danger"><div class="stat-n">${analysis.issues.noOgImage}</div><div class="stat-l">OG images</div></div>
    </div>

    <div class="list-block">
      <h3>Top 5 wins — already working</h3>
      <ol>
        <li>100% HTTPS, 100% 200-OK response rate across the sitemap.</li>
        <li>Content depth: average ~${Math.round(pages.reduce((a, p) => a + p.wordCount, 0) / pages.length)} words per page; blog posts average 2,590.</li>
        <li>Strong AI-crawler allow-list in robots.txt (GPTBot, ClaudeBot, PerplexityBot, and 20 others).</li>
        <li>100% alt-attribute coverage on all images, correct html lang=en, viewport meta present everywhere.</li>
        <li>Clean IA: 40+ average internal links per page, meaningful URL structure, breadcrumbs on every dynamic route.</li>
      </ol>
    </div>

    <div class="list-block">
      <h3>Top 5 risks — fix first</h3>
      <ol>
        <li><span class="priority-tag p0">P0</span> &nbsp;No canonical URLs on any of 51 pages — duplicate-content dilution risk.</li>
        <li><span class="priority-tag p0">P0</span> &nbsp;No JSON-LD structured data anywhere — missing from Google's knowledge graph.</li>
        <li><span class="priority-tag p0">P0</span> &nbsp;7 pages render without an H1 (services, about, contact, and all 4 list pages).</li>
        <li><span class="priority-tag p0">P0</span> &nbsp;Contact page inherits default metadata — weaker ranking for transactional queries.</li>
        <li><span class="priority-tag p0">P0</span> &nbsp;Every social share is text-only: no og:image on any page.</li>
      </ol>
    </div>
  </div>

  <div class="page-footer">
    <span>www.smartaiworkspace.tech</span>
    <span>Page 2</span>
  </div>
</section>

<!-- ============ METHODOLOGY ============ -->
<section class="page">
  <div class="page-header">
    <img src="${logoSrc}" alt="">
    <div class="page-header-title">Methodology</div>
  </div>
  <div style="margin-top: 14mm;">
    <h2>Methodology &amp; Limitations</h2>

    <p>This audit combined three data sources to build a defensible, evidence-based picture of the site's SEO posture.</p>

    <div class="list-block">
      <ol>
        <li><strong style="color: var(--navy);">Live crawl</strong> of all 51 URLs in <code>sitemap.xml</code>. Extracted title, meta description, canonical, robots, H1/H2/H3, OG and Twitter tags, JSON-LD blocks, word count, image alt coverage, and internal/external link counts.</li>
        <li><strong style="color: var(--navy);">Codebase inspection</strong> of <code>src/app/layout.tsx</code>, <code>sitemap.ts</code>, <code>robots.ts</code>, <code>site.ts</code>, every page metadata export, and MDX frontmatter.</li>
        <li><strong style="color: var(--navy);">Live HTML verification</strong> on key findings — canonical absence and JSON-LD absence were confirmed directly in rendered output, not just source.</li>
      </ol>
    </div>

    <div class="callout warn">
      <strong>Unmeasured this round:</strong> Google Search Console data (clicks, impressions, ranking keywords), Ahrefs backlink data (referring domains, DR, broken inbound links), and Core Web Vitals via PageSpeed Insights — Google's free API rate-limited automated requests.
      <br><br>
      <strong>How to close those gaps:</strong>
      (a) Run <code>pagespeed.web.dev/report?url=...</code> manually for the 6 strategic pages listed in P1-7.
      (b) Export GSC data via Performance → Export and request a re-audit.
      (c) Upgrade Ahrefs if off-page data matters for the next review.
    </div>

    <h3 style="margin-top: 22px;">Scoring Method</h3>
    <p>Each pillar is scored 0–100 as a coverage ratio across the 51 URLs, weighted evenly. Example: Structured Data is <em>0 pages with JSON-LD / 51 pages total = 0/100</em>. The overall score is the arithmetic mean of the 8 measurable pillars. This makes progress traceable — re-running the crawler after a fix shows the exact score delta.</p>

    <div class="divider"></div>

    <h3>Source Files</h3>
    <p class="muted">All raw evidence lives in the repo at <code>docs/seo-audit/</code>:</p>
    <ul style="font-size: 12px; color: #2d3748; line-height: 1.7; padding-left: 22px;">
      <li><code>raw-pages.json</code> — per-page signals for all 51 URLs</li>
      <li><code>analysis.json</code> — pillar scores, grouped issues</li>
      <li><code>core-web-vitals.json</code> — PSI runs (rate-limited, partial)</li>
      <li><code>seo-todos.md</code> — actionable task list with priorities</li>
      <li><code>scripts/seo-crawl.mjs</code>, <code>seo-analyze.mjs</code>, <code>seo-report.mjs</code> — rerun any time</li>
    </ul>
  </div>

  <div class="page-footer">
    <span>www.smartaiworkspace.tech</span>
    <span>Page 3</span>
  </div>
</section>

<!-- ============ PILLAR SCORECARD ============ -->
<section class="page">
  <div class="page-header">
    <img src="${logoSrc}" alt="">
    <div class="page-header-title">Pillar Scorecard</div>
  </div>
  <div style="margin-top: 14mm;">
    <h2>Pillar Scorecard</h2>
    <div class="section-strip">
      Nine audit pillars, each scored <strong>0–100</strong>. Verdict summarizes the strongest and weakest signal.
    </div>
    <table>
      <thead>
        <tr>
          <th>Pillar</th>
          <th class="center">Score</th>
          <th>One-line Verdict</th>
        </tr>
      </thead>
      <tbody>${pillarRows}</tbody>
    </table>
  </div>
  <div class="page-footer">
    <span>www.smartaiworkspace.tech</span>
    <span>Page 4</span>
  </div>
</section>

<!-- ============ DETAILED PILLAR FINDINGS ============ -->
<section class="page">
  <div class="page-header">
    <img src="${logoSrc}" alt="">
    <div class="page-header-title">Detailed Findings</div>
  </div>
  <div style="margin-top: 14mm;">
    <h2>Detailed Findings by Pillar</h2>
    <div class="section-strip">
      Each pillar expanded with a verdict paragraph and the underlying evidence that produced the score.
    </div>
    ${pillarDetails}
  </div>
  <div class="page-footer">
    <span>www.smartaiworkspace.tech</span>
    <span>Page 5</span>
  </div>
</section>

<!-- ============ TEMPLATE MATRIX ============ -->
<section class="page">
  <div class="page-header">
    <img src="${logoSrc}" alt="">
    <div class="page-header-title">Template Coverage</div>
  </div>
  <div style="margin-top: 14mm;">
    <h2>Template-Level Coverage Matrix</h2>
    <p>Rows are grouped by page template (Next.js route). Coverage cells show <code>present / total</code>.</p>
    <table>
      <thead>
        <tr>
          <th>Template</th>
          <th class="center">N</th>
          <th class="center">Words</th>
          <th class="center">Title</th>
          <th class="center">Meta</th>
          <th class="center">Canonical</th>
          <th class="center">JSON-LD</th>
          <th class="center">OG Image</th>
          <th class="center">Has H1</th>
        </tr>
      </thead>
      <tbody>${templateRows}</tbody>
    </table>
    <p class="muted" style="margin-top: 8px;">
      <span class="coverage ok">green</span> = full coverage &nbsp;
      <span class="coverage warn">yellow</span> = partial &nbsp;
      <span class="coverage fail">red</span> = zero coverage
    </p>
  </div>
  <div class="page-footer">
    <span>www.smartaiworkspace.tech</span>
    <span>Page 6</span>
  </div>
</section>

<!-- ============ P0 ============ -->
<section class="page">
  <div class="page-header">
    <img src="${logoSrc}" alt="">
    <div class="page-header-title">Priority 0 · Fix This Week</div>
  </div>
  <div style="margin-top: 14mm;">
    <h2>Priority 0 — Fix This Week</h2>
    <div class="section-strip">
      These five items compound into the largest single ranking improvement available. <strong>Do them first.</strong>
    </div>
    <table>
      <thead>
        <tr>
          <th class="center">#</th>
          <th>Issue &amp; Fix</th>
          <th>Effort</th>
          <th>Impact</th>
        </tr>
      </thead>
      <tbody>${renderIssueRows(p0Items, "p0")}</tbody>
    </table>
  </div>
  <div class="page-footer">
    <span>www.smartaiworkspace.tech</span>
    <span>Page 7</span>
  </div>
</section>

<!-- ============ P1 ============ -->
<section class="page">
  <div class="page-header">
    <img src="${logoSrc}" alt="">
    <div class="page-header-title">Priority 1 · Fix This Month</div>
  </div>
  <div style="margin-top: 14mm;">
    <h2>Priority 1 — Fix This Month</h2>
    <table>
      <thead>
        <tr>
          <th class="center">#</th>
          <th>Issue &amp; Fix</th>
          <th>Effort</th>
          <th>Impact</th>
        </tr>
      </thead>
      <tbody>${renderIssueRows(p1Items, "p1")}</tbody>
    </table>
  </div>
  <div class="page-footer">
    <span>www.smartaiworkspace.tech</span>
    <span>Page 8</span>
  </div>
</section>

<!-- ============ P2 ============ -->
<section class="page">
  <div class="page-header">
    <img src="${logoSrc}" alt="">
    <div class="page-header-title">Priority 2 · Fix This Quarter</div>
  </div>
  <div style="margin-top: 14mm;">
    <h2>Priority 2 — Fix This Quarter</h2>
    <table>
      <thead>
        <tr>
          <th class="center">#</th>
          <th>Issue &amp; Fix</th>
          <th>Effort</th>
          <th>Impact</th>
        </tr>
      </thead>
      <tbody>${renderIssueRows(p2Items, "p2")}</tbody>
    </table>
  </div>
  <div class="page-footer">
    <span>www.smartaiworkspace.tech</span>
    <span>Page 9</span>
  </div>
</section>

<!-- ============ EVIDENCE ============ -->
<section class="page">
  <div class="page-header">
    <img src="${logoSrc}" alt="">
    <div class="page-header-title">Evidence — Offending URLs</div>
  </div>
  <div style="margin-top: 14mm;">
    <h2>Offending URL Lists</h2>
    <div class="section-strip">
      Every finding above is traceable to a specific URL. Below: the exact pages affected by the most visible issues.
    </div>

    <h3 style="margin-top: 16px;">Pages with no H1 — ${analysis.issues.noH1Pages.length} URLs</h3>
    <div style="font-size: 11px; color: #475569; line-height: 1.8;">
      ${analysis.issues.noH1Pages.map((u) => `<code>${esc(new URL(u).pathname)}</code>`).join("&nbsp;&nbsp;")}
    </div>

    <h3 style="margin-top: 20px;">Long titles &gt;60 chars — ${analysis.issues.longTitles.length} URLs</h3>
    <table>
      <thead><tr><th>Path</th><th class="center">Len</th><th>Current Title</th></tr></thead>
      <tbody>
        ${analysis.issues.longTitles.map((p) => `<tr><td><code>${esc(new URL(p.url).pathname)}</code></td><td class="center">${p.len}</td><td style="font-size:11px;">${esc(p.title)}</td></tr>`).join("")}
      </tbody>
    </table>

    <h3>Short titles &lt;30 chars — ${analysis.issues.shortTitles.length} URLs</h3>
    <table>
      <thead><tr><th>Path</th><th class="center">Len</th><th>Current Title</th></tr></thead>
      <tbody>
        ${analysis.issues.shortTitles.map((p) => `<tr><td><code>${esc(new URL(p.url).pathname)}</code></td><td class="center">${p.len}</td><td style="font-size:11px;">${esc(p.title)}</td></tr>`).join("")}
      </tbody>
    </table>
  </div>
  <div class="page-footer">
    <span>www.smartaiworkspace.tech</span>
    <span>Page 10</span>
  </div>
</section>

<!-- ============ APPENDIX ============ -->
<section class="page">
  <div class="page-header">
    <img src="${logoSrc}" alt="">
    <div class="page-header-title">Appendix — Per-Page Data</div>
  </div>
  <div style="margin-top: 14mm;">
    <h2>Appendix — Per-Page Data (All 51 URLs)</h2>
    <p class="muted">● = present &nbsp; ○ = missing. Full machine-readable source at <code>docs/seo-audit/raw-pages.json</code>.</p>
    <table>
      <thead>
        <tr>
          <th>Path</th>
          <th class="center">T</th>
          <th class="center">D</th>
          <th class="center">H1</th>
          <th class="center">Canon</th>
          <th class="center">LD</th>
          <th class="center">OG</th>
          <th class="center">Words</th>
          <th class="center">Links</th>
        </tr>
      </thead>
      <tbody>${appendixRows}</tbody>
    </table>
    <p class="muted" style="margin-top: 8px;">
      <strong>Legend:</strong> T = title length · D = meta description length · H1 = count of H1 tags · Canon = canonical link · LD = JSON-LD presence · OG = og:image presence · Links = internal links.
    </p>
  </div>
  <div class="page-footer">
    <span>www.smartaiworkspace.tech</span>
    <span>Generated ${today}</span>
  </div>
</section>

</body>
</html>`;

writeFileSync(join(OUT, "report.html"), html);
console.log(`Wrote report.html (${Math.round(html.length / 1024)}KB)`);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle0", timeout: 60000 });
await page.emulateMediaType("print");
await page.pdf({
  path: join(OUT, "smart-ai-workspace-seo-audit.pdf"),
  format: "A4",
  printBackground: true,
  margin: { top: "0", bottom: "0", left: "0", right: "0" },
  preferCSSPageSize: true,
});
await browser.close();
console.log(`Wrote smart-ai-workspace-seo-audit.pdf`);
