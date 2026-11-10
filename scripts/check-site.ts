/**
 * Clicks through the whole Hallie store in a real browser, at desktop and
 * phone width, and exits non-zero if anything fails.
 *
 *   npm run dev                                         # in one terminal
 *   npm run check -- --base http://localhost:5207       # in another
 *
 * Covers, in every offer: the product page (gallery, lightbox, bundles,
 * prices, colour and size selection, size gating, size guide, cart drawer,
 * quantity, cart page, the full test-mode checkout with validation and the
 * order confirmation, FAQ, phone menu, sticky bar), the homepage, the shop
 * (colour cards preselect the colour), the 7 Reasons and the advertorial
 * (CTAs keep the offer). Plus the help pages and contact form, the offer
 * switch, old concept URLs redirecting, /gallery, /sop, the 404 page, and
 * every internal link.
 */
import { parseArgs } from "node:util";
import { chromium, type Page } from "playwright-core";
import { offers, pricing } from "../app/content/offers.ts";

const { values: args } = parseArgs({
  options: {
    base: {
      type: "string",
      default: process.env.CHECK_BASE_URL ?? "http://localhost:5207",
    },
  },
});
const BASE = args.base!.replace(/\/$/, "");
const OFFERS = ["standard", "early-black-friday", "christmas"] as const;
const SEGMENT: Record<(typeof OFFERS)[number], string> = {
  standard: "",
  "early-black-friday": "/early-black-friday",
  christmas: "/christmas",
};
const SOP_ORDER = [
  "above-the-fold",
  "buy-box",
  "under-the-button",
  "details",
  "social-proof",
  "value-props",
  "closing",
];

const money = (n: number) => `$${n.toFixed(2).replace(/\.00$/, "")}`;
type OfferKey = (typeof OFFERS)[number];
const productPath = (o: OfferKey) => `/products/everyday-tank${SEGMENT[o]}`;
const advertorialPath = (o: OfferKey) =>
  `/pages/a-note-from-hallie${SEGMENT[o]}`;
const homePath = (o: OfferKey) => SEGMENT[o] || "/";
const reasonsPath = (o: OfferKey) => `/pages/7-reasons${SEGMENT[o]}`;
const shopPath = (o: OfferKey) => `/collections/all${SEGMENT[o]}`;

let failures = 0;
let passes = 0;
function check(ok: unknown, label: string) {
  if (ok) passes++;
  else {
    failures++;
    console.log(`  ✗ ${label}`);
  }
}

const links = new Set<string>();
async function collectLinks(page: Page) {
  for (const href of await page.$$eval("a[href]", (as) =>
    as.map((a) => a.getAttribute("href") ?? ""),
  )) {
    if (href.startsWith("/") && !href.startsWith("//"))
      links.add(href.split("#")[0] || "/");
  }
}

async function open(page: Page, path: string, errors: string[]) {
  errors.length = 0;
  const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
  check(res?.status() === 200, `${path} returns 200 (got ${res?.status()})`);
  await page.waitForTimeout(150); // let hydration finish
  await collectLinks(page);
}

