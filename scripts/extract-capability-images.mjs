#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("../vcuinternational-blueprint.json");
const BP = path.resolve("content/blueprint.json");

const src = JSON.parse(fs.readFileSync(SRC, "utf8"));
const bp = JSON.parse(fs.readFileSync(BP, "utf8"));

const slugify = (n) =>
  n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const tplCaps = src.templateSlots?.capabilities ?? [];
const byName = new Map(tplCaps.map((c) => [c.name, c]));

const outDir = path.join("public", "images", "capabilities");
fs.mkdirSync(outDir, { recursive: true });

for (const cap of bp.capabilities) {
  const tpl = byName.get(cap.name);
  if (!tpl || typeof tpl.imageUrl !== "string" || !tpl.imageUrl.startsWith("data:")) {
    console.warn("no source imageUrl for", cap.name);
    continue;
  }
  const m = tpl.imageUrl.match(/^data:image\/(\w+);base64,(.*)$/s);
  if (!m) {
    console.warn("malformed data URI for", cap.name);
    continue;
  }
  const ext = m[1] === "jpeg" ? "jpg" : m[1];
  const slug = slugify(cap.name);
  const outPath = path.join(outDir, `${slug}.${ext}`);
  fs.writeFileSync(outPath, Buffer.from(m[2], "base64"));
  const webPath = `/images/capabilities/${slug}.${ext}`;
  cap.imageUrl = webPath;
  console.log("wrote", outPath, "->", webPath, "bytes:", fs.statSync(outPath).size);
}

fs.writeFileSync(BP, JSON.stringify(bp, null, 2) + "\n");
console.log("updated", BP);
