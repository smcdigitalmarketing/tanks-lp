import { Check, Minus } from "lucide-react";
import type { PdpContent } from "~/content/types";
import { Picture, Section } from "~/components/ui";
import { Flag } from "~/components/flag";

/*
 * Section 6: value props. The headline carries the benefit (most people read
 * only that), the body explains how, and the image backs up the claim.
 */

export function ValueProps({
  data,
  style,
}: {
  data: PdpContent["valueProps"];
  style: "alternating" | "cards" | "numbered";
}) {
  if (style === "numbered") {
    // A numbered checklist: big numbers, benefit headline, a small photo.
    return (
      <Section eyebrow={data.eyebrow} title={data.headline}>
        <ol className="mx-auto max-w-4xl divide-y divide-line border-y border-line">
          {data.items.map((v, i) => (
            <li key={v.headline} className="grid grid-cols-[auto_1fr] items-center gap-5 py-6 md:grid-cols-[auto_1fr_220px] md:gap-8">
              <span className="display text-5xl text-brand md:text-6xl">{String(i + 1).padStart(2, "0")}</span>
              <div>
                {v.eyebrow && (
                  <p className="eyebrow text-xs font-bold uppercase tracking-[0.16em] text-muted">{v.eyebrow}</p>
                )}
                <h3 className="display mt-1 text-2xl md:text-3xl">{v.headline}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{v.body}</p>
              </div>
              <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-card md:col-span-1 md:aspect-[4/3]">
                <Picture image={v.image} />
              </div>
            </li>
          ))}
        </ol>
      </Section>
    );
  }
  if (style === "cards") {
    return (
      <Section eyebrow={data.eyebrow} title={data.headline}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((v) => (
            <article
              key={v.headline}
              className="overflow-hidden rounded-card border border-line bg-surface"
            >
              <div className="aspect-[4/3] bg-surface-2">
                <Picture image={v.image} />
              </div>
              <div className="p-6">
                {v.eyebrow && (
                  <p className="eyebrow mb-2 text-xs font-bold uppercase tracking-[0.16em] text-brand">
                    {v.eyebrow}
                  </p>
                )}
                <h3 className="display text-xl md:text-2xl">{v.headline}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {v.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    );
  }
  return (
    <Section eyebrow={data.eyebrow} title={data.headline}>
      <div className="space-y-16 md:space-y-24">
        {data.items.map((v, i) => (
          <article
            key={v.headline}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
          >
            <div
              className={`aspect-[4/3] overflow-hidden rounded-card bg-surface-2 ${i % 2 ? "md:order-2" : ""}`}
            >
              <Picture image={v.image} />
            </div>
            <div>
              {v.eyebrow && (
                <p className="eyebrow mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand">
                  {v.eyebrow}
                </p>
              )}
              <h3 className="display text-2xl md:text-[2.1rem]">
                {v.headline}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                {v.body}
              </p>
              {v.points && (
                <ul className="mt-5 space-y-2">
                  {v.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-[15px]">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-success"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function HowItWorks({ data }: { data: PdpContent["howItWorks"] }) {
  return (
    <Section id="how" tone="alt" eyebrow={data.eyebrow} title={data.headline} sub={data.sub}>
      <ol className="grid gap-5 md:grid-cols-3">
        {data.steps.map((s, i) => (
          <li key={s.title} className="overflow-hidden rounded-card border border-line bg-surface">
            <div className="aspect-[4/3] bg-surface-2">
              <Picture image={s.image} />
            </div>
            <div className="p-5">
              <p className="eyebrow text-xs font-semibold uppercase tracking-[0.16em] text-brand">Step {i + 1}</p>
              <h3 className="display mt-1 text-2xl">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** The competitor's comparison, trimmed: our column first and highlighted. */
export function Comparison({ data }: { data: PdpContent["comparison"] }) {
  return (
    <Section id="compare" title={data.headline} sub={data.sub}>
      <div className="no-scrollbar mx-auto max-w-4xl overflow-x-auto rounded-card border border-line bg-surface">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="p-4">
                <span className="sr-only">Feature</span>
              </th>
              {data.columns.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={`p-3 text-center text-xs font-semibold leading-tight ${i === 0 ? "bg-brand text-brand-ink" : "text-muted"}`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((r) => (
              <tr key={r.label} className="border-b border-line last:border-0">
                <th scope="row" className="p-4 font-medium">
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td key={i} className={`p-3 text-center ${i === 0 ? "bg-brand/[0.07]" : ""}`}>
                    {v ? (
                      <Check aria-label="Yes" className={`mx-auto size-5 ${i === 0 ? "text-brand" : "text-success"}`} strokeWidth={2.5} />
                    ) : (
                      <Minus aria-label="No" className="mx-auto size-4 text-muted/60" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-auto mt-3 max-w-4xl text-center text-xs text-muted">
        Adapted from the original product's own comparison.
        <Flag flag={data.flag} />
      </p>
    </Section>
  );
}
