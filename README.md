# Lakeside Towing & Recovery — website

Multipage marketing site for **Lakeside Towing & Recovery**, Orillia, Ontario.
Built with [Astro](https://astro.build) and output as fully pre-rendered static
HTML — every page is crawlable without JavaScript.

Live domain: `https://www.lakesidetowingorillia.com`

---

## Running it

```bash
npm install
npm run dev      # local dev server, http://localhost:4321
npm run build    # static output into dist/
npm run preview  # serve the built site
```

`dist/` is a plain folder of HTML, CSS and images. It deploys to Vercel,
Netlify, Cloudflare Pages, or any static host with no configuration.

```bash
npm run verify   # post-build checks over dist/ — run after a build
```

`verify` re-reads the built output and fails on broken internal links, missing
base-path prefixes, duplicate or over-long titles and descriptions, images
without `alt` or dimensions, invalid JSON-LD, `target="_blank"` without
`rel="noopener"`, and any page missing the footer credit. CI runs it before
every deploy.

---

## Deploying

### GitHub Pages preview

`.github/workflows/publish.yml` builds on every push to `main` and force-pushes
the finished HTML to the **`gh-pages`** branch, which Pages serves:

> **https://muskoka-boost.github.io/Lakeside-towing/**

**One-time setup** — *Settings → Pages → Build and deployment*:

| | |
|---|---|
| Source | Deploy from a branch |
| Branch | `gh-pages` — `/(root)` |

`gh-pages` holds build output only; never edit or commit to it by hand, as each
deploy replaces it entirely.

Two details this route depends on:

- **`.nojekyll`** is written into the published output. Branch deployments are
  run through Jekyll, which ignores directories beginning with an underscore —
  without that file Astro's `_astro/` folder is dropped and every stylesheet
  404s.
- It needs only `contents: write`. The `actions/deploy-pages` route was tried
  first and its deploy job was rejected outright: it requires `id-token: write`
  for OIDC, which this repository's token was not granted, and it requires the
  Pages site to already exist with `build_type=workflow`. Pushing a branch
  avoids both.

Preview builds are deliberately **not indexable** — `noindex, nofollow` on every
page and a `Disallow: /` robots.txt. A staging copy that gets indexed competes
in search with the domain it is staging for, and can outrank it.

### Production

A default `npm run build` produces the production site: root paths, canonical
URLs on `lakesidetowingorillia.com`, indexable. Point any static host at `dist/`.

Three environment variables switch between targets, and the workflow sets all
three from the Pages configuration rather than hard-coding them:

| Variable | Default (production) | Pages preview |
|---|---|---|
| `SITE_URL` | `https://www.lakesidetowingorillia.com` | `https://muskoka-boost.github.io` |
| `BASE_PATH` | `/` | `/Lakeside-towing` |
| `PUBLIC_PREVIEW` | unset | `true` |

Because Pages serves project sites from a subdirectory, **every internal path
goes through the helpers in `src/lib/paths.ts`** — `url()` for `href`/`src`,
`abs()` for absolute URLs in schema and Open Graph. Write paths in source as if
the site were at the root (`/services/`); the helper applies the base. A
hard-coded `href="/services/"` will work in production and 404 on Pages, which
is exactly what `npm run verify` catches.

When the site goes live on the real domain, nothing needs rewriting — build
without the environment variables.

---

## What changed from the old site

The previous site was a client-rendered React SPA: one URL, all content inside a
358 KB JavaScript bundle, an empty `<div id="root">` in the HTML. That is close
to the worst possible starting point for local search.

| | Before | Now |
|---|---|---|
| Indexable URLs | 1 | 20 |
| Content in HTML | none (JS-rendered) | all of it, pre-rendered |
| JavaScript shipped | 358 KB bundle | ~1 KB inline (mobile menu only) |
| `sitemap.xml` | 404 | generated on every build |
| Structured data | none | LocalBusiness, Service, FAQPage, HowTo, BreadcrumbList |
| Pricing | MTO regulated *maximum* rates + a calculator | the business's actual typical rates |

### About the pricing change

The old site published Ministry of Transportation **maximum** rate tables and an
interactive calculator built on them. Those are legal ceilings, not what the
business charges — the numbers ran far above real invoices, and the calculator
presented them as an estimate. All of it is gone.

`/rates/` now publishes the real typical rates, framed as typical rather than
fixed, with the disclaimer that a firm price is always quoted on the phone
before a truck is dispatched. Change them in one place:
`src/data/site.ts` → `rates`.

---

## Site structure

```
/                              Home
/services/                     Services hub
  /services/emergency-towing/
  /services/winch-out-recovery/
  /services/battery-boost/
  /services/lockout-service/
  /services/fuel-delivery/
  /services/vehicle-storage/
/rates/                        Typical rates + what moves the price
/service-areas/                Coverage hub
  /service-areas/orillia/
  /service-areas/gravenhurst/
  /service-areas/washago/
  /service-areas/rama/
  /service-areas/barrie/
/about/                        Story, credentials, MTO certificate
/contact/                      Phone, email, yard, what to have ready
404                            noindex
```

The eleven smaller communities (Ardtrea, Amigo Beach, Grays Bay, Cumberland
Beach and the rest) are listed on `/service-areas/` rather than given pages of
their own. Eleven near-identical pages would be thin content and would compete
with each other; one substantial hub page ranks better.

---

## Editing the site

**Almost everything lives in `src/data/site.ts`.** No templates need touching to
change business facts.

| To change | Edit |
|---|---|
| Phone, email, address, hours, Facebook | `business` |
| Rates | `rates` (and `ratesDisclaimer`) |
| A service page — copy, FAQs, steps | `services` |
| A town page — copy, landmarks, FAQs | `areas` |
| The community list | `allCommunities` |
| Homepage / contact FAQs | `generalFaqs` |
| Navigation | `nav` |

Adding a service or a town automatically creates its page, adds it to the nav,
the footer, the sitemap and the relevant schema — the routes are generated from
the data.

| To change | Edit |
|---|---|
| Colours, type, spacing | `src/styles/global.css` (`:root` tokens) |
| Page `<head>`, schema, Open Graph | `src/layouts/Layout.astro` |
| Production domain | `astro.config.mjs` → `SITE`, and `public/robots.txt` |

### Images

All in `public/media/`, referenced with relative paths — nothing is hotlinked.

| File | What it is |
|---|---|
| `hero-tow-truck.{webp,jpg}` + `-1280`, `-800` | Homepage hero, responsive sizes |
| `logo.{webp,jpg}` | Header and footer logo |
| `mto-vehicle-storage-certificate.{webp,jpg}` | Certificate shown on `/about/` |
| `og-lakeside-towing.jpg` | 1200×630 social share image |
| `recovery-snowmobile-winter.*` | Snowmobile recovery at Bay & Jarvis, Orillia |
| `tow-truck-night-hookup.*` | White wrecker hooked up after dark |

To swap the hero, replace the three `hero-tow-truck-*.webp` files (1920, 1280
and 800 px wide) plus the `.jpg` fallback, keeping the filenames.

> **The hero is not a Lakeside truck.** `hero-tow-truck.jpg` is a stock/generated
> image of a 1950s wrecker with no company branding on it. It should be replaced
> with a real photograph as soon as one of the right shape is available. The
> photographs listed below *are* the business's own.

#### Adding a photograph

Photos arrive from a phone at whatever size the camera produced. Rather than
hand-tuning each one, run:

```bash
node scripts/prepare-photo.mjs <source.jpg> <output-name> [aspect]
# e.g. node scripts/prepare-photo.mjs ~/flatbed.jpg flatbed-loading-orillia 3:2
```

That writes the four files the site serves — `.jpg` fallback, `.webp`, and
`-1280.webp` / `-800.webp` — with a centred crop, and prints the registry entry
to paste into `photos` in `src/data/site.ts`. Fill in real `alt` text describing
what is happening; it is read aloud to blind visitors and it is not optional.

Then point a page at it by adding `photo: '<output-name>'` to that service in
`services` or that town in `areas`. The `<Photo>` component handles the
responsive markup, the caption and the lazy loading; the JSON-LD for the page
picks the image up automatically. A page with no `photo` key simply renders
without one, so photos can be added a few at a time.

Where they are used today:

| Page | Photo |
|---|---|
| `/services/emergency-towing/` | `tow-truck-night-hookup` |
| `/services/winch-out-recovery/` | `recovery-snowmobile-winter` |
| `/service-areas/orillia/` | `recovery-snowmobile-winter` |

The remaining service and area pages have no photograph yet and are the obvious
homes for the next batch — a flatbed loading, a boost or lockout in progress,
the storage yard, and the trucks in Rama, Washago, Gravenhurst or Barrie.

---

## SEO

Applied throughout rather than bolted on:

- **Unique `<title>` (≤60 chars) and meta description (130–160 chars) per page**,
  verified at build time against SERP truncation limits.
- **Canonical URL** on every page; `trailingSlash: 'always'` so there is exactly
  one valid form of each URL.
- **JSON-LD `@graph`** — `LocalBusiness`/`AutomotiveBusiness` with NAP, geo,
  24/7 opening hours, `areaServed` for all 16 communities and an `OfferCatalog`;
  plus `Service` + `FAQPage` + `HowTo` on service pages, `Service` + `FAQPage`
  on town pages, `OfferCatalog` on rates, and `BreadcrumbList` everywhere below
  the homepage.
- **`sitemap-index.xml`** generated at build with per-section priorities;
  `robots.txt` points at it.
- **Open Graph and Twitter cards** with a real 1200×630 image.
- **Local signals** — `geo.region`, `geo.placename`, `geo.position`, `ICBM`,
  `en-CA` locale, NAP repeated consistently in the footer and in schema.
- **Internal linking** — services ↔ towns ↔ rates cross-link in the body, the
  sidebars and the footer, so no page is more than two clicks from any other.
- **Semantic HTML** — one `<h1>` per page, no skipped heading levels,
  breadcrumbs, real `<table>` markup for rates, `<details>` for FAQs (which
  keeps the answers in the DOM for crawlers).

## Accessibility & performance

Verified with an automated pass over every page:

- **WCAG AA contrast** on all text, at every size, including text over the navy
  and red gradients.
- **No horizontal overflow** at 375 px, 768 px or 1440 px.
- Descriptive `alt` on every image; explicit `width`/`height` to prevent layout
  shift; `loading="lazy"` below the fold.
- Skip link, visible focus rings, `aria-current` on the active nav item,
  keyboard- and Escape-operable mobile drawer, `prefers-reduced-motion` honoured.
- ~1 KB of JavaScript total. Fonts load non-blocking with system fallbacks.
- Whole site, images included: about 2.5 MB.

---

Created by [Muskoka Digital Boost](https://muskokadigitalboost.ca)
