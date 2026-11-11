export const fontHref = (families: string) => `https://fonts.googleapis.com/css2?${families}&display=swap`;

/** UI type for the internal gallery and SOP pages. */
export const HUB_FONTS = "family=Inter:wght@400;500;600;700";

/**
 * Store pages stay out of search while the store is in test mode: noindex.
 * Kindwear's fonts load site-wide from root.tsx.
 */
export function pageMeta({ title, description }: { title: string; description: string }) {
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ];
}
