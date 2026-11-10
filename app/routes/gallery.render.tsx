import { data } from "react-router";
import type { Route } from "./+types/gallery.render";
import { brand } from "~/content/store";
import { gallery } from "~/content/page";
import { SlideView } from "~/components/gallery/slides";

/**
 * One gallery slide at exactly 1600 × 1600, for `npm run gallery:export` to
 * screenshot. Not linked from anywhere and not prerendered.
 */
const find = (n?: string) => gallery(brand)[Number(n) - 1];

export function loader({ params }: Route.LoaderArgs) {
  if (!find(params.n)) throw data("Not found", { status: 404 });
  return { n: params.n };
}

export const meta: Route.MetaFunction = () => [
  { title: "Gallery render" },
  { name: "robots", content: "noindex, nofollow" },
];

export default function GalleryRender({ loaderData }: Route.ComponentProps) {
  const slide = find(loaderData.n)!;
  return (
    <div
      data-theme="soft"
      data-gallery-render={slide.kind}
      className="size-[1600px] overflow-hidden bg-bg font-sans text-ink [container-type:inline-size]"
    >
      <SlideView slide={slide} priority still={slide.kind === "video"} />
    </div>
  );
}
