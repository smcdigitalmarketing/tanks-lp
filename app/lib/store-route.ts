import { data, redirect } from "react-router";
import type { OfferId } from "~/content/types";
import { brand, storePath, type PageKind } from "~/content/store";
import { offerFromSegment, offers } from "~/content/offers";
import { reasonsCopy } from "~/content/reasons";
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
  const r = page === "reasons" ? reasonsCopy(brand, offerId) : undefined;
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
    reasons: { title: `${r?.headline} · ${name}`, description: r?.dek ?? "" },
    story: {
      title: `${brand.advertorial.headline} · ${name}`,
      description: brand.advertorial.dek,
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
 * shared, so Hallie's (concept A, "soft") go to the same page here and the
 * retired concepts go to the homepage.
 */
const RETIRED = ["premium", "contemporary", "bold", "calm", "heritage"];
const OLD_PAGE: Record<string, PageKind> = {
  "": "product",
  home: "home",
  "7-reasons": "reasons",
  advertorial: "story",
};

export function legacyRedirect(pathname: string) {
  const [slug, ...rest] = pathname.split("/").filter(Boolean);
  if (RETIRED.includes(slug)) return redirect("/", 301);
  if (slug !== "soft") return null;
  // /soft, /soft/christmas, /soft/home/early-black-friday, /soft/advertorial ...
  const pagePart = rest[0] && rest[0] in OLD_PAGE ? rest.shift()! : "";
  const offerId = offerFromSegment(rest[0]);
  if (!offerId || rest.length > 1) return redirect("/", 301);
  return redirect(storePath(OLD_PAGE[pagePart], offerId), 301);
}
