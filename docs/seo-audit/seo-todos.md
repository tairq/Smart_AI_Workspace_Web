# SEO Audit — Action Todo List

**Site:** www.smartaiworkspace.tech
**Audit date:** 2026-04-24
**Pages audited:** 51 (100% sitemap coverage)
**Overall score:** 71 / 100 (Grade C)
**Raw evidence:** [`raw-pages.json`](raw-pages.json) · [`analysis.json`](analysis.json) · [`smart-ai-workspace-seo-audit.pdf`](smart-ai-workspace-seo-audit.pdf)

---

## TL;DR — Three fixes that move you from 71 → ~88

1. **Add canonical URLs** to every page (0/51 currently have one).
2. **Add JSON-LD structured data** (Organization, Article, BreadcrumbList) — 0/51 currently have any.
3. **Add og:image** on every page (0/51 currently have one; social shares render text-only cards).

Everything else in this list is incremental from there.

---

## P0 — Fix this week (biggest ranking/CTR lifts)

### [ ] P0-1 · Add canonical URLs on every page
- **Affected:** 51 of 51 pages — none emit `<link rel="canonical">`.
- **Why it matters:** Google treats `www` vs non-www, trailing-slash variants, and UTM-tagged URLs as separate documents without a canonical. Risk: duplicate-content dilution and wasted crawl budget.
- **Fix:**
  - In each page that exports `metadata`, add:
    ```ts
    export const metadata: Metadata = {
      // ...existing
      alternates: { canonical: "/about" }, // path only; metadataBase resolves to full URL
    };
    ```
  - For `generateMetadata` in dynamic routes (`blog/[slug]`, `solutions/[industry]`, `integrations/[tool]`, `glossary/[term]`), inject `alternates: { canonical: \`/path/${slug}\` }` programmatically.
  - Verify live: `curl -sL https://www.smartaiworkspace.tech/about | grep canonical` should return a match.
- **Effort:** ~2h
- **Files:** [src/app/layout.tsx](../../src/app/layout.tsx), every `page.tsx` under [src/app/(marketing)/](../../src/app/(marketing)/)

### [ ] P0-2 · Add JSON-LD structured data (Organization, Article, BreadcrumbList)
- **Affected:** 51 of 51 pages — site has zero JSON-LD.
- **Why it matters:** Google uses JSON-LD to build its knowledge graph, power rich results, and feed AI Overviews. Missing it is the single biggest SEO gap on the site.
- **Fix:**
  1. Create `src/lib/seo/jsonld.ts` with typed helpers: `organizationLd()`, `articleLd(post)`, `breadcrumbLd(crumbs)`, `serviceLd(service)`, `definedTermLd(term)`.
  2. Inject Organization in `src/app/layout.tsx` via a `<Script type="application/ld+json">`.
  3. Inject Article on `blog/[slug]/page.tsx` (all 4 posts).
  4. Inject BreadcrumbList on every dynamic route (solutions, integrations, glossary, blog).
  5. Inject Service on `services/page.tsx`.
  6. Validate with https://search.google.com/test/rich-results for each template.
- **Effort:** ~6h
- **Files:** new `src/lib/seo/jsonld.ts`, `src/app/layout.tsx`, `src/app/(marketing)/blog/[slug]/page.tsx`, `src/app/(marketing)/services/page.tsx`, `src/app/(marketing)/solutions/[industry]/page.tsx`, `src/app/(marketing)/integrations/[tool]/page.tsx`, `src/app/(marketing)/glossary/[term]/page.tsx`

### [ ] P0-3 · Give the Contact page its own metadata
- **Affected:** `/contact` inherits generic root metadata ("Smart AI Workspace" as the full SERP title).
- **Why it matters:** Contact is a high-intent transactional query. A dedicated title/description wins that query.
- **Fix:**
  1. Convert [src/app/(marketing)/contact/page.tsx](../../src/app/(marketing)/contact/page.tsx) from `"use client"` to a Server Component.
  2. Extract the form (all `useState`/`useEffect` code) into `ContactForm.tsx` with `"use client"`.
  3. Export `const metadata` from the page:
     ```ts
     export const metadata: Metadata = {
       title: "Contact Us — Start Your AI Automation Project",
       description: "Get in touch with Smart AI Workspace. Free 30-minute discovery call to map where AI automation will save your team the most time.",
       alternates: { canonical: "/contact" },
     };
     ```
