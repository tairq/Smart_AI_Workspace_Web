import puppeteer from "puppeteer";
import { mkdirSync, readdirSync } from "fs";
import { join } from "path";

const DIR = "./temporary screenshots";
mkdirSync(DIR, { recursive: true });

const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3] || "";

// Auto-increment: find highest existing screenshot-N and use N+1
const existing = readdirSync(DIR).filter((f) => /^screenshot-\d+/.test(f));
const maxN = existing.reduce((max, f) => {
  const match = f.match(/^screenshot-(\d+)/);
  return match ? Math.max(max, parseInt(match[1], 10)) : max;
}, 0);
const n = maxN + 1;

const filename = label
  ? `screenshot-${n}-${label}.png`
  : `screenshot-${n}.png`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
const outputPath = join(DIR, filename);
await page.screenshot({ path: outputPath, fullPage: true });
await browser.close();

console.log(`Saved: ${outputPath}`);
