import sharp from "sharp";
import path from "node:path";

const W = 1200;
const H = 630;
const BRAND = "#b4232c";

const overlaySvg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a1326" stop-opacity="0.94"/>
      <stop offset="55%" stop-color="#0a1326" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0a1326" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a1326" stop-opacity="0"/>
      <stop offset="100%" stop-color="#0a1326" stop-opacity="0.85"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#dim)"/>
  <rect y="${H - 220}" width="${W}" height="220" fill="url(#bottom)"/>

  <rect x="72" y="96" width="48" height="4" fill="${BRAND}"/>

  <text x="72" y="132"
    font-family="Arial, Helvetica, sans-serif"
    font-size="14" font-weight="600" letter-spacing="3"
    fill="#ffffff" fill-opacity="0.72">
    MULTI-PROCESS MANUFACTURING
  </text>

  <text x="72" y="240"
    font-family="Arial, Helvetica, sans-serif"
    font-size="84" font-weight="800" letter-spacing="-2.5"
    fill="#ffffff">
    VCU International
  </text>

  <text x="72" y="304"
    font-family="Arial, Helvetica, sans-serif"
    font-size="30" font-weight="500" letter-spacing="-0.5"
    fill="#ffffff" fill-opacity="0.78">
    Automotive  ·  Defence  ·  Marine
  </text>

  <rect x="72" y="${H - 100}" width="32" height="2" fill="#ffffff" fill-opacity="0.4"/>
  <text x="72" y="${H - 56}"
    font-family="Arial, Helvetica, sans-serif"
    font-size="18" font-weight="500" letter-spacing="0.5"
    fill="#ffffff" fill-opacity="0.78">
    IATF 16949  ·  ISO 9001:2015  ·  Ho Chi Minh City, Vietnam
  </text>
</svg>
`;

const out = path.resolve("public/og-image.jpg");

await sharp(path.resolve("public/stock-heroes/cnc-1.jpg"))
  .resize(W, H, { fit: "cover", position: "right" })
  .composite([{ input: Buffer.from(overlaySvg), top: 0, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(out);

console.log(`wrote ${path.relative(process.cwd(), out)} (${W}x${H})`);
