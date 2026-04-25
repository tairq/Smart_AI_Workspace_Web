// Verifies meta description lengths for all 31 pages flagged in the SEO audit (P1-1).
// Reads sources directly: about page, integrations.ts, glossary.ts, blog MDX frontmatter.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const read = (rel) => readFileSync(resolve(root, rel), "utf8");

const results = [];

// 1. /about — extract metadata.description string literal
{
  const src = read("src/app/(marketing)/about/page.tsx");
  const m = src.match(/description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/);
  results.push({ url: "/about", desc: m?.[1] ?? "" });
}

// 2. integrations — load TS file, regex-extract slug + metaDescription pairs
{
  const src = read("src/lib/data/integrations.ts");
  const re = /slug:\s*"([^"]+)"[\s\S]*?metaDescription:\s*\n?\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    results.push({ url: `/integrations/${m[1]}`, desc: m[2] });
  }
}

// 3. glossary — extract slug + metaDescription where present (4 only)
{
  const src = read("src/lib/data/glossary.ts");
  const re = /slug:\s*"([^"]+)"[\s\S]*?metaDescription:\s*\n?\s*"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    results.push({ url: `/glossary/${m[1]}`, desc: m[2] });
  }
}

// 4. blog MDX excerpts (3 trimmed posts)
const slugs = [
  "ai-deployment-at-scale-2026",
  "claude-opus-4-7-new-features-2026",
  "welcome-to-smart-ai-workspace",
];
for (const slug of slugs) {
  const src = read(`src/content/blog/${slug}.mdx`);
  const m = src.match(/^excerpt:\s*"((?:[^"\\]|\\.)*)"/m);
  results.push({ url: `/blog/${slug}`, desc: m?.[1] ?? "" });
}

let bad = 0;
for (const { url, desc } of results) {
  // un-escape \' and \" since the source uses literal quotes inside strings
  const len = desc.replace(/\\(.)/g, "$1").length;
  const status = len <= 160 ? "OK " : "BAD";
  if (len > 160) bad++;
  console.log(`${status} ${String(len).padStart(3)} ${url}`);
}
console.log(`\nTotal entries: ${results.length}, over 160: ${bad}`);
process.exit(bad > 0 ? 1 : 0);
