# tanks-lp

Internal proof of concept: **three brand directions for a women's tank top with built-in bra support**, based on research into [Maggie's Tanks](https://maggies-tanks.com/). Each brand has a storefront product page, a seven-slide product gallery, an advertorial, and a Standard and an Early Black Friday offer. A comparison hub at `/` puts them side by side so we can pick a direction before building the real Shopify store.

All three concepts share the same product facts, photos and prices, so the differences are branding, presentation, copy and design. Cart and checkout run in the browser only: nothing is charged and nothing is sent to Shopify. Every page is `noindex`.

| Concept | Brand (working name) | Direction                 | Product page    | Advertorial                 |
| ------- | -------------------- | ------------------------- | --------------- | --------------------------- |
| A       | Hallie               | Soft Everyday Comfort     | `/soft`         | `/soft/advertorial`         |
| B       | Oriel                | Modern Premium Essentials | `/premium`      | `/premium/advertorial`      |
| C       | Daywell              | Contemporary Comfortwear  | `/contemporary` | `/contemporary/advertorial` |

Add `/early-black-friday` to any product or advertorial URL for the Early Black Friday version (`/soft/early-black-friday`, `/soft/advertorial/early-black-friday`). Other pages:

| URL        | What                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------- |
| `/`        | Comparison hub: logos, positioning, type, palettes, previews, side-by-side copy, the shared offer |
| `/gallery` | All 21 gallery slides plus the demo video, downloadable                                           |
| `/sop`     | The product landing page SOP, rendered from [docs/pdp-template-sop.md](docs/pdp-template-sop.md)  |

A dark strip at the top of every page switches concept (A/B/C), page (product/advertorial) and offer (Standard/Early Black Friday) while keeping your place. Its **Flags** switch (off by default) shows the amber tags that mark claims we can't make yet.

## Docs

- [docs/competitor-analysis.md](docs/competitor-analysis.md): the competitor's page structure section by section, customer journey, conversion elements, what we didn't copy, and the contradictions on its own pages.
- [docs/product-research.md](docs/product-research.md): product facts, variants, pricing and bundles, the claims register (verified / conflicting / unverified), sizing, and open questions before production.
- [docs/brand-concepts.md](docs/brand-concepts.md): the three brands: rationale, palette, type, voice, layouts, hypotheses and risks.
- [docs/asset-manifest.md](docs/asset-manifest.md): every photo, the video and the reviews, with source URL, size, where it's used and rights flags (generated).
- [docs/pdp-template-sop.md](docs/pdp-template-sop.md): the seven-section page structure, gallery rules, copy rules, offers, advertorials and the launch checklist.

## Getting started

```bash
npm install
npm run dev -- --port 5207
```

`npm run typecheck` checks types. `npm run build` prerenders all 15 pages.

## Where things live

Product facts, offers and brands are kept apart:

- `app/content/product.ts`: facts about the tank, every one carrying its source status (source claim, conflict, to confirm), plus photos, size guide, reviews, comparison and FAQ. Concepts never add facts.
- `app/content/offers.ts`: Standard and Early Black Friday bundles and prices, and the savings maths. Change a price here and every page, banner and cart follows.
- `app/content/concepts/{soft,premium,contemporary}.ts`: one file per brand: name, palette, fonts, voice, layout options, product page copy, offer copy, advertorial.
- `app/content/page.ts`: joins a concept, the product facts and an offer into what a product page renders, including the gallery slides.
- `app/app.css`: theme tokens; each concept is one `[data-theme]` block, plus Early Black Friday overrides.
- `app/components/pdp-template.tsx`: the seven SOP sections in order; sections are in `app/components/sections/`.
- `app/components/gallery/slides.tsx`: the seven slide layouts and the video, in `cqw` units.
- `app/components/advertorial/advertorial.tsx`: the advertorial, in three layouts (letter, editorial, magazine).
- `app/components/store/`: storefront chrome (preview strip, announcement bar, header, footer), cart drawer and demo checkout.
- `app/lib/mock-cart.tsx`: the in-browser cart; each line keeps a colour and size per tank, the concept and the offer.
- `app/data/catalog.json`, `app/data/reviews.json`: the competitor snapshot (generated).

## Scripts

| Command                                                  | What it does                                                                                                                                                                                                                                                                      |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run store:port`                                     | Snapshots the competitor's product (all 91 variants), photos, demo video and 12 curated Judge.me reviews into `app/data/` and `app/assets/store/`. Public URLs only. `-- --force` re-downloads.                                                                                   |
| `npm run assets:manifest`                                | Regenerates `docs/asset-manifest.md` from the snapshot.                                                                                                                                                                                                                           |
| `npm run gallery:export -- --base http://localhost:5207` | With the dev server running, saves every gallery slide as a 1600 × 1600 JPG in `public/gallery/`.                                                                                                                                                                                 |
| `npm run check -- --base http://localhost:5207`          | Clicks through every page at 1280 px and 390 px: hub, gallery and lightbox, bundles and prices, colour and size selection, size gating, size guide, cart and quantity, demo checkout, FAQ, phone menu, sticky bar, advertorial links, preview strip, 404 and every internal link. |
| `npm run check:content -- --base http://localhost:5207`  | Lints page text: no fake urgency, no unsourced claims or ratings, SOP section order, provisional flags on Early Black Friday, "Brand content" on advertorials.                                                                                                                    |

## Rules for this repo

See [CLAUDE.md](CLAUDE.md). In short: no countdowns or scarcity, no invented specs, experts or reviews, no aggregate rating, and every unverified claim flagged.

## Not cleared for production

All photos, the video and the reviews belong to the competitor and are used here only for internal evaluation. Several photos look AI-generated, and most are 1024 px. The fabric, care, shipping and sizing facts contradict each other on the source. Early Black Friday prices are provisional, and the brand names are unchecked. The launch checklist is in section 8 of the SOP.

## Deploy

Built for Vercel with `@vercel/react-router`; every page is prerendered except the gallery render route used by the export script.

```bash
vercel        # preview
vercel --prod # production
```
