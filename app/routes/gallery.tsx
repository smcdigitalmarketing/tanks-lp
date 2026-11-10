import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Download } from "lucide-react";
import type { Route } from "./+types/gallery";
import { brand, storePath } from "~/content/store";
import { gallery } from "~/content/page";
import { DEMO_VIDEO } from "~/lib/images";
import { HUB_FONTS, fontHref } from "~/lib/seo";
import {
  SLIDE_LABELS,
  SlideView,
  exportPath,
} from "~/components/gallery/slides";
import { Lightbox } from "~/components/gallery/lightbox";
import { Wordmark } from "~/components/ui";

export const meta: Route.MetaFunction = () => [
  { title: "Gallery images · Hallie" },
  { name: "robots", content: "noindex, nofollow" },
  { tagName: "link", rel: "stylesheet", href: fontHref(HUB_FONTS) },
];

export default function Gallery() {
  /** The slide open in the lightbox. */
  const [zoom, setZoom] = useState<number | null>(null);
  const slides = gallery(brand);
  return (
    <div className="min-h-dvh bg-[#f4f3f0] font-[Inter,system-ui,sans-serif] text-[#16151a]">
      <main className="mx-auto max-w-7xl px-4 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-black/60 hover:text-black"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to the store
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          Product gallery images
        </h1>
        <p className="mt-3 max-w-3xl text-black/60">
          Seven square slides in the brief's order: main benefit, lifestyle, vs
          traditional bras, what's included, how it works, vs alternatives, and
          a customer review, then the demo video. Text is HTML over the photo,
          never baked in. Each slide downloads as a 1600 × 1600 JPG after{" "}
          <code className="rounded bg-black/5 px-1">
            npm run gallery:export
          </code>
          .
        </p>
        <p className="mt-2 max-w-3xl text-sm text-black/50">
          The source photos are 1000–1254 px, so exports at 1600 px are slightly
          soft under the sharp text. Production needs new photography at 1600 px
          or more.
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Demo video</h2>
          <p className="mt-1 text-sm text-black/60">
            The source store's own silent hero clip (720 × 720, about 6
            seconds). It plays after the seven slides in every gallery. Usage
            rights need approval.
          </p>
          <div className="mt-4 max-w-xs">
            <video
              src={DEMO_VIDEO.src}
              poster={DEMO_VIDEO.poster}
              controls
              muted
              playsInline
              preload="metadata"
              className="aspect-square w-full rounded-lg border border-black/10 bg-black"
            />
            <a
              href={DEMO_VIDEO.src}
              download
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold hover:underline"
            >
              <Download aria-hidden="true" className="size-3.5" />
              MP4
            </a>
          </div>
        </section>

        <section className="mt-12">
          <div
            className="flex flex-wrap items-center justify-between gap-2"
            data-theme="soft"
          >
            <span className="flex items-center gap-3">
              <Wordmark />
              <span className="font-[Inter,system-ui,sans-serif] text-sm text-black/50">
                {brand.direction}
              </span>
            </span>
            <Link
              to={storePath("product")}
              className="text-sm font-semibold hover:underline"
            >
              Open product page
            </Link>
          </div>
          <ol
            data-theme="soft"
            className="mt-4 grid grid-cols-2 gap-3 font-sans sm:grid-cols-4 lg:grid-cols-8"
          >
            {slides.map((s, i) => (
              <li key={i} className="flex flex-col">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-black/10 [container-type:inline-size]">
                  <SlideView slide={s} still />
                  <button
                    type="button"
                    onClick={() => setZoom(i)}
                    className="absolute inset-0 cursor-zoom-in"
                    aria-label={`Enlarge image ${i + 1}`}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between gap-2 font-[Inter,system-ui,sans-serif] text-xs">
                  <span className="text-black/70">
                    {i + 1}. {SLIDE_LABELS[s.kind]}
                  </span>
                  <a
                    href={s.kind === "video" ? s.src : exportPath(i + 1, s.kind)}
                    download
                    className="inline-flex items-center gap-1 font-semibold hover:underline"
                    aria-label={`Download ${s.kind === "video" ? "demo video" : `image ${i + 1}`}, ${SLIDE_LABELS[s.kind]}`}
                  >
                    <Download aria-hidden="true" className="size-3.5" />
                    {s.kind === "video" ? "MP4" : "JPG"}
                  </a>
                </div>
              </li>
            ))}
          </ol>
          {zoom !== null && (
            <Lightbox
              slides={slides}
              index={zoom}
              theme="soft"
              onIndex={setZoom}
              onClose={() => setZoom(null)}
            />
          )}
        </section>
      </main>
    </div>
  );
}
