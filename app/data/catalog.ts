/**
 * The competitor's product as snapshotted by `npm run store:port`
 * (catalog.json and reviews.json are generated; don't edit them by hand).
 */
import catalog from "./catalog.json";
import reviewData from "./reviews.json";

export type CatalogColour = (typeof catalog.product.colours)[number];
export type CatalogVariant = (typeof catalog.product.variants)[number];
export type CatalogAsset = (typeof catalog.assets)[number];
export type SourceReview = (typeof reviewData.items)[number];

export const SOURCE_URL = catalog.source;
export const portedAt = catalog.portedAt;
export const sourceProduct = catalog.product;

export const COLOURS: CatalogColour[] = catalog.product.colours;
export const SIZES: string[] = catalog.product.sizes;
export const SOURCE_PRICE: number = catalog.product.price;

export const colourByName = (name: string) =>
  COLOURS.find((c) => c.name === name) ?? COLOURS[0];

/** True when the store reports this colour/size as sold out. */
export function isSoldOut(colour: string, size: string) {
  const v = catalog.product.variants.find(
    (x) => x.colour === colour && x.size === size,
  );
  return v ? v.available === false : false;
}

export const ASSETS: CatalogAsset[] = catalog.assets;
export const REVIEW_DATA = reviewData;

/** Dollar amounts: "$34.95", "$70", "FREE" for zero. */
export const money = (n: number) =>
  n === 0 ? "FREE" : `$${n.toFixed(2).replace(/\.00$/, "")}`;
