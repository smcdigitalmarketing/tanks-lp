import { BadgeCheck, Check, Play, X } from "lucide-react";
import type { Slide } from "~/content/types";
import { Picture, Stars } from "~/components/ui";

/*
 * The seven gallery slides plus the demo video. Each is laid out in
 * container-query units (cqw: 1% of the slide's width) inside a square, so
 * the same markup renders as a gallery tile, a thumbnail, the lightbox and a
 * 1600 px export. The parent sets `[container-type:inline-size]` and a square.
 * Photos carry no words; everything you can read is HTML.
 */

export function SlideView({
  slide,
  priority = false,
  still = false,
}: {
  slide: Slide;
  priority?: boolean;
  /** Show a video slide as its poster frame (for grids of many tiles). */
  still?: boolean;
}) {
  switch (slide.kind) {
    case "benefit":
      return (
        <div className="relative h-full overflow-hidden bg-surface">
          <Picture
            image={slide.image}
            priority={priority}
            className="object-[center_30%]"
          />
          <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-bg from-35% via-bg/85 to-transparent px-[7cqw] pb-[18cqw] pt-[7.5cqw]">
            {slide.eyebrow && (
              <p className="eyebrow mb-[2cqw] text-[3.3cqw] font-semibold uppercase tracking-[0.16em] text-brand">
                {slide.eyebrow}
              </p>
            )}
            <p className="display text-[9cqw] text-ink">{slide.headline}</p>
            {slide.sub && (
              <p className="mt-[2.4cqw] text-[4.2cqw] font-medium text-muted">
                {slide.sub}
              </p>
            )}
          </div>
          {slide.chips && (
            <ul className="absolute inset-x-0 bottom-[5cqw] flex justify-center gap-[2cqw]">
              {slide.chips.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-[1.2cqw] rounded-btn bg-surface/95 px-[3cqw] py-[1.6cqw] text-[3.4cqw] font-semibold text-ink shadow"
                >
                  <X
                    aria-hidden="true"
                    className="size-[3.4cqw] text-brand"
                    strokeWidth={3}
                  />
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      );

    case "lifestyle":
      return (
        <div className="relative h-full overflow-hidden">
          <Picture image={slide.image} priority={priority} />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-[6cqw] pt-[22cqw] text-white">
            {slide.eyebrow && (
              <p className="eyebrow mb-[1.5cqw] text-[3.2cqw] font-semibold uppercase tracking-[0.16em] opacity-90">
                {slide.eyebrow}
              </p>
            )}
            <p className="display text-[7.6cqw]">{slide.headline}</p>
            {slide.points && (
              <ul className="mt-[3cqw] flex flex-wrap gap-[2cqw] text-[3.5cqw] font-semibold">
                {slide.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-center gap-[1.2cqw] rounded-btn bg-white/15 px-[2.8cqw] py-[1.3cqw] backdrop-blur"
                  >
                    <Check aria-hidden="true" className="size-[3.6cqw]" />
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );

    case "vsBra":
      // The photo is already a two-up (bra on the left, tank on the right), so
      // the labels sit over each half. They name parts, not results.
      return (
        <div className="flex h-full flex-col bg-surface">
          <p className="display px-[6cqw] pb-[3.5cqw] pt-[5cqw] text-center text-[6.6cqw] text-ink">
            {slide.headline}
          </p>
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Picture image={slide.image} className="object-[center_35%]" />
            <span
              className="absolute inset-y-0 left-1/2 w-[0.6cqw] -translate-x-1/2 bg-surface"
              aria-hidden="true"
            />
            {[
              { side: slide.left, ours: false },
              { side: slide.right, ours: true },
            ].map(({ side, ours }) => (
              <div
                key={side.label}
                className={`absolute inset-y-0 w-1/2 ${ours ? "right-0" : "left-0"}`}
              >
                <span
                  className={`absolute left-[3cqw] top-[3cqw] rounded-btn px-[2.6cqw] py-[1.1cqw] text-[3.1cqw] font-bold uppercase tracking-wide ${
                    ours ? "bg-brand text-brand-ink" : "bg-black/70 text-white"
                  }`}
                >
                  {side.label}
                </span>
                <ul className="absolute inset-x-0 bottom-0 space-y-[1cqw] bg-gradient-to-t from-black/85 to-transparent p-[3.5cqw] pt-[14cqw] text-[3.6cqw] font-semibold text-white">
                  {side.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-[1.4cqw]">
                      {ours ? (
                        <Check
                          aria-hidden="true"
                          className="size-[3.8cqw] text-highlight"
                          strokeWidth={3}
                        />
                      ) : (
                        <X
                          aria-hidden="true"
                          className="size-[3.8cqw] opacity-80"
                          strokeWidth={3}
                        />
                      )}
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );

    case "included":
      return (
        <div className="flex h-full flex-col bg-surface-2">
          <p className="display px-[6cqw] pt-[6cqw] text-center text-[7cqw] text-ink">
            {slide.headline}
          </p>
          <div className="relative mx-[5cqw] my-[3cqw] min-h-0 flex-1 overflow-hidden rounded-[calc(var(--r-card)*0.6)]">
            <Picture
              image={slide.image}
              priority={priority}
              className="object-[center_40%]"
            />
          </div>
          <ul className="grid grid-cols-2 gap-[2cqw] px-[5cqw] pb-[5cqw]">
            {slide.items.map((it) => (
              <li
                key={it.name}
                className="flex items-start gap-[2cqw] rounded-[calc(var(--r-card)*0.5)] bg-surface p-[2.4cqw] shadow-sm"
              >
                <span className="grid size-[6.4cqw] shrink-0 place-items-center rounded-full bg-brand text-[3.1cqw] font-bold text-brand-ink">
                  {it.qty ?? (
                    <Check aria-hidden="true" className="size-[3.4cqw]" />
                  )}
                </span>
                <span className="text-[3.3cqw] leading-tight">
                  <strong className="block text-ink">{it.name}</strong>
                  {it.note && (
                    <span className="text-[2.9cqw] text-muted">{it.note}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "howItWorks":
      return (
        <div className="flex h-full flex-col bg-surface">
          <p className="display px-[6cqw] pb-[4cqw] pt-[6cqw] text-center text-[7cqw] text-ink">
            {slide.headline}
          </p>
          <ol
            className="grid flex-1 gap-[2.5cqw] px-[4cqw] pb-[5cqw]"
            style={{
              gridTemplateColumns: `repeat(${slide.steps.length}, minmax(0, 1fr))`,
            }}
          >
            {slide.steps.map((s, i) => (
              <li
                key={s.title}
                className="flex flex-col overflow-hidden rounded-[calc(var(--r-card)*0.6)] bg-surface-2"
              >
                <div className="relative min-h-0 flex-1">
                  <Picture image={s.image} />
                  <span className="absolute left-[2cqw] top-[2cqw] grid size-[8cqw] place-items-center rounded-full bg-brand text-[4.4cqw] font-bold text-brand-ink">
                    {i + 1}
                  </span>
                </div>
                <p className="display py-[3cqw] text-center text-[4.6cqw] leading-tight text-ink">
                  {s.title}
                </p>
              </li>
            ))}
          </ol>
        </div>
      );

    case "vsAlternatives": {
      const cols = `minmax(0,1.5fr) repeat(${slide.columns.length}, minmax(0,1fr))`;
      return (
        <div className="flex h-full flex-col bg-surface px-[4.5cqw] pb-[5cqw] pt-[5.5cqw]">
          <p className="display pb-[4cqw] text-center text-[6.6cqw] text-ink">
            {slide.headline}
          </p>
          <div
            className="grid items-end gap-x-[1cqw]"
            style={{ gridTemplateColumns: cols }}
          >
            <span />
            {slide.columns.map((c, i) => (
              <span
                key={c}
                className={`rounded-t-[1.4cqw] px-[0.6cqw] pb-[1.6cqw] pt-[2cqw] text-center text-[3.2cqw] font-bold leading-[1.1] ${
                  i === 0 ? "bg-brand text-brand-ink" : "text-muted"
                }`}
              >
                {c}
              </span>
            ))}
          </div>
          <ul className="flex flex-1 flex-col">
            {slide.rows.map((r) => (
              <li
                key={r.label}
                className="grid flex-1 items-center gap-x-[1cqw] border-t border-line text-[3.6cqw] leading-tight"
                style={{ gridTemplateColumns: cols }}
              >
                <span className="py-[1.4cqw] pr-[1cqw] font-semibold text-ink">
                  {r.label}
                </span>
                {r.values.map((v, i) => (
                  <span
                    key={i}
                    className={`flex h-full items-center justify-center ${i === 0 ? "bg-brand/10" : ""}`}
                  >
                    {v ? (
                      <Check
                        aria-label="Yes"
                        className={`size-[4.4cqw] ${i === 0 ? "text-brand" : "text-success"}`}
                        strokeWidth={3}
                      />
                    ) : (
                      <X
                        aria-label="No"
                        className="size-[4cqw] text-muted/60"
                        strokeWidth={2.5}
                      />
                    )}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    case "review":
      return <ReviewScreenshot slide={slide} />;

    case "video":
      return (
        <div className="relative h-full overflow-hidden bg-black">
          {still ? (
            <img
              src={slide.poster}
              alt={slide.alt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <video
              src={slide.src}
              poster={slide.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={slide.alt}
              className="h-full w-full object-cover"
            />
          )}
          <span className="absolute left-[4cqw] top-[4cqw] inline-flex items-center gap-[1cqw] rounded-btn bg-black/60 px-[2.6cqw] py-[1.1cqw] text-[3cqw] font-bold uppercase tracking-wide text-white">
            <Play
              aria-hidden="true"
              className="size-[3cqw]"
              fill="currentColor"
            />
            Demo
          </span>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-[6cqw] pt-[16cqw] text-white">
            {slide.eyebrow && (
              <p className="eyebrow mb-[1.5cqw] text-[3.2cqw] font-semibold uppercase tracking-[0.16em] opacity-90">
                {slide.eyebrow}
              </p>
            )}
            <p className="display text-[7.2cqw]">{slide.headline}</p>
          </div>
        </div>
      );
  }
}

/**
 * A review drawn like a screenshot of the review widget it came from. It is a
 * real Judge.me review of the competitor's product, and the slide says so.
 */
function ReviewScreenshot({
  slide,
}: {
  slide: Extract<Slide, { kind: "review" }>;
}) {
  const r = slide.review;
  const long = r.text.length > 120;
  return (
    <div className="flex h-full flex-col items-center justify-center bg-surface-2 p-[6cqw]">
      {slide.headline && (
        <p className="display mb-[4cqw] text-center text-[6cqw] text-ink">
          {slide.headline}
        </p>
      )}
      <figure className="w-full overflow-hidden rounded-[2.4cqw] bg-white font-[Inter,system-ui,sans-serif] text-[#16151a] shadow-[0_2cqw_6cqw_rgba(0,0,0,0.12)]">
        {r.photo && (
          <div className={long ? "h-[30cqw]" : "h-[38cqw]"}>
            <Picture image={r.photo} className="object-[center_48%]" />
          </div>
        )}
        <div className="p-[5cqw]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-[1.5cqw] text-[3.8cqw] font-bold">
              {r.name}
              <span className="inline-flex items-center gap-[0.6cqw] text-[2.8cqw] font-semibold text-[#1f7a4d]">
                <BadgeCheck aria-hidden="true" className="size-[3.4cqw]" />
                Verified buyer
              </span>
            </span>
            {r.date && (
              <span className="text-[2.8cqw] text-[#6b6775]">{r.date}</span>
            )}
          </div>
          <span className="mt-[1.2cqw] block text-[#f5a524]">
            <Stars rating={r.rating} className="size-[3.8cqw]" />
          </span>
          <blockquote
            className={`mt-[2cqw] leading-snug ${long ? "text-[3.4cqw]" : r.photo ? "text-[4.2cqw]" : "text-[5cqw]"}`}
          >
            “{r.text}”
          </blockquote>
        </div>
        <p className="border-t border-[#e6e4ea] px-[5cqw] py-[2.2cqw] text-[2.6cqw] text-[#6b6775]">
          Judge.me · verified buyer of the original built-in bra tank
        </p>
      </figure>
    </div>
  );
}

/** Small preview for the gallery's thumbnail strip. */
export function SlideThumb({ slide }: { slide: Slide }) {
  switch (slide.kind) {
    case "benefit":
    case "lifestyle":
    case "included":
    case "vsBra":
      return <Picture image={slide.image} />;
    case "howItWorks":
      return <Picture image={slide.steps[0].image} />;
    case "vsAlternatives":
      return (
        <span className="grid h-full place-items-center bg-surface text-[10px] font-bold text-brand">
          <span className="grid grid-cols-2 gap-0.5">
            <Check className="size-3" />
            <X className="size-3 text-muted" />
            <Check className="size-3" />
            <X className="size-3 text-muted" />
          </span>
        </span>
      );
    case "video":
      return (
        <span className="relative block h-full">
          <img
            src={slide.poster}
            alt=""
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 grid place-items-center bg-black/30 text-white">
            <Play aria-hidden="true" className="size-4" fill="currentColor" />
          </span>
        </span>
      );
    case "review":
      return slide.review.photo ? (
        <Picture image={slide.review.photo} />
      ) : (
        <span className="grid h-full place-items-center bg-surface">
          <Stars rating={5} className="size-2" />
        </span>
      );
  }
}

/** The brief's names for the slides, used on /gallery and in export file names. */
export const SLIDE_LABELS: Record<Slide["kind"], string> = {
  benefit: "Main benefit",
  lifestyle: "Lifestyle",
  vsBra: "Vs traditional bras",
  included: "What's included",
  howItWorks: "How it works",
  vsAlternatives: "Vs alternatives",
  review: "Customer review",
  video: "Demo video",
};

/** Where `npm run gallery:export` writes each slide (public/ is served as-is). */
export const exportPath = (slug: string, n: number, kind: string) =>
  `/gallery/${slug}/${String(n).padStart(2, "0")}-${kind}.jpg`;
