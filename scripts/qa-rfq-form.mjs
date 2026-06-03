import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const OUT = path.resolve("qa-shots");
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: vp });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

  await page.addStyleTag({ content: "nav, header { display: none !important; }" });
  await page.waitForTimeout(150);

  const contact = await page.$("#contact");
  if (!contact) throw new Error("no #contact section");
  await contact.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await contact.screenshot({ path: path.join(OUT, `rfq-${vp.name}-01-empty.png`) });

  await page.click('button[type="submit"]');
  await page.waitForTimeout(250);
  await contact.screenshot({ path: path.join(OUT, `rfq-${vp.name}-02-errors.png`) });

  await page.fill("#rfq-name", "Jane Doe");
  await page.fill("#rfq-company", "Acme Industries");
  await page.fill("#rfq-email", "not-an-email");
  await page.fill("#rfq-project", "Need 5000 CNC-machined housings, 6082-T6, ±0.05mm tolerance, Q4 delivery.");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(250);
  await contact.screenshot({ path: path.join(OUT, `rfq-${vp.name}-03-bad-email.png`) });

  await page.fill("#rfq-email", "jane@acme.com");

  await page.route("**/api/rfq", (route) => route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) }));
  await page.click('button[type="submit"]');
  await page.waitForTimeout(500);
  await contact.screenshot({ path: path.join(OUT, `rfq-${vp.name}-04-success.png`) });

  await ctx.close();
  console.log(`done ${vp.name}`);
}

await browser.close();
