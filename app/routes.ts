import { type RouteConfig, index, route } from "@react-router/dev/routes";

/*
 * Each concept is a small storefront at /<concept>: the product page, the
 * brand homepage (/home), the 7 Reasons listicle (/7-reasons) and the
 * advertorial (/advertorial). An offer adds /early-black-friday or /christmas,
 * so every page and offer has its own shareable URL.
 */
export default [
  index("routes/home.tsx"),
  route("gallery", "routes/gallery.tsx"),
  route("sop", "routes/sop.tsx"),
  route("gallery/render/:concept/:n", "routes/gallery.render.tsx"),
  route(":concept", "routes/product.tsx"),
  route(":concept/early-black-friday", "routes/product.ebf.tsx"),
  route(":concept/christmas", "routes/product.xmas.tsx"),
  route(":concept/advertorial", "routes/advertorial.tsx"),
  route(":concept/advertorial/early-black-friday", "routes/advertorial.ebf.tsx"),
  route(":concept/advertorial/christmas", "routes/advertorial.xmas.tsx"),
  route(":concept/home/:offer?", "routes/brand-home.tsx"),
  route(":concept/7-reasons/:offer?", "routes/seven-reasons.tsx"),
] satisfies RouteConfig;
