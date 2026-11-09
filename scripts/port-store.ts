/**
 * Snapshots the competitor's product, photos, demo video and a curated set of
 * reviews into this repo, so the concept pages never call the live store.
 *
 *   npm run store:port              # fetch product + reviews, download missing files
 *   npm run store:port -- --force   # re-download files that already exist
 *
 * Output:
 *   app/data/catalog.json      product options, every variant, price, and the asset list
 *   app/data/reviews.json      Judge.me summary + the curated reviews (exact text)
 *   app/assets/store/*.webp    photos at native size (max 1600, never upscaled)
 *   public/video/demo.mp4      the store's silent hero clip (+ demo.jpg poster)
 *
 * Every file records the public URL it came from. Nothing here is cleared for
 * production use: see docs/asset-manifest.md (npm run assets:manifest).
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import sharp from "sharp";

const STORE = "https://maggies-tanks.com";
const HANDLE = "maggies-built-in-comfort-bra-tanktop";
const SHOP_DOMAIN = "4r0jeh-pr.myshopify.com";
const CDN = "https://cdn.shopify.com/s/files/1/0767/9354/4875/files";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imageDir = join(root, "app/assets/store");
const videoDir = join(root, "public/video");
const catalogFile = join(root, "app/data/catalog.json");
const reviewsFile = join(root, "app/data/reviews.json");

const { values: args } = parseArgs({
  options: { force: { type: "boolean", default: false } },
});

const UA = { "user-agent": "Mozilla/5.0 (concept research snapshot)" };

async function json<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { accept: "application/json", ...UA },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return (await res.json()) as T;
}

async function download(url: string): Promise<Buffer> {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${res.status}: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

/** Saves a photo as webp at its native size (fit inside 1600, no upscaling). */
async function saveImage(src: string, name: string) {
  const out = join(imageDir, `${name}.webp`);
  if (!existsSync(out) || args.force) {
    await sharp(await download(src))
      .resize({
        width: 1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 86 })
      .toFile(out);
    console.log(`saved ${name}.webp`);
  }
  const m = await sharp(out).metadata();
  return { width: m.width ?? 0, height: m.height ?? 0 };
}

// ── Product ────────────────────────────────────────────────────────────────

type ShopifyImage = {
  id: number;
  position: number;
  src: string;
  width: number;
  height: number;
  alt: string | null;
};
type ShopifyVariant = {
  id: number;
  title: string;
  option1: string;
  option2: string;
  price: string;
  compare_at_price: string | null;
  sku: string;
  image_id: number | null;
};
type ShopifyProduct = {
  id: number;
  handle: string;
  title: string;
  options: { name: string; values: string[] }[];
  variants: ShopifyVariant[];
  images: ShopifyImage[];
};

const { product } = await json<{ product: ShopifyProduct }>(
  `${STORE}/products/${HANDLE}.json`,
);
// products/<handle>.js carries live availability; the .json endpoint does not.
const live = await json<{ variants: { id: number; available: boolean }[] }>(
  `${STORE}/products/${HANDLE}.js`,
);
const available = new Map(live.variants.map((v) => [v.id, v.available]));

/** "Coffee (running low)" → name "Coffee", stockNote "running low". */
function splitColour(value: string) {
  const m = value.match(/^(.*?)\s*\((.+)\)\s*$/);
  return m ? { name: m[1], stockNote: m[2] } : { name: value, stockNote: null };
}
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const colourOption = product.options.find((o) => o.name === "Color")!;
const sizeOption = product.options.find((o) => o.name === "Size")!;
const imageById = new Map(product.images.map((im) => [im.id, im]));

/** Swatch hex values, picked from each colour's product photo (not store data). */
const SWATCH: Record<string, string> = {
  Nude: "#e6c9a3",
  Coffee: "#6a3a22",
  Black: "#1c1c1c",
  Khaki: "#c8b48a",
  "Red Wine": "#b5162b",
  "Blush Pink": "#d8a7a1",
  Grey: "#7c7c80",
  White: "#f4f4f2",
  "Pastel Pink": "#f3c5d2",
  "Pastel Yellow": "#efe1a6",
  "Pastel Purple": "#cdb8e6",
  "Pastel Blue": "#1f6fc0",
  "Navy Blue": "#1d2747",
};

