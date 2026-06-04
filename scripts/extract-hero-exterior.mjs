#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const src = JSON.parse(
  fs.readFileSync(path.resolve("../vcuinternational-blueprint.json"), "utf8"),
);
const cap = src.templateSlots?.capabilities?.[0];
if (!cap?.imageUrl?.startsWith("data:")) {
  throw new Error("no factory-exterior data URI at templateSlots.capabilities[0]");
}
const m = cap.imageUrl.match(/^data:image\/(\w+);base64,(.*)$/s);
const ext = m[1] === "jpeg" ? "jpg" : m[1];
const dir = path.join("public", "images", "hero");
fs.mkdirSync(dir, { recursive: true });
const out = path.join(dir, `factory-exterior.${ext}`);
fs.writeFileSync(out, Buffer.from(m[2], "base64"));
console.log("wrote", out, "bytes:", fs.statSync(out).size);