- **Effort:** ~1h
- **Files:** [src/app/(marketing)/contact/page.tsx](../../src/app/(marketing)/contact/page.tsx), new `src/app/(marketing)/contact/ContactForm.tsx`

### [ ] P0-4 · Add an H1 to 7 pages that render without one
- **Affected URLs:**
  - `/services`
  - `/about`
  - `/contact`
  - `/solutions`
  - `/integrations`
  - `/glossary`
  - `/blog`
- **Why it matters:** H1 is still a strong on-page ranking signal. These are all high-priority hub pages.
- **Fix:** Audit each page's hero/SectionHeading usage. Either:
  - Add `<h1>` directly in the page component above the hero, or
  - Add an `as="h1"` prop to `SectionHeading` and use it on the primary heading of each list page.
  - Downgrade any existing `h1` that's not the primary page heading (unlikely — crawler found 0 H1s on these, not multiple).
- **Effort:** ~2h
- **Files:** `src/app/(marketing)/services/page.tsx`, `src/app/(marketing)/about/page.tsx`, `src/app/(marketing)/contact/page.tsx` (coupled with P0-3), `src/app/(marketing)/solutions/page.tsx`, `src/app/(marketing)/integrations/page.tsx`, `src/app/(marketing)/glossary/page.tsx`, `src/app/(marketing)/blog/page.tsx`, possibly [src/components/shared/SectionHeading.tsx](../../src/components/shared/SectionHeading.tsx)

### [ ] P0-5 · Generate dynamic OG images via `next/og`
- **Affected:** 51 of 51 pages — none emit `og:image`.
- **Why it matters:** Every social share (LinkedIn, Twitter/X, Slack, Reddit) renders a text-only card. This is a direct referral-CTR hit and a visible trust signal.
- **Fix:**
  1. Add `src/app/opengraph-image.tsx` as the site-wide fallback:
     ```tsx
     import { ImageResponse } from "next/og";
     export const size = { width: 1200, height: 630 };
     export const contentType = "image/png";
     export default async function OG() {
       return new ImageResponse(/* JSX with brand gradient + logo + tagline */, size);
     }
     ```
  2. Add per-route variants for templates that have dynamic titles:
     - `src/app/(marketing)/blog/[slug]/opengraph-image.tsx`
     - `src/app/(marketing)/solutions/[industry]/opengraph-image.tsx`
     - `src/app/(marketing)/integrations/[tool]/opengraph-image.tsx`
     - `src/app/(marketing)/glossary/[term]/opengraph-image.tsx`
  3. Also add `twitter-image.tsx` alongside each (or reuse the OG image via metadata).
  4. Verify via https://www.opengraph.xyz/ on 3 sample URLs.
- **Effort:** ~4h
- **Files:** new `src/app/opengraph-image.tsx` + 4 per-route variants

---

## P1 — Fix this month

### [ ] P1-1 · Trim 31 oversized meta descriptions to ≤160 chars
- **Affected:** 31 of 51 pages. See [`analysis.json`](analysis.json) → `issues.longDescs` for the full list.
- **Breakdown by template:**
  - Home: 1 / 1 too long
  - Integrations: many of the 23 pages too long (avg meta length 183 chars)
  - Blog posts: 4 / 4 too long (avg 177 chars)
  - Glossary: mixed
- **Why it matters:** Google truncates at ~155 chars on desktop, ~120 on mobile. A truncated description loses the call-to-action and Google may rewrite it with something off-brand.
- **Fix:** Rewrite each to 140–155 chars. Include the primary keyword in the first 120 chars.
- **Effort:** ~3h

### [ ] P1-2 · Shorten 8 long titles to ≤60 chars
- **Affected:**
  - `/solutions/logistics` (63 chars)
  - `/glossary/robotic-process-automation` (62)
  - `/glossary/business-process-automation` (63)
  - `/glossary/machine-learning-ops` (65)
  - `/glossary/intelligent-document-processing` (67)
  - `/blog/ai-agents-autonomous-systems-guide-2026` (83) — worst offender
  - `/blog/ai-deployment-at-scale-2026` (71)
  - `/blog/claude-opus-4-7-new-features-2026` (73)
