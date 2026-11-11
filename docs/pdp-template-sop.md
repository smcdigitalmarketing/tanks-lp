# Product Landing Page SOP

Every product landing page we build uses one seven-section structure, so we can launch pages fast and test one idea at a time. It follows Arsh Sanwarwala's framework in [How To Build a Product Page SO Premium They Beg You To Buy](https://www.youtube.com/watch?v=ngXi-No3s2o), as first written up for the [RescUAid concepts](https://rescuaid-lp.vercel.app/sop). This copy is adapted for the Hallie built-in bra tank store in this repo, and adds rules for offers, advertorials and honest proof.

The video defines a premium page as one people want to buy from, and that comes down to trust. Four things build it:

- **Psychology**: what moves people to act.
- **Messaging**: specific, vivid copy that makes the result feel certain.
- **Strategic design**: every section has one job.
- **Structure**: sections in an order that makes buying feel obvious.

Good design alone does not rescue a page whose benefits are buried.

## 1. The structure

Every page has these seven sections, in this order. A page can change the copy, imagery, look and offer emphasis, but never the order.

| #   | Section          | Its job                                                  | Rules                                                                                                                                                                                                                                                                                                                            |
| --- | ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Above the fold   | Sell someone who only looks at the gallery and the title | The seven-image gallery tells the whole story (section 2). Then a short kicker line, a title that stacks the product name with its benefit, a subheadline, the price with "You save $X", and 3–4 icon bullets                                                                                                                    |
| 2   | Buy box          | Make choosing effortless                                 | Numbered steps ("Step 1: Choose your bundle"). Every option visible, no dropdowns. Each bundle shows the total, the struck-through price, the dollar saving and the per-item price. For apparel: a colour per item as swatches, then size as buttons, **never preselected**; the button asks for a size until every item has one |
| 3   | Under the button | Remove the last doubts where friction is highest         | Shipping, the guarantee spelled out (what it is and how to claim it), one short real review. No payment badges. No urgency unless it is true (a real end date)                                                                                                                                                                   |
| 4   | Details          | Make sure the main selling point gets read               | Accordions get 1–2% engagement, so the first one is open and holds "why you'll love it". Then size and fit, care. Then an auto-scrolling lifestyle strip                                                                                                                                                                         |
| 5   | Social proof     | Build trust at scale                                     | A wall of reviews shown up front, never in a carousel. Each review shows its source and name, and a photo when there is one                                                                                                                                                                                                      |
| 6   | Value props      | Explain every reason to buy                              | The headline carries the benefit; the body explains how; the image backs up the claim. Then how it works and a comparison table                                                                                                                                                                                                  |
| 7   | Closing          | Close the remaining doubts                               | Guarantee, then the FAQ, then a final call to action, then the footer. A sticky add-to-cart bar appears once the shopper scrolls past the main button                                                                                                                                                                            |

In the code, the order lives in `app/components/pdp-template.tsx` (each section carries `data-sop-section`) and the sections in `app/components/sections/`. `npm run check:content` fails if the order changes.

## 2. Gallery: seven images, in this order

Build the gallery as if no one will read anything else on the page. It is the most-clicked element on a product page.

| #   | Image           | What it shows                                              | In this repo                                                                                    |
| --- | --------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 1   | Main benefit    | A big benefit headline over the product being worn         | "The bra, built into your favourite tank" (Hallie)                                              |
| 2   | Lifestyle       | The product worn in a real setting, with a benefit overlay | Mirror shot, "One soft layer instead of two"                                                    |
| 3   | Vs the old way  | The product against what it replaces                       | A traditional bra and the tank, from behind, labelled by **construction** (hooks, band, straps) |
| 4   | What's included | The product and its details, labelled                      | Built-in cups, wide straps, longer length                                                       |
| 5   | How it works    | 3–4 visual steps                                           | Pull on, tuck in, go                                                                            |
| 6   | Vs alternatives | Our product against the alternatives, row by row           | Bra, shelf tank, bralette                                                                       |
| 7   | Review          | A screenshot-style review with a real quote and photo      | A Judge.me review, labelled as a placeholder                                                    |

Image rules:

- **Square, 1600 × 1600**, with text readable on a 375 px phone screen. Layout uses `cqw` units, so one design serves the tile, the lightbox and the export.
- **Photos carry no words.** All text is laid over the photo by the page, so copy stays sharp and editable. Images with text baked in are not used.
- **No fabricated before and after.** A comparison names what is different about the products (hooks, band, straps), not what happens to a body. No weight-loss, lift or "years younger" implications.
- **Reviews are real.** The customer's exact words, name and photo, with the source shown. Someone else's reviews are labelled as such.

After the seven images, a short silent **demo video** loops as the eighth item. It never replaces one of the seven.

`npm run gallery:export -- --base <dev server URL>` saves every slide as a 1600 × 1600 JPG in `public/gallery/hallie/`; `/gallery` lists them for download.

## 3. Copy rules

Most shoppers read only the headlines, so each headline has to carry the benefit on its own.

| Rule                              | Write                                                          | Not                            |
| --------------------------------- | -------------------------------------------------------------- | ------------------------------ |
| Stack the benefit into the title  | Hallie Everyday Tank: Gentle support, with no bra to fuss with | Built-in Bra Tank Top          |
| Be specific and vivid             | No band digging in by lunchtime                                | All-day comfort                |
| Name the moment, not the category | You walk through the door and reach for the hooks              | Bras can be uncomfortable      |
| One fluent sentence per idea      | Pull it on over your head; the support is already inside       | Easy. Comfortable. Supportive. |
| Say the saving in dollars         | You save $34.95 · $23.30 each                                  | Save 33%                       |