async function productPage(
  page: Page,
  offerId: (typeof OFFERS)[number],
  phone: boolean,
  errors: string[],
) {
  const path = productPath(offerId);
  await open(page, path, errors);
  const offer = offers[offerId];
  const at = `${path} @${phone ? "phone" : "desktop"}`;

  // Section order follows the SOP.
  const order = await page.$$eval("[data-sop-section]", (els) =>
    els.map((e) => e.getAttribute("data-sop-section")),
  );
  check(
    JSON.stringify(order) === JSON.stringify(SOP_ORDER),
    `${at}: SOP section order ${order.join(",")}`,
  );

  // Gallery: 7 slides + video, navigation and lightbox.
  const counter = page.locator("text=/^\\d+ \\/ 8$/").first();
  check(
    (await counter.textContent())?.trim() === "1 / 8",
    `${at}: gallery shows 1 / 8`,
  );
  if (!phone) {
    await page.getByRole("button", { name: "Next image" }).click();
    await page.waitForTimeout(500);
    check(
      (await counter.textContent())?.trim() === "2 / 8",
      `${at}: next image moves to 2 / 8`,
    );
  }
  await page.getByRole("button", { name: "View larger" }).click();
  check(
    await page.getByRole("dialog").first().isVisible(),
    `${at}: lightbox opens`,
  );
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);

  // Bundles and dynamic pricing.
  for (const b of offer.bundles) {
    await page.locator(`[data-bundle="${b.id}"]`).first().click();
    const p = pricing(offer, b);
    const hero = await page.getByTestId("hero-price").textContent();
    check(
      hero?.includes(money(p.total)),
      `${at}: ${b.id} hero price ${money(p.total)} (saw "${hero}")`,
    );
    const total = await page.getByTestId("total").textContent();
    check(
      total === money(p.total),
      `${at}: ${b.id} total ${money(p.total)} (saw "${total}")`,
    );
  }
  check(
    (await page.locator("[data-flag=provisional]").count()) > 0 ===
      offer.provisional,
    `${at}: provisional flags match the offer`,
  );

  // Three tanks: colour tank 2, then try to buy without a size.
  await page.locator('[data-bundle="trio"]').first().click();
  const atc = page.getByTestId("add-to-cart");
  check(
    (await atc.textContent())?.includes("Choose a size"),
    `${at}: button asks for a size before one is chosen`,
  );
  await atc.click();
  check(
    (await page
      .locator("text=Choose a size for every tank to continue.")
      .count()) === 1,
    `${at}: size prompt appears`,
  );
  check(
    (await page.getByTestId("cart-line").count()) === 0,
    `${at}: nothing added without a size`,
  );
  await page.getByRole("button", { name: "Tank 2", exact: true }).click();
  await page.getByRole("radio", { name: "Red Wine" }).click();
  // Tank 2 is now Red Wine and the picker has moved on to tank 3 (Grey).
  const active = await page.getByTestId("active-colour").textContent();
  check(
    active === "Grey",
    `${at}: colour picker moves on to the next tank (saw "${active}")`,
  );

  // Size guide.
  await page.getByRole("button", { name: "Size guide" }).click();
  check(
    await page.getByRole("dialog", { name: /Size guide/ }).isVisible(),
    `${at}: size guide opens`,
  );
  await page.getByRole("button", { name: "Close size guide" }).click();

  // Pick a size and add to cart.
  await page
    .getByRole("radiogroup", { name: "Size", exact: true })
    .getByRole("radio", { name: "L", exact: true })
    .click();
  check(
    !(await atc.textContent())?.includes("Choose a size"),
    `${at}: button ready once a size is picked`,
  );
  await atc.click();
  await page.waitForTimeout(400);
  const lines = page.getByTestId("cart-line");
  check((await lines.count()) === 1, `${at}: one bundle line in the cart`);
  const units = await page.getByTestId("cart-line-units").first().textContent();
  check(
    units === "Nude/L, Red Wine/L, Grey/L",
    `${at}: cart lists each tank (saw "${units}")`,
  );
  const trio = pricing(
    offer,
    offer.bundles.find((b) => b.id === "trio")!,
  );
  check(
    (await page.getByTestId("cart-subtotal").textContent()) ===
      money(trio.total),
    `${at}: subtotal ${money(trio.total)}`,
  );
  await page.getByRole("button", { name: /^One more/ }).click();
  check(
    (await page.getByTestId("cart-line-qty").textContent()) === "2",
    `${at}: quantity goes to 2`,
  );
  check(
    (await page.getByTestId("cart-subtotal").textContent()) ===
      money(Math.round(trio.total * 200) / 100),
    `${at}: subtotal doubles`,
  );

  // The cart page shows the same line and total.
  const doubled = money(Math.round(trio.total * 200) / 100);
  await page.getByRole("link", { name: "View cart" }).click();
  await page.waitForURL("**/cart");
  check(
    (await page.getByTestId("cart-page-subtotal").textContent()) === doubled,
    `${at}: cart page subtotal ${doubled}`,
  );

  // Checkout: empty form is refused, a valid one places the order.
  await page.getByRole("button", { name: "Check out" }).first().click();
  await page.waitForURL("**/checkout");
  const form = page.getByTestId("checkout-form");
  check(
    (await form.getAttribute("data-pdp-variant")) === "hallie",
    `${at}: checkout tags pdp_variant`,
  );
  check(
    (await form.getAttribute("data-offer-ids")) === offerId,
    `${at}: checkout tags the offer`,
  );
  check(
    (await page.getByTestId("place-order").textContent())?.includes(doubled),
    `${at}: checkout button shows the total ${doubled}`,
  );
  await page.getByTestId("place-order").click();
  check(
    (await page.locator("[aria-invalid=true]").count()) >= 5,
    `${at}: empty checkout shows field errors`,
  );
  check(
    await page.evaluate(() => document.activeElement?.getAttribute("name") === "email"),
    `${at}: focus moves to the first error`,
  );
  await page.fill("[name=email]", "jane@example.com");
  await page.fill("[name=firstName]", "Jane");
  await page.fill("[name=lastName]", "Doe");
  await page.fill("[name=address1]", "12 Elm Street");
  await page.fill("[name=city]", "Portland");
  await page.selectOption("[name=state]", "OR");
  await page.fill("[name=zip]", "972");
  await page.getByTestId("place-order").click();
  check(
    (await page.locator("[aria-invalid=true]").count()) === 1,
    `${at}: a short ZIP is refused`,
  );
  await page.fill("[name=zip]", "97201");
  await page.getByTestId("place-order").click();
  await page.waitForURL("**/checkout/thank-you?order=HL*");
  const conf = page.getByTestId("order-confirmation");
  await conf.waitFor();
  check(
    /^HL\d{4,}$/.test((await page.getByTestId("order-number").textContent()) ?? ""),
    `${at}: confirmation shows an order number`,
  );
  check(
    (await page.getByTestId("order-total").textContent())?.includes(doubled),
    `${at}: confirmation total ${doubled}`,
  );
  check(
    (await conf.getAttribute("data-offer-ids")) === offerId,
    `${at}: order records the offer`,
  );
  check(
    (await page.getByTestId("order-address").textContent())?.includes("Portland, Oregon 97201"),
    `${at}: confirmation shows the address`,
  );

  // The cart is empty after the order.
  await open(page, path, errors);
  check(
    (await page.getByRole("button", { name: "Open cart, 0 items" }).count()) === 1,
    `${at}: cart is empty after the order`,
  );
  await page.locator('[data-bundle="single"]').first().click();
  await page
    .getByRole("radiogroup", { name: "Size", exact: true })
    .getByRole("radio", { name: "S", exact: true })
    .click();
  await page.getByTestId("add-to-cart").click();
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: /^Remove/ }).click();
  check(
    (await page.getByTestId("cart-line").count()) === 0,
    `${at}: line removed`,
  );
  await page.getByRole("button", { name: "Close cart" }).click();

  // FAQ accordion.
  const faq = page.locator("#faq details").nth(1);
  await faq.locator("summary").click();
  check(
    await faq.evaluate((d) => (d as HTMLDetailsElement).open),
    `${at}: FAQ item opens`,
  );

  // Sticky bar shows after scrolling past the button.
  await page.locator("#faq").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  check(
    await page
      .getByTestId("sticky-atc")
      .evaluate((el) => el.getAttribute("aria-hidden") === "false"),
    `${at}: sticky add to cart appears`,
  );

  // Phone menu.
  if (phone) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.getByRole("button", { name: "Open menu" }).click();
    check(
      (await page.locator("#mobile-menu a").count()) === 6,
      `${at}: phone menu has 6 links`,
    );
    await page.locator("#mobile-menu a", { hasText: "Help" }).click();
    await page.waitForURL("**/pages/faq");
    await page.waitForTimeout(300);
    check(
      (await page.locator("#mobile-menu").count()) === 0,
      `${at}: phone menu closes after a link`,
    );
  }
  check(errors.length === 0, `${at}: no page errors (${errors.join(" | ")})`);
}

