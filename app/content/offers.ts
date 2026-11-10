/**
 * Prices and bundles, shared by all three concepts so the brands present the
 * same offer. Change a number here and every page, cart and slide follows.
 *
 * Standard: the competitor's live bundle prices (maggies-tanks.com, ported
 * in app/data/catalog.json). Savings are worked out against buying the same
 * number of single tanks, never against the store's $84.95 compare-at price.
 *
 * Early Black Friday and Christmas: PROVISIONAL numbers for this concept
 * test only. They are labelled on every page. No timers, no stock claims, no
 * end date (and no shipping cut-off until there is a real one).
 */
import type { Bundle, Offer, OfferId } from "~/content/types";

/**
 * The competitor's everyday single-tank price (catalog.json). Kept here as a
 * plain number so scripts can import this file directly with Node.
 */
export const UNIT_PRICE = 34.95;

export const offers: Record<OfferId, Offer> = {
  standard: {
    id: "standard",
    name: "Standard",
    provisional: false,
    basis:
      "The competitor's live bundle prices: 1 for $34.95, 3 for $69.90, 5 for $104.85.",
    defaultBundle: "trio",
    bundles: [
      { id: "single", units: 1, price: 34.95, deal: "Single tank" },
      {
        id: "trio",
        units: 3,
        price: 69.9,
        deal: "Buy 2, get 1 free",
        badge: "Most popular",
      },
      { id: "five", units: 5, price: 104.85, deal: "Buy 3, get 2 free" },
    ],
  },
  "early-black-friday": {
    id: "early-black-friday",
    name: "Early Black Friday",
    provisional: true,
    basis:
      "Provisional test prices set for this POC, about 14–24% below the Standard bundles. Not live anywhere.",
    defaultBundle: "five",
    bundles: [
      { id: "single", units: 1, price: 29.95, deal: "Black Friday single" },
      { id: "trio", units: 3, price: 59.95, deal: "Black Friday 3-pack" },
      {
        id: "five",
        units: 5,
        price: 79.95,
        deal: "Black Friday 5-pack",
        badge: "Best value",
      },
    ],
  },
  christmas: {
    id: "christmas",
    name: "Christmas",
    provisional: true,
    basis:
      "Provisional gifting prices set for this POC, between the Standard and Early Black Friday bundles. Not live anywhere.",
    defaultBundle: "trio",
    bundles: [
      { id: "single", units: 1, price: 31.95, deal: "One to give" },
      {
        id: "trio",
        units: 3,
        price: 62.95,
        deal: "Gift 3-pack",
        badge: "Most gifted",
      },
      { id: "five", units: 5, price: 89.95, deal: "Gift 5-pack" },
    ],
  },
};

export const OFFER_IDS: OfferId[] = ["standard", "early-black-friday", "christmas"];

export const isOfferId = (v: string | undefined): v is OfferId =>
  v === "standard" || v === "early-black-friday" || v === "christmas";

/** The URL segment each offer adds to a page ("" for Standard). */
export const OFFER_SEGMENT: Record<OfferId, string> = {
  standard: "",
  "early-black-friday": "/early-black-friday",
  christmas: "/christmas",
};

/** Short label for switches and links. */
export const OFFER_LABEL: Record<OfferId, string> = {
  standard: "Standard",
  "early-black-friday": "Early Black Friday",
  christmas: "Christmas",
};

/** Offer id from a URL segment (undefined → Standard; unknown → null). */
export function offerFromSegment(seg: string | undefined): OfferId | null {
  if (!seg) return "standard";
  if (seg === "standard") return null;
  return isOfferId(seg) ? seg : null;
}

export const getBundle = (offer: Offer, id: Bundle["id"]) =>
  offer.bundles.find((b) => b.id === id) ?? offer.bundles[0];

/**
 * The numbers a bundle card shows. `reference` is what the same tanks cost
 * one at a time at the everyday price; on Early Black Friday `standard` is
 * what the bundle costs under the Standard offer, shown struck through.
 */
export function pricing(offer: Offer, bundle: Bundle) {
  const reference = Math.round(bundle.units * UNIT_PRICE * 100) / 100;
  const standardBundle = getBundle(offers.standard, bundle.id);
  const was = offer.id === "standard" ? reference : standardBundle.price;
  const total = bundle.price;
  return {
    total,
    /** The struck-through price. */
    was,
    saving: Math.round((was - total) * 100) / 100,
    /** Saving against buying single tanks at the everyday price. */
    savingVsSingles: Math.round((reference - total) * 100) / 100,
    perUnit: Math.round((total / bundle.units) * 100) / 100,
    reference,
  };
}

/** The biggest saving an offer gives, for headlines ("save up to $X"). */
export const maxSaving = (offer: Offer) =>
  Math.max(...offer.bundles.map((b) => pricing(offer, b).savingVsSingles));