type Asset = {
  name: string;
  file: string;
  source: string;
  width: number;
  height: number;
  /** product = the store's product media; page = section images on the store's pages. */
  origin: "product" | "page" | "review" | "video";
  use: string;
  flags: string[];
};
const assets: Asset[] = [];

const colours = [];
for (const value of colourOption.values) {
  const { name, stockNote } = splitColour(value);
  const variant = product.variants.find(
    (v) => v.option1 === value && v.image_id,
  );
  const im = variant?.image_id ? imageById.get(variant.image_id) : undefined;
  if (!im) throw new Error(`No image for colour ${value}`);
  const assetName = `colour-${slug(name)}`;
  const size = await saveImage(im.src, assetName);
  const filename = im.src.split("/").pop()!.split("?")[0];
  assets.push({
    name: assetName,
    file: `app/assets/store/${assetName}.webp`,
    source: im.src.split("?")[0],
    ...size,
    origin: "product",
    use: `Colour swatch photo (${name}), bundle cards, cart`,
    flags: [
      "rights",
      ...(/freepik|chatgpt|magnific|nano/i.test(filename) ? ["ai-likely"] : []),
      ...(size.width < 1600 ? ["low-res"] : []),
      ...(size.width !== size.height ? ["not-square"] : []),
    ],
  });
  colours.push({
    name,
    value,
    stockNote,
    swatch: SWATCH[name] ?? "#cccccc",
    image: assetName,
  });
}

/**
 * Product media that isn't tied to a colour, by position in the store's media
 * list. `use` says where the concepts show it; unused ones are recorded so
 * the manifest lists everything the store has.
 */
const PRODUCT_MEDIA: Record<
  number,
  { name: string; use: string; flags?: string[] }
> = {
  1: {
    name: "front",
    use: "Gallery 1 (benefit headline), guarantee, advertorial lead",
  },
  2: {
    name: "back",
    use: "Gallery 5 (how it works), lifestyle strip, value props",
  },
  3: { name: "strap", use: "Gallery 5 (how it works), value props" },
  4: { name: "cup-detail", use: "Gallery 4 (what's included), details" },
  5: { name: "mirror", use: "Gallery 2 (lifestyle), advertorial" },
  6: {
    name: "layers-infographic",
    use: "Not used: words are baked into the image",
    flags: ["text-baked-in"],
  },
};
for (const [pos, spec] of Object.entries(PRODUCT_MEDIA)) {
  const im = product.images.find((x) => x.position === Number(pos))!;
  const size = await saveImage(im.src, spec.name);
  assets.push({
    name: spec.name,
    file: `app/assets/store/${spec.name}.webp`,
    source: im.src.split("?")[0],
    ...size,
    origin: "product",
    use: spec.use,
    flags: [
      "rights",
      ...(/freepik|chatgpt|magnific|nano/i.test(im.src) ? ["ai-likely"] : []),
      ...(size.width < 1600 ? ["low-res"] : []),
      ...(spec.flags ?? []),
    ],
  });
}

