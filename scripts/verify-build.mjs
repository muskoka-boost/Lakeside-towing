#!/usr/bin/env node
/**
 * Post-build checks over dist/.
 *
 * The site builds for two different base paths, which is exactly the kind of
 * thing that silently produces 404s on one target and not the other. This runs
 * in CI before the Pages deploy so a broken link fails the build instead of
 * shipping.
 *
 * Usage: node scripts/verify-build.mjs [distDir]
 */

import { readFileSync, existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const DIST = process.argv[2] || 'dist';
const problems = [];
const fail = (m) => problems.push(m);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const files = await walk(DIST);
const htmlFiles = files.filter((f) => f.endsWith('.html'));

if (htmlFiles.length === 0) {
  console.error('No HTML found in ' + DIST);
  process.exit(1);
}

/** dist/services/x/index.html -> /services/x/  (base path is added below) */
const toRoute = (f) =>
  '/' + relative(DIST, f).split(sep).join('/').replace(/index\.html$/, '');

const routes = new Set(htmlFiles.map(toRoute));

// The base path every internal link should carry, taken from the canonical
// URL the build actually emitted rather than assumed.
const home = htmlFiles.find((f) => toRoute(f) === '/');
const canonicalHome = home
  ? (readFileSync(home, 'utf8').match(/<link rel="canonical" href="([^"]+)"/) || [])[1]
  : null;
const BASE = canonicalHome ? new URL(canonicalHome).pathname : '/';
const strip = (p) => (BASE === '/' ? p : p.replace(new RegExp('^' + BASE.replace(/\/$/, '')), ''));

/**
 * Attribute values arrive HTML-escaped, so "&" is five characters on disk but
 * one to a search engine. Lengths must be measured against the decoded text or
 * every title containing an ampersand reads as artificially long.
 */
const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');

const titles = new Map();
const descs = new Map();

for (const file of htmlFiles) {
  const route = toRoute(file);
  const html = readFileSync(file, 'utf8');
  const at = (m) => `${route}: ${m}`;
  const is404 = route === '/404.html';

  const rawTitle = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]?.trim();
  const rawDesc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  const title = rawTitle && decode(rawTitle);
  const desc = rawDesc && decode(rawDesc);

  if (!title) fail(at('no <title>'));
  if (!desc) fail(at('no meta description'));

  if (!is404) {
    if (title && title.length > 60) fail(at(`title ${title.length} chars (>60)`));
    if (desc && (desc.length < 130 || desc.length > 160))
      fail(at(`meta description ${desc.length} chars (want 130-160)`));
    if (!/rel="canonical"/.test(html)) fail(at('no canonical'));

    if (title) {
      if (titles.has(title)) fail(at(`duplicate title, also on ${titles.get(title)}`));
      else titles.set(title, route);
    }
    if (desc) {
      if (descs.has(desc)) fail(at(`duplicate description, also on ${descs.get(desc)}`));
      else descs.set(desc, route);
    }
  }

  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) fail(at(`${h1s.length} <h1> tags, expected 1`));

  if (html.includes('href="#"')) fail(at('empty href="#"'));
  if (/TODO|FIXME|Lorem ipsum/.test(html)) fail(at('placeholder text left in'));

  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt=/.test(img)) fail(at(`<img> without alt: ${img.slice(0, 70)}`));
    if (!/\swidth=/.test(img) || !/\sheight=/.test(img))
      fail(at(`<img> without dimensions: ${img.slice(0, 70)}`));
  }

  for (const block of html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || []) {
    const json = block.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
    try {
      JSON.parse(json);
    } catch (e) {
      fail(at(`invalid JSON-LD: ${e.message}`));
    }
  }

  for (const a of html.match(/<a\b[^>]*target="_blank"[^>]*>/g) || []) {
    if (!/rel="[^"]*noopener/.test(a)) fail(at(`target="_blank" without rel=noopener`));
  }

  // Internal links must resolve to a real route or a real file on disk.
  const hrefs = new Set(
    [...html.matchAll(/(?:href|src|srcset)="(\/[^"#?\s]*)"/g)].map((m) => m[1]),
  );
  for (const href of hrefs) {
    if (BASE !== '/' && !href.startsWith(BASE)) {
      fail(at(`link missing base path "${BASE}": ${href}`));
      continue;
    }
    const rel = strip(href);
    if (routes.has(rel)) continue;
    const onDisk = join(DIST, rel.replace(/^\//, ''));
    if (existsSync(onDisk)) continue;
    fail(at(`broken link: ${href}`));
  }
}

// Files that must exist regardless of target.
for (const required of ['robots.txt', 'sitemap-index.xml', 'favicon.ico']) {
  if (!existsSync(join(DIST, required))) fail(`missing ${required}`);
}

// The agency credit is contractually on every page.
const missingCredit = htmlFiles.filter(
  (f) => !readFileSync(f, 'utf8').includes('muskokadigitalboost.ca'),
);
if (missingCredit.length) fail(`${missingCredit.length} page(s) missing the footer credit`);

// A preview build must be non-indexable; a production build must not be.
const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
const homeHtml = home ? readFileSync(home, 'utf8') : '';
const previewRobots = /Disallow: \/\s*$/m.test(robots);
const previewMeta = /name="robots" content="noindex/.test(homeHtml);
if (previewRobots !== previewMeta) {
  fail(
    `preview signals disagree: robots.txt disallow=${previewRobots}, homepage noindex=${previewMeta}`,
  );
}

const mode = previewRobots ? 'PREVIEW (noindex)' : 'PRODUCTION (indexable)';
console.log(`${htmlFiles.length} pages · base "${BASE}" · ${mode}`);

if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}
console.log('All checks passed.');
