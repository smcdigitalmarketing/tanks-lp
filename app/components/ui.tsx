import type { ReactNode } from "react";
import { Star } from "lucide-react";
import type { Review } from "~/content/types";
import type { Img } from "~/lib/images";
import { Flag } from "~/components/flag";

/** The Kindwear wordmark: lowercase DM Serif Display with a rose full stop. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-[DM_Serif_Display,Georgia,serif] text-[1.9rem] leading-none tracking-[-0.01em] text-ink ${className}`}
    >
      kindwear<span className="text-brand">.</span>
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
