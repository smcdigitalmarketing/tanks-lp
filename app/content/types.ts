import type { Img } from "~/lib/images";
import type { IconName } from "~/components/icons";

/*
 * Three layers, kept apart on purpose:
 *   product.ts   facts about the tank, each with its source status (shared)
 *   offers.ts    prices and bundles for the Standard and Early Black Friday offers (shared)
 *   concepts/*   a brand: name, look, voice and copy (one file per concept)
 * page.ts joins them into the PdpContent one product page renders.
 */

// ── Verification flags ─────────────────────────────────────────────────────

/**
 * Anything on a page that isn't ours to claim yet carries a flag, drawn as a
 * small dashed tag (components/flag.tsx). The preview strip can hide them.
 */
export type FlagKind =
  /** Stated by the competitor; not verified for our product. */
  | "source"
  /** The competitor's own pages contradict each other. */
  | "conflict"
  /** A number we set for this concept test, not a real price. */
  | "provisional"
  /** A real review of the competitor's product, standing in for ours. */
  | "competitor-review"
  /** A policy we would have to decide and confirm before launch. */
  | "to-confirm";

export type Flag = { kind: FlagKind; note?: string };

// ── Gallery ────────────────────────────────────────────────────────────────

/**
 * Seven square slides in the brief's order, then an optional silent video.
 * Photos carry no words; every word is HTML laid over the photo.
 */
export type Slide =
  /** 1 · Main benefit with a strong headline. */
  | {
      kind: "benefit";
      image: Img;
      eyebrow?: string;
      headline: string;
      sub?: string;
      chips?: string[];
    }
  /** 2 · The tank being worn. */
  | {
      kind: "lifestyle";
      image: Img;
      eyebrow?: string;
      headline: string;
      points?: string[];
    }
  /** 3 · Side by side with a traditional bra, labelled by construction, not by result. */
  | {
      kind: "vsBra";
      image: Img;
      headline: string;
      left: { label: string; points: string[] };
      right: { label: string; points: string[] };
    }
  /** 4 · What's included / product details. */
  | {
      kind: "included";
      image: Img;
      headline: string;
      items: { qty?: string; name: string; note?: string }[];
    }
  /** 5 · How it works, in three steps. */
  | {
      kind: "howItWorks";
      headline: string;
      steps: { title: string; image: Img }[];
    }
  /** 6 · Against the alternatives, row by row. */
  | {
      kind: "vsAlternatives";
      headline: string;
      columns: string[];
      rows: { label: string; values: boolean[] }[];
    }
  /** 7 · A real customer review. */
  | { kind: "review"; headline?: string; review: Review }
  /** 8 · After the seven: a silent looping demo. */
  | {
      kind: "video";
      src: string;
      poster: string;
      alt: string;
      eyebrow?: string;
      headline: string;
    };

export type SlideKind = Slide["kind"];

// ── Proof ──────────────────────────────────────────────────────────────────

export type Review = {
  name: string;
  rating: number;
  date?: string;
  text: string;
  photo?: Img;
  /** Every review on these pages is a competitor review standing in for ours. */
  flag: Flag;
};

// ── Offers ─────────────────────────────────────────────────────────────────

export type OfferId = "standard" | "early-black-friday";

export type Bundle = {
  id: "single" | "trio" | "five";
  units: number;
  /** Total for the bundle. */
  price: number;
  /** The competitor's own name for the deal, e.g. "Buy 2, get 1 free". */
  deal: string;
  badge?: string;
};

export type Offer = {
  id: OfferId;
  name: string;
  /** Prices set for this test, not taken from the store. */
  provisional: boolean;
  bundles: Bundle[];
  defaultBundle: Bundle["id"];
  /** Where the prices came from, shown in the docs and the hub. */
  basis: string;
};

/** How one brand presents an offer: same numbers, its own words. */
export type OfferCopy = {
  /** Announcement bar text. No deadlines, no stock claims. */
  banner: string;
  eyebrow: string;
  headline: string;
  sub: string;
  cta: string;
  /** Badge on the bundle the offer leads with. */
  badge: string;
};

// ── Product page content (what the template renders) ──────────────────────

export type ValueProp = {
  eyebrow?: string;
  headline: string;
  body: string;
  image: Img;
  points?: string[];
};

export type Step = { title: string; body: string; image: Img };

export type Faq = { q: string; a: string; flag?: Flag };

