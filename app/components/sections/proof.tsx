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

/** Soft paper notes, gently tilted. */
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

export function ReviewsWall({
  data,
}: {
  data: PdpContent["reviews"];
}) {
  const first = 9;
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
      <div className="columns-1 gap-6 px-1 sm:columns-2 lg:columns-3">
        {shown.map((r, i) => (
          <div key={key(r)} className="mb-6 break-inside-avoid">
            <ReviewNote review={r} i={i} />
          </div>
        ))}
      </div>
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
