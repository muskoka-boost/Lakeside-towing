/**
 * Base-path-aware URL helpers.
 *
 * The production site lives at the root of lakesidetowingorillia.com, but the
 * GitHub Pages preview is served from a subdirectory (/Lakeside-towing/).
 * Astro rewrites nothing in `href` and `src` attributes for you, so every
 * internal path in this codebase goes through `url()` and every absolute URL
 * in structured data goes through `abs()`.
 *
 * Write paths in source as if the site were at the root — `/services/` — and
 * these helpers apply whatever base the current build is using.
 */

/** Astro normalises this to '/' when no base is configured. */
const BASE = import.meta.env.BASE_URL || '/';

/** Base with no trailing slash, so joining is a plain concatenation. */
const PREFIX = BASE.replace(/\/+$/, '');

/**
 * Prefix an internal, root-relative path with the build's base path.
 * Anything that is not root-relative (mailto:, tel:, https://, #anchor) is
 * returned untouched.
 */
export function url(path: string): string {
  if (!path.startsWith('/')) return path;
  return `${PREFIX}${path}`;
}

/** Absolute URL for an internal path — for canonicals, Open Graph and JSON-LD. */
export function abs(site: URL, path: string): string {
  return new URL(url(path), site).href;
}

/**
 * Stable @id for the LocalBusiness node. Every page references the same
 * identifier so search engines merge them into one entity.
 */
export function orgId(site: URL): string {
  return `${abs(site, '/')}#business`;
}

/**
 * True when this build is the GitHub Pages preview rather than the real site.
 * Preview builds are kept out of search results entirely — a staging copy that
 * gets indexed competes with the domain it is staging for.
 */
export const isPreview = import.meta.env.PUBLIC_PREVIEW === 'true';
