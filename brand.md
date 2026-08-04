# Lakeside Towing & Recovery — Brand Sheet

Derived from the business's own logo, existing website (lakesidetowingorillia.com), and
Facebook presence. Written before any code, per the local-business-site workflow.

## The business

| | |
|---|---|
| Name | Lakeside Towing & Recovery |
| Tagline | *"We Meet by Accident!"* (on the truck signage — keep it, it's genuinely theirs) |
| Phone | (249) 385-5240 → `tel:+12493855240` |
| Billing email | Billing.lakesidetowing@gmail.com |
| Address | 123 Norweld Dr, Orillia, ON L3V 7Z2 |
| Hours | 24/7, 365 |
| Credentials | OPP Approved · MTO Vehicle Storage Certificate **VS-212-186-623** · Licensed & insured |
| Facebook | facebook.com/people/Lakeside-Towing-and-Recovery/61557754504369 |

## Palette

Sampled directly from the logo artwork with Pillow — these are the business's actual colours,
not an interpretation.

| Token | Hex | Where it came from | Use |
|---|---|---|---|
| `--navy` | `#0D3B91` | logo background field | primary surfaces, headers, footer |
| `--navy-deep` | `#06246A` | shadowed logo edge | gradient floors, dark sections |
| `--navy-bright` | `#1552BF` | mid-tone | hover states, links on light |
| `--sky` | `#9CC2FF` | logo lettering | accent text on navy, dividers |
| `--red` | `#D81F26` | tow truck + script tagline | CTAs, urgency, phone buttons |
| `--red-deep` | `#A8121A` | truck shadow | gradient partner, hover |
| `--ink` | `#101828` | — | body text |
| `--paper` | `#F7F9FC` | — | page background |

Red is reserved for *action* — call buttons and emergency cues. Navy carries everything
structural. That's the same split the truck signage uses, so the site reads as an extension
of the vehicle a customer just saw on the highway.

## Typography

The logo is a wide, squared-off industrial face. Matching it:

- **Display:** `Barlow Condensed`, 600/700, uppercase, wide letter-spacing — headings and
  buttons. Condensed-industrial reads "trades", matches the squared logo letterforms, and
  lets long headlines like "24 Hour Emergency Towing in Orillia" fit on one line at 375px.
- **Body:** `Inter`, 400/500/600 — service copy, rates tables, FAQs. Neutral, high legibility
  at small sizes, excellent number rendering for the rates page.

Two families, four weights total. Self-hosted-friendly via Google Fonts with `display=swap`.

## Voice

**Calm, direct, local, no upsell.** Someone reading this page is standing on a shoulder of
Highway 11 in the dark. Short sentences. Plain nouns. Say what happens next and what it costs.
Never "leverage", never "solutions", never an exclamation mark that isn't in the tagline.

Sample of the register we're aiming for:
> "Call and tell us where you are. We'll give you a price before the truck rolls, and we'll
> tell you roughly how long it'll be. If we can't help, we'll say so."

## Treatment language

- **High contrast, low decoration.** Navy blocks, white cards, one red action per screen.
- **No stock photography.** The business has three real assets (logo, hero truck, MTO
  certificate). Rather than padding with generic stock — which the skill caps and which
  makes trades sites look fake — the design leans on typographic structure, iconography
  drawn inline as SVG, and colour blocking. Zero stock images used.
- **Numbers are the hero.** Phone number, response areas, rates. These get size and weight.
- **Every screen ends in a phone number.** Sticky mobile call bar, footer CTA on all pages.

## What the rebuild fixes

Problems with the current site, addressed deliberately:

1. **Client-rendered SPA** — a single `<div id="root">` with all content in a 358 KB JS
   bundle. Crawlers get an empty shell; there is one URL for the whole business.
   → Static pre-rendered HTML, 20 crawlable URLs, JS only for the mobile nav.
2. **No sitemap.xml** (returns 404) and a `robots.txt` with nothing to point at.
   → Generated sitemap, robots.txt referencing it.
3. **One page = one keyword target.** No way to rank for "flatbed towing Gravenhurst" or
   "car lockout Orillia" when everything lives at `/`.
   → Service pages and town pages, each with its own title, description and schema.
4. **MTO maximum-rate tables and a cost calculator** that quoted regulated ceiling prices —
   numbers far above what the business actually charges, on a page that read as the price list.
   → Replaced with the real typical rates, framed as typical and confirmed on the call.
5. **No structured data.** No LocalBusiness, no Service, no FAQ markup.
   → JSON-LD on every page.
