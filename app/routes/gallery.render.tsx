import { data } from "react-router";
import type { Route } from "./+types/gallery.render";
import { conceptBySlug } from "~/content/concepts";
import { gallery } from "~/content/page";
import { fontHref } from "~/lib/seo";
import { SlideView } from "~/components/gallery/slides";

/**
 * One gallery slide at exactly 1600 × 1600, for `npm run gallery:export` to
 * screenshot. Not linked from anywhere and not prerendered.
 */
const find = (slug?: string, n?: string) => {
  const concept = conceptBySlug(slug);
  const slide = concept ? gallery(concept)[Number(n) - 1] : undefined;
  return concept && slide ? { concept, slide } : null;
};

export function loader({ params }: Route.LoaderArgs) {
  if (!find(params.concept, params.n)) throw data("Not found", { status: 404 });
  return { slug: params.concept, n: params.n };
}

export const meta: Route.MetaFunction = ({ params }) => {
  const hit = find(params.concept, params.n);
  return [
    { title: "Gallery render" },
    { name: "robots", content: "noindex, nofollow" },
    ...(hit ? [{ tagName: "link", rel: "stylesheet", href: fontHref(hit.concept.brand.googleFonts) }] : []),
  ];
};

export default function GalleryRender({ loaderData }: Route.ComponentProps) {
  const { concept, slide } = find(loaderData.slug, loaderData.n)!;
  return (
    <div
      data-theme={concept.slug}
      data-gallery-render={slide.kind}
      className="size-[1600px] overflow-hidden bg-bg font-sans text-ink [container-type:inline-size]"
    >
      <SlideView slide={slide} priority still={slide.kind === "video"} />
    </div>
  );
}
