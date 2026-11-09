import type { Concept, ConceptSlug, Offer } from "~/content/types";
import { getBundle, pricing } from "~/content/offers";
import { money } from "~/data/catalog";
import { soft } from "./soft";
import { premium } from "./premium";
import { contemporary } from "./contemporary";

/** The three concepts, in the brief's order (A, B, C). */
export const concepts: Concept[] = [soft, premium, contemporary];

export const conceptBySlug = (slug: string | undefined) =>
  concepts.find((c) => c.slug === (slug as ConceptSlug));

/** URL of a concept page. */
export function conceptPath(
  slug: ConceptSlug,
  {
    page = "product",
    offer = "standard",
  }: { page?: "product" | "advertorial"; offer?: Offer["id"] } = {},
) {
  const base = page === "advertorial" ? `/${slug}/advertorial` : `/${slug}`;
  return offer === "standard" ? base : `${base}/early-black-friday`;
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
