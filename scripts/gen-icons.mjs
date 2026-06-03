import sharp from "sharp";
import path from "node:path";

const BRAND = "#b4232c";

function iconSvg(size, fontSize) {
  return Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${BRAND}"/>
      <text x="50%" y="50%"
        font-family="Inter, system-ui, sans-serif"
        font-size="${fontSize}"
        font-weight="800"
        fill="#ffffff"
        text-anchor="middle"
        dominant-baseline="central"
        letter-spacing="-2">VCU</text>
    </svg>
  `);
}

async function build(target, size) {
  const fontSize = Math.round(size * 0.38);
  await sharp(iconSvg(size, fontSize))
    .png({ compressionLevel: 9 })
    .toFile(target);
  console.log(`wrote ${path.relative(process.cwd(), target)} (${size}x${size})`);
}

await build(path.resolve("app/icon.png"), 256);
await build(path.resolve("app/apple-icon.png"), 180);
