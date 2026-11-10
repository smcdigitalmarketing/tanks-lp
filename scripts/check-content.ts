/**
 * Lints what the pages actually say. Fetches every page from a running
 * server, strips it to visible text and fails on fake urgency, unsourced
 * claims, missing labels or a broken section order.
 *
 *   npm run dev                                                # one terminal
 *   npm run check:content -- --base http://localhost:5207      # another
 *
 * Ported from storefront-heel-sleeve's check-content.mjs, with this product's
 * claim words.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { UNIT_PRICE, offers } from "../app/content/offers.ts";

const { values: args } = parseArgs({
  options: {
    base: {
      type: "string",
      default: process.env.CHECK_BASE_URL ?? "http://localhost:5207",
    },
  },
});
const BASE = args.base!.replace(/\/$/, "");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const CONCEPTS = ["soft", "premium", "contemporary"];
const SOP_ORDER = [
  "above-the-fold",
  "buy-box",
  "under-the-button",
  "details",
  "social-proof",
  "value-props",
  "closing",
];

/** Fake urgency and scarcity: never allowed. */
const BANNED: [RegExp, string][] = [
  [
    /count ?down|ends (tonight|today|in \d)|offer ends|hrs\s*\d+\s*min/i,
    "countdown / deadline",
  ],
  [
    /only \d+ left|low stock|selling (out )?fast|running low|limited stock|almost gone|while stocks last/i,
    "stock scarcity",
  ],
  [/\bhurry\b|last chance|don['’]t miss out|act now/i, "pressure"],
  [
    /\b\d[\d,]* (sold|happy customers|women have)\b|100,000\+?/i,
    "unverifiable sales count",
  ],
  [
    /(doctor|expert|dermatologist|physio\w*)[- ]recommended|endorsed by|as seen (on|in)|clinically/i,
    "endorsement",
  ],
];

/** Claims the source makes that we can't make yet. */
const CLAIMS: [RegExp, string][] = [
  [/\b\d{2}\s?% (premium )?(nylon|spandex|cotton)/i, "fabric composition"],
  [/\bfull D\+|holds a (full )?[A-H]+\+/i, "support level"],
  [
    /lost weight|look(s)? (ten years )?younger|slimm(ing|er)|tummy control|back bulge/i,
    "body-result claim",
  ],
  [
    /designed in the usa|made in (the )?usa|oeko|certified/i,
    "origin / certification",
  ],
  [/\b[0-5]\.\d ?(\/ ?5|out of 5|stars)/i, "aggregate rating"],
  [/maggie/i, "competitor name"],
];

/** A sentence that denies the thing ("It is not shapewear") is fine. */
const NEGATION = /\b(no|not|never|isn['’]t|without|nothing)\b/i;

const toText = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");

let failures = 0;
const fail = (msg: string) => {
  failures++;
  console.log(`  ✗ ${msg}`);
};

/** Text written by us, not quoted from reviews (quotes are shown verbatim and flagged). */
function ownText(html: string) {
  return toText(html.replace(/<blockquote[\s\S]*?<\/blockquote>/gi, " "));
}

async function page(path: string) {
  const res = await fetch(BASE + path);
  if (res.status !== 200) fail(`${path} returned ${res.status}`);
  return res.text();
}

function lint(path: string, html: string) {
  const text = ownText(html);
  const sentences = text.split(/(?<=[.!?·•])\s+/);
  for (const [re, what] of [...BANNED, ...CLAIMS]) {
    for (const s of sentences) {
      if (re.test(s) && !NEGATION.test(s))
        fail(`${path}: ${what}: "${s.trim().slice(0, 120)}"`);
    }
  }
}

// The offer file must still match the ported store price.
const catalog = JSON.parse(
  readFileSync(join(root, "app/data/catalog.json"), "utf8"),
);
if (catalog.product.price !== UNIT_PRICE)
  fail(
    `offers.ts UNIT_PRICE ${UNIT_PRICE} differs from the ported price ${catalog.product.price}`,
  );
if (offers.standard.provisional)
  fail("the Standard offer should be the verified source pricing");
if (!offers["early-black-friday"].provisional)
  fail("Early Black Friday prices must stay marked provisional");
if (!offers.christmas.provisional)
  fail("Christmas prices must stay marked provisional");

const SUFFIX: Record<string, string> = {
  standard: "",
  "early-black-friday": "/early-black-friday",
  christmas: "/christmas",
};

for (const c of CONCEPTS) {
  for (const offer of Object.keys(SUFFIX)) {
    const suffix = SUFFIX[offer];

    const pdpPath = `/${c}${suffix}`;
    const pdp = await page(pdpPath);
    lint(pdpPath, pdp);
    const order = [...pdp.matchAll(/data-sop-section="([^"]+)"/g)].map(
      (m) => m[1],
    );
    if (order.join() !== SOP_ORDER.join())
      fail(`${pdpPath}: SOP order is ${order.join(", ")}`);
    if ((pdp.match(/aria-roledescription="slide"/g) ?? []).length !== 8)
      fail(`${pdpPath}: gallery should have 7 slides + video`);
    const reviewCards = (pdp.match(/data-flag="competitor-review"/g) ?? [])
      .length;
    if (reviewCards < 7)
      fail(
        `${pdpPath}: only ${reviewCards} reviews carry the competitor-review flag`,
      );
    if (/aria-checked="true"[^>]*>\s*(S|M|L|XL|2XL|3XL|4XL)\s*</.test(pdp))
      fail(`${pdpPath}: a size is preselected`);
    if (offer !== "standard" && !pdp.includes('data-flag="provisional"'))
      fail(`${pdpPath}: ${offer} prices not flagged provisional`);
    if (offer === "standard" && pdp.includes('data-flag="provisional"'))
      fail(`${pdpPath}: Standard prices flagged provisional`);

    const advPath = `/${c}/advertorial${suffix}`;
    const adv = await page(advPath);
    lint(advPath, adv);
    if (!toText(adv).includes("Brand content"))
      fail(`${advPath}: not labelled Brand content`);
    const ctas = [
      ...adv.matchAll(
        /data-testid="advertorial-cta"[^>]*|href="([^"]+)"[^>]*data-testid="advertorial-cta"/g,
      ),
    ];
    if (!adv.includes(`href="/${c}${suffix}#buy"`) || ctas.length < 2)
      fail(`${advPath}: CTAs don't all lead to /${c}${suffix}#buy`);

    // Brand homepage: its own buy box, real reviews, offer prices flagged.
    const homePath = `/${c}/home${suffix}`;
    const home = await page(homePath);
    lint(homePath, home);
    if (!home.includes('data-testid="add-to-cart"'))
      fail(`${homePath}: no buy box`);
    if ((home.match(/data-flag="competitor-review"/g) ?? []).length < 7)
      fail(`${homePath}: reviews not all labelled competitor reviews`);
    if ((offer !== "standard") !== home.includes('data-flag="provisional"'))
      fail(`${homePath}: provisional flag wrong for ${offer}`);

    // 7 Reasons: brand content, seven reasons, every CTA to the product page.
    const rPath = `/${c}/7-reasons${suffix}`;
    const reasons = await page(rPath);
    lint(rPath, reasons);
    if (!toText(reasons).includes("Brand content"))
      fail(`${rPath}: not labelled Brand content`);
    if ((reasons.match(/data-testid="reason"/g) ?? []).length !== 7)
      fail(`${rPath}: should have seven reasons`);
    const rCtas = [...reasons.matchAll(/<a[^>]*data-testid="reasons-cta"[^>]*>/g)];
    if (
      rCtas.length !== 4 ||
      !rCtas.every((m) => m[0].includes(`href="/${c}${suffix}#buy"`))
    )
      fail(`${rPath}: CTAs don't all lead to /${c}${suffix}#buy`);
    if ((offer !== "standard") !== reasons.includes('data-flag="provisional"'))
      fail(`${rPath}: provisional flag wrong for ${offer}`);
  }
}

// The hub, gallery and SOP are internal research pages: they may name the
// competitor and its claims, so they are only checked for loading.
for (const path of ["/", "/gallery", "/sop"]) await page(path);

console.log(
  failures
    ? `\n${failures} content problem(s)`
    : "\nContent check passed: no urgency, no unsourced claims, labels in place.",
);
process.exit(failures ? 1 : 0);
