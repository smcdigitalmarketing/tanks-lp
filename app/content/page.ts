/**
 * Joins the brand, the product facts and an offer into the content one
 * product page renders. Facts and photos come from product.ts and offers.ts;
 * the brand file only words them.
 */
import type { Concept, OfferId, PdpContent, Slide } from "~/content/types";
import { offers, pricing, getBundle } from "~/content/offers";
import {
  GUARANTEE_DAYS,
  GUARANTEE_FLAG,
  care,
  comparison,
  faqs,
  fitAccordion,
  included,
  lifestyle,
  photos,
  reviewBy,
  reviews,
  reviewsLedBy,
  shippingLines,
} from "~/content/product";
import { DEMO_VIDEO } from "~/lib/images";
import { money } from "~/data/catalog";
import { fillPrices } from "~/content/store";

/** Who the review wall leads with: the quotes that match Hallie's voice. */
const REVIEW_LEADS = ["Victoria", "Carol", "Yutta", "Cathy", "Becki"];

/** The quote under the button: short, about comfort, from a real review. */
const UNDER_BUTTON_REVIEW = "Cathy";

export function gallery(concept: Concept): Slide[] {
  const g = concept.pdp.gallery;
  return [
    { kind: "benefit", image: photos.front, ...g.benefit },
    { kind: "lifestyle", image: photos.mirror, ...g.lifestyle },
    {
      kind: "vsBra",
      image: photos.braVsTank,
      headline: g.vsBra.headline,
      left: {
        label: "Traditional bra",
        points: ["Hooks", "Tight band", "Thin straps"],
      },
      right: {
        label: concept.brand.productName,
        points: ["No hooks", "No band", "Wide straps"],
      },
    },
    {
      kind: "included",
      image: photos.cupDetail,
      headline: g.included.headline,
      items: included,
    },
    {
      kind: "howItWorks",
      headline: g.howItWorks.headline,
      steps: concept.pdp.howItWorks.steps.map((s, i) => ({
        title: s.title,
        image: [photos.pullOn, photos.brownPair, photos.portrait][i],
      })),
    },
    {
      kind: "vsAlternatives",
      headline: g.vsAlternatives.headline,
      // Four columns on the slide (no sports bra) so it reads on a phone.
      columns: [concept.brand.name, ...comparison.columns.slice(1)].filter((_, i) => i !== 2),
      rows: comparison.rows.slice(0, 5).map((r) => ({ ...r, values: r.values.filter((_, i) => i !== 2) })),
    },
    { kind: "review", headline: g.review.headline, review: reviewBy("Yutta") },
    {
      kind: "video",
      src: DEMO_VIDEO.src,
      poster: DEMO_VIDEO.poster,
      alt: "A woman at a mirror, first in a bra, then in the tank",
      ...g.video,
    },
  ];
}

export function pageContent(concept: Concept, offerId: OfferId): PdpContent {
  const offer = offers[offerId];
  const copy = concept.offers[offerId];
  const p = concept.pdp;
  const lead = getBundle(offer, offer.defaultBundle);
  const leadPrice = pricing(offer, lead);

  return {
    offerId,
    announcement: fillPrices(copy.banner, offer),
    gallery: gallery(concept),
    kicker: p.kicker,
    eyebrow: offerId === "standard" ? p.eyebrow : copy.eyebrow,
    title: p.title,
    subtitle: p.subtitle,
    bullets: p.bullets,
    offerBanner:
      offerId === "standard"
        ? undefined
        : {
            eyebrow: copy.eyebrow,
            headline: copy.headline,
            sub: `${copy.sub} ${lead.units} tanks for ${money(leadPrice.total)}, ${money(leadPrice.perUnit)} each.`,
          },

    buy: { offer, cta: copy.cta, leadBadge: copy.badge, steps: p.steps },
    underAtc: {
      lines: [shippingLines.shipping, shippingLines.dispatch].map((l, i) => ({
        icon: i === 0 ? "truck" : "package",
        ...l,
      })),
      guarantee: {
        title: `${GUARANTEE_DAYS}-day fit guarantee`,
        body: `If it doesn't fit the way you hoped, tell us within ${GUARANTEE_DAYS} days of delivery and we'll send a different size, free. You keep the first one; there's nothing to post back.`,
        flag: GUARANTEE_FLAG,
      },
      review: reviewBy(UNDER_BUTTON_REVIEW),
    },

    accordions: [p.accordionIntro, fitAccordion, care],
    lifestyle,

    reviews: {
      ...p.reviews,
      items: reviewsLedBy(REVIEW_LEADS).slice(0, reviews.length),
    },
    valueProps: p.valueProps,
    howItWorks: {
      ...p.howItWorks,
      steps: p.howItWorks.steps.map((s, i) => ({
        ...s,
        image: [photos.pullOn, photos.brownPair, photos.portrait][i],
      })),
    },
    comparison: {
      ...p.comparison,
      columns: [concept.brand.name, ...comparison.columns.slice(1)],
      rows: comparison.rows,
      flag: comparison.flag,
    },

    guarantee: {
      days: GUARANTEE_DAYS,
      ...p.guarantee,
      points: [
        "One free size exchange per order",
        "No need to send the first tank back",
        `Within ${GUARANTEE_DAYS} days of delivery`,
      ],
      image: photos.portrait,
      flag: GUARANTEE_FLAG,
    },
    faq: { ...p.faq, items: faqs },
    closing: offerId === "standard" ? p.closing : { ...p.closing, cta: `${p.closing.cta} · ${copy.eyebrow}` },
  };
}
