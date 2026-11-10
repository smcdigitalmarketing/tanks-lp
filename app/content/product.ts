/**
 * Facts about the tank. Every one comes from the competitor's live pages
 * (maggies-tanks.com, snapshot in app/data/) and carries its status. The
 * brand file (hallie.ts) never adds facts: it only words them.
 *
 * The full claims register, with sources, is docs/product-research.md.
 */
import type { Faq, Flag, Review } from "~/content/types";
import { REVIEW_DATA } from "~/data/catalog";
import { img, type Img } from "~/lib/images";

export const SOURCE: Flag = { kind: "source" };
export const flag = (kind: Flag["kind"], note?: string): Flag => ({
  kind,
  note,
});


/** "90-Day Perfect Fit Guarantee": one free replacement size, nothing to post back. */
export const GUARANTEE_DAYS = 90;
export const GUARANTEE_FLAG = flag(
  "to-confirm",
  "Competitor policy: one free size exchange within 90 days of delivery. Sizing refunds are 'generally not offered'.",
);
export const SHIPPING_FLAG = flag(
  "conflict",
  "The store says 'Free Shipping' on every bundle, but its shipping page says cost is calculated at checkout.",
);

/** What the tank is, in the competitor's own terms (all source claims). */
export const construction = {
  noHardware: "No underwire, no hooks, no clasps",
  noBand: "No tight band across the back",
  wideStraps: "Wide, soft shoulder straps",
  padding: "Soft padding built into the front",
  length: "Long enough to tuck into high-waisted bottoms",
  pullOn: "Pulls on over your head like any tank",
} as const;

// ── Photography ────────────────────────────────────────────────────────────

export const photos = {
  front: img("front", "Woman in a nude built-in bra tank, front view"),
  back: img("back", "Back view of the tank: no hooks and no band"),
  strap: img("strap", "Close-up of the wide shoulder strap"),
  cupDetail: img(
    "cup-detail",
    "Hands lifting the built-in soft cup inside the tank",
  ),
  mirror: img("mirror", "Woman checking the tank in a bedroom mirror"),
  portrait: img("portrait", "Smiling woman wearing the nude tank"),
  pullOn: img(
    "pull-on",
    "Woman pulling the tank down over the built-in support",
  ),
  brownPair: img(
    "brown-pair",
    "Coffee-coloured tank tucked into jeans, back and front",
  ),
  braVsTank: img(
    "bra-vs-tank",
    "The same woman from behind: in a traditional bra, then in the tank",
  ),
  collage: img(
    "brown-collage",
    "Coffee tank worn with jeans, with close-ups of the built-in cups",
  ),
} satisfies Record<string, Img>;

export const lifestyle: Img[] = [
  photos.portrait,
  photos.mirror,
  photos.brownPair,
  photos.back,
  photos.pullOn,
  photos.strap,
  photos.front,
];

// ── Sizing ─────────────────────────────────────────────────────────────────

/**
 * Bust measured over the bra at the fullest point. These are the size
 * finder's boundaries on the product page (changed 7 Nov 2026 from exchange
 * data). The store's size-chart image gives different ranges, hence the flag.
 */
export const sizeGuide = {
  flag: flag(
    "conflict",
    "The size finder and the size-chart image give different bust ranges. These are the finder's.",
  ),
  rows: [
    { size: "S", bust: "Under 34″", weight: "Under 115 lb" },
    { size: "M", bust: "34–35.9″", weight: "115–137 lb" },
    { size: "L", bust: "36–37.9″", weight: "138–153 lb" },
    { size: "XL", bust: "38–40.4″", weight: "154–179 lb" },
    { size: "2XL", bust: "40.5–43.4″", weight: "180–205 lb" },
    { size: "3XL", bust: "43.5–45.4″", weight: "206–229 lb" },
    { size: "4XL", bust: "45.5″ and up", weight: "230 lb and up" },
  ],
  measure: [
    "Measure over your usual bra, around the fullest part of your bust.",
    "Keep the tape level all the way round, snug but not tight.",
    "Stand straight and breathe normally, then read it in inches.",
  ],
  between: "Between sizes? Choose the larger one.",
};

// ── Reviews ────────────────────────────────────────────────────────────────

const REVIEW_FLAG = flag(
  "competitor-review",
  "A real Judge.me review of the competitor's tank, shown as a stand-in until we have our own.",
);

export const reviews: Review[] = REVIEW_DATA.items.map((r) => ({
  name: r.name,
  rating: r.rating,
  date: new Date(r.date + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }),
  text: r.text,
  photo: r.photo ? img(r.photo, `Photo from ${r.name}'s review`) : undefined,
  flag: REVIEW_FLAG,
}));

export const reviewBy = (name: string) => {
  const r = reviews.find((x) => x.name === name);
  if (!r) throw new Error(`No ported review from ${name}`);
  return r;
};

/** Reorder the review wall to lead with the quotes that fit the brand voice. */
export const reviewsLedBy = (names: string[]) => [
  ...names.map(reviewBy),
  ...reviews.filter((r) => !names.includes(r.name)),
];

// ── Comparison (the competitor's own table, trimmed) ───────────────────────

/**
 * From the store's "How It Compares" table. The tank's column is ours; the
 * other columns are the competitor's judgement, not a test we ran. "Pads stay
 * after washing" and "Braless" are left out (performance claim; not a product).
 */
