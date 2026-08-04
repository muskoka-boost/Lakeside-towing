#!/usr/bin/env node
/**
 * Turn a photo straight off a phone into the four files the site serves.
 *
 * Photos from the business arrive at whatever size and aspect the camera
 * produced. Everything in public/media/ needs to be a predictable size, in
 * both webp and jpeg, at three widths — otherwise every new photo is a
 * hand-tuned one-off and the responsive markup drifts out of step with what
 * is actually on disk.
 *
 * Usage:
 *   node scripts/prepare-photo.mjs <source> <name> [aspect]
 *
 *   source   Path to the original (any format sharp reads).
 *   name     Output basename, e.g. "recovery-snowmobile-winter". Use words a
 *            human and a search engine can both read.
 *   aspect   Target ratio as w:h. Defaults to 3:2, which suits a photo band
 *            inside a page. Use 16:9 for anything running full-bleed.
 *
 * Writes public/media/<name>.jpg, <name>.webp, <name>-1280.webp and
 * <name>-800.webp, then prints the data/site.ts entry to paste in.
 *
 * The crop is centred. If a photo's subject is well off-centre, crop it
 * yourself first and pass the already-cropped file — this script will not
 * guess at composition.
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { basename } from 'node:path';

const [source, name, aspect = '3:2'] = process.argv.slice(2);

if (!source || !name) {
  console.error('Usage: node scripts/prepare-photo.mjs <source> <name> [aspect]');
  process.exit(1);
}

const [aw, ah] = aspect.split(':').map(Number);
if (!aw || !ah) {
  console.error(`Bad aspect "${aspect}" — expected something like 3:2 or 16:9.`);
  process.exit(1);
}

const OUT_DIR = 'public/media';
/** The widest we serve. Beyond this the file cost stops buying visible detail. */
const FULL_WIDTH = 1600;
const WIDTHS = [1280, 800];

await mkdir(OUT_DIR, { recursive: true });

const input = sharp(source).rotate(); // honour EXIF orientation before cropping
const meta = await input.metadata();

if (meta.width < FULL_WIDTH) {
  console.warn(
    `Note: source is only ${meta.width}px wide, so the full-size output will be ` +
      `${meta.width}px rather than ${FULL_WIDTH}px. Fine, but use the largest ` +
      `original you have if there is one.`,
  );
}

const width = Math.min(FULL_WIDTH, meta.width);
const height = Math.round((width * ah) / aw);

/** Same crop for every output, so the variants are genuinely interchangeable. */
const framed = () =>
  sharp(source)
    .rotate()
    .resize(width, height, { fit: 'cover', position: 'centre' });

await framed().jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT_DIR}/${name}.jpg`);
await framed().webp({ quality: 80 }).toFile(`${OUT_DIR}/${name}.webp`);

for (const w of WIDTHS) {
  if (w >= width) continue;
  await framed()
    .resize(w, Math.round((w * ah) / aw))
    .webp({ quality: 78 })
    .toFile(`${OUT_DIR}/${name}-${w}.webp`);
}

console.log(`\n${basename(source)} → ${name} (${width}×${height}, ${aspect})\n`);
console.log('Add to `photos` in src/data/site.ts:\n');
console.log(`  '${name}': {
    file: '${name}',
    width: ${width},
    height: ${height},
    alt: 'DESCRIBE WHAT IS HAPPENING — this is read aloud to blind visitors',
    caption: 'Optional line shown under the photo',
  },`);
console.log('\nThen point a service or area at it with `photo: \'' + name + "'`.\n");
