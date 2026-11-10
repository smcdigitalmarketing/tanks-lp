import { Link } from "react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { Concept, OfferId, Reason } from "~/content/types";
import { conceptPath, fillPrices } from "~/content/concepts";
import { offers, pricing } from "~/content/offers";
import { reasonsCopy } from "~/content/reasons";
import {
  GUARANTEE_DAYS,
  GUARANTEE_FLAG,
  photos,
  reviewBy,
} from "~/content/product";
import { money } from "~/data/catalog";
import { Flag } from "~/components/flag";
import { StoreShell } from "~/components/store/shell";
import { Picture, ReviewSource, Stars } from "~/components/ui";

/*
 * The 7 Reasons listicle: an editorial page for cold traffic that makes the
 * case in seven numbered reasons, with a call to action after every second
 * one, then one real review and the offer. Early Black Friday is the lead
 * version (dark header and offer block); Christmas reframes it for gifting.
 *
 * Labelled "Brand content" and signed by the brand: no invented writer,
 * relative, expert or testimonial. Every reason is a construction fact from
 * product.ts, worded by the brand. No countdown, no stock line.
 */
export function SevenReasons({
  concept,
  offerId,
}: {
  concept: Concept;
  offerId: OfferId;
}) {
  const offer = offers[offerId];
  return (
    <StoreShell
      concept={concept}
      offerId={offerId}
      page="reasons"
      announcement={fillPrices(concept.offers[offerId].banner, offer)}
    >
      <Listicle concept={concept} offerId={offerId} />
    </StoreShell>
  );
}

