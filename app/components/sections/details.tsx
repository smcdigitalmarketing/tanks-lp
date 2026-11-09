import { ChevronDown } from "lucide-react";
import type { PdpContent } from "~/content/types";
import type { Img } from "~/lib/images";
import { Flag } from "~/components/flag";
import { Picture } from "~/components/ui";

/*
 * Section 4: product details. Accordions get 1–2% engagement, so the first
 * one is open by default and holds the strongest reason to buy.
 */
export function Accordions({ items }: { items: PdpContent["accordions"] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((a, i) => (
        <details key={a.title} open={i === 0} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold [&::-webkit-details-marker]:hidden">
            <span>
              {a.title}
              <Flag flag={a.flag} />
            </span>
            <ChevronDown
              aria-hidden="true"
              className="size-4 shrink-0 transition group-open:rotate-180"
            />
          </summary>
          {a.body.length === 1 ? (
            <p className="pb-4 text-sm leading-relaxed text-muted">
              {a.body[0]}
            </p>
          ) : (
            <ul className="space-y-1.5 pb-4 text-sm leading-relaxed text-muted">
              {a.body.map((line) => (
                <li key={line} className="flex gap-2">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1 shrink-0 rounded-full bg-brand"
                  />
                  {line}
                </li>
              ))}
            </ul>
          )}
        </details>
      ))}
    </div>
  );
}

/** Auto-scrolling lifestyle strip; pauses on hover and stops for reduced motion. */
export function LifestyleMarquee({
  images,
  label,
}: {
  images: Img[];
  label: string;
}) {
  return (
    <div className="marquee overflow-hidden py-2" aria-label={label}>
      <div className="marquee-track flex w-max gap-3">
        {[...images, ...images].map((im, i) => (
          <div
            key={i}
            className="h-48 w-40 shrink-0 overflow-hidden rounded-card md:h-72 md:w-60"
            aria-hidden={i >= images.length}
          >
            <Picture image={im} />
          </div>
        ))}
      </div>
    </div>
  );
}
