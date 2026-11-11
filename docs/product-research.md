# Product research

What we know about the product, where each fact comes from, and what has to be confirmed before a real store. The shared product data lives in `app/content/product.ts` and `app/content/offers.ts`; the brand file (`app/content/kindwear.ts`) adds words, never facts.

## The product

A women's tank top with built-in bra support, sold as the "Built-in Bra Comfort Tank" by [Maggie's Tanks](https://maggies-tanks.com/products/maggies-built-in-comfort-bra-tanktop).

- **Construction** (from photos and source copy): a fitted tank with soft cups inside the front panel, wide shoulder straps, no underwire, no hooks or clasps, no separate band, and a long body cut to tuck in. One photo ("Removable cup detail") shows a cup being lifted out of the front panel.
- **Positioning:** everyday comfort without bra straps, underwire, hooks or a tight band; smooth under clothes; replaces a bra for ordinary days.
- **Colours (13):** Nude, Coffee, Black, Khaki, Red Wine, Blush Pink, Grey, White, Pastel Pink, Pastel Yellow, Pastel Purple, Pastel Blue, Navy Blue. Each has its own photo, on a mannequin or AI-looking.
- **Sizes (7):** S, M, L, XL, 2XL, 3XL, 4XL.
- **Variants:** 91 (13 × 7), SKUs `QL1077-{Colour}-{Size}`. Some SKU codes don't match the names (Khaki = Green, Red Wine = Red, Blush Pink = Beanpaste), which hints at a supplier catalogue. Only Pastel Purple / M was sold out at snapshot. Variant weight is listed as 5 lb, almost certainly a placeholder.
- **Other products in the store** (not in scope): cotton built-in bra tank (all sold out), long-sleeve version, leakproof briefs, shaping brief, compression socks, collagen gummies.

## Pricing and bundles

| Bundle  | Competitor price | Per tank | Shown as                        | Our Standard offer | Our Early Black Friday (provisional) |
| ------- | ---------------- | -------- | ------------------------------- | ------------------ | ------------------------------------ |
| 1 tank  | $34.95           | $34.95   | "Buy 1 · Free Shipping"         | $34.95             | $29.95                               |
| 3 tanks | $69.90           | $23.30   | "Buy 2 Get 1 Free", ~~$104.85~~ | $69.90             | $59.95 ($19.98 each)                 |
| 5 tanks | $104.85          | $20.97   | "Buy 3 Get 2 Free", ~~$174.75~~ | $104.85            | $79.95 ($15.99 each)                 |

- Every variant is $34.95. Most have a $84.95 compare-at price (the basis of "Save 70%"), but many don't (all Nude, Grey, the pastels, Navy, several 4XL). We **don't** show $84.95 anywhere: Standard savings are worked out against buying single tanks at $34.95.
- Early Black Friday prices are **our provisional test numbers**, set to see how each brand presents a discount. They are flagged "Provisional price" on every page and in the cart. Change them in `app/content/offers.ts`.
- The competitor adds a free leakproof brief ($24.95 shown struck through) and pushes a collagen subscription in the buy box. Not included here.

## Claims register

Status: **source** = the competitor says it, unverified · **conflict** = the competitor's pages disagree · **to confirm** = a policy we'd have to set · **not used** = left off our pages.

| Claim (competitor's words or close)                                        | Where                       | Status                                           | On our pages                                           |
| -------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| No underwire, no hooks, no clasps, no band                                 | Product page, homepage      | source (visible in photos)                       | Yes, as construction                                   |
| Wide, soft straps that sit flat                                            | Infographic image, homepage | source                                           | Yes                                                    |
| Long enough to tuck into high-waisted bottoms                              | Bullets                     | source                                           | Yes                                                    |
| Smooth under clothes / no bra lines                                        | Bullets, comparison         | source                                           | Yes, softened ("one smooth layer"); comparison flagged |
| "No back bulge"                                                            | Bullets, before/afters      | not used                                         | No: body-result claim                                  |
| "Have you lost weight?", "look ten years younger", "lift"                  | Hero, reviews               | not used                                         | No                                                     |
| "Works like shapewear"                                                     | Bullets                     | not used                                         | No (Oriel says "it is not shapewear")                  |
| "Padding that actually stays, tested through every wash"                   | Bullets, FAQ                | source                                           | FAQ only, flagged; no "tested" claim                   |
| "Holds a full D+"                                                          | "How it works" layers       | not used                                         | No                                                     |
| Fabric 80% nylon / 20% spandex                                             | Homepage FAQ                | conflict                                         | "Nylon and spandex knit, blend to confirm", flagged    |
| Fabric 68% nylon / 32% spandex                                             | Product page FAQ            | conflict                                         | As above                                               |
| "Double lined", "breathable, stays cool even in summer"                    | Mobile bullets              | source                                           | "Breathable" only in the flagged comparison            |
| Care: machine wash cold, tumble dry low                                    | Homepage FAQ                | conflict                                         | Common ground only: cold, gentle, lay flat; flagged    |
| Care: mesh bag, avoid dryer and softener                                   | FAQ page                    | conflict                                         | As above                                               |
| 4.8/5 from 100,000+ happy customers                                        | Homepage, product page      | contradicted (Judge.me: 3.20 / 10,795)           | No rating or count anywhere                            |
| "#1 Bestseller of 2026"                                                    | Product page                | not used                                         | No                                                     |
| "Designed in the USA"                                                      | Marquee, footer             | not used                                         | No                                                     |
| Premium fabric                                                             | Marquee                     | not used                                         | No                                                     |
| 90-Day Perfect Fit Guarantee: one free replacement size, keep the original | FAQ, policy pages           | to confirm                                       | Yes, worded exactly to that, flagged                   |
| Sizing refunds "generally not offered"                                     | Refund policy               | to confirm                                       | Not stated; noted here                                 |
| Free shipping on every bundle                                              | Buy box                     | conflict (shipping page: calculated at checkout) | Yes, flagged                                           |
| Ships by tomorrow                                                          | Under the button            | not used                                         | No                                                     |
| Processing 2–3 / 2–5 business days, delivery ~7 business days              | FAQ / shipping page         | conflict                                         | Longer range, flagged                                  |
| Founder "Maggie, 67"                                                       | Product page                | not used                                         | No (not on the About page)                             |
| Comparison table scores                                                    | Homepage                    | source                                           | Trimmed table without scores, flagged                  |
| Certifications (OEKO-TEX etc.)                                             | none found                  | n/a                                              | No                                                     |
| Country of manufacture                                                     | none found                  | n/a                                              | No                                                     |

## Sizing

The size finder on the product page (its code was updated on 7 Nov 2026 using exchange data, per comments in the page source) uses bust measured over a bra:

| Size | Bust       | Weight (finder) |
| ---- | ---------- | --------------- |
| S    | under 34″  | under 115 lb    |
| M    | 34–35.9″   | 115–137 lb      |
| L    | 36–37.9″   | 138–153 lb      |
| XL   | 38–40.4″   | 154–179 lb      |
| 2XL  | 40.5–43.4″ | 180–205 lb      |
| 3XL  | 43.5–45.4″ | 206–229 lb      |
| 4XL  | 45.5″+     | 230 lb+         |

The store's size-chart image gives different, cup-based ranges and says "4XL is coming". The finder's code comments say most exchange requests come from people just over a boundary. Fit is the main risk: it's the top complaint in reviews.

## Reviews

See [competitor-analysis.md](competitor-analysis.md#reviews-in-detail). Summary: 10,795 Judge.me reviews averaging 3.20; recent reviews overwhelmingly 5★. Twelve verbatim reviews are used as flagged placeholders.

## Outstanding questions before production

1. **Supplier and spec:** who makes it, the real fabric blend, weight, lining and cup construction (removable or sewn in), wash testing, country of origin, and any certifications.
2. **Fit:** our own size chart from samples. The competitor's bust boundaries changed a week ago and its reviews show cups too small or sitting low, and riding up on long torsos.
3. **Quality:** reviews mention raw, unhemmed edges. Inspect samples before choosing a supplier.
4. **Photography:** every image is the competitor's and several are AI-generated. We need our own shoot (1600 px+, square crops, in the 13 colours or a reduced range), plus our own demo clip.
5. **Reviews:** a review app and a plan to gather real reviews; no placeholders at launch.
6. **Policies:** guarantee terms (free exchange? refunds?), shipping cost and times, returns address, carrier.
7. **Pricing:** confirm Standard pricing and margins at $20.97 a tank (5-pack); set the real Black Friday discount and dates.
8. **Colour range:** 13 colours × 7 sizes is 91 SKUs. Consider launching with fewer. "Pastel Blue" photographs as royal blue.
9. **Brand:** trademark and domain checks for the chosen name (Kindwear, Oriel and Daywell are working names).
10. **Legal:** clear any copy that came from research; nothing on these pages is copied, but the comparison table structure and the FAQ topics are derived from the competitor.