/** Section images from the store's homepage and product page. */
const PAGE_IMAGES: {
  name: string;
  url: string;
  use: string;
  flags: string[];
  download?: boolean;
}[] = [
  {
    name: "portrait",
    url: "https://maggies-tanks.com/cdn/shop/files/hf_20260527_133432_d741e66e-6b29-42b3-bb8d-15c222e09a72_1.png",
    use: "Hero / comparison hub cover, lifestyle strip, advertorial",
    flags: ["rights", "ai-likely"],
  },
  {
    name: "pull-on",
    url: "https://maggies-tanks.com/cdn/shop/files/magnific_nano-banana-sharon-builti_fFVbbbeCDY.png",
    use: "Gallery 5 (how it works: pull it on), value props, advertorial",
    flags: ["rights", "ai-likely", "low-res"],
  },
  {
    name: "brown-pair",
    url: "https://maggies-tanks.com/cdn/shop/files/magnific_nanobananapro-targeted-ed_NZFPYVl6D9.png",
    use: "Lifestyle strip, value props, advertorial",
    flags: ["rights", "ai-likely", "low-res"],
  },
  {
    name: "bra-vs-tank",
    url: "https://maggies-tanks.com/cdn/shop/files/BEFORE_AFTER_BRATANNK.png",
    use: "Gallery 3 (vs a traditional bra), labelled by construction only",
    flags: ["rights", "before-after", "low-res"],
  },
  {
    name: "brown-collage",
    url: "https://maggies-tanks.com/cdn/shop/files/marys_hero1.png",
    use: "Advertorial (product close-ups)",
    flags: ["rights", "ai-likely", "low-res"],
  },
  {
    name: "ba-back-linda",
    url: `${CDN}/ba-back-linda_2.jpg`,
    use: "Not used: before/after that implies a body-shape result",
    flags: ["rights", "before-after"],
    download: false,
  },
  {
    name: "ba-closet-susan",
    url: `${CDN}/ba-closet-susan_2.jpg`,
    use: "Not used: before/after that implies a body-shape result",
    flags: ["rights", "before-after"],
    download: false,
  },
  {
    name: "ba-back",
    url: "https://cdn.shopify.com/s/files/1/0962/4692/3588/files/ba-back_1.png",
    use: "Not used: before/after; served from a different Shopify store",
    flags: ["rights", "before-after", "cross-store"],
    download: false,
  },
  {
    name: "ba-closet",
    url: "https://cdn.shopify.com/s/files/1/0962/4692/3588/files/ba-closet_1.png",
    use: "Not used: before/after; served from a different Shopify store",
    flags: ["rights", "before-after", "cross-store"],
    download: false,
  },
  {
    name: "size-chart",
    url: "https://maggies-tanks.com/cdn/shop/files/maggies-size-chart-true-v2.png",
    use: "Not used: baked-in text, and its bust ranges conflict with the size finder",
    flags: ["rights", "text-baked-in", "conflicting"],
    download: false,
  },
  {
    name: "measure-bust",
    url: `${CDN}/maggies-how-to-measure-bust.png`,
    use: "Not used: baked-in text; the size guide writes the steps in HTML",
    flags: ["rights", "text-baked-in"],
    download: false,
  },
  {
    name: "founder",
    url: "https://maggies-tanks.com/cdn/shop/files/bd4e3467ee3debbae4b6e0e59fea618672d741b4.png",
    use: "Not used: the founder story (“Maggie, 67”) is unverified",
    flags: ["rights", "unverified-person"],
    download: false,
  },
];
for (const p of PAGE_IMAGES) {
  if (p.download === false) {
    assets.push({
      name: p.name,
      file: "(not downloaded)",
      source: p.url,
      width: 0,
      height: 0,
      origin: "page",
      use: p.use,
      flags: p.flags,
    });
    continue;
  }
  const size = await saveImage(p.url, p.name);
  assets.push({
    name: p.name,
    file: `app/assets/store/${p.name}.webp`,
    source: p.url,
    ...size,
    origin: "page",
    use: p.use,
    flags: p.flags,
  });
}

// ── Demo video ─────────────────────────────────────────────────────────────

/** The homepage hero loop: 720 × 720, about 6 s, no audio track. */
const VIDEO = {
  src: "https://cdn.shopify.com/videos/c/vp/657b921248e74bcd91c4d172538a47a8/657b921248e74bcd91c4d172538a47a8.HD-720p-1.6Mbps-91885939.mp4",
  poster: `${CDN}/hero-video-poster.jpg`,
};
mkdirSync(videoDir, { recursive: true });
const videoOut = join(videoDir, "demo.mp4");
if (!existsSync(videoOut) || args.force) {
  writeFileSync(videoOut, await download(VIDEO.src));
  console.log("saved public/video/demo.mp4");
}
const posterOut = join(videoDir, "demo.jpg");
if (!existsSync(posterOut) || args.force) {
  await sharp(await download(VIDEO.poster))
    .jpeg({ quality: 86 })
    .toFile(posterOut);
}
assets.push({
  name: "demo-video",
  file: "public/video/demo.mp4",
  source: VIDEO.src,
  width: 720,
  height: 720,
  origin: "video",
  use: "Gallery item 8 (silent demo loop), after the seven slides",
  flags: ["rights", "before-after", "low-res"],
});

// ── Reviews (Judge.me public widget data) ──────────────────────────────────

/**
 * Curated by hand from the newest 200 reviews: 4–5★, clearly about this tank,
 * no medical, weight-loss or "slimming" claims, and no competitor brand name
 * in the quote. Text is copied exactly, typos included.
 */
