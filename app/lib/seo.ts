export const fontHref = (families: string) => `https://fonts.googleapis.com/css2?${families}&display=swap`;

/** Shared UI type for the hub, gallery and SOP pages. */
export const HUB_FONTS = "family=Inter:wght@400;500;600;700";

/** Concept pages are internal previews: noindex, and only their own fonts. */
export function pageMeta({ title, description, fonts }: { title: string; description: string; fonts: string }) {
  return [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "noindex, nofollow" },
    { tagName: "link", rel: "stylesheet", href: fontHref(fonts) },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ];
}
