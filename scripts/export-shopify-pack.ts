/**
 * Pulls every asset from the live Maggie's Tanks store into an upload pack
 * for a new Shopify store: all products at original size, product videos,
 * every image and video used on the store's pages, all Judge.me reviews,
 * and a Shopify product import CSV.
 *
 *   npm run store:pack                    # download what's missing
 *   npm run store:pack -- --force         # re-download everything
 *   npm run store:pack -- --skip-pages    # products and reviews only
 *   npm run store:pack -- --delay 2500    # ms between store requests
 *
 * Output (gitignored): export/shopify-pack/
 *   products/<handle>/NN-<file>   product images and videos, original size
 *   theme/<file>                  images and videos found on the store's pages
 *   reviews/judgeme-import.csv    every review, Judge.me import columns
 *   reviews/photos/<file>         review photos
 *   products.csv                  Shopify product import file
 *   manifest.csv                  every file, its source URL and where it came from
 *   README.md                     how to upload it
 *
 * Public URLs only. Store requests are paced and honour Retry-After.
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import sharp from "sharp";

const STORE = "https://maggies-tanks.com";
const SHOP_DOMAIN = "4r0jeh-pr.myshopify.com";
/** The store's own file CDN; maggies-tanks.com/cdn/shop/files/X is the same file. */
const FILES_CDN = "https://cdn.shopify.com/s/files/1/0767/9354/4875/files";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "export/shopify-pack");

const { values: args } = parseArgs({
  options: {
    force: { type: "boolean", default: false },
    "skip-pages": { type: "boolean", default: false },
    delay: { type: "string", default: "1500" },
  },
});
const STORE_DELAY = Number(args.delay);
const UA = { "user-agent": "Mozilla/5.0 (store asset export)" };

// ── HTTP: paced, retried ───────────────────────────────────────────────────

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const lastHit = new Map<string, number>();

/** Fetch with a per-host gap and retries on 429 / 5xx (honours Retry-After). */
async function get(url: string, accept = "*/*", tries = 8): Promise<Response> {
  const host = new URL(url).host;
  const gap = host === new URL(STORE).host ? STORE_DELAY : 250;
  for (let attempt = 1; ; attempt++) {
    const since = Date.now() - (lastHit.get(host) ?? 0);
    if (since < gap) await wait(gap - since);
    lastHit.set(host, Date.now());
    const res = await fetch(url, { headers: { accept, ...UA } });
    if (res.ok) return res;
    if ((res.status === 429 || res.status >= 500) && attempt < tries) {
      const after = Number(res.headers.get("retry-after")) || 30;
      console.log(`  ${res.status} on ${url}, waiting ${after}s`);
      await res.body?.cancel();
      await wait(after * 1000 + 1000);
      continue;
    }
    throw new Error(`${res.status} ${res.statusText}: ${url}`);
  }
}
const json = async <T>(url: string, tries?: number) =>
  (await (await get(url, "application/json", tries)).json()) as T;
const text = async (url: string, tries?: number) =>
  (await get(url, "text/html", tries)).text();

// ── Files and manifest ─────────────────────────────────────────────────────

type Entry = {
  file: string;
  source: string;
  kind:
    | "product-image"
    | "product-video"
    | "page-image"
    | "page-video"
    | "review-photo";
  from: string;
  width: number | null;
  height: number | null;
  bytes: number;
  flags: string[];
};
const manifest: Entry[] = [];
const failed: { source: string; from: string; error: string }[] = [];

