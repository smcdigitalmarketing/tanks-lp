/**
 * Exports every concept's gallery slides as 1600 × 1600 JPGs for Shopify.
 *
 *   npm run dev                                          # in another terminal
 *   npm run gallery:export -- --base http://localhost:5173
 *
 * The /gallery page is the source of truth: every download link on it names a
 * file, and this script renders that slide at /gallery/render/<slug>/<n> and
 * saves it to public/gallery/<slug>/<nn>-<kind>.jpg.
 */
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { chromium, type Browser } from "playwright-core";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { values: args } = parseArgs({
  options: {
    base: {
      type: "string",
      default: process.env.GALLERY_BASE_URL ?? "http://localhost:5173",
    },
  },
});
const base = args.base!.replace(/\/$/, "");

async function launch(): Promise<Browser> {
  // Prefer the installed Google Chrome; fall back to a Playwright-managed Chromium.
  try {
    return await chromium.launch({ channel: "chrome" });
  } catch {
    return await chromium.launch();
  }
}

const browser = await launch();
const page = await browser.newPage({
  viewport: { width: 1600, height: 1600 },
  deviceScaleFactor: 1,
});

await page.goto(`${base}/gallery`, { waitUntil: "networkidle" });
const files = await page.$$eval('a[download][href^="/gallery/"]', (as) =>
  as.map((a) => a.getAttribute("href")!),
);
if (!files.length)
  throw new Error(`No download links found on ${base}/gallery`);

let done = 0;
for (const file of files) {
  const m = file.match(/^\/gallery\/([^/]+)\/(\d+)-([a-zA-Z]+)\.jpg$/);
  if (!m) throw new Error(`Unexpected file name: ${file}`);
  const [, slug, nn, kind] = m;
  await page.goto(`${base}/gallery/render/${slug}/${Number(nn)}`, {
    waitUntil: "networkidle",
  });
  await page.evaluate(() => document.fonts.ready);
  const el = page.locator(`[data-gallery-render="${kind}"]`);
  const png = await el.screenshot({ type: "png" });
  const out = join(root, "public", file);
  mkdirSync(dirname(out), { recursive: true });
  await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
  done++;
  console.log(`✓ ${file}`);
}

await browser.close();
console.log(`\n${done} image(s) → public/gallery/`);
