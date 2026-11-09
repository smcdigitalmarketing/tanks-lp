/**
 * Every photo on the pages is a local file ported from the competitor's store
 * by `npm run store:port`: app/assets/store/<name>.webp. The source URL of
 * each one is in app/data/catalog.json and docs/asset-manifest.md.
 */

export type Img = { src: string; alt: string };

const files = import.meta.glob<string>("../assets/store/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

/** A ported photo by name, e.g. img("front", "Woman wearing the nude tank"). */
export function img(name: string, alt: string): Img {
  const src = files[`../assets/store/${name}.webp`];
  if (!src)
    throw new Error(
      `Missing image: app/assets/store/${name}.webp (run npm run store:port)`,
    );
  return { src, alt };
}

/** The demo loop and its poster, served from public/video/. */
export const DEMO_VIDEO = { src: "/video/demo.mp4", poster: "/video/demo.jpg" };