Three more rules apply everywhere:

- **Proof needs a source.** Show where each review was left. No bare "As seen on" logos, no ratings or customer counts you can't show the data for.
- **No new claims.** Every fact on a page comes from `app/content/product.ts`, where each one carries its status. A claim without a source stays off the page, or carries a flag, until it has one.
- **No fake urgency.** No countdowns that reset, no "only 3 left", no stock words, no "selling fast". `npm run check:content` fails on them.

## 4. Offers

Every page presents the offers from `app/content/offers.ts`:

- **Standard**: the everyday bundle prices. Savings are measured against buying single items, never against an invented compare-at price.
- **Early Black Friday** and **Christmas** (or any sale): its own URL (`/products/everyday-tank/early-black-friday`), its own announcement bar, an offer block above the buy box, and the struck-through Standard price beside the sale price. While prices are not final, they carry a "Provisional price" flag everywhere, including the cart and checkout. No end date unless there is a real one.

Offer copy uses price tokens (`{price:five}`, `{each:trio}`, `{save:single}`) so banners can never disagree with the buy box.

## 5. Advertorials

The advertorial is at `/pages/a-note-from-hallie` (and a version per offer). Its job is to warm up cold traffic before the product page.

1. **Headline**: an editorial angle, not a product name.
2. **Relatable problem**: the customer's own pain point, in their words (taken from research, rewritten).
3. **The product idea**: what it is and how it differs, with photos.
4. **Product card** after the second section.
5. **Honest comparison** with what the reader uses now.
6. **Objections** answered from the FAQ and size guide, including the uncomfortable ones (riding up, not for sport).
7. **Hand-off**: the offer with real prices from `offers.ts`, and buttons to the product page, keeping the offer.

Labelled **"Brand content"**. No invented journalists, experts, studies or testimonials; quotes are real reviews with their source.

### Homepage and 7 Reasons

Two more page types share the advertorial's rules (no invented people, studies or testimonials; real reviews with their source; no urgency):

- **Homepage** (`/`): promise → why bras stop working (design, not body) → value props → colours → the product page's buy box → reviews → how it works → comparison → guarantee → FAQ → close. Christmas adds a three-point gifting section.
- **7 Reasons** (`/pages/7-reasons`): an editorial listicle, labelled "Brand content" and signed by the brand. Seven reasons, each a construction fact from `product.ts`; a button after reasons 2, 4 and 6; one real review; the offer from `offers.ts`. The Early Black Friday version is the lead; Christmas swaps reasons 3 and 7 for gifting ones (sizing for someone else, the size swap).

### Landing pages stay out of the menus

The advertorial, the 7 Reasons listicle and any later ad landers are landing pages: traffic reaches them from ads, with UTMs. They are never linked from the store's header, phone menu or footer, in the mock store or in a Shopify theme or menu built from it. A shopper browsing the store doesn't need an ad's warm-up, and a menu link mixes organic visits into the page's numbers (section 7). In the mock store the test-mode strip links them for reviewers, and `npm run check` fails if a menu links one.

## 6. The rest of the store

The store around the landing pages follows the same rules: facts from `product.ts`, prices from `offers.ts`, and a flag on anything we haven't decided.

- **Shop** (`/collections/all`): every colour; a card opens the product page with that colour chosen for every tank.
- **Cart** (`/cart`) and **checkout** (`/checkout`): Shopify's one-page layout (contact, delivery, shipping method, payment, order summary). Every required field is validated with the error under the field, and focus moves to the first one. Cart lines keep their offer through to the order.
- **Test mode:** no card fields, nothing charged or sent. The checkout and the confirmation say so in plain words; orders are saved in the browser and numbered from HL1001.
- **Help pages** (`/pages/faq`, `size-guide`, `shipping`, `returns`, `contact`): built only from `product.ts`. Shipping cost, refunds, payment methods, tracking emails and support hours carry a "To confirm" flag until they are decided.

## 7. Measuring which page wins

- **One page per URL**, one page per ad set, with UTMs.
- **Tag every order.** The Shopify build sets cart attributes `pdp_variant` and `offer`; the test-mode checkout and its orders record both.
- **Compare like with like.** Conversion rate and average order value per page, over the same dates and traffic. Change one page at a time.

## 8. Launch checklist (built-in bra tank)

None of these pages should take real traffic until every item is settled. Details are in [product-research.md](product-research.md) and [asset-manifest.md](asset-manifest.md).

**Product and claims**

- [ ] Fabric blend, care instructions and construction (removable or sewn-in cups) confirmed from our own supplier and samples.
- [ ] Our own size chart from fitted samples; the competitor's ranges conflict and fit is its top complaint.
- [ ] Every "Source claim" and "Source conflict" flag resolved or the claim removed.

**Proof and media**

- [ ] Our own photography and demo video at 1600 px or more; no competitor or AI-looking images.
- [ ] A review app with our own reviews; no competitor reviews or photos at launch.
- [ ] No aggregate rating until we have one.

**Offer and policy**

- [ ] Guarantee terms decided (exchange only, or refunds too) and matched across the pages and the policy.
- [ ] Shipping cost and times decided; "Free shipping" only if true at checkout.
- [ ] Early Black Friday prices and dates final; remove the "Provisional price" flags.
- [ ] Bundle discounts applied at checkout (a bundle app or discount functions).

**Brand**

- [ ] Trademark, domain and social handles cleared for the chosen name.
- [ ] Support email, hours and address real.
