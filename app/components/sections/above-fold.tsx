import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { Flag as FlagData, PdpContent, Slide } from "~/content/types";
import { money } from "~/data/catalog";
import { Flag } from "~/components/flag";
import { Icon } from "~/components/icons";
import { SlideThumb, SlideView } from "~/components/gallery/slides";
import { Lightbox } from "~/components/gallery/lightbox";

/*
 * Section 1: above the fold. The video's rule: someone who only swipes the
 * gallery and reads the title should already be sold, so the gallery tells
 * the whole story and the text stack runs proof → title → price → bullets.
 */

// ── Gallery ─────────────────────────────────────────────────────────────────

/**
 * Swipeable square gallery. Slides are laid out in container-query units
 * (cqw), so text on infographic slides stays sharp and proportional at any
 * size, the same approach as the ad creatives in the rescu-aid repo.
 */
export function MediaGallery({ slides }: { slides: Slide[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  /** The slide open in the lightbox, or null. */
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number, behavior: ScrollBehavior = "smooth") => {
    const el = track.current;
    if (!el) return;
    const n = (i + slides.length) % slides.length;
    el.scrollTo({ left: n * el.clientWidth, behavior });
  };

  /** Closing the lightbox leaves the gallery on the slide that was open. */
  const closeZoom = () => {
    if (zoom !== null) go(zoom, "instant");
    setZoom(null);
  };

  return (
    <div className="min-w-0">
      <div className="relative">
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-card bg-surface-2"
          aria-roledescription="carousel"
          aria-label="Product images"
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className="relative aspect-square w-full shrink-0 snap-center overflow-hidden [container-type:inline-size]"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              <SlideView slide={s} priority={i === 0} />
              <button
                type="button"
                onClick={() => setZoom(i)}
                className="absolute inset-0 cursor-zoom-in"
                aria-label={`Enlarge image ${i + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index - 1)}
          className="absolute left-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-surface/90 p-2 shadow md:block"
          aria-label="Previous image"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-full bg-surface/90 p-2 shadow md:block"
          aria-label="Next image"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => setZoom(index)}
          className="absolute right-2 top-2 rounded-full bg-black/55 p-1.5 text-white hover:bg-black/70"
          aria-label="View larger"
        >
          <Maximize2 aria-hidden="true" className="size-4" />
        </button>
        <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white tabular-nums">
          {index + 1} / {slides.length}
        </span>
      </div>
      <div className="mt-2.5 flex justify-center gap-1.5 md:hidden" aria-hidden="true">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-ink" : "w-1.5 bg-line"}`}
          />
        ))}
      </div>
      <div
        className="no-scrollbar mt-3 hidden gap-2 overflow-x-auto md:flex"
        role="group"
        aria-label="Choose image"
      >
        {slides.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === index}
            className={`size-14 shrink-0 overflow-hidden rounded-[calc(var(--r-card)*0.6)] border-2 bg-surface-2 transition md:size-16 ${
              i === index
                ? "border-ink"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <SlideThumb slide={s} />
          </button>
        ))}
      </div>
      {zoom !== null && (
        <Lightbox
          slides={slides}
          index={zoom}
          // The concept's theme, read from the page wrapper, so the portal keeps its look.
          theme={track.current?.closest<HTMLElement>("[data-theme]")?.dataset.theme ?? "soft"}
          onIndex={setZoom}
          onClose={closeZoom}
        />
      )}
    </div>
  );
}

// ── Text stack ─────────────────────────────────────────────────────────────

/** Where the SOP puts the proof line: a short positioning line, no ratings or counts. */
export function Kicker({ text }: { text: string }) {
  return (
    <p className="eyebrow flex items-center gap-2 text-sm font-semibold text-brand">
      <span aria-hidden="true" className="h-px w-6 bg-current" />
      {text}
    </p>
  );
}

/** Product name plus benefit, so a reader who only sees the title still gets the point. */
export function BenefitTitle({
  eyebrow,
  title,
  subtitle,
  size = "default",
}: {
  eyebrow?: string;
  title: PdpContent["title"];
  subtitle: string;
  /** "large" for the full-width headline hero. */
  size?: "default" | "large";
}) {
  return (
    <div>
      {eyebrow && <p className="eyebrow mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">{eyebrow}</p>}
      <h1 className={`display ${size === "large" ? "text-[2.3rem] md:text-[4rem]" : "text-[1.9rem] md:text-[2.6rem]"}`}>
        <span className="mb-1 block font-sans text-[0.42em] font-semibold normal-case tracking-normal text-muted [font-family:var(--f-body)]">
          {title.product}
        </span>
        {title.benefit}
      </h1>
      <p className={`mt-3 text-muted ${size === "large" ? "mx-auto max-w-2xl text-lg md:text-xl" : "text-base md:text-[17px]"}`}>{subtitle}</p>
    </div>
  );
}

/** Don't make people do maths: say the dollar amount they save. */
export function PriceSavings({ total, was, flag }: { total: number; was: number; flag?: FlagData }) {
  const save = Math.round((was - total) * 100) / 100;
  return (
    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1" data-testid="hero-price">
      <span className="text-3xl font-bold">{money(total)}</span>
      {save > 0 && (
        <>
          <s className="text-lg text-muted">{money(was)}</s>
          <span className="rounded-full bg-highlight px-2.5 py-1 text-sm font-semibold text-highlight-ink">You save {money(save)}</span>
        </>
      )}
      <Flag flag={flag} />
    </p>
  );
}

export function IconBullets({ items }: { items: PdpContent["bullets"] }) {
  return (
    <ul className="grid gap-3">
      {items.map((b) => (
        <li key={b.text} className="flex items-start gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-2 text-brand">
            <Icon name={b.icon} className="size-4" />
          </span>
          <span className="pt-1 text-[15px] leading-snug">{b.text}</span>
        </li>
      ))}
    </ul>
  );
}

/** The Early Black Friday block above the buy box: what the offer is, no deadline. */
export function OfferBanner({ data, flag }: { data: NonNullable<PdpContent["offerBanner"]>; flag?: FlagData }) {
  return (
    <div className="rounded-card bg-accent p-5 text-accent-ink" data-testid="offer-banner">
      <p className="eyebrow text-xs font-bold uppercase tracking-[0.2em] opacity-80">
        {data.eyebrow}
        <Flag flag={flag} className="!text-current opacity-90" />
      </p>
      <p className="display mt-1.5 text-2xl md:text-[1.75rem]">{data.headline}</p>
      <p className="mt-2 text-sm opacity-85">{data.sub}</p>
    </div>
  );
}
