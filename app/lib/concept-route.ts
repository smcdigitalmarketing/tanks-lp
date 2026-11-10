import { data } from "react-router";
import type { Concept, OfferId } from "~/content/types";
import { conceptBySlug, type PageKind } from "~/content/concepts";
import { offerFromSegment, offers } from "~/content/offers";
import { reasonsCopy } from "~/content/reasons";
import { pageMeta } from "~/lib/seo";

/** Loader shared by the concept routes: 404 for an unknown concept. */
export function loadConcept(slug: string | undefined) {
  const concept = conceptBySlug(slug);
  if (!concept) throw data("Not found", { status: 404 });
  return { slug: concept.slug };
}

/** Loader for pages with an optional offer segment: 404 for an unknown one. */
export function loadConceptOffer(slug: string | undefined, segment: string | undefined) {
  const offerId = offerFromSegment(segment);
  if (!offerId) throw data("Not found", { status: 404 });
  return { ...loadConcept(slug), offerId };
}

export function conceptMeta(slug: string | undefined, offerId: OfferId, page: PageKind) {
  const concept = conceptBySlug(slug);
  if (!concept) return [{ title: "Not found" }];
  const offer = offerId === "standard" ? "" : ` · ${offers[offerId].name}`;
  const brand = concept.brand.name;
  const r = page === "reasons" ? reasonsCopy(concept, offerId) : undefined;
  const { title, description } = {
    product: { title: concept.meta.title, description: concept.meta.description },
    home: { title: `${brand} · ${concept.brand.tagline}`, description: concept.meta.description },
    reasons: { title: `${r?.headline} · ${brand}`, description: r?.dek ?? "" },
    advertorial: { title: `${concept.advertorial.headline} · ${brand}`, description: concept.advertorial.dek },
  }[page];
  return pageMeta({
    title: `${title}${offer}`,
    description,
    fonts: concept.brand.googleFonts,
  });
}

export const mustConcept = (slug: string): Concept => conceptBySlug(slug)!;
