import type { Concept, OfferId, ReasonsCopy } from "~/content/types";

/**
 * The 7 Reasons copy for one offer: the brand's base copy with the offer's
 * framing (and any swapped reasons) laid over it.
 */
export function reasonsCopy(concept: Concept, offerId: OfferId): ReasonsCopy {
  const r = concept.sevenReasons;
  const o =
    offerId === "early-black-friday"
      ? r.blackFriday
      : offerId === "christmas"
        ? r.christmas
        : {};
  const { reasons: swaps, ...rest } = o;
  return {
    ...r.base,
    ...rest,
    reasons: r.base.reasons.map((x, i) => swaps?.[i] ?? x),
  };
}