- **Fix:** Rewrite the blog titles first (biggest gap). Example:
  - Before: `AI Agents & Autonomous Systems: How They Actually Work in 2026 | Smart AI Workspace` (83)
  - After: `AI Agents & Autonomous Systems (2026 Guide)` (43) — template appends " | Smart AI Workspace" = 65, still borderline. Consider dropping site suffix on blog titles via a dedicated `metadata.title` string instead of using the template.
- **Effort:** ~30m

### [ ] P1-3 · Lengthen 3 short titles to 40–55 chars
- **Affected:**
  - `/contact` (18 chars — "Contact" leaves too much SERP real estate unused)
  - `/blog` (25 chars — "Blog")
  - `/about` (29 chars — "About")
- **Fix:** Rewrite with target keywords:
  - `/blog` → "AI Automation Blog & Insights | Smart AI Workspace"
  - `/about` → "About Smart AI Workspace — Solo-Founded AI Automation Consultancy"
  - `/contact` → covered by P0-3
- **Effort:** ~15m

### [ ] P1-4 · Publish `llms.txt`
- **Why it matters:** Emerging standard for LLM crawlers (complements robots.txt). Smart AI Workspace already whitelists 23 AI crawlers — `/llms.txt` completes the signal and lets AI assistants retrieve a curated site map.
- **Fix:** Add `src/app/llms.txt/route.ts`:
  ```ts
  export async function GET() {
    const body = `# Smart AI Workspace
  > B2B AI automation consultancy...

  ## Core pages
  - [Services](https://www.smartaiworkspace.tech/services): ...
  - [Solutions by industry](https://www.smartaiworkspace.tech/solutions): ...

  ## Blog
  - [AI Agents guide](...): ...
  `;
    return new Response(body, { headers: { "Content-Type": "text/plain" } });
  }
  ```
- **Effort:** ~1h
- **Reference:** https://llmstxt.org/

### [ ] P1-5 · Add FAQPage schema to pages with Q&A blocks
- **Affected:** services page, solution pages (per H2 scan, each has FAQ-style content).
- **Why it matters:** FAQPage schema unlocks expandable answer rich results — the most visible SERP enhancement available.
- **Fix:** Wrap each Q&A block's JSON-LD inside the page. Use `src/lib/seo/jsonld.ts` `faqLd(questions)` helper (built in P0-2).
- **Effort:** ~2h

### [ ] P1-6 · Create author/Person entity for Tariq Osmani
- **Why it matters:** E-E-A-T. Google weighs author authority heavily. As a solo-founded business (per memory), you benefit from one clearly-defined author entity with credentials, photo, Person schema, and linked social profiles.
- **Fix:**
  1. Add `src/app/(marketing)/about/tariq-osmani/page.tsx` (or `/authors/tariq-osmani`).
  2. Include: bio, photo, LinkedIn, credentials, Person JSON-LD with `sameAs`.
  3. Link from every blog post byline using `rel="author"`.
- **Effort:** ~3h

### [ ] P1-7 · Run Core Web Vitals check manually
- **Why:** Automated Google PageSpeed Insights API was rate-limited during this audit. CWV data (LCP, INP, CLS) is still required for a complete picture.
- **How:** Go to https://pagespeed.web.dev/report?url=... and run against these URLs on both mobile and desktop:
  1. `https://www.smartaiworkspace.tech/`
  2. `https://www.smartaiworkspace.tech/services`
  3. `https://www.smartaiworkspace.tech/blog`
  4. `https://www.smartaiworkspace.tech/blog/ai-agents-autonomous-systems-guide-2026`
  5. `https://www.smartaiworkspace.tech/solutions/real-estate`
  6. `https://www.smartaiworkspace.tech/integrations/claude`
- **Record:** LCP, INP (Interaction to Next Paint), CLS, Performance score. Flag any page with mobile LCP >2.5s or CLS >0.1.
- **Likely issues to pre-check:**
  - Google Tag Manager + Google Analytics + Cookie-Script (3 third-party scripts in [src/app/layout.tsx](../../src/app/layout.tsx:62-95)) are common LCP/TBT offenders. Consider deferring Cookie-Script until consent is needed.
  - Hero images: confirm `priority` prop on above-the-fold images to improve LCP.
- **Effort:** ~45m

---

## P2 — Fix this quarter

### [ ] P2-1 · Add Service JSON-LD to `/services`
Wrap each service with `Service` schema referencing the Organization. Effort: 1h.

### [ ] P2-2 · Add Review + AggregateRating for testimonials
Testimonials exist (H2 scan) but have no schema. Emit `Review` for each + `AggregateRating` on the Organization or services page. Effort: 2h.

### [ ] P2-3 · Expand blog to 20+ posts for topical authority
Currently 4 posts. Target 2 posts/month, covering:
- AI automation + industry verticals (per solution page)
- n8n how-tos (leveraging the fact that you run n8n.smartaiworkspace.tech)
- Claude use cases (per memory: strong technical depth)
- Comparison posts (Zapier vs n8n, Make vs n8n, etc. — already have integration pages for these)
Effort: ongoing.

### [ ] P2-4 · Add DefinedTerm JSON-LD on glossary pages
Specifically designed for dictionary-style content. Can win SERP "definition" rich results for terms like "workflow automation". Effort: 1h.

### [ ] P2-5 · Implement image sitemap
Extend [src/app/sitemap.ts](../../src/app/sitemap.ts) to emit `<image:image>` entries for pages with hero imagery. Drives Google Images referral traffic. Effort: 1h.

### [ ] P2-6 · Add social profile `sameAs` to Organization schema
When you build Organization JSON-LD (P0-2), include a `sameAs` array with LinkedIn, X/Twitter, YouTube, GitHub, any forums. Populates the knowledge panel. Effort: 15m.

### [ ] P2-7 · Ship a security.txt
Currently missing (`/.well-known/security.txt` returned non-200 during crawl). Low-impact SEO, but a credibility signal and good practice. Effort: 15m.

### [ ] P2-8 · Set `og:locale` explicitly
Currently not set on any page. Add `og:locale = "en_US"` to root metadata. Effort: 5m.

### [ ] P2-9 · Consider adding `/case-studies` pages
E-E-A-T boost. Even 2–3 real engagements as detailed case studies (with real metrics, client names where permitted) would outrank competing consultancies that only have service pages. Effort: ongoing.

---

## Already working (do not change)

- ✅ HTTPS everywhere (51/51).
- ✅ All pages return 200 (51/51).
- ✅ robots.txt: excellent — permissive AI-crawler allow-list including GPTBot, ClaudeBot, PerplexityBot, Applebot-Extended, etc.
- ✅ sitemap.xml: clean, includes all 51 URLs, correct priorities, `lastmod` set.
- ✅ Content depth: avg 1,100+ words per page; blog averages 2,590.
- ✅ Image alt text: 100% coverage on all images (0 missing).
- ✅ HTML lang attribute: `en` on every page.
- ✅ Viewport meta: present on every page.
- ✅ Internal linking: avg 40+ internal links per page.
- ✅ Twitter card meta: `twitter:card` set globally.
- ✅ No duplicate titles or descriptions across the 51 URLs.
- ✅ No thin content apart from `/contact` (intentional).
- ✅ Google Tag Manager + Google Analytics installed.
- ✅ Google Search Console verification token in place.
- ✅ IndexNow integration (per recent commit `e029bb5`).

---

## What this audit did NOT measure (manual follow-up)

- **Google Search Console performance** (clicks, impressions, average position, CTR per query and per page). Export via GSC → Performance → Export and request a follow-up.
- **Backlink profile** (referring domains, anchor distribution, broken inbound links, Domain Rating). Requires Ahrefs/Majestic/Semrush paid plan.
- **Core Web Vitals** (automated PSI API was rate-limited; see P1-7).
- **Real-world competitor gap analysis** (what ranks #1–10 for "AI automation consulting", "workflow automation for [industry]", etc.).
- **Schema rich-results validation** (will be needed after P0-2 ships).

---

_Audit produced by Smart AI Workspace internal tooling — crawler at `scripts/seo-crawl.mjs`, analyzer at `scripts/seo-analyze.mjs`, PDF at `scripts/seo-report.mjs`. Re-run any of them after fixes to see the score update._
