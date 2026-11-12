# Brand: Kindwear

Kindwear is the chosen brand for the built-in bra tank. Until 12 Nov 2026 it was called Hallie; the name changed and the look, voice and copy stayed. It was concept A ("Soft Everyday Comfort") of six directions tested on the same product page; the other five (Oriel, Daywell, Juno, Linnea, Mabel & Co.) were retired and can be found in git history at commit `d3d8cbe`.

The name is a **working name**: no trademark, domain or social-handle check yet (kindwear.com is taken).

| | |
| --- | --- |
| Product name | Everyday Tank |
| Tagline | Getting dressed, made easier. |
| Headings | DM Serif Display |
| Body | DM Sans |
| Shape | 18 px cards, pill buttons, a soft wave between sections |
| Hero | Gallery left, title right |
| Bundle picker | Stacked cards with thumbnails |
| Reviews | Soft tilted paper notes |
| Value props | Three photo cards |
| Landing pages | The 7 Reasons listicle and a signed letter ("A note from Kindwear"), on the Shopify store only (theme-kindwear) |

The brand lives in `app/content/kindwear.ts` (words) and the `[data-theme="soft"]` block in `app/app.css` (look).

## Kindwear: Soft Everyday Comfort

**Feeling:** a comfortable everyday essential that makes getting dressed easier.
**Positioning:** for women who are done with hooks and digging straps, sold with warmth and reassurance rather than hype.
**Hypothesis:** reassurance sells to a cautious, older buyer (the competitor's actual audience): a warm voice, visible sizing help and a gentle fit guarantee convert better than urgency.

| Colour     | Hex       | Use                 |
| ---------- | --------- | ------------------- |
| Cream      | `#FBF6EF` | Page background     |
| Muted rose | `#B4677A` | Buttons, accents    |
| Blush      | `#F5E2DE` | Savings, highlights |
| Oat        | `#F3E9DF` | Alternate sections  |
| Cocoa      | `#3B2F2C` | Text, footer        |

**Wordmark:** lowercase "kindwear" in DM Serif Display with a rose full stop.

**Logo on the Shopify store (12 Nov 2026):** the store's mark is the same idea drawn in the theme's Lora 600: "kindwear." with tighter letter-spacing and a dusty rose (`#8E5466`) full stop, a "k." monogram for the favicon and square icon, and a 1200 × 630 share card with the tagline. It was picked from three directions (refined serif, soft sans, neckline line). The SVG masters and rendered PNGs live in theme-kindwear (`setup/brand/`, `setup/render-brand.ts`); this mock uses the same favicon and iPhone icon (`public/`).
**Voice:** warm, personal, plain-spoken. Second person, short sentences, the small details of an ordinary day; never gushing.

> "A soft tank with the support already inside. Pull it on in the morning and get on with your day: no hooks to reach for, no wire, no band digging in by lunchtime."

**Early Black Friday:** "Stock up on your everyday tank, a little early." The bar turns dark cocoa with blush text; the 5-pack leads.
**Why it might win:** closest to the buyer the competitor already converts, but without the fake urgency, so it's the safest bet on trust.
**Risk:** can read as "nice" rather than distinctive; rose and cream are common in the category.

**Why it was chosen:** it is closest to the buyer the competitor already converts (cautious, mostly 50+), with reassurance doing the work the competitor leaves to fake urgency.

## Rules that carry over from the concept test

- Facts, FAQ answers, size guide, comparison rows, guarantee wording and review quotes come from `app/content/product.ts`; the brand only words them.
- Prices, bundles and savings maths come from `app/content/offers.ts`.
- Section order follows the SOP's seven sections; the gallery follows the brief's seven slides plus the demo.
- No aggregate rating, no countdowns, no stock or scarcity copy, and every unverified claim or policy flagged.
