import type { Offer, OfferId } from "~/content/types";
import { OFFER_SEGMENT, getBundle, pricing } from "~/content/offers";
import { money } from "~/data/catalog";
import { hallie } from "~/content/hallie";

/** The store's one brand. Components still take it as a `concept` prop. */
export const brand = hallie;

/** The one product's handle, as Shopify would have it. */
export const PRODUCT_HANDLE = "everyday-tank";

/**
 * Pages that show prices. Each has a Standard URL and one per offer, so a
 * campaign link (/early-black-friday, /products/everyday-tank/christmas)
 * opens the page with that offer's prices and words.
 */
export type PageKind = "home" | "product" | "shop" | "reasons" | "story";

const PAGE_PATH: Record<PageKind, string> = {
  home: "",
  product: `/products/${PRODUCT_HANDLE}`,
  shop: "/collections/all",
  reasons: "/pages/7-reasons",
  story: "/pages/a-note-from-hallie",
};

export const PAGE_KINDS = Object.keys(PAGE_PATH) as PageKind[];

/** URL of a store page in an offer, e.g. /pages/7-reasons/early-black-friday. */
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
