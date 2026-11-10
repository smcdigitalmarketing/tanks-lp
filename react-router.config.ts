import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

const OFFERS = ["", "/early-black-friday", "/christmas"];
const PRICED_PAGES = [
  "",
  "/products/everyday-tank",
  "/collections/all",
  "/pages/7-reasons",
  "/pages/a-note-from-hallie",
];
const HELP_PAGES = ["faq", "size-guide", "shipping", "returns", "contact"];

export default {
  ssr: true,
  presets: [vercelPreset()],
  // Every store page is static: the five priced pages in three offers, the
  // help pages, cart, checkout and confirmation (which read the cart and
  // orders in the browser), and the internal gallery and SOP. Old concept
  // URLs (/soft/...) and the 1600 px gallery render route stay dynamic.
  async prerender() {
    return [
      ...PRICED_PAGES.flatMap((p) => OFFERS.map((o) => `${p}${o}` || "/")),
      ...HELP_PAGES.map((h) => `/pages/${h}`),
      "/cart",
      "/checkout",
      "/checkout/thank-you",
      "/gallery",
      "/sop",
    ];
  },
} satisfies Config;
