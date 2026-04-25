#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const [, , slugArg, publishFlag] = process.argv;
if (!slugArg) {
  console.error("Usage: node scripts/publish-to-devto.mjs <slug> [--publish]");
  process.exit(1);
}

const envRaw = readFileSync(resolve(".env.local"), "utf8");
const apiKey = envRaw.match(/^DEVTO_API_KEY=(.+)$/m)?.[1]?.trim();
if (!apiKey) {
  console.error("DEVTO_API_KEY missing from .env.local");
  process.exit(1);
}

const SITE_URL = "https://www.smartaiworkspace.tech";
const file = readFileSync(resolve(`src/content/blog/${slugArg}.mdx`), "utf8");

const fmMatch = file.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!fmMatch) {
  console.error("Could not parse frontmatter");
  process.exit(1);
}
const [, frontmatter, bodyRaw] = fmMatch;

const fm = {};
for (const line of frontmatter.split("\n")) {
  const m = line.match(/^(\w+):\s*(.+)$/);
  if (!m) continue;
  let [, k, v] = m;
  v = v.trim();
  if (v.startsWith("[") && v.endsWith("]")) {
    fm[k] = v
      .slice(1, -1)
      .split(",")
      .map((s) => s.trim().replace(/^["']|["']$/g, ""));
  } else {
    fm[k] = v.replace(/^["']|["']$/g, "");
  }
}

const canonicalUrl = `${SITE_URL}/blog/${slugArg}`;
const bodyWithAbsLinks = bodyRaw.replace(/\]\((\/[^)]+)\)/g, (_, p) => `](${SITE_URL}${p})`);

const FOOTER = `

---

**More from Smart AI Workspace**

- 🌐 Website: [www.smartaiworkspace.tech](${SITE_URL})
- 📧 Email: [info@smartaiworkspace.tech](mailto:info@smartaiworkspace.tech)
- ▶️ YouTube: [@SmartAIWorkspace](https://www.youtube.com/@SmartAIWorkspace)
`;

const sourcesMatch = bodyWithAbsLinks.match(/\n(---\n+\*Sources:[\s\S]*)$/);
const body = sourcesMatch
  ? bodyWithAbsLinks.slice(0, sourcesMatch.index) + FOOTER + "\n" + sourcesMatch[1]
  : bodyWithAbsLinks + FOOTER;

const tagMap = {
  "AI Strategy": "ai",
  "Automation": "automation",
  "Enterprise AI": "enterprise",
  "Production AI": "productivity",
};
const tags = (fm.tags ?? []).map((t) => tagMap[t] ?? t.toLowerCase().replace(/[^a-z0-9]/g, "")).slice(0, 4);

const published = publishFlag === "--publish";

const payload = {
  article: {
    title: fm.title,
    published,
    body_markdown: body.trim(),
    tags,
    main_image: fm.coverImage,
    canonical_url: canonicalUrl,
    description: fm.excerpt,
  },
};

console.log(`Posting "${fm.title}" to dev.to (published=${published})...`);

const res = await fetch("https://dev.to/api/articles", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": apiKey,
  },
  body: JSON.stringify(payload),
});

const text = await res.text();
if (!res.ok) {
  console.error(`HTTP ${res.status}: ${text}`);
  process.exit(1);
}
const data = JSON.parse(text);
console.log(`\n✅ Success`);
console.log(`   ID:   ${data.id}`);
console.log(`   URL:  ${data.url}`);
console.log(`   Edit: https://dev.to/dashboard`);