export const comparison = {
  columns: [
    "This tank",
    "Traditional bra",
    "Sports bra",
    "Shelf tank",
    "Bralette",
  ],
  rows: [
    { label: "Comfortable all day", values: [true, false, false, false, true] },
    {
      label: "Enough everyday support",
      values: [true, true, true, false, false],
    },
    {
      label: "Smooth under clothes",
      values: [true, false, false, true, false],
    },
    { label: "Nothing to adjust", values: [true, false, true, false, true] },
    { label: "Easy on and off", values: [true, false, false, true, true] },
    { label: "Breathable", values: [true, false, false, true, true] },
  ],
  flag: flag(
    "source",
    "Adapted from the competitor's comparison table. Not independently tested.",
  ),
};

// ── What's in the box ──────────────────────────────────────────────────────

export const included = [
  { qty: "1", name: "Built-in bra tank", note: "Your colour and size" },
  { name: "Soft built-in cups", note: "Inside the front panel" },
  { name: "Wide straps", note: "Sit flat on the shoulder" },
  { name: "Longer length", note: "Tucks into waistbands" },
];

// ── FAQ (answers only what the source supports) ────────────────────────────

export const faqs: Faq[] = [
  {
    q: "Can I wear it instead of a bra?",
    a: "That's what it's made for: everyday wear, from errands and work to travel and lounging. It gives everyday support, not sports-bra support, so it isn't designed for running or high-impact exercise.",
    flag: SOURCE,
  },
  {
    q: "How do I find my size?",
    a: "Measure over your bra, around the fullest part of your bust, and match it to the size guide. Between two sizes, choose the larger one. If it still doesn't fit, the fit guarantee covers one free size exchange.",
    flag: sizeGuide.flag,
  },
  {
    q: "Will it show under light or white tops?",
    a: "The neutral shades are chosen to sit discreetly under most tops. Under sheer or very thin white fabric, pick the shade closest to your skin tone.",
    flag: SOURCE,
  },
  {
    q: "Does the padding move around in the wash?",
    a: "The soft cups sit inside the front panel and can be lifted out. After washing, smooth them flat and let the tank dry flat so they keep their shape.",
    flag: flag(
      "source",
      "The competitor says the padding stays in place; its product photo ('Removable cup detail') shows a cup that lifts out. To confirm with the manufacturer.",
    ),
  },
  {
    q: "What is it made of?",
    a: "A soft nylon and spandex knit. We're confirming the exact blend with the manufacturer before launch.",
    flag: flag(
      "conflict",
      "The competitor lists both 80/20 and 68/32 nylon/spandex on different pages.",
    ),
  },
  {
    q: "How do I wash it?",
    a: "Wash cold on a gentle cycle and lay it flat to dry. Skip fabric softener and bleach.",
    flag: flag(
      "conflict",
      "One competitor page allows tumble drying on low; another says to avoid the dryer. This is the common ground.",
    ),
  },
  {
    q: "What if it doesn't fit?",
    a: `Within ${GUARANTEE_DAYS} days of delivery, tell us and we'll send a different size, free. You don't need to post the first one back.`,
    flag: GUARANTEE_FLAG,
  },
  {
    q: "How long does delivery take?",
    a: "Orders are processed in 2–5 business days and usually arrive within about 7 business days of dispatch.",
    flag: flag(
      "conflict",
      "The competitor gives 2–3 days on one page and 2–5 on another. The longer range is shown.",
    ),
  },
];

export const care = {
  title: "Care",
  body: [
    "Wash cold on a gentle cycle, ideally inside out in a mesh bag.",
    "Lay flat to dry; skip softener and bleach.",
  ],
  flag: flag(
    "conflict",
    "Care instructions differ between the competitor's pages.",
  ),
};

export const fitAccordion = {
  title: "Size and fit",
  body: [
    "Seven sizes, S to 4XL, chosen by your bust measurement over a bra.",
    "Between sizes? Choose the larger one.",
    `Not right? One free size exchange within ${GUARANTEE_DAYS} days.`,
  ],
  flag: sizeGuide.flag,
};

export const shippingLines = {
  shipping: { text: "Free shipping on every bundle", flag: SHIPPING_FLAG },
  guarantee: {
    text: `${GUARANTEE_DAYS}-day fit guarantee: one free size exchange`,
    flag: GUARANTEE_FLAG,
  },
  dispatch: {
    text: "Processed in 2–5 business days",
    flag: flag(
      "conflict",
      "2–3 or 2–5 days, depending on the competitor page.",
    ),
  },
};

/**
 * Checkout shipping. One method only: the competitor shows no other, and its
 * own pages disagree on whether shipping is free (SHIPPING_FLAG).
 */
export const shippingMethods = [
  {
    id: "standard",
    label: "Standard shipping",
    detail:
      "Processed in 2–5 business days, then usually about 7 business days on the way",
    price: 0,
    flag: SHIPPING_FLAG,
  },
];

/** Where the store ships, as on the competitor's checkout. */
export const SHIPS_TO = {
  country: "United States",
  flag: flag(
    "to-confirm",
    "US only for now, as the competitor. Other countries to decide before launch.",
  ),
};
