import { data, redirect } from "react-router";
import type { OfferId } from "~/content/types";
import { LANDING_PAGES, brand, storePath, type PageKind } from "~/content/store";
import { offerFromSegment, offers } from "~/content/offers";
import { pageMeta } from "~/lib/seo";

/** Offer from the URL's last segment: 404 for anything unknown. */
export function loadOffer(segment: string | undefined) {
  const offerId = offerFromSegment(segment);
  if (!offerId) throw data("Not found", { status: 404 });
  return { offerId };
}

/** Meta for a page that shows prices, in its offer. */
export function offerPageMeta(page: PageKind, offerId: OfferId | undefined) {
  if (!offerId) return storeMeta("Page not found");
  const name = brand.brand.name;
  const offer = offerId === "standard" ? "" : ` · ${offers[offerId].name}`;
  const { title, description } = {
    home: {
      title: `${name} · ${brand.brand.tagline}`,
      description: brand.meta.description,
    },
    product: { title: brand.meta.title, description: brand.meta.description },
    shop: {
      title: `Shop all colours · ${name}`,
      description: `The ${brand.brand.productName} in every colour, sizes S to 4XL.`,
    },
  }[page];
  return pageMeta({
    title: `${title}${offer}`,
    description,
  });
}

/** Meta for pages without prices (help, cart, checkout). */
export const storeMeta = (title: string, description = brand.meta.description) =>
  pageMeta({
    title: `${title} · ${brand.brand.name}`,
    description,
  });

/**
 * The six-concept POC lived at /<concept>/<page>/<offer>. Links to it were
 * shared, so Kindwear's (concept A, "soft") go to the same page here and the
 * retired concepts go to the homepage.
 */
const RETIRED = ["premium", "contemporary", "bold", "calm", "heritage"];
const OLD_PAGE: Record<string, PageKind> = {
  "": "product",
  home: "home",
};
/** The old landing pages now live on the Shopify store. */
const OLD_LANDING: Record<string, string> = {
  "7-reasons": LANDING_PAGES.reasons,
  advertorial: LANDING_PAGES.letter,
};

export function legacyRedirect(pathname: string) {
  const [slug, ...rest] = pathname.split("/").filter(Boolean);
  if (RETIRED.includes(slug)) return redirect("/", 301);
  if (slug !== "soft") return null;
  // /soft, /soft/christmas, /soft/home/early-black-friday, /soft/advertorial ...
  if (rest[0] && rest[0] in OLD_LANDING) return redirect(OLD_LANDING[rest[0]], 301);
  const pagePart = rest[0] && rest[0] in OLD_PAGE ? rest.shift()! : "";
  const offerId = offerFromSegment(rest[0]);
  if (!offerId || rest.length > 1) return redirect("/", 301);
  return redirect(storePath(OLD_PAGE[pagePart], offerId), 301);
}