async function advertorialPage(
  page: Page,
  offerId: OfferKey,
  errors: string[],
) {
  const path = advertorialPath(offerId);
  await open(page, path, errors);
  check(
    (await page.getByTestId("byline").textContent())?.includes("Brand content"),
    `${path}: labelled Brand content`,
  );
  const ctas = await page
    .getByTestId("advertorial-cta")
    .evaluateAll((as) => as.map((a) => a.getAttribute("href")));
  const target = productPath(offerId) + "#buy";
  check(
    ctas.length >= 2 && ctas.every((h) => h === target),
    `${path}: every CTA goes to ${target} (saw ${ctas.join(", ")})`,
  );
  await page.getByTestId("advertorial-cta").last().click();
  await page.waitForURL(`**${productPath(offerId)}*`);
  check(
    new URL(page.url()).pathname === productPath(offerId),
    `${path}: CTA lands on the product page`,
  );
  check(errors.length === 0, `${path}: no page errors (${errors.join(" | ")})`);
}

/** The homepage: hero, its own buy box, colour cards. */
async function homePage(
  page: Page,
  offerId: OfferKey,
  errors: string[],
) {
  const path = homePath(offerId);
  await open(page, path, errors);
  check(
    (await page.getByTestId("home-cta").getAttribute("href")) === "#buy",
    `${path}: hero button goes to the buy box`,
  );
  check(
    (await page.locator("#buy [data-testid=add-to-cart]").count()) === 1,
    `${path}: buy box on the page`,
  );
  check(
    offerId !== "christmas" ||
      (await page.getByTestId("gift-points").count()) === 1,
    `${path}: Christmas gifting section`,
  );
  const first = offers[offerId].bundles[0];
  await page.locator(`[data-bundle="${first.id}"]`).first().click();
  check(
    (await page.getByTestId("total").first().textContent())?.includes(
      money(first.price),
    ),
    `${path}: bundle price ${money(first.price)} in the buy box`,
  );
  const colourHref = await page.getByTestId("home-colour").first().getAttribute("href");
  check(
    colourHref?.startsWith(`${productPath(offerId)}?colour=`),
    `${path}: colour cards open the product page in the offer (${colourHref})`,
  );
  check(errors.length === 0, `${path}: no page errors (${errors.join(" | ")})`);
}