function Listicle({
  concept,
  offerId,
}: {
  concept: Concept;
  offerId: OfferId;
}) {
  const r = reasonsCopy(concept, offerId);
  const meta = concept.sevenReasons;
  const offer = offers[offerId];
  const onOffer = offerId !== "standard";
  const href = conceptPath(concept.slug, { offer: offerId }) + "#buy";
  const from = pricing(offer, offer.bundles[0]).total;
  const lead = offer.bundles.find((b) => b.id === offer.defaultBundle)!;
  const leadPrice = pricing(offer, lead);
  const provisional = offer.provisional
    ? { kind: "provisional" as const, note: offer.basis }
    : undefined;
  const review = reviewBy(meta.review);

  return (
    <article className="bg-bg pb-20" data-listicle={offerId}>
      {/* Masthead */}
      <header
        className={`px-4 pb-12 pt-10 md:pb-16 md:pt-16 ${onOffer ? "bg-accent text-accent-ink" : "bg-surface-2"}`}
      >
        <div className="mx-auto max-w-4xl text-center">
          <p
            className={`eyebrow text-xs font-semibold uppercase tracking-[0.24em] ${onOffer ? "opacity-80" : "text-brand"}`}
          >
            {r.kicker}
          </p>
          <h1 className="display mt-5 text-[2.5rem] leading-[1.02] md:text-[4.6rem]">
            {r.headline}
          </h1>
          <p
            className={`mx-auto mt-6 max-w-2xl text-lg md:text-xl ${onOffer ? "opacity-85" : "text-muted"}`}
          >
            {r.dek}
          </p>
          <p
            className={`mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs ${onOffer ? "opacity-80" : "text-muted"}`}
            data-testid="byline"
          >
            <span className="rounded-full border border-current px-2 py-0.5 font-semibold uppercase tracking-wide">
              Brand content
            </span>
            <span>{meta.byline}</span>
            <span aria-hidden="true">·</span>
            <span>{meta.readTime}</span>
          </p>
        </div>
      </header>

      <figure className="mx-auto -mt-2 max-w-5xl px-4 md:-mt-6">
        <div className="aspect-[16/9] overflow-hidden rounded-card">
          <Picture
            image={photos.mirror}
            priority
            className="object-[center_30%]"
          />
        </div>
        <figcaption className="mt-2 text-xs text-muted">
          The {concept.brand.productName}: the bra is built into the tank.
        </figcaption>
      </figure>

      <div className="mx-auto mt-10 max-w-2xl space-y-5 px-4 text-[17px] leading-[1.75] text-ink/85 md:text-lg">
        {r.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {/* The seven */}
      <ol className="mx-auto mt-14 max-w-5xl space-y-16 px-4 md:space-y-24">
        {r.reasons.map((reason, i) => (
          <li key={reason.title}>
            <ReasonBlock reason={reason} index={i} />
            {i % 2 === 1 && i < 6 && (
              <InlineCta
                label={r.ctas[(i - 1) / 2]}
                href={href}
                note={`From ${money(from)}`}
              />
            )}
          </li>
        ))}
      </ol>

      {/* One real review */}
      <figure className="mx-auto mt-20 max-w-3xl border-y border-line px-4 py-10 text-center">
        <Stars rating={review.rating} className="mx-auto size-4" />
        <blockquote className="display mt-4 text-[1.6rem] italic leading-snug md:text-[2.1rem]">
          “{review.text}”
        </blockquote>
        <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
          <strong>{review.name}</strong>
          <ReviewSource review={review} />
        </figcaption>
      </figure>

      {/* The offer */}
      <section
        className="mx-auto mt-20 max-w-5xl px-4"
        aria-labelledby="reasons-offer"
      >
        <div
          className="rounded-card bg-accent p-6 text-accent-ink md:p-12"
          data-testid="reasons-offer"
        >
          <p className="eyebrow text-xs font-semibold uppercase tracking-[0.22em] opacity-80">
            {r.closing.eyebrow}
            <Flag flag={provisional} className="!text-current" />
          </p>
          <h2
            id="reasons-offer"
            className="display mt-3 text-[2.1rem] md:text-[3.2rem]"
          >
            {r.closing.headline}
          </h2>
          <p className="mt-4 max-w-2xl opacity-85 md:text-lg">
            {fillPrices(r.closing.body, offer)}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {offer.bundles.map((b) => {
              const p = pricing(offer, b);
              const isLead = b.id === offer.defaultBundle;
              return (
                <li
                  key={b.id}
                  className={`rounded-[calc(var(--r-card)*0.7)] border p-5 ${isLead ? "border-accent-ink/70" : "border-accent-ink/20"}`}
                >
                  {isLead && (
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-80">
                      {concept.offers[offerId].badge}
                    </p>
                  )}
                  <p className="mt-1 font-semibold">
                    {b.units === 1 ? "1 tank" : `${b.units} tanks`}
                  </p>
                  <p className="text-xs opacity-75">{b.deal}</p>
                  <p className="display mt-3 text-3xl">{money(p.total)}</p>
                  {p.saving > 0 && (
                    <p className="mt-1 text-xs opacity-80">
                      <s>{money(p.was)}</s> · you save {money(p.saving)}
                    </p>
                  )}
                  <p className="mt-1 text-xs opacity-70">
                    {money(p.perUnit)} each
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 flex items-start gap-2 text-sm opacity-85">
            <ShieldCheck
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0"
            />
            <span>
              {GUARANTEE_DAYS}-day fit guarantee: if the size is wrong, one free
              exchange, and you keep the first tank.
              <Flag flag={GUARANTEE_FLAG} className="!text-current" />
            </span>
          </p>
          <Link
            to={href}
            data-testid="reasons-cta"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-btn bg-accent-ink px-8 py-4 font-semibold text-accent [font-family:var(--f-button)] sm:w-auto"
          >
            {r.closing.cta} · {lead.units} for {money(leadPrice.total)}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <p className="mx-auto mt-12 max-w-2xl border-t border-line px-4 pt-4 text-xs leading-relaxed text-muted">
        Brand content from {concept.brand.name}. The quoted review is from a
        verified buyer of the original built-in bra tank.
      </p>
    </article>
  );
}

function ReasonBlock({ reason, index }: { reason: Reason; index: number }) {
  const flip = index % 2 === 1;
  return (
    <section
      className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
      data-testid="reason"
    >
      <div className={flip ? "md:order-2" : ""}>
        <p className="flex items-baseline gap-4">
          <span className="display text-[4.5rem] leading-[0.8] text-brand md:text-[6.5rem]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="eyebrow text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            {reason.tag}
          </span>
        </p>
        <h2 className="display mt-5 text-[1.9rem] md:text-[2.6rem]">
          {reason.title}
          <Flag flag={reason.flag} />
        </h2>
        <div className="mt-4 space-y-4 text-[17px] leading-[1.75] text-ink/85">
          {reason.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
      <div className="aspect-[4/5] overflow-hidden rounded-card bg-surface-2">
        <Picture image={reason.image} className="object-[center_30%]" />
      </div>
    </section>
  );
}

function InlineCta({
  label,
  href,
  note,
}: {
  label: string;
  href: string;
  note: string;
}) {
  return (
    <div className="mt-12 flex flex-col items-center gap-2 border-y border-line py-6 text-center md:mt-16">
      <Link
        to={href}
        data-testid="reasons-cta"
        className="btn-primary inline-flex items-center gap-2 px-7 py-4 font-semibold"
      >
        {label}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
      <p className="text-xs text-muted">{note}</p>
    </div>
  );
}
