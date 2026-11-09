# tanks-lp

Three brand concepts for a built-in-bra tank, on one seven-section product page template. Read README.md for the layout of the repo and docs/pdp-template-sop.md for the page rules.

## Content rules

- **No fake urgency.** No countdowns, end times, "only N left", "selling fast", stock words in option names, or invented sale deadlines.
- **No invented facts.** Product facts live in `app/content/product.ts` with their source status. Concept files only word them. Don't add specs (fabric, certifications, performance, origin), experts, endorsements, studies or sales counts.
- **No aggregate rating.** The competitor's claimed 4.8/5 contradicts its own Judge.me data (3.20). Show no rating or review count until we have our own.
- **Reviews are verbatim and labelled.** The reviews are real Judge.me reviews of the competitor's product. Keep the exact text and the "Competitor review" flag. Don't edit, merge or invent quotes.
- **No body-result claims.** No weight loss, lift, slimming, "back bulge", or "years younger". Comparisons name construction (hooks, band, straps), not outcomes.
- **Flag what isn't ours yet.** Use the `Flag` component (`source`, `conflict`, `provisional`, `competitor-review`, `to-confirm`) for anything unverified.
- **Same facts, photos and prices for every concept.** Brands differ only in words, type, colour and layout.
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
