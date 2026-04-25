import puppeteer from "puppeteer";
import { mkdirSync } from "fs";

mkdirSync("./docs/seo-audit/preview", { recursive: true });

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 794, height: 1123 }); // A4 @ 96dpi
await page.goto("file:///" + process.cwd().replace(/\\/g, "/") + "/docs/seo-audit/report.html", { waitUntil: "networkidle0" });

// Screenshot individual section wrappers so we can eyeball the cover + one content page
const sections = await page.$$("section");
for (let i = 0; i < Math.min(3, sections.length); i++) {
  await sections[i].screenshot({ path: `./docs/seo-audit/preview/page-${i + 1}.png` });
}

await browser.close();
console.log(`Wrote ${Math.min(3, sections.length)} preview PNGs`);
