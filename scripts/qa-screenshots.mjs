import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const URL = process.env.QA_URL ?? "http://localhost:3000/";
const OUT = path.resolve("qa-shots");
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];

const SECTIONS = [
  { id: null, label: "00-full" },
  { id: "#hero", label: "01-hero", selector: 'section#hero' },
  { id: "#about", label: "02-about", selector: '#about' },
  { id: "#capabilities", label: "03-capabilities", selector: '#capabilities' },
  { id: "#materials", label: "04-materials", selector: '#materials' },
  { id: "#quality", label: "05-quality", selector: '#quality' },
  { id: "#quality-systems", label: "06-quality-kpis", selector: '#quality-systems' },
  { id: "#programme-delivery", label: "07-programme", selector: '#programme-delivery' },
  { id: "#why-buyers-choose", label: "08-buyers", selector: '#why-buyers-choose' },
  { id: "#contact", label: "09-contact", selector: '#contact' },
  { id: "footer", label: "10-footer", selector: 'footer' },
];

const browser = await chromium.launch();
const consoleErrors = [];
const pageErrors = [];
const failedRequests = [];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(`[${vp.name}] ${m.text()}`);
  });
  page.on("pageerror", (e) => pageErrors.push(`[${vp.name}] ${e.message}`));
  page.on("requestfailed", (r) => {
    const url = r.url();
    if (url.includes("_next/static") || url.includes("hot-update") || url.includes("__nextjs")) return;
    failedRequests.push(`[${vp.name}] ${r.failure()?.errorText ?? "fail"} ${url}`);
  });
  page.on("response", (resp) => {
    if (resp.status() >= 400) {
      const url = resp.url();
      if (url.includes("_next/static") || url.includes("hot-update") || url.includes("__nextjs") || url.includes("_devtools")) return;
      failedRequests.push(`[${vp.name}] HTTP ${resp.status()} ${url}`);
    }
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(500);

  for (const s of SECTIONS) {
    const file = path.join(OUT, `${vp.name}-${s.label}.png`);
    if (s.id === null) {
      await page.screenshot({ path: file, fullPage: true });
    } else {
      const el = await page.$(s.selector);
      if (!el) { console.log(`MISS ${vp.name} ${s.label}`); continue; }
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await el.screenshot({ path: file });
    }
  }

  await ctx.close();
  console.log(`done ${vp.name}`);
}

await browser.close();

const summary = {
  consoleErrors: [...new Set(consoleErrors)],
  pageErrors: [...new Set(pageErrors)],
  failedRequests: [...new Set(failedRequests)],
};
fs.writeFileSync(path.join(OUT, "_summary.json"), JSON.stringify(summary, null, 2));
console.log("\n=== SUMMARY ===");
console.log(JSON.stringify(summary, null, 2));
