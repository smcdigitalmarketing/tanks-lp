import { ShieldCheck } from "lucide-react";
import type { PdpContent } from "~/content/types";
import { Flag } from "~/components/flag";
import { Picture, Section } from "~/components/ui";
import { Accordions } from "./details";

/*
 * Section 7: closing. The guarantee, the FAQ, then one last call to action,
 * so the last thing before the footer answers the remaining doubts.
 */

export function GuaranteeBlock({
  data,
  onShop,
}: {
  data: PdpContent["guarantee"];
  onShop: () => void;
}) {
  return (
    <Section>
      <div className="grid items-stretch overflow-hidden rounded-card border border-line bg-surface md:grid-cols-2">
        <div className="aspect-[4/3] bg-surface-2 md:aspect-auto">
          <Picture image={data.image} className="object-[center_25%]" />
        </div>
        <div className="p-6 md:p-10">
          <div className="mb-5 grid size-20 place-items-center rounded-full border-2 border-brand text-center text-brand">
            <p className="display text-2xl leading-none">
              {data.days}
              <span className="block font-sans text-[10px] font-semibold tracking-[0.2em]">
                DAYS
              </span>
            </p>
          </div>
          <h2 className="display text-3xl md:text-4xl">{data.headline}</h2>
          <p className="mt-4 leading-relaxed text-muted">{data.body}</p>
          <ul className="mt-5 space-y-2 text-[15px]">
            {data.points.map((pt) => (
              <li key={pt} className="flex items-start gap-2">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-success"
                />
                {pt}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            <Flag flag={data.flag} className="!ml-0" />
          </p>
          <button
            type="button"
            onClick={onShop}
            data-testid="guarantee-cta"
            className="btn-primary mt-7 w-full px-8 py-4 font-semibold tracking-wide md:w-auto"
          >
            {data.cta}
          </button>
        </div>
      </div>
    </Section>
  );
}

export function Faq({
  data,
  support,
}: {
  data: PdpContent["faq"];
  support: { email: string; hours: string };
}) {
  return (
    <Section id="faq" title={data.headline} sub={data.sub}>
      <div className="mx-auto max-w-3xl">
        <Accordions
          items={data.items.map((f) => ({
            title: f.q,
            body: [f.a],
            flag: f.flag,
          }))}
        />
        <p className="mt-8 text-center text-sm text-muted">
          Still have a question? Email{" "}
          <a
            href={`mailto:${support.email}`}
            className="font-semibold text-ink underline"
          >
            {support.email}
          </a>
          , {support.hours}.
        </p>
      </div>
    </Section>
  );
}

export function ClosingCta({
  data,
  onShop,
}: {
  data: PdpContent["closing"];
  onShop: () => void;
}) {
  return (
    <Section tone="accent">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="display text-[2.2rem] md:text-5xl">{data.headline}</h2>
        <p className="mt-4 text-base opacity-85 md:text-lg">{data.body}</p>
        <button
          type="button"
          onClick={onShop}
          className="mt-8 rounded-btn bg-accent-ink px-8 py-4 font-semibold tracking-wide text-accent transition hover:opacity-90 [font-family:var(--f-button)]"
        >
          {data.cta}
        </button>
      </div>
    </Section>
  );
}
