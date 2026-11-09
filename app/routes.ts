import { type RouteConfig, index, route } from "@react-router/dev/routes";

/*
 * Each concept is a small storefront at /<concept>, with its advertorial at
 * /<concept>/advertorial. The Early Black Friday version of either page adds
 * /early-black-friday, so every page and offer has its own shareable URL.
 */
export default [
  index("routes/home.tsx"),
  route("gallery", "routes/gallery.tsx"),
  route("sop", "routes/sop.tsx"),
  route("gallery/render/:concept/:n", "routes/gallery.render.tsx"),
  route(":concept", "routes/product.tsx"),
  route(":concept/early-black-friday", "routes/product.ebf.tsx"),
  route(":concept/advertorial", "routes/advertorial.tsx"),
  route(":concept/advertorial/early-black-friday", "routes/advertorial.ebf.tsx"),
] satisfies RouteConfig;
