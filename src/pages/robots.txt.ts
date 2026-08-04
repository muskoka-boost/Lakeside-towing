import type { APIRoute } from 'astro';
import { abs, isPreview } from '../lib/paths';

/**
 * Generated rather than static so the two deployment targets get different
 * files. The GitHub Pages preview must not be crawled — an indexed staging
 * copy competes with the domain it is staging for.
 */
export const GET: APIRoute = ({ site }) => {
  const body = isPreview
    ? [
        '# Preview build — not the live site.',
        '# https://www.lakesidetowingorillia.com is the real one.',
        '',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n')
    : [
        '# Lakeside Towing & Recovery',
        '# Everything on this site is public marketing content. Crawl it all.',
        '',
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${abs(site!, '/sitemap-index.xml')}`,
        '',
      ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
