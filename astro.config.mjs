// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Two deployment targets share this config:
 *
 *   Production   — the real domain, served from the root.
 *   Pages preview — https://muskoka-boost.github.io/Lakeside-towing/, served
 *                   from a subdirectory, with indexing switched off.
 *
 * The workflow in .github/workflows/deploy-pages.yml sets SITE_URL, BASE_PATH
 * and PUBLIC_PREVIEW. With none of them set, `npm run build` produces the
 * production site — so the default behaviour is always the real one.
 */
export const SITE = process.env.SITE_URL || 'https://www.lakesidetowingorillia.com';
const BASE = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      // The 404 page has no business in a sitemap.
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      lastmod: new Date(),
      serialize(item) {
        // Match on the path so these rules hold whatever base is in use.
        const path = new URL(item.url).pathname.replace(BASE.replace(/\/+$/, ''), '') || '/';
        if (path === '/') return { ...item, priority: 1.0, changefreq: 'weekly' };
        if (/^\/(rates|contact)\/$/.test(path)) return { ...item, priority: 0.9 };
        if (/^\/services\/[^/]+\/$/.test(path)) return { ...item, priority: 0.8 };
        if (/^\/service-areas\/[^/]+\/$/.test(path)) return { ...item, priority: 0.7 };
        return { ...item, priority: 0.6 };
      },
    }),
  ],
});
