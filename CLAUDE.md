# tanks-lp

Kindwear: a test-mode mock store for a built-in-bra tank (homepage, shop, product page, cart, checkout, confirmation, help pages). Read README.md for the layout of the repo and docs/pdp-template-sop.md for the page rules.

## Content rules

- **No fake urgency.** No countdowns, end times, "only N left", "selling fast", stock words in option names, or invented sale deadlines.
- **No invented facts.** Product facts live in `app/content/product.ts` with their source status. The brand file (`app/content/kindwear.ts`) only words them. Don't add specs (fabric, certifications, performance, origin), experts, endorsements, studies or sales counts.
- **No aggregate rating.** The competitor's claimed 4.8/5 contradicts its own Judge.me data (3.20). Show no rating or review count until we have our own.
- **Maggie's Tanks is now licensed for Kindwear.** Its photos, copy and Judge.me reviews may go on the real Kindwear store (theme-kindwear). This mock keeps its labels as they are.
- **Reviews are verbatim and labelled.** The reviews are real Judge.me reviews of the competitor's product. Keep the exact text and the "Competitor review" flag. Don't edit, merge or invent quotes.
- **No body-result claims.** No weight loss, lift, slimming, "back bulge", or "years younger". Comparisons name construction (hooks, band, straps), not outcomes.
- **Flag what isn't ours yet.** Use the `Flag` component (`source`, `conflict`, `provisional`, `competitor-review`, `to-confirm`) for anything unverified, including policies (shipping, refunds, payment). Flags are hidden by default; the "Flags" switch in the test-mode strip shows them. Storefront pages carry no "sample", "placeholder" or "demo" wording.
- **Test mode stays honest.** Checkout takes no card details and says that nothing is charged or sent; the confirmation says the order was a test. Don't add card fields or claim an email was sent.
- **Landing pages live on the Shopify store, outside the menus.** The 7 Reasons listicle, the letter and any later ad landers are built in theme-kindwear, not here; this mock redirects their old URLs there. As on theme-flashpuff they draw no store header, menus, announcement bar or footer, and end with small print: the advertisement line, © the shop name, and the Terms, Privacy and Refund links. Never link them from a menu. `npm run check` fails if this store's menus link one or the redirects break.
- **Prices come from `app/content/offers.ts`.** In copy, use tokens like `{price:five}` rather than typing numbers.

## Checks

Run before committing UI or copy changes (the dev server must be running):

```bash
npm run typecheck
npm run check -- --base http://localhost:5207
npm run check:content -- --base http://localhost:5207
```

## Conventions

- Commit messages: imperative, sentence case, no type prefix (as in rescuaid-lp).
- Scripts run with Node's built-in TypeScript (`node scripts/x.ts`). Files they import (`app/content/offers.ts`) must not import anything at runtime that uses the `~` alias.
