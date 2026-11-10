# tanks-lp

**Hallie**: a working mock store for a women's tank top with built-in bra support, based on research into [Maggie's Tanks](https://maggies-tanks.com/). Hallie (concept A, "Soft Everyday Comfort") was chosen from six brand directions; the other five were retired and live in git history (commit `d3d8cbe`).

The store is fully clickable: homepage, shop, product page, cart, a Shopify-style checkout and an order confirmation, plus help pages. It runs in **test mode**: the cart and orders are kept in the browser only, nothing is charged, and nothing is sent to Shopify or anyone else. Every page is `noindex`.

## Pages

| URL                                                          | What                                                                                                            |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `/`                                                          | Homepage: hero, why bras stop working, value props, colours, the buy box, reviews, how it works, guarantee, FAQ |
| `/collections/all`                                           | Shop: every colour; a card opens the product page with that colour chosen                                       |
| `/products/everyday-tank`                                    | Product page: the SOP's seven sections, bundle → colour per tank → size → add to cart                           |
| `/pages/7-reasons`                                           | 7 Reasons listicle ("Brand content")                                                                            |
| `/pages/a-note-from-hallie`                                  | Advertorial: a signed letter ("Brand content")                                                                  |
| `/cart`                                                      | Cart page: lines, quantities, savings, checkout                                                                 |
| `/checkout`                                                  | Checkout: contact, US delivery address, shipping method, test-mode payment; validates every field               |
| `/checkout/thank-you?order=HL1001`                           | Order confirmation, read from the browser                                                                       |
| `/pages/faq`, `size-guide`, `shipping`, `returns`, `contact` | Help pages; the contact form validates and confirms but sends nothing                                           |
| `/gallery`, `/sop`                                           | Internal: the seven gallery slides plus video (1600 px downloads), and the product page SOP                     |

Add `/early-black-friday` or `/christmas` to any of the first five URLs for that offer (`/early-black-friday`, `/products/everyday-tank/christmas`). Pages without prices (help, cart) keep the offer you last browsed. Cart lines keep the offer they were added in, through to the order.

A dark **Test mode** strip at the top of every page switches the offer in place, links to the gallery and SOP, and has a **Flags** switch (off by default) that shows the amber tags on claims and policies we can't make yet. Checkout pages carry their own one-line test-mode notice.

Old six-concept links redirect: `/soft/...` goes to the same Hallie page and offer, and the retired concepts go to the homepage.

## Docs

- [docs/brand-concepts.md](docs/brand-concepts.md): the Hallie brand: positioning, palette, type, voice, layouts, and why it was chosen.
- [docs/competitor-analysis.md](docs/competitor-analysis.md): the competitor's page structure, customer journey, conversion elements, what we didn't copy, and the contradictions on its own pages.
- [docs/product-research.md](docs/product-research.md): product facts, variants, pricing and bundles, the claims register (verified / conflicting / unverified), sizing, and open questions before production.
- [docs/asset-manifest.md](docs/asset-manifest.md): every photo, the video and the reviews, with source URL, size, where it's used and rights flags (generated).
- [docs/pdp-template-sop.md](docs/pdp-template-sop.md): the seven-section page structure, gallery rules, copy rules, offers, advertorials and the launch checklist.

## Getting started

```bash
npm install
npm run dev -- --port 5207
```

`npm run typecheck` checks types. `npm run build` prerenders every store page (5 priced pages × 3 offers, 5 help pages, cart, checkout, confirmation, gallery, SOP).

## Where things live

- `app/content/product.ts`: facts about the tank, each with its source status (source claim, conflict, to confirm), plus photos, size guide, reviews, comparison, FAQ, shipping and the checkout's shipping method. The brand file never adds facts.
- `app/content/offers.ts`: Standard, Early Black Friday and Christmas bundles and prices, and the savings maths. Change a price here and every page, cart, checkout and order follows.
- `app/content/hallie.ts`: the brand: name, palette, fonts, voice, product page copy, offer copy, advertorial, homepage and 7 Reasons copy.
- `app/content/store.ts`: store URLs (`storePath`, `helpPath`) and price tokens in copy (`fillPrices`).
- `app/content/page.ts`: joins the brand, the facts and an offer into what a product page renders, including the gallery slides.
- `app/components/store/`: storefront chrome (test-mode strip, announcement bar, header, footer), cart drawer and line items, checkout layout and order summary, form fields.
- `app/components/pdp-template.tsx` and `app/components/sections/`: the product page's seven SOP sections.
- `app/routes/`: one file per page; `checkout.tsx` validates and places the order, `thank-you.tsx` shows it.
- `app/lib/mock-cart.tsx`: the in-browser cart (`hallie-cart`); each line keeps a colour and size per tank and its offer.
- `app/lib/orders.ts`: test-mode orders (`hallie-orders`), numbered from HL1001.
- `app/data/catalog.json`, `app/data/reviews.json`: the competitor snapshot (generated).

## Scripts

| Command                                                  | What it does                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run store:port`                                     | Snapshots the competitor's product (all 91 variants), photos, demo video and 12 curated Judge.me reviews into `app/data/` and `app/assets/store/`. Public URLs only. `-- --force` re-downloads.                                                                                                      |
| `npm run store:pack`                                     | Pulls every product (original-size images, videos), every image and video on the store's pages, all Judge.me reviews and a Shopify `products.csv` into `export/shopify-pack/` (gitignored) for uploading to the new store. Paced; `-- --force` re-downloads, `-- --skip-pages` skips the page crawl. |
| `npm run assets:manifest`                                | Regenerates `docs/asset-manifest.md` from the snapshot.                                                                                                                                                                                                                                              |
| `npm run gallery:export -- --base http://localhost:5207` | With the dev server running, saves every gallery slide as a 1600 × 1600 JPG in `public/gallery/hallie/`.                                                                                                                                                                                             |
| `npm run check -- --base http://localhost:5207`          | Clicks through the store at 1280 px and 390 px in every offer: product page, cart, the full checkout with validation and confirmation, homepage, shop, listicle, advertorial, help pages, redirects, 404 and every internal link.                                                                    |
| `npm run check:content -- --base http://localhost:5207`  | Lints page text: no fake urgency, no unsourced claims or ratings, SOP section order, provisional flags on sale prices, "Brand content" labels, flags on unconfirmed policies.                                                                                                                        |

## Rules for this repo

See [CLAUDE.md](CLAUDE.md). In short: no countdowns or scarcity, no invented specs, experts or reviews, no aggregate rating, and every unverified claim or policy flagged.

## Not cleared for production

All photos, the video and the reviews belong to the competitor and are used here only for internal evaluation. Several photos look AI-generated, and most are 1024 px. The fabric, care, shipping and sizing facts contradict each other on the source. Sale prices are provisional, shipping, refunds and payment methods are still to decide, and the Hallie name is unchecked (trademark, domain, handles). The launch checklist is in section 8 of the SOP.

## Deploy

Built for Vercel with `@vercel/react-router`; every store page is prerendered. The old-URL redirects and the gallery render route run on demand.
