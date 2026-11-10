import type { Concept, ConceptSlug, Offer } from "~/content/types";
import { OFFER_SEGMENT, getBundle, pricing } from "~/content/offers";
import { money } from "~/data/catalog";
import { soft } from "./soft";
import { premium } from "./premium";
import { contemporary } from "./contemporary";
import { bold } from "./bold";
import { calm } from "./calm";
import { heritage } from "./heritage";

/** The brief's three concepts (A, B, C), then the three remixes (D, E, F). */
export const concepts: Concept[] = [soft, premium, contemporary, bold, calm, heritage];

export const originals = concepts.filter((c) => !c.group);
export const remixes = concepts.filter((c) => c.group === "remix");

export const conceptBySlug = (slug: string | undefined) =>
  concepts.find((c) => c.slug === (slug as ConceptSlug));

export type PageKind = "product" | "advertorial" | "home" | "reasons";

const PAGE_PATH: Record<PageKind, string> = {
  product: "",
  advertorial: "/advertorial",
  home: "/home",
  reasons: "/7-reasons",
};

/** URL of a concept page, e.g. /premium/7-reasons/early-black-friday. */
export function conceptPath(
  slug: ConceptSlug,
  {
    page = "product",
    offer = "standard",
  }: { page?: PageKind; offer?: Offer["id"] } = {},
) {
  return `/${slug}${PAGE_PATH[page]}${OFFER_SEGMENT[offer]}`;
}

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
