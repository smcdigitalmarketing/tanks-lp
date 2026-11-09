import { useState } from "react";
import type { PdpContent, Review } from "~/content/types";
import { Picture, ReviewSource, Section, Stars } from "~/components/ui";

/*
 * Section 5: social proof. Shown up front as a wall, never hidden in a
 * carousel, and every review says where it came from. These are real reviews
 * of the competitor's tank, so every one is labelled as a placeholder, and
 * there is no aggregate rating anywhere.
 */

const NOTE_TILT = [
  "-rotate-[1deg]",
  "rotate-[0.8deg]",
  "-rotate-[0.4deg]",
  "rotate-[1.2deg]",
];
const NOTE_TONE = ["bg-surface", "bg-highlight/70", "bg-surface-2"];

/** Hallie: soft paper notes, gently tilted. */
function ReviewNote({ review: r, i }: { review: Review; i: number }) {
  return (
    <figure
      className={`rounded-card p-6 shadow-[0_6px_20px_rgba(60,40,30,0.07)] ${NOTE_TILT[i % NOTE_TILT.length]} ${NOTE_TONE[i % NOTE_TONE.length]}`}
    >
      {r.photo && (
        <span className="mb-4 block aspect-[4/3] overflow-hidden rounded-[calc(var(--r-card)*0.6)]">
          <Picture image={r.photo} className="object-[center_30%]" />
        </span>
      )}
      <Stars rating={r.rating} className="size-4" />
      <blockquote className="display mt-2 text-[1.3rem] leading-snug">
        “{r.text}”
      </blockquote>
      <figcaption className="mt-4 space-y-1 text-sm">
        <strong className="block">{r.name}</strong>
        <ReviewSource review={r} />
      </figcaption>
    </figure>
  );
}

/** Oriel: pull quotes in the display serif, a hairline above each. */
function ReviewQuote({ review: r }: { review: Review }) {
  return (
    <figure className="break-inside-avoid border-t border-line pt-6">
      <blockquote className="display text-[1.55rem] leading-snug md:text-[1.8rem]">
        “{r.text}”
      </blockquote>
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span className="eyebrow text-xs font-medium uppercase tracking-[0.2em]">
          {r.name}
        </span>
        <Stars rating={r.rating} className="size-3" />
        <ReviewSource review={r} />
      </figcaption>
    </figure>
  );
}

/** Daywell: compact rows, who on the left and the quote on the right. */
function ReviewRow({ review: r }: { review: Review }) {
  return (
    <figure className="grid gap-3 border-b border-line py-5 md:grid-cols-[200px_1fr] md:gap-8">
      <figcaption className="flex items-start gap-3 md:block">
        {r.photo && (
          <span className="block size-14 shrink-0 overflow-hidden rounded-card md:mb-3 md:size-20">
            <Picture image={r.photo} className="object-[center_30%]" />
          </span>
        )}
        <span className="block text-sm">
          <strong className="block">{r.name}</strong>
          {r.date && <span className="block text-xs text-muted">{r.date}</span>}
        </span>
      </figcaption>
      <div>
        <Stars rating={r.rating} className="size-3.5" />
        <blockquote className="mt-2 text-base font-medium leading-relaxed md:text-lg">
          “{r.text}”
        </blockquote>
        <p className="mt-2">
          <ReviewSource review={r} />
        </p>
      </div>
    </figure>
  );
}

export function ReviewsWall({
  data,
  variant,
}: {
  data: PdpContent["reviews"];
  variant: "notes" | "quotes" | "list";
}) {
  const first = variant === "quotes" ? 6 : variant === "list" ? 6 : 9;
  const [all, setAll] = useState(false);
  const shown = all ? data.items : data.items.slice(0, first);
  const key = (r: Review) => r.name + r.text.slice(0, 12);
  return (
    <Section
      id="reviews"
      tone="alt"
      eyebrow={data.eyebrow}
      title={data.headline}
      sub={data.sub}
    >
      {variant === "quotes" ? (
        <div className="mx-auto max-w-5xl columns-1 gap-14 space-y-10 md:columns-2">
          {shown.map((r) => (
            <ReviewQuote key={key(r)} review={r} />
          ))}
        </div>
      ) : variant === "list" ? (
        <div className="mx-auto max-w-4xl border-t border-line">
          {shown.map((r) => (
            <ReviewRow key={key(r)} review={r} />
          ))}
        </div>
      ) : (
        <div className="columns-1 gap-6 px-1 sm:columns-2 lg:columns-3">
          {shown.map((r, i) => (
            <div key={key(r)} className="mb-6 break-inside-avoid">
              <ReviewNote review={r} i={i} />
            </div>
          ))}
        </div>
      )}
      {data.items.length > first && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setAll((v) => !v)}
            className="rounded-btn border border-ink px-6 py-3 text-sm font-semibold"
          >
            {all
              ? "Show fewer reviews"
              : `Show all ${data.items.length} reviews`}
          </button>
        </div>
      )}
    </Section>
  );
}