const PICKED = [
  "Yutta",
  "Carol",
  "Eileen",
  "Becki",
  "Cathy",
  "Annmarie",
  "Heather Kurtin",
  "Laurel",
  "Diane",
  "Esskaye",
  "Victoria",
  "Barb",
];
/** The one exact quote to use when a reviewer left more than one review. */
const PICK_TEXT: Record<string, RegExp> = {};

type JudgeReview = {
  uuid: string;
  rating: number | string;
  reviewer_name: string;
  verified_buyer: boolean;
  created_at: string;
  body_html: string;
  title: string;
  pictures_urls: { original: string }[];
};
type JudgeWidget = {
  number_of_reviews: number;
  average_rating: string;
  histogram: { rating: number; frequency: number; percentage: number }[];
  photo_gallery: JudgeReview[];
  reviews: JudgeReview[];
};

const widget = (page: number) =>
  json<JudgeWidget>(
    `https://api.judge.me/reviews/reviews_for_widget?url=${SHOP_DOMAIN}&shop_domain=${SHOP_DOMAIN}&platform=shopify&page=${page}&per_page=25&product_id=${product.id}`,
  );

const plainText = (html: string) =>
  html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

const first = await widget(1);
const pool: JudgeReview[] = [...first.photo_gallery, ...first.reviews];
for (let page = 2; page <= 8; page++)
  pool.push(...(await widget(page)).reviews);

const reviews = [];
for (const name of PICKED) {
  const r = pool.find(
    (x) =>
      x.reviewer_name === name &&
      Number(x.rating) >= 4 &&
      (!PICK_TEXT[name] || PICK_TEXT[name].test(x.body_html)),
  );
  if (!r) {
    console.warn(`review not found any more: ${name}`);
    continue;
  }
  let photo: string | null = null;
  if (r.pictures_urls[0]) {
    photo = `review-${slug(name)}`;
    const size = await saveImage(r.pictures_urls[0].original, photo);
    assets.push({
      name: photo,
      file: `app/assets/store/${photo}.webp`,
      source: r.pictures_urls[0].original.split("?")[0],
      ...size,
      origin: "review",
      use: "Gallery 7 (review), review wall",
      flags: ["rights", "real-person"],
    });
  }
  reviews.push({
    id: r.uuid,
    name: r.reviewer_name,
    rating: Number(r.rating),
    date: r.created_at.slice(0, 10),
    verified: r.verified_buyer,
    text: plainText(r.body_html),
    photo,
  });
}

writeFileSync(
  reviewsFile,
  JSON.stringify(
    {
      source: "Judge.me review widget on maggies-tanks.com",
      sourceUrl: `${STORE}/products/${HANDLE}`,
      fetchedAt: new Date().toISOString().slice(0, 10),
      summary: {
        count: first.number_of_reviews,
        average: Number(first.average_rating),
        histogram: first.histogram.map(({ rating, frequency, percentage }) => ({
          rating,
          frequency,
          percentage,
        })),
      },
      recentSample: {
        fiveStar: pool.filter((r) => Number(r.rating) === 5).length,
        total: pool.length,
      },
      items: reviews,
    },
    null,
    2,
  ) + "\n",
);

// ── Catalogue ──────────────────────────────────────────────────────────────

const prices = [...new Set(product.variants.map((v) => v.price))];
if (prices.length !== 1)
  console.warn(`More than one price: ${prices.join(", ")}`);

writeFileSync(
  catalogFile,
  JSON.stringify(
    {
      source: `${STORE}/products/${HANDLE}`,
      portedAt: new Date().toISOString().slice(0, 10),
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        price: Number(prices[0]),
        compareAtValues: [
          ...new Set(product.variants.map((v) => v.compare_at_price || null)),
        ],
        colours,
        sizes: sizeOption.values,
        variants: product.variants.map((v) => ({
          id: v.id,
          colour: splitColour(v.option1).name,
          size: v.option2,
          sku: v.sku,
          price: Number(v.price),
          compareAt: v.compare_at_price ? Number(v.compare_at_price) : null,
          available: available.get(v.id) ?? null,
        })),
      },
      assets,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `\n${product.variants.length} variants, ${colours.length} colours, ${reviews.length} reviews, ${assets.length} assets → app/data/`,
);
