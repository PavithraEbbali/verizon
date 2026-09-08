/**
 * One-shot pipeline for the generated hero/section art.
 *
 * The source PNGs are ~2816x1536 and 5-8 MB each. Two things happen here:
 *  1. The right 12.5% is cropped off. Every generated file carries the Gemini
 *     sparkle watermark at roughly x 0.90-0.94, so trimming the right edge
 *     removes it without touching the vertical composition.
 *  2. Each file is resized to the largest size its slot actually renders at and
 *     re-encoded as WebP.
 *
 * Originals are moved to ../image-originals so they are preserved but no longer
 * sit inside public/ where they would be served and deployed.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = "image-originals";
const OUT = "public/img";
const TRIM_RIGHT = 0.125; // removes the watermark

const WIDTHS = {
  hero: 2560,
  bundles: 2000,
  "why-us": 2000,
  fiber: 1400,
  "5g-home": 1400,
  tv: 1400,
  mobile: 1400,
  phone: 1400,
  "how-it-works": 1400,
  "eq-router": 900,
  "eq-extender": 900,
  "eq-protect": 900,
  "eq-cloud": 900,
};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  let total = 0;
  const manifest = {};

  for (const [name, width] of Object.entries(WIDTHS)) {
    const src = path.join(SRC, `${name}.png`);
    if (!fs.existsSync(src)) {
      console.log(`SKIP ${name} (no source)`);
      continue;
    }
    const meta = await sharp(src).metadata();
    const cropW = Math.round(meta.width * (1 - TRIM_RIGHT));

    const out = path.join(OUT, `${name}.webp`);
    await sharp(src)
      .extract({ left: 0, top: 0, width: cropW, height: meta.height })
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toFile(out);

    const m = await sharp(out).metadata();
    const kb = fs.statSync(out).size / 1024;
    total += kb;
    manifest[name] = { w: m.width, h: m.height };
    console.log(`${(name + ".webp").padEnd(22)} ${`${m.width}x${m.height}`.padEnd(12)} ${kb.toFixed(0)} KB`);
  }

  fs.writeFileSync("image-manifest.json", JSON.stringify(manifest, null, 2));
  console.log(`\nTOTAL ${total.toFixed(0)} KB`);
})();
