/**
 * Chroma-key a solid-white background out of a logo/graphic and resize it
 * into src/assets/ as a transparent WebP. For flat-color vector-style
 * artwork (logos, line art) where the background is genuinely white, not
 * photos — soft/anti-aliased edges near white will also fade out, which is
 * what you want for logo edges but would look wrong on a real photograph.
 *
 *   npm run chroma-key -- "<source file>" <output-name> [width]
 *
 * Same convention as add-photo.mjs: default width 800, writes
 * src/assets/<output-name>.webp, prints the import line to paste.
 */
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ASSETS = resolve(HERE, "..", "src", "assets");

const [src, rawName, rawWidth] = process.argv.slice(2);

if (!src || !rawName) {
  console.error('Usage: npm run chroma-key -- "<source file>" <output-name> [width]');
  process.exit(1);
}
if (!existsSync(src)) {
  console.error(`Source not found:\n  ${src}`);
  process.exit(1);
}

const name = rawName.replace(/\.(jpe?g|png|webp)$/i, "");
const width = Number(rawWidth) || 800;
if (!existsSync(ASSETS)) mkdirSync(ASSETS, { recursive: true });

const out = join(ASSETS, `${name}.webp`);

const resized = sharp(src)
  .rotate()
  .resize({ width, withoutEnlargement: true })
  .ensureAlpha();

const { data, info } = await resized.raw().toBuffer({ resolveWithObject: true });

// Distance-from-white threshold, not a hard cutoff: pixels close to white
// go fully transparent, pixels far from white stay fully opaque, and the
// band between fades — this keeps anti-aliased edges (the soft grey-white
// pixels logo software puts between a shape and its white canvas) from
// leaving a visible halo.
const NEAR = 8; // channels within this of 255,255,255 -> fully transparent
const FAR = 40; // channels this far from white -> fully opaque

for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const distance = 255 - Math.min(r, g, b);
  let alpha;
  if (distance <= NEAR) alpha = 0;
  else if (distance >= FAR) alpha = 255;
  else alpha = Math.round(((distance - NEAR) / (FAR - NEAR)) * 255);
  data[i + 3] = Math.min(data[i + 3], alpha);
}

await sharp(data, { raw: info }).webp({ quality: 90 }).toFile(out);

const before = await sharp(src).metadata();
const after = await sharp(out).metadata();
const kb = (n) => `${Math.round(n / 1024)} KB`;
const { size: srcSize } = await import("node:fs").then((fs) => fs.promises.stat(src));
const { size: outSize } = await import("node:fs").then((fs) => fs.promises.stat(out));

console.log(`
  ${basename(src)}  ${before.width}x${before.height}  ${kb(srcSize)}
    ->  src/assets/${name}.webp  ${after.width}x${after.height}  ${kb(outSize)}

  Paste:

    import ${name.replace(/[-_](\w)/g, (_, c) => c.toUpperCase())} from "@/assets/${name}.webp";
`);
