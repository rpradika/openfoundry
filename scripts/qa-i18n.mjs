import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.QA_URL ?? "http://localhost:3000";
const OUT = path.resolve("qa-shots/i18n");
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const LOCALES = [
  { code: "en", path: "/" },
  { code: "vi", path: "/vi" },
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const SHOTS = [
  { label: "00-nav", selector: "nav" },
  { label: "01-hero", selector: "#hero" },
  { label: "02-contact", selector: "#contact" },
  { label: "03-footer", selector: "footer" },
];

const browser = await chromium.launch();
const issues = [];

for (const loc of LOCALES) {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    page.on("console", (m) => {
      if (m.type() === "error") issues.push(`[${loc.code} ${vp.name}] console: ${m.text()}`);
    });
    page.on("pageerror", (e) => issues.push(`[${loc.code} ${vp.name}] pageerror: ${e.message}`));

    await page.goto(BASE + loc.path, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(400);

    const prefix = `${loc.code}-${vp.name}`;
    await page.screenshot({ path: path.join(OUT, `${prefix}-full.png`), fullPage: true });
    for (const s of SHOTS) {
      const el = await page.$(s.selector);
      if (!el) {
        issues.push(`[${loc.code} ${vp.name}] missing selector ${s.selector}`);
        continue;
      }
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(150);
      await el.screenshot({ path: path.join(OUT, `${prefix}-${s.label}.png`) });
    }

    await ctx.close();
    console.log(`done ${loc.code} ${vp.name}`);
  }
}

await browser.close();

fs.writeFileSync(path.join(OUT, "_summary.json"), JSON.stringify({ issues }, null, 2));
console.log("\n=== SUMMARY ===");
console.log(JSON.stringify({ issues }, null, 2));