export type PdpContent = {
  offerId: OfferId;
  announcement: string;
  gallery: Slide[];
  /** Short positioning line where the SOP puts the proof line. No ratings or counts. */
  kicker: string;
  eyebrow?: string;
  title: { product: string; benefit: string };
  subtitle: string;
  bullets: { icon: IconName; text: string }[];
  offerBanner?: { eyebrow: string; headline: string; sub: string };

  buy: {
    offer: Offer;
    cta: string;
    leadBadge: string;
    steps: { bundle: string; colour: string; size: string };
  };
  underAtc: {
    lines: { icon: IconName; text: string; flag?: Flag }[];
    guarantee: { title: string; body: string; flag?: Flag };
    review: Review;
  };

  accordions: { title: string; body: string[]; flag?: Flag }[];
  lifestyle: Img[];

  reviews: { eyebrow?: string; headline: string; sub: string; items: Review[] };
  valueProps: { eyebrow?: string; headline: string; items: ValueProp[] };
  howItWorks: {
    eyebrow?: string;
    headline: string;
    sub: string;
    steps: Step[];
  };
  comparison: {
    headline: string;
    sub: string;
    columns: string[];
    rows: { label: string; values: boolean[] }[];
    flag: Flag;
  };

  guarantee: {
    days: number;
    headline: string;
    body: string;
    points: string[];
    image: Img;
    cta: string;
    flag: Flag;
  };
  faq: { headline: string; sub: string; items: Faq[] };
  closing: { headline: string; body: string; cta: string };
};

// ── Advertorial ────────────────────────────────────────────────────────────

export type AdvertorialSection = {
  title: string;
  body: string[];
  image?: Img;
  caption?: string;
  /** A short highlighted list: objections answered, or bra vs tank. */
  list?: { label: string; text: string }[];
  pullQuote?: Review;
};

export type Advertorial = {
  kicker: string;
  headline: string;
  dek: string;
  byline: string;
  readTime: string;
  lead: Img;
  leadCaption: string;
  intro: string[];
  sections: AdvertorialSection[];
  /** The hand-off into the offer, then the button to the product page. */
  closing: { headline: string; body: string; cta: string };
};

// ── Concepts ───────────────────────────────────────────────────────────────

export type ConceptSlug = "soft" | "premium" | "contemporary";

export type Swatch = { name: string; hex: string; role: string };

export type Concept = {
  slug: ConceptSlug;
  /** A, B or C, as in the brief. */
  letter: "A" | "B" | "C";
  /** The brief's name for the direction. */
  direction: string;
  brand: {
    name: string;
    /** What this brand calls the product. */
    productName: string;
    tagline: string;
    positioning: string;
    voice: string;
    targetFeeling: string;
    palette: Swatch[];
    fonts: { display: string; body: string };
    /** Google Fonts `family=` query. */
    googleFonts: string;
    support: { email: string; hours: string };
  };
  hypothesis: string;
  meta: { title: string; description: string };
  layout: {
    /** Gallery left (split) or right (reverse); "headline" puts the title full-width above. */
    hero: "split" | "reverse" | "headline";
    tiers: "stack" | "columns" | "rows";
    reviews: "notes" | "quotes" | "list";
    valueProps: "cards" | "alternating" | "numbered";
    divider: "none" | "wave" | "rule";
    advertorial: "letter" | "editorial" | "magazine";
  };
  /** Copy for the product page; facts come from product.ts. */
  pdp: ConceptPdp;
  offers: Record<OfferId, OfferCopy>;
  advertorial: Advertorial;
};

/** The parts of a product page a brand writes for itself. */
export type ConceptPdp = {
  kicker: string;
  eyebrow?: string;
  title: { product: string; benefit: string };
  subtitle: string;
  bullets: { icon: IconName; text: string }[];
  gallery: {
    benefit: {
      eyebrow?: string;
      headline: string;
      sub?: string;
      chips?: string[];
    };
    lifestyle: { eyebrow?: string; headline: string; points?: string[] };
    vsBra: { headline: string };
    included: { headline: string };
    howItWorks: { headline: string };
    vsAlternatives: { headline: string };
    review: { headline?: string };
    video: { eyebrow?: string; headline: string };
  };
  steps: { bundle: string; colour: string; size: string };
  accordionIntro: { title: string; body: string[] };
  reviews: { eyebrow?: string; headline: string; sub: string };
  valueProps: { eyebrow?: string; headline: string; items: ValueProp[] };
  howItWorks: {
    eyebrow?: string;
    headline: string;
    sub: string;
    steps: { title: string; body: string }[];
  };
  comparison: { headline: string; sub: string };
  guarantee: { headline: string; body: string; cta: string };
  faq: { headline: string; sub: string };
  closing: { headline: string; body: string; cta: string };
  footerBlurb: string;
};
