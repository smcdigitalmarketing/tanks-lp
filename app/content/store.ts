import type { Offer, OfferId } from "~/content/types";
import { OFFER_SEGMENT, getBundle, pricing } from "~/content/offers";
import { money } from "~/data/catalog";
import { kindwear } from "~/content/kindwear";

/** The store's one brand. Components still take it as a `concept` prop. */
export const brand = kindwear;

/** The one product's handle, as Shopify would have it. */
export const PRODUCT_HANDLE = "everyday-tank";

/**
 * Pages that show prices. Each has a Standard URL and one per offer, so a
 * campaign link (/early-black-friday, /products/everyday-tank/christmas)
 * opens the page with that offer's prices and words.
 */
export type PageKind = "home" | "product" | "shop";

const PAGE_PATH: Record<PageKind, string> = {
  home: "",
  product: `/products/${PRODUCT_HANDLE}`,
  shop: "/collections/all",
};

/** The live Shopify store, where the landing pages live. */
export const SHOPIFY_STORE = "https://h3q1rr-0w.myshopify.com";

/**
 * The ad landing pages (the 7 Reasons listicle and the letter) live on the
 * Shopify store only. This mock's old URLs redirect there; the store's menus
 * never link them.
 */
export const LANDING_PAGES = {
  reasons: `${SHOPIFY_STORE}/pages/7-reasons`,
  letter: `${SHOPIFY_STORE}/pages/a-note-from-kindwear`,
} as const;

export const PAGE_KINDS = Object.keys(PAGE_PATH) as PageKind[];

/** URL of a store page in an offer, e.g. /products/everyday-tank/christmas. */
export function storePath(page: PageKind, offer: OfferId = "standard") {
  return `${PAGE_PATH[page]}${OFFER_SEGMENT[offer]}` || "/";
}

/** Help pages: no prices, so no offer in the URL. */
export const HELP_PAGES = {
  faq: "FAQ",
  "size-guide": "Size guide",
  shipping: "Shipping",
  returns: "Returns and exchanges",
  contact: "Contact us",
} as const;
export type HelpSlug = keyof typeof HELP_PAGES;
export const helpPath = (slug: HelpSlug) => `/pages/${slug}`;
export const isHelpSlug = (s: string | undefined): s is HelpSlug =>
  !!s && s in HELP_PAGES;

/**
 * Fills price tokens in offer copy from offers.ts, so banners can't drift
 * from the real numbers: {price:five}, {each:trio}, {save:single}.
 */
export function fillPrices(text: string, offer: Offer) {
  return text.replace(
    /\{(price|each|save):(single|trio|five)\}/g,
    (_, kind: string, id: "single" | "trio" | "five") => {
      const p = pricing(offer, getBundle(offer, id));
      return money(
        kind === "price"
          ? p.total
          : kind === "each"
            ? p.perUnit
            : p.savingVsSingles,
      );
    },
  );
}