const safeName = (s: string) =>
  decodeURIComponent(s)
    .replace(/[^\w.\-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(-140);
const baseName = (url: string) =>
  safeName(new URL(url).pathname.split("/").pop()!);

/** Downloads `url` to `rel` (relative to the pack) unless it's already there. */
async function save(
  url: string,
  rel: string,
  entry: Omit<Entry, "file" | "source" | "width" | "height" | "bytes">,
) {
  const path = join(out, rel);
  try {
    if (!existsSync(path) || args.force) {
      mkdirSync(dirname(path), { recursive: true });
      const buf = Buffer.from(await (await get(url)).arrayBuffer());
      writeFileSync(path, buf);
      console.log(`  saved ${rel}`);
    }
    let width: number | null = null;
    let height: number | null = null;
    if (/\.(jpe?g|png|webp|gif|avif|tiff?)$/i.test(rel)) {
      const m = await sharp(path)
        .metadata()
        .catch(() => null);
      width = m?.width ?? null;
      height = m?.height ?? null;
    }
    manifest.push({
      file: rel,
      source: url,
      width,
      height,
      bytes: statSync(path).size,
      ...entry,
    });
    return true;
  } catch (e) {
    failed.push({
      source: url,
      from: entry.from,
      error: String((e as Error).message),
    });
    console.warn(`  failed ${url}: ${(e as Error).message}`);
    return false;
  }
}

// ── Products ───────────────────────────────────────────────────────────────

type Variant = {
  id: number;
  title: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  sku: string | null;
  price: string;
  compare_at_price: string | null;
  grams: number;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image: { src: string } | null;
};
type Product = {
  id: number;
  handle: string;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string[] | string;
  options: { name: string; position: number; values: string[] }[];
  variants: Variant[];
  images: {
    id: number;
    position: number;
    src: string;
    alt?: string | null;
    variant_ids: number[];
  }[];
};
type JsMedia = {
  media_type: "image" | "video" | "external_video" | "model";
  alt: string | null;
  position: number;
  src?: string;
  host?: string;
  external_id?: string;
  sources?: {
    format: string;
    mime_type: string;
    url: string;
    width: number;
    height: number;
  }[];
};

console.log("Sitemap");
const sitemap = await text(`${STORE}/sitemap.xml`);
const childMaps = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].replace(/&amp;/g, "&"),
);
const sitemapUrls: string[] = [];
/** Product handle → image URLs listed for it in the product sitemap. */
const sitemapImages = new Map<string, string[]>();
for (const map of childMaps) {
  const xml = await text(map);
  for (const block of xml.split(/<url>/).slice(1)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1].replace(/&amp;/g, "&");
    if (!loc) continue;
    sitemapUrls.push(loc);
    const handle = loc.match(/\/products\/([^/?#]+)$/)?.[1];
    if (handle)
      sitemapImages.set(
        handle,
        [...block.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) =>
          stripQuery(m[1].replace(/&amp;/g, "&")),
        ),
      );
  }
}
const sitemapHandles = [...sitemapImages.keys()];
console.log(`  ${sitemapUrls.length} URLs, ${sitemapHandles.length} products`);

console.log("Products");
const products: Product[] = [];
/**
 * Shopify's edge sometimes rate-limits the product JSON for a long time
 * (429 on every retry). Then the pack is files only: product images come
 * from the sitemap and the last `store:port` snapshot, and no products.csv
 * is written (export it from the Shopify admin instead).
 */
let productDataBlocked = false;
try {
  for (let page = 1; ; page++) {
    const { products: batch } = await json<{ products: Product[] }>(
      `${STORE}/products.json?limit=250&page=${page}`,
      3,
    );
    products.push(...batch);
    if (batch.length < 250) break;
  }
  // Handles in the sitemap but not in products.json (e.g. hidden from the catalogue).
  const known = new Set(products.map((p) => p.handle));
  for (const handle of sitemapHandles) {
    if (known.has(handle)) continue;
    const { product } = await json<{ product: Product }>(
      `${STORE}/products/${handle}.json`,
      3,
    );
    products.push(product);
    known.add(product.handle);
  }
  console.log(
    `  ${products.length} products, ${products.reduce((n, p) => n + p.variants.length, 0)} variants`,
  );
} catch (e) {
  productDataBlocked = true;
  products.length = 0;
  console.log(
    `  product data blocked (${(e as Error).message}); downloading files only`,
  );
}

/** The last `npm run store:port` snapshot: the tank's id and file URLs. */
type Snapshot = {
  product: { id: number; handle: string };
  assets: { name: string; source: string; origin: string }[];
};
const snapshot = JSON.parse(
  readFileSync(join(root, "app/data/catalog.json"), "utf8"),
) as Snapshot;

if (productDataBlocked) {
  for (const handle of sitemapHandles) {
    const urls = [...(sitemapImages.get(handle) ?? [])];
    if (handle === snapshot.product.handle)
      for (const a of snapshot.assets)
        if (a.origin === "product" || a.origin === "video")
          urls.push(stripQuery(a.source));
    const unique = [...new Set(urls)];
    console.log(`- ${handle}: ${unique.length} files`);
    for (const [i, url] of unique.entries()) {
      const isVideo = /\.(mp4|mov|webm|m4v)$/i.test(url);
      await save(
        url,
        `products/${handle}/${String(i + 1).padStart(2, "0")}-${baseName(url)}`,
        {
          kind: isVideo ? "product-video" : "product-image",
          from: `/products/${handle}`,
          flags: aiFlag(url),
        },
      );
    }
  }
}

const altBySrc = new Map<string, string>();
const productVideos: { handle: string; url: string }[] = [];
const externalVideos: { handle: string; url: string }[] = [];

for (const p of products) {
  console.log(`- ${p.handle}`);
  const js = await json<{ media?: JsMedia[] }>(
    `${STORE}/products/${p.handle}.js`,
  );
  for (const m of js.media ?? []) {
    if (m.media_type === "image" && m.src && m.alt)
      altBySrc.set(stripQuery(abs(m.src)), m.alt);
    if (m.media_type === "video" && m.sources?.length) {
      const best = [...m.sources]
        .filter((s) => s.format === "mp4" || s.mime_type === "video/mp4")
        .sort((a, b) => b.height - a.height)[0];
      if (best) productVideos.push({ handle: p.handle, url: abs(best.url) });
    }
    if (m.media_type === "external_video" && m.external_id)
      externalVideos.push({
        handle: p.handle,
        url:
          m.host === "vimeo"
            ? `https://vimeo.com/${m.external_id}`
            : `https://www.youtube.com/watch?v=${m.external_id}`,
      });
  }
  for (const im of [...p.images].sort((a, b) => a.position - b.position)) {
    const url = stripQuery(im.src);
    await save(
      url,
      `products/${p.handle}/${String(im.position).padStart(2, "0")}-${baseName(url)}`,
      {
        kind: "product-image",
        from: `/products/${p.handle}`,
        flags: aiFlag(url),
      },
    );
  }
  const vids = productVideos.filter((v) => v.handle === p.handle);
  for (const [i, v] of vids.entries()) {
    await save(
      v.url,
      `products/${p.handle}/video-${i + 1}-${baseName(v.url)}`,
      {
        kind: "product-video",
        from: `/products/${p.handle}`,
        flags: [],
      },
    );
  }
}

// ── Page and theme assets ──────────────────────────────────────────────────

function abs(u: string) {
  return u.startsWith("//") ? `https:${u}` : u;
}
function stripQuery(u: string) {
  return u.split("?")[0].split("#")[0];
}
function aiFlag(url: string) {
  return /freepik|chatgpt|magnific|nano|midjourney|dall-?e/i.test(url)
    ? ["ai-likely"]
    : [];
}

/**
 * Turns any reference to a store file into the original file's CDN URL:
 * drops the query (?v=, &width=), Liquid size suffixes (_1024x, _{width}x)
 * and maps maggies-tanks.com/cdn/shop/... to cdn.shopify.com.
 */
function normalise(raw: string): string | null {
  let u = abs(raw.replace(/&amp;/g, "&").replace(/\\\//g, "/"));
  u = stripQuery(u);
  if (/\{|%7B/i.test(u))
    u = u.replace(
      /_(?:\{width\}|%7Bwidth%7D)x(?:\{height\}|%7Bheight%7D)?/gi,
      "",
    );
  if (/\{|%7B/i.test(u)) return null;
  u = u.replace(
    /_(?:\d+x\d*|\d*x\d+|pico|icon|thumb|small|compact|medium|large|grande|master)(?:_crop_\w+)?(?:@\dx)?(?=\.\w+$)/i,
    "",
  );
  const own = u.match(
    /^https?:\/\/(?:www\.)?maggies-tanks\.com\/cdn\/shop\/(files|videos)\/(.+)$/,
  );
  if (own)
    u =
      own[1] === "files"
        ? `${FILES_CDN}/${own[2]}`
        : `https://cdn.shopify.com/videos/${own[2]}`;
  if (!/^https:\/\/cdn\.shopify\.com\/(s\/files\/|videos\/)/.test(u))
    return null;
  if (!/\.(jpe?g|png|webp|gif|avif|svg|mp4|mov|webm|m4v)$/i.test(u))
    return null;
  return u;
}

/** Shopify video renditions: keep one per video, the highest resolution. */
function videoKey(u: string) {
  const m = u.match(/\/videos\/c\/vp\/([0-9a-f]+)\//);
  return m ? m[1] : u;
}
const rendition = (u: string) => Number(u.match(/(\d{3,4})p/)?.[1] ?? 0);

const ASSET_RE =
  /(?:https?:)?\/\/(?:(?:www\.)?maggies-tanks\.com\/cdn\/shop\/(?:files|videos)\/|cdn\.shopify\.com\/(?:s\/files\/|videos\/))[^"'\s)<>,\\]+/g;

const productFiles = new Set(manifest.map((e) => e.source));
const pageAssets = new Map<string, Set<string>>();
const videoBest = new Map<string, string>();

if (!args["skip-pages"]) {
  const pages = [
    `${STORE}/`,
    `${STORE}/collections/all`,
    ...sitemapHandles.map((h) => `${STORE}/products/${h}`),
    ...sitemapUrls.filter((u) => /\/(pages|blogs|collections)\//.test(u)),
  ];
  const unique = [...new Set(pages)];
  console.log(`\nPages (${unique.length})`);

  // Page files the last snapshot found (homepage and product page), in case
  // those pages are rate-limited now.
  for (const a of snapshot.assets) {
    if (a.origin !== "page") continue;
    const u = normalise(a.source);
    if (u && !productFiles.has(u))
      pageAssets.set(u, new Set([`(store:port snapshot: ${a.name})`]));
  }

  for (const page of unique) {
    let html: string;
    try {
      // When product data is blocked, product pages usually are too: don't wait on them.
      html = await text(page, productDataBlocked ? 1 : 3);
    } catch (e) {
      failed.push({
        source: page,
        from: "page crawl",
        error: String((e as Error).message),
      });
      continue;
    }
    const path = new URL(page).pathname;
    let n = 0;
    for (const m of html.matchAll(ASSET_RE)) {
      const u = normalise(m[0]);
      if (!u || productFiles.has(u)) continue;
      if (/\/videos\//.test(u)) {
        const key = videoKey(u);
        const cur = videoBest.get(key);
        if (cur && rendition(u) <= rendition(cur)) {
          if (cur !== u) pageAssets.get(cur)?.add(new URL(page).pathname);
          continue;
        }
        if (cur) {
          const from = pageAssets.get(cur);
          pageAssets.delete(cur);
          if (from) pageAssets.set(u, from);
        }
        videoBest.set(key, u);
      }
      if (!pageAssets.has(u)) pageAssets.set(u, new Set());
      pageAssets.get(u)!.add(path);
      n++;
    }
    console.log(`  ${path}: ${n} refs`);
  }

  console.log(`\nPage assets (${pageAssets.size})`);
  const used = new Set<string>();
  for (const [url, from] of pageAssets) {
    let name = baseName(url);
    if (used.has(name)) name = `${videoKey(url).slice(0, 8)}-${name}`;
    used.add(name);
    const fromList = [...from];
    await save(url, `theme/${name}`, {
      kind: /\.(mp4|mov|webm|m4v)$/i.test(url) ? "page-video" : "page-image",
      from:
        fromList.slice(0, 3).join(" ") +
        (fromList.length > 3 ? ` (+${fromList.length - 3} more)` : ""),
      flags: [
        ...aiFlag(url),
        ...(url.includes(FILES_CDN) || url.includes("/videos/")
          ? []
          : ["other-store"]),
      ],
    });
  }
}

// ── Reviews ────────────────────────────────────────────────────────────────

type JudgeReview = {
  uuid: string;
  title: string | null;
  body_html: string;
  rating: number | string;
  reviewer_name: string;
  verified_buyer: boolean;
  created_at: string;
  pictures_urls: { original: string }[];
};
const plainText = (html: string) =>
  html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+/g, " ")
    .trim();

console.log("\nReviews");
const reviewRows: string[][] = [];
/** Reviews Judge.me says exist; its public widget stops after 40 pages (1,000). */
let reviewTotal = 0;
const reviewProducts = productDataBlocked
  ? [{ id: snapshot.product.id, handle: snapshot.product.handle }]
  : products;
for (const p of reviewProducts) {
  const seen = new Set<string>();
  let total = 0;
  for (let page = 1; ; page++) {
    let w: { number_of_reviews: number; reviews: JudgeReview[] };
    try {
      w = await json(
        `https://api.judge.me/reviews/reviews_for_widget?url=${SHOP_DOMAIN}&shop_domain=${SHOP_DOMAIN}&platform=shopify&page=${page}&per_page=25&product_id=${p.id}`,
        3,
      );
    } catch (e) {
      failed.push({
        source: `judge.me reviews page ${page}`,
        from: p.handle,
        error: String((e as Error).message),
      });
      break;
    }
    total = w.number_of_reviews;
    if (page === 1) reviewTotal += total;
    const fresh = w.reviews.filter((r) => !seen.has(r.uuid));
    if (!fresh.length) break;
    for (const r of fresh) {
      seen.add(r.uuid);
      const photos: string[] = [];
      for (const [i, pic] of r.pictures_urls.entries()) {
        const url = stripQuery(pic.original);
        const ext = url.match(/\.\w+$/)?.[0] ?? ".jpg";
        const rel = `reviews/photos/${p.handle}-${r.uuid}-${i + 1}${ext}`;
        if (
          await save(url, rel, {
            kind: "review-photo",
            from: `review by ${r.reviewer_name}`,
            flags: ["customer-photo"],
          })
        )
          photos.push(url);
      }
      reviewRows.push([
        r.title ?? "",
        plainText(r.body_html),
        String(Number(r.rating)),
        r.created_at,
        r.reviewer_name,
        "",
        String(p.id),
        p.handle,
        r.verified_buyer ? "verified" : "",
        photos.join(","),
      ]);
    }
    if (seen.size >= total) break;
  }
  if (total) console.log(`  ${p.handle}: ${seen.size} of ${total}`);
}

// ── CSVs ───────────────────────────────────────────────────────────────────

const cell = (v: string | number | boolean | null | undefined) =>
  `"${String(v ?? "").replace(/"/g, '""')}"`;
const csv = (rows: (string | number | boolean | null | undefined)[][]) =>
  rows.map((r) => r.map(cell).join(",")).join("\n") + "\n";

const SHOPIFY_COLUMNS = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Option2 Name",
  "Option2 Value",
  "Option3 Name",
  "Option3 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Tracker",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Image Src",
  "Image Position",
  "Image Alt Text",
  "Variant Image",
  "Variant Weight Unit",
  "Status",
] as const;
type Col = (typeof SHOPIFY_COLUMNS)[number];

const productRows: string[][] = [];
for (const p of products) {
  const images = [...p.images].sort((a, b) => a.position - b.position);
  const opts = [...p.options].sort((a, b) => a.position - b.position);
  const rows = Math.max(p.variants.length, images.length);
  for (let i = 0; i < rows; i++) {
    const v = p.variants[i];
    const im = images[i];
    const r: Partial<Record<Col, string>> = { Handle: p.handle };
    if (i === 0) {
      Object.assign(r, {
        Title: p.title,
        "Body (HTML)": p.body_html ?? "",
        Vendor: p.vendor,
        Type: p.product_type,
        Tags: Array.isArray(p.tags) ? p.tags.join(", ") : p.tags,
        Published: "TRUE",
        Status: "active",
      });
    }
    if (v) {
      opts.forEach((o, k) => {
        const n = (k + 1) as 1 | 2 | 3;
        if (i === 0) r[`Option${n} Name`] = o.name;
        r[`Option${n} Value`] = v[`option${n}`] ?? "";
      });
      Object.assign(r, {
        "Variant SKU": v.sku ?? "",
        "Variant Grams": String(v.grams ?? 0),
        "Variant Inventory Tracker": "",
        "Variant Inventory Policy": "deny",
        "Variant Fulfillment Service": "manual",
        "Variant Price": v.price,
        "Variant Compare At Price": v.compare_at_price ?? "",
        "Variant Requires Shipping": v.requires_shipping ? "TRUE" : "FALSE",
        "Variant Taxable": v.taxable ? "TRUE" : "FALSE",
        "Variant Image": v.featured_image
          ? stripQuery(v.featured_image.src)
          : "",
        "Variant Weight Unit": "g",
      });
    }
    if (im) {
      const src = stripQuery(im.src);
      Object.assign(r, {
        "Image Src": src,
        "Image Position": String(im.position),
        "Image Alt Text": im.alt ?? altBySrc.get(src) ?? "",
      });
    }
    productRows.push(SHOPIFY_COLUMNS.map((c) => r[c] ?? ""));
  }
}

mkdirSync(join(out, "reviews"), { recursive: true });
if (!productDataBlocked)
  writeFileSync(
    join(out, "products.csv"),
    csv([[...SHOPIFY_COLUMNS], ...productRows]),
  );
writeFileSync(
  join(out, "reviews/judgeme-import.csv"),
  csv([
    [
      "title",
      "body",
      "rating",
      "review_date",
      "reviewer_name",
      "reviewer_email",
      "product_id",
      "product_handle",
      "verified",
      "picture_urls",
    ],
    ...reviewRows,
  ]),
);
writeFileSync(
  join(out, "manifest.csv"),
  csv([
    ["file", "kind", "width", "height", "bytes", "from", "flags", "source"],
    ...manifest.map((e) => [
      e.file,
      e.kind,
      e.width,
      e.height,
      e.bytes,
      e.from,
      e.flags.join(" "),
      e.source,
    ]),
    ...externalVideos.map((v) => [
      "(external, not downloaded)",
      "product-video",
      "",
      "",
      "",
      `/products/${v.handle}`,
      "external",
      v.url,
    ]),
    ...failed.map((f) => [
      "(failed)",
      "",
      "",
      "",
      "",
      f.from,
      f.error,
      f.source,
    ]),
  ]),
);

// ── README ─────────────────────────────────────────────────────────────────

const count = (k: Entry["kind"]) => manifest.filter((e) => e.kind === k).length;
const mb = (manifest.reduce((n, e) => n + e.bytes, 0) / 1e6).toFixed(1);
const variantCount = products.reduce((n, p) => n + p.variants.length, 0);

const productsTableRow = productDataBlocked
  ? ""
  : `| \`products.csv\` | ${products.length} products, ${variantCount} variants, in Shopify's product import format |\n`;

const productsSection = productDataBlocked
  ? `The store's product data (\`/products.json\` and the product pages) was rate-limited on the day of this pull, so this pack has the files only and no \`products.csv\`. ${sitemapHandles.length} products are in the sitemap; each folder in \`products/\` holds the image the sitemap lists for it, and \`${snapshot.product.handle}\` also has every image and the video from the last \`store:port\` snapshot.

To move the product data and full galleries: old store's Shopify admin → **Products → Export → All products** (CSV), then new store → **Products → Import** with that file. Its image URLs point at the Shopify CDN, so the images copy across while the old store is live. Or rerun \`npm run store:pack\` once the limit lifts; it then writes \`products.csv\` and every product's full gallery.
`
  : `Shopify admin → **Products → Import** → \`products.csv\`.

- \`Image Src\` points at the current Shopify CDN, so Shopify copies the images while the old store is still live. If it has closed, upload the files in \`products/<handle>/\` to each product instead.
- Stock levels aren't public, so the CSV leaves inventory untracked. Set tracking and quantities after import.
- Prices and compare-at prices are what the store showed on the day of the export.
- Option values are copied as-is, including any stock notes in them (e.g. "(running low)").
- Helper products used by apps (free gift, guarantee, how-to) are included; delete them if the new store doesn't need them.
${externalVideos.length ? `- ${externalVideos.length} YouTube/Vimeo videos are linked, not downloaded; see \`manifest.csv\`.\n` : ""}`;

writeFileSync(
  join(out, "README.md"),
  `# Maggie's Tanks: Shopify upload pack

Pulled from ${STORE} on ${new Date().toISOString().slice(0, 10)} by \`npm run store:pack\`. ${manifest.length} files, ${mb} MB.

| Folder / file | What |
|---|---|
${productsTableRow}| \`products/<handle>/\` | ${count("product-image")} product images and ${count("product-video")} product videos, original size |
| \`theme/\` | ${count("page-image")} images and ${count("page-video")} videos used on the homepage, landing pages and advertorials |
| \`reviews/judgeme-import.csv\` | ${reviewRows.length} of ${reviewTotal} Judge.me reviews (the public widget stops at 1,000 per product) |
| \`reviews/photos/\` | ${count("review-photo")} review photos |
| \`manifest.csv\` | every file with its source URL, size, the page it came from and flags${failed.length ? `; ${failed.length} failed downloads are listed at the end` : ""} |

## 1. Products

${productsSection}
## 2. Theme images and videos

Shopify admin → **Content → Files** → upload everything in \`theme/\`, then pick them in the theme editor. \`manifest.csv\` shows which page each file came from. Files flagged \`other-store\` were served from a different Shopify store's CDN.

## 3. Reviews

Best path: in the old store's Judge.me admin, **Settings → Import/Export → Export reviews**, then import that file in the new store. It keeps reviewer emails, verified status and replies, for every product.

\`reviews/judgeme-import.csv\` is the fallback, built from the public review widget (no emails${productDataBlocked ? `; only \`${snapshot.product.handle}\`, because the other products' ids weren't reachable` : ""}). Check its columns against Judge.me's current import template before uploading; \`picture_urls\` point at Judge.me's CDN and the files are also in \`reviews/photos/\`.
`,
);

console.log(
  `\n${productDataBlocked ? "files only (product data blocked)" : `${products.length} products`}, ${manifest.length} files (${mb} MB), ${reviewRows.length} reviews, ${failed.length} failed → export/shopify-pack/`,
);