/** The 7 Reasons listicle: seven reasons, every CTA to the product page with the offer. */
async function reasonsPage(
  page: Page,
  offerId: OfferKey,
  errors: string[],
) {
  const path = reasonsPath(offerId);
  await open(page, path, errors);
  check(
    (await page.getByTestId("reason").count()) === 7,
    `${path}: seven reasons`,
  );
  const hrefs = await page
    .getByTestId("reasons-cta")
    .evaluateAll((els) => els.map((e) => e.getAttribute("href")));
  const target = `${productPath(offerId)}#buy`;
  check(
    hrefs.length === 4 && hrefs.every((h) => h === target),
    `${path}: 4 CTAs to ${target} (got ${hrefs.join(", ")})`,
  );
  await page.getByTestId("reasons-cta").last().click();
  await page.waitForURL(`**${productPath(offerId)}*`);
  check(
    new URL(page.url()).pathname === productPath(offerId),
    `${path}: CTA lands on the product page`,
  );
  check(errors.length === 0, `${path}: no page errors (${errors.join(" | ")})`);
}

/** The shop: every colour, offer prices, and a card that preselects its colour. */
async function shopPage(page: Page, offerId: OfferKey, errors: string[]) {
  const path = shopPath(offerId);
  await open(page, path, errors);
  check(
    (await page.getByTestId("shop-colour").count()) === 13,
    `${path}: 13 colours`,
  );
  const five = offers[offerId].bundles.find((b) => b.id === "five")!;
  check(
    (await page.getByTestId("shop-bundles").textContent())?.includes(money(five.price)),
    `${path}: shows the 5-pack at ${money(five.price)}`,
  );
  await page.getByTestId("shop-colour").filter({ hasText: "Red Wine" }).click();
  await page.waitForURL(`**${productPath(offerId)}?colour=*`);
  await page.waitForTimeout(400);
  check(
    (await page.getByTestId("active-colour").textContent()) === "Red Wine",
    `${path}: colour card preselects Red Wine`,
  );
  check(errors.length === 0, `${path}: no page errors (${errors.join(" | ")})`);
}

let browser;
try {
  browser = await chromium.launch({ channel: "chrome" });
} catch {
  browser = await chromium.launch();
}

