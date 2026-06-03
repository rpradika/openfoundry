import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const OUT = path.resolve("qa-shots");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

for (const vp of [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812 },
]) {
  const ctx = await browser.newContext({ viewport: vp });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);

  for (const id of ["#about", "#capabilities", "#programme-delivery", "#contact"]) {
    await page.evaluate((h) => { window.location.hash = ""; window.scrollTo(0, 0); window.location.hash = h; }, id);
    await page.waitForTimeout(500);

    const measurement = await page.evaluate((h) => {
      const sel = h.slice(1);
      const target = document.getElementById(sel);
      const nav = document.querySelector("nav");
      const navBottom = nav.getBoundingClientRect().bottom;
      const targetTop = target.getBoundingClientRect().top;
      const navHeight = nav.offsetHeight;
      return { navHeight, navBottom: Math.round(navBottom), targetTop: Math.round(targetTop), gap: Math.round(targetTop - navBottom) };
    }, id);

    const file = path.join(OUT, `anchor-${vp.name}-${id.slice(1)}.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`[${vp.name}] ${id} navH=${measurement.navHeight} navBottom=${measurement.navBottom} sectionTop=${measurement.targetTop} gap=${measurement.gap}px ${measurement.gap >= 0 ? "OK" : "OVERLAP"}`);
  }
  await ctx.close();
}

await browser.close();
