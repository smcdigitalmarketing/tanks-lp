import { data } from "react-router";
import type { Concept, OfferId } from "~/content/types";
import { conceptBySlug } from "~/content/concepts";
import { offers } from "~/content/offers";
import { pageMeta } from "~/lib/seo";

/** Loader shared by the four concept routes: 404 for an unknown concept. */
export function loadConcept(slug: string | undefined) {
  const concept = conceptBySlug(slug);
  if (!concept) throw data("Not found", { status: 404 });
  return { slug: concept.slug };
}

export function conceptMeta(slug: string | undefined, offerId: OfferId, page: "product" | "advertorial") {
  const concept = conceptBySlug(slug);
  if (!concept) return [{ title: "Not found" }];
  const offer = offerId === "standard" ? "" : ` · ${offers[offerId].name}`;
  const title =
    page === "product" ? `${concept.meta.title}${offer}` : `${concept.advertorial.headline} · ${concept.brand.name}${offer}`;
  return pageMeta({
    title,
    description: page === "product" ? concept.meta.description : concept.advertorial.dek,
    fonts: concept.brand.googleFonts,
  });
}

export const mustConcept = (slug: string): Concept => conceptBySlug(slug)!;
