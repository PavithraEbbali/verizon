/**
 * The generated hero has its dark-left treatment applied as a hard-edged
 * rectangle rather than a gradient, leaving a visible vertical seam. This finds
 * that column by looking for the largest sustained horizontal brightness step,
 * then dissolves it by compositing a blurred strip back over the join through a
 * feathered alpha mask.
 */
const sharp = require("sharp");

const SRC = "image-originals/hero.png";

(async () => {
  const base = sharp(SRC);
  const { width: W, height: H } = await base.metadata();

  // Column-average luminance across the middle band of the image.
  const { data, info } = await sharp(SRC)
    .extract({ left: 0, top: Math.round(H * 0.25), width: W, height: Math.round(H * 0.5) })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cols = new Float64Array(info.width);
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) cols[x] += data[y * info.width + x];
  }
  for (let x = 0; x < info.width; x++) cols[x] /= info.height;

  // Largest single-column jump, searched in the middle 60% of the frame.
  let seam = -1, best = 0;
  for (let x = Math.round(W * 0.2); x < Math.round(W * 0.8); x++) {
    const jump = cols[x + 1] - cols[x];
    if (jump > best) { best = jump; seam = x; }
  }
  console.log(`seam at x=${seam} (${((seam / W) * 100).toFixed(1)}%), step=${best.toFixed(1)} luma`);

  if (seam < 0 || best < 6) {
    console.log("no significant seam — leaving image unchanged");
    return;
  }

  // Feather a strip centred on the seam.
  const FEATHER = Math.round(W * 0.08);
  const left = Math.max(0, seam - Math.round(FEATHER / 2));
  const stripW = Math.min(FEATHER, W - left);

  const strip = await sharp(SRC)
    .extract({ left, top: 0, width: stripW, height: H })
    .blur(Math.max(12, Math.round(stripW / 6)))
    .ensureAlpha()
    .raw()
    .toBuffer();

  // Triangular alpha ramp: transparent at both edges, opaque at the seam.
  for (let x = 0; x < stripW; x++) {
    const t = x / (stripW - 1);
    const a = Math.round(255 * (1 - Math.abs(t - 0.5) * 2));
    for (let y = 0; y < H; y++) strip[(y * stripW + x) * 4 + 3] = a;
  }

  await sharp(SRC)
    .composite([{ input: strip, raw: { width: stripW, height: H, channels: 4 }, left, top: 0 }])
    .extract({ left: 0, top: 0, width: Math.round(W * 0.875), height: H }) // drop watermark
    .resize({ width: 2560, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile("public/img/hero.webp");

  const m = await sharp("public/img/hero.webp").metadata();
  const kb = require("fs").statSync("public/img/hero.webp").size / 1024;
  console.log(`hero.webp ${m.width}x${m.height} ${kb.toFixed(0)} KB`);
})();
