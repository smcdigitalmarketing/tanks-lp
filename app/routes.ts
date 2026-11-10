import { type RouteConfig, route } from "@react-router/dev/routes";

/*
 * The Hallie store. Pages with prices take an optional offer segment
 * (/early-black-friday or /christmas), so every campaign page has its own
 * shareable URL. Help, cart and checkout pages have no prices of their own.
 * /gallery and /sop are internal.
 */
export default [
  route(":offer?", "routes/home.tsx"),
  route("products/everyday-tank/:offer?", "routes/product.tsx"),
  route("collections/all/:offer?", "routes/shop.tsx"),
  route("pages/7-reasons/:offer?", "routes/seven-reasons.tsx"),
  route("pages/a-note-from-hallie/:offer?", "routes/advertorial.tsx"),
  route("pages/:help", "routes/help.tsx"),
  route("cart", "routes/cart.tsx"),
  route("checkout", "routes/checkout.tsx"),
  route("checkout/thank-you", "routes/thank-you.tsx"),
  route("gallery", "routes/gallery.tsx"),
  route("gallery/render/:n", "routes/gallery.render.tsx"),
  route("sop", "routes/sop.tsx"),
  route("*", "routes/legacy.tsx"),
] satisfies RouteConfig;
