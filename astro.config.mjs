// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical production origin. Drives <link rel=canonical>, Open Graph URLs,
// JSON-LD @id values and sitemap.xml — change it here and everything follows.
export const SITE = 'https://www.lakesidetowingorillia.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    sitemap({
      // The 404 page has no business in a sitemap.
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      lastmod: new Date(),
      serialize(item) {
        // Homepage and the two money pages get the highest priority; deep
        // service/area pages sit a notch below.
        if (item.url === `${SITE}/`) return { ...item, priority: 1.0, changefreq: 'weekly' };
        if (/\/(rates|contact)\/$/.test(item.url)) return { ...item, priority: 0.9 };
        if (/\/services\/[^/]+\/$/.test(item.url)) return { ...item, priority: 0.8 };
        if (/\/service-areas\/[^/]+\/$/.test(item.url)) return { ...item, priority: 0.7 };
        return { ...item, priority: 0.6 };
      },
    }),
  ],
});
