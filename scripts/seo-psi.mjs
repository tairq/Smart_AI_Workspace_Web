import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUT = "./docs/seo-audit";
mkdirSync(OUT, { recursive: true });

const targets = [
  "https://www.smartaiworkspace.tech",
  "https://www.smartaiworkspace.tech/services",
  "https://www.smartaiworkspace.tech/blog/ai-agents-autonomous-systems-guide-2026",
  "https://www.smartaiworkspace.tech/solutions/real-estate",
  "https://www.smartaiworkspace.tech/integrations/claude",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function psi(url, strategy, attempt = 1) {
  const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=seo&category=accessibility&category=best-practices`;
  try {
    const res = await fetch(api);
    if (res.status === 429 && attempt <= 3) {
      await sleep(15000 * attempt);
      return psi(url, strategy, attempt + 1);
    }
    if (!res.ok) return { url, strategy, error: `HTTP ${res.status}`, attempts: attempt };
    const json = await res.json();
    const lhr = json.lighthouseResult || {};
    const cats = lhr.categories || {};
    const audits = lhr.audits || {};
    return {
      url,
      strategy,
      fetchedAt: new Date().toISOString(),
      attempts: attempt,
      scores: {
        performance: cats.performance?.score ?? null,
        seo: cats.seo?.score ?? null,
        accessibility: cats.accessibility?.score ?? null,
        bestPractices: cats["best-practices"]?.score ?? null,
      },
      metrics: {
        LCP: audits["largest-contentful-paint"]?.displayValue ?? null,
        LCP_ms: audits["largest-contentful-paint"]?.numericValue ?? null,
        CLS: audits["cumulative-layout-shift"]?.displayValue ?? null,
        CLS_raw: audits["cumulative-layout-shift"]?.numericValue ?? null,
        FCP: audits["first-contentful-paint"]?.displayValue ?? null,
        FCP_ms: audits["first-contentful-paint"]?.numericValue ?? null,
        TBT: audits["total-blocking-time"]?.displayValue ?? null,
        TBT_ms: audits["total-blocking-time"]?.numericValue ?? null,
        SI: audits["speed-index"]?.displayValue ?? null,
        TTFB_ms: audits["server-response-time"]?.numericValue ?? null,
      },
      seoFindings: {
        metaDescription: audits["meta-description"]?.score,
        documentTitle: audits["document-title"]?.score,
        httpStatusCode: audits["http-status-code"]?.score,
        viewport: audits["viewport"]?.score,
        hreflang: audits["hreflang"]?.score,
        canonical: audits["canonical"]?.score,
        robotsTxt: audits["robots-txt"]?.score,
        imageAlt: audits["image-alt"]?.score,
        linkText: audits["link-text"]?.score,
        crawlableAnchors: audits["crawlable-anchors"]?.score,
        isCrawlable: audits["is-crawlable"]?.score,
        structuredData: audits["structured-data"]?.score,
      },
      topOpportunities: Object.entries(audits)
        .filter(([, a]) => a.details?.type === "opportunity" && a.numericValue > 0)
        .map(([id, a]) => ({ id, title: a.title, savings_ms: a.numericValue, displayValue: a.displayValue }))
        .sort((a, b) => b.savings_ms - a.savings_ms)
        .slice(0, 8),
    };
  } catch (err) {
    return { url, strategy, error: err.message, attempts: attempt };
  }
}

const results = [];
for (const url of targets) {
  for (const strategy of ["mobile", "desktop"]) {
    process.stdout.write(`PSI ${strategy.padEnd(7)} ${url} ... `);
    const r = await psi(url, strategy);
    results.push(r);
    process.stdout.write(
      r.error
        ? `${r.error} (attempts=${r.attempts})\n`
        : `perf=${r.scores.performance} seo=${r.scores.seo} a11y=${r.scores.accessibility} LCP=${r.metrics.LCP} CLS=${r.metrics.CLS}\n`,
    );
    await sleep(5000); // respectful spacing between calls
  }
}

writeFileSync(join(OUT, "core-web-vitals.json"), JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));
console.log(`\nWrote ${results.length} PSI results to ${OUT}/core-web-vitals.json`);
