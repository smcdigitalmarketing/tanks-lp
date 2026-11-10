import type { ReactNode } from "react";
import { Star } from "lucide-react";
import type { ConceptSlug, Review } from "~/content/types";
import type { Img } from "~/lib/images";
import { Flag } from "~/components/flag";

/**
 * Each brand's wordmark, drawn in its own type so the logo needs no image:
 *   Hallie   lowercase DM Serif Display with a rose full stop
 *   Oriel    spaced Cormorant capitals over a hairline and a small label
 *   Daywell  bold Space Grotesk with a rising-sun mark
 */
export function Wordmark({
  slug,
  className = "",
}: {
  slug: ConceptSlug;
  className?: string;
}) {
  if (slug === "soft")
    return (
      <span
        className={`inline-flex items-baseline font-[DM_Serif_Display,Georgia,serif] text-[1.9rem] leading-none tracking-[-0.01em] text-ink ${className}`}
      >
        hallie<span className="text-brand">.</span>
      </span>
    );
  if (slug === "premium")
    return (
      <span
        className={`inline-flex flex-col items-center leading-none text-ink ${className}`}
      >
        <span className="font-[Cormorant_Garamond,Georgia,serif] text-[1.55rem] font-medium tracking-[0.42em] [margin-right:-0.42em]">
          ORIEL
        </span>
        <span className="mt-1 h-px w-full bg-current opacity-40" />
        <span className="mt-1 font-[Inter,system-ui,sans-serif] text-[0.5rem] font-medium tracking-[0.5em] [margin-right:-0.5em] opacity-70">
          ESSENTIALS
        </span>
      </span>
    );
  // Remix wordmarks use fixed colours, so the logo doesn't change with the offer.
  if (slug === "bold")
    return (
      <span className={`inline-flex items-center gap-2 text-ink ${className}`}>
        <svg viewBox="0 0 34 26" aria-hidden="true" className="h-6 w-8">
          <rect x="14" y="2" width="18" height="18" rx="3" fill="#2546D8" />
          <circle cx="11" cy="14" r="10" fill="#E5412E" />
        </svg>
        <span className="font-[Bricolage_Grotesque,system-ui,sans-serif] text-[1.75rem] font-extrabold leading-none tracking-[-0.05em]">
          juno
        </span>
      </span>
    );
  if (slug === "calm")
    return (
      <span
        className={`inline-flex items-center gap-2.5 text-ink ${className}`}
      >
        <svg viewBox="0 0 14 24" aria-hidden="true" className="h-6 w-3.5">
          <path
            d="M7 23V6"
            stroke="#7C8F7A"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M7 12c-4-1-5.5-4-5-7 3.5.2 5 2.6 5 7zM7 9c4-1 5.5-4 5-7-3.5.2-5 2.6-5 7z"
            fill="#7C8F7A"
          />
        </svg>
        <span className="font-[Hanken_Grotesk,system-ui,sans-serif] text-[1.45rem] font-light leading-none tracking-[0.14em]">
          linnea
        </span>
      </span>
    );
  if (slug === "heritage")
    return (
      <span
        className={`inline-flex items-baseline gap-1.5 text-ink ${className}`}
      >
        <span className="font-[Fraunces,Georgia,serif] text-[1.8rem] font-semibold italic leading-none tracking-[-0.02em]">
          Mabel
        </span>
        <span className="font-[Fraunces,Georgia,serif] text-[1.35rem] italic leading-none text-[#B5532A]">
          &amp;
        </span>
        <span className="font-[Work_Sans,system-ui,sans-serif] text-[0.72rem] font-semibold uppercase leading-none tracking-[0.2em]">
          Co.
        </span>
      </span>
    );
  return (
    <span className={`inline-flex items-center gap-2 text-ink ${className}`}>
      <svg viewBox="0 0 28 28" aria-hidden="true" className="size-7">
        <rect width="28" height="28" rx="6" fill="var(--brand)" />
        <path d="M7 18a7 7 0 0 1 14 0z" fill="var(--highlight)" />
        <rect
          x="5"
          y="19.5"
          width="18"
          height="2"
          rx="1"
          fill="var(--brand-ink)"
        />
      </svg>
      <span className="font-[Space_Grotesk,system-ui,sans-serif] text-[1.45rem] font-bold leading-none tracking-[-0.03em]">
        daywell
      </span>
    </span>
  );
}

export function Stars({
  rating = 5,
  className = "size-4",
}: {
  rating?: number;
  className?: string;
}) {
  return (
    <span
      className="inline-flex gap-0.5 text-star"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={className}
          fill={i < Math.round(rating) ? "currentColor" : "none"}
          stroke="currentColor"
        />
      ))}
    </span>
  );
}

export function Picture({
  image,
  className = "",
  priority = false,
  fit = "cover",
}: {
  image: Img;
  className?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}

/** A page section with an optional heading block. */
export function Section({
  id,
  tone = "default",
  eyebrow,
  title,
  sub,
  align = "center",
  children,
  className = "",
}: {
  id?: string;
  tone?: "default" | "alt" | "accent";
  eyebrow?: string;
  title?: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  children: ReactNode;
  className?: string;
}) {
  const tones = {
    default: "bg-bg",
    alt: "bg-surface-2",
    accent: "bg-accent text-accent-ink",
  };
  return (
    <section
      id={id}
      className={`scroll-mt-20 px-4 py-14 md:py-20 ${tones[tone]} ${className}`}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || sub) && (
          <header
            className={`mb-10 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
          >
            {eyebrow && (
              <p className="eyebrow mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="display text-[2rem] md:text-[2.75rem]">{title}</h2>
            )}
            {sub && (
              <p
                className={`mt-4 text-base md:text-lg ${tone === "accent" ? "opacity-80" : "text-muted"}`}
              >
                {sub}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/** Who wrote a review and where: every review here is the competitor's. */
export function ReviewSource({ review }: { review: Review }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1 text-[11px] text-muted">
      Verified buyer of the original · Judge.me
      <Flag flag={review.flag} />
    </span>
  );
}