for (const [label, viewport] of [
  ["desktop", { width: 1280, height: 900 }],
  ["phone", { width: 390, height: 844 }],
] as const) {
  console.log(`\n${label} (${viewport.width}px)`);
  const context = await browser.newContext({
    viewport,
    isMobile: label === "phone",
    hasTouch: label === "phone",
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

  for (const o of OFFERS) {
    for (const run of [
      () => productPage(page, o, label === "phone", errors),
      () => advertorialPage(page, o, errors),
      () => homePage(page, o, errors),
      () => reasonsPage(page, o, errors),
      () => shopPage(page, o, errors),
    ]) {
      try {
        await run();
      } catch (e) {
        check(false, `${o}: ${(e as Error).message.split("\n")[0]}`);
      }
    }
  }

  // The preview strip switches offer in place; help pages remember it.
  try {
    await open(page, "/pages/a-note-from-hallie", errors);
    await page.getByRole("link", { name: "Early Black Friday" }).click();
    await page.waitForURL("**/pages/a-note-from-hallie/early-black-friday");
    await open(page, "/pages/shipping", errors);
    await page.waitForTimeout(200);
    check(
      (await page.getByRole("link", { name: "Everyday Tank", exact: true }).first().getAttribute("href")) ===
        "/products/everyday-tank/early-black-friday",
      "help page links stay in the offer last browsed",
    );
    await page.getByRole("button", { name: "Standard" }).click();
    check(
      (await page.getByRole("link", { name: "Everyday Tank", exact: true }).first().getAttribute("href")) ===
        "/products/everyday-tank",
      "preview strip switches the offer on a help page",
    );
  } catch (e) {
    check(false, `offer switch: ${(e as Error).message.split("\n")[0]}`);
  }

  // Help pages.
  for (const h of ["faq", "size-guide", "shipping", "returns", "contact"]) {
    await open(page, `/pages/${h}`, errors);
    check((await page.locator("h1, #faq h2").count()) >= 1, `/pages/${h} has a heading`);
  }
  await page.getByRole("button", { name: "Send message" }).click();
  check(
    (await page.locator("[aria-invalid=true]").count()) === 3,
    "contact form refuses an empty message",
  );
  await page.fill("[name=name]", "Jane Doe");
  await page.fill("[name=email]", "jane@example.com");
  await page.fill("[name=message]", "Does the nude shade show under white?");
  await page.getByRole("button", { name: "Send message" }).click();
  check((await page.getByTestId("contact-sent").count()) === 1, "contact form confirms");

  // Empty cart and checkout.
  await open(page, "/cart", errors);
  await page.waitForTimeout(200);
  check((await page.getByTestId("cart-empty").count()) === 1, "empty cart page");
  await open(page, "/checkout", errors);
  await page.waitForTimeout(200);
  check((await page.getByTestId("checkout-empty").count()) === 1, "checkout with an empty cart");

  // Old six-concept URLs redirect.
  for (const [from, to] of [
    ["/soft", "/products/everyday-tank"],
    ["/soft/advertorial/christmas", "/pages/a-note-from-hallie/christmas"],
    ["/soft/home/early-black-friday", "/early-black-friday"],
    ["/premium/7-reasons", "/"],
  ]) {
    await page.goto(BASE + from);
    check(new URL(page.url()).pathname === to, `${from} redirects to ${to} (got ${new URL(page.url()).pathname})`);
  }

  await open(page, "/gallery", errors);
  check(
    (await page.locator("ol[data-theme] > li").count()) === 8,
    "gallery lists 8 items",
  );
  await open(page, "/sop", errors);
  check((await page.locator(".sop h1").count()) === 1, "SOP renders");
  const missing = await page.goto(`${BASE}/not-a-page`);
  check(missing?.status() === 404, "unknown page is a 404");
  check(
    (await page.getByRole("link", { name: "Back to Hallie" }).count()) === 1,
    "404 links back to the store",
  );
  await context.close();
}

// Every internal link the pages point at.
for (const href of links) {
  const res = await fetch(BASE + href);
  check(res.status === 200, `link ${href} returns 200 (got ${res.status})`);
}

await browser.close();
console.log(
  `\n${passes} passed, ${failures} failed, ${links.size} internal links`,
);
process.exit(failures ? 1 : 0);
