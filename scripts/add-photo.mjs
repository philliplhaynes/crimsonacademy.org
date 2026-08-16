/**
 * Resize + compress a photo into src/assets/ so it is safe to ship.
 *
 *   npm run add-photo -- "<source file>" <output-name> [width]
 *
 * Example:
 *   npm run add-photo -- "C:/One/Crimson Foundation/CF Rwanda/CAR Land Purchase/IMG_0042.JPG" history-2009-first-visit
 *
 * Writes src/assets/<output-name>.jpg and prints the import line to paste.
 * Default width 1400px, quality 80 (mozjpeg) — a 3 MB camera file typically
 * lands around 150–250 KB with no visible loss at the sizes we display.
 */
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ASSETS = resolve(HERE, "..", "src", "assets");

const [src, rawName, rawWidth] = process.argv.slice(2);

if (!src || !rawName) {
  console.error('Usage: npm run add-photo -- "<source file>" <output-name> [width]');
  process.exit(1);
}
if (!existsSync(src)) {
  console.error(`Source not found:\n  ${src}`);
  process.exit(1);
}

const name = rawName.replace(/\.(jpe?g|png|webp)$/i, "");
const width = Number(rawWidth) || 1400;
if (!existsSync(ASSETS)) mkdirSync(ASSETS, { recursive: true });

const out = join(ASSETS, `${name}.jpg`);
const before = await sharp(src).metadata();

await sharp(src)
  .rotate() // honour EXIF orientation — scanned/phone photos are often sideways
  .resize({ width: Math.min(width, before.width), withoutEnlargement: true })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(out);

const after = await sharp(out).metadata();
const kb = (n) => `${Math.round(n / 1024)} KB`;
const { size: srcSize } = await sharp(src).stats().then(
  () => import("node:fs").then((fs) => fs.promises.stat(src)),
);
const { size: outSize } = await import("node:fs").then((fs) => fs.promises.stat(out));

console.log(`
  ${basename(src)}  ${before.width}x${before.height}  ${kb(srcSize)}
    ->  src/assets/${name}.jpg  ${after.width}x${after.height}  ${kb(outSize)}

  Paste into src/components/SchoolHistory.tsx:

    import ${name.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()).replace(/^\w/, (c) => c.toLowerCase())} from "@/assets/${name}.jpg";

  ...then add to the chapter:

    photo: ${name.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()).replace(/^\w/, (c) => c.toLowerCase())},
    alt: "describe what is happening in the photo",
`);
