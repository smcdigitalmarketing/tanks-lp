import { Link } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import type {
  AdvertorialSection,
  Concept,
  OfferId,
  Review,
} from "~/content/types";
import { conceptPath, fillPrices } from "~/content/concepts";
import { offers, pricing } from "~/content/offers";
import { GUARANTEE_FLAG, photos } from "~/content/product";
import { money } from "~/data/catalog";
import { Flag } from "~/components/flag";
import { StoreShell } from "~/components/store/shell";
import { Picture, ReviewSource, Stars } from "~/components/ui";

/*
 * The advertorial: an article that introduces the problem, explains the
 * product, answers objections and hands over to the offer. Every concept has
 * its own copy and one of three layouts:
 *   letter     Hallie: a personal note, one narrow column
 *   editorial  Oriel: a journal long-read with a margin column and big type
 *   magazine   Daywell: a numbered explainer, image beside text
 * It is labelled "Brand content" and every button goes to that concept's
 * product page, keeping the offer. No journalists, experts or studies.
 */

type Variant = Concept["layout"]["advertorial"];

export function AdvertorialPage({
  concept,
  offerId,
}: {
  concept: Concept;
  offerId: OfferId;
}) {
  const offer = offers[offerId];
  const copy = concept.offers[offerId];
  return (
    <StoreShell
      concept={concept}
      offerId={offerId}
      page="advertorial"
      announcement={fillPrices(copy.banner, offer)}
    >
      <Article concept={concept} offerId={offerId} />
    </StoreShell>
  );
}

function Article({ concept, offerId }: { concept: Concept; offerId: OfferId }) {
  const a = concept.advertorial;
  const v = concept.layout.advertorial;
  const productHref = conceptPath(concept.slug, { offer: offerId }) + "#buy";
  const wide = v === "editorial";

  return (
    <article className="bg-bg pb-20" data-advertorial={v}>
      <header
        className={`px-4 pt-10 md:pt-16 ${wide ? "mx-auto max-w-5xl" : v === "magazine" ? "mx-auto max-w-4xl" : "mx-auto max-w-2xl text-center"}`}
      >
        <p className="eyebrow flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          <span className={v === "letter" ? "mx-auto" : ""}>{a.kicker}</span>
        </p>
        <h1
          className={`display mt-4 ${
            v === "editorial"
              ? "text-[2.6rem] leading-[1.02] md:text-[5.2rem]"
              : v === "magazine"
                ? "text-[2.3rem] md:text-[3.8rem]"
                : "text-[2.1rem] md:text-[3.1rem]"
          }`}
        >
          {a.headline}
        </h1>
        <p
          className={`mt-5 text-lg text-muted md:text-xl ${wide ? "max-w-3xl" : ""}`}
        >
          {a.dek}
        </p>
        <p
          className={`mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted ${v === "letter" ? "justify-center" : ""}`}
          data-testid="byline"
        >
          <span className="rounded-full border border-line px-2 py-0.5 font-semibold uppercase tracking-wide text-ink">
            Brand content
          </span>
          <span>{a.byline}</span>
          <span aria-hidden="true">·</span>
          <span>{a.readTime}</span>
        </p>
      </header>

      <figure
        className={`mt-8 px-4 md:mt-12 ${wide ? "mx-auto max-w-6xl" : "mx-auto max-w-3xl"}`}
      >
        <div
          className={`overflow-hidden rounded-card ${wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}
        >
          <Picture image={a.lead} priority className="object-[center_30%]" />
        </div>
        <figcaption className="mt-2 text-xs text-muted">
          {a.leadCaption}
        </figcaption>
      </figure>

      <div
        className={`px-4 ${wide ? "mx-auto grid max-w-5xl gap-10 md:grid-cols-[200px_1fr]" : "mx-auto max-w-2xl"}`}
      >
        {wide && (
          <aside className="hidden pt-12 text-xs text-muted md:block">
            <div className="sticky top-24 space-y-3 border-t border-ink pt-4">
              <p className="eyebrow font-semibold uppercase tracking-[0.18em] text-ink">
                {a.byline}
              </p>
              <p>{a.readTime}</p>
              <Link
                to={productHref}
                className="inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-4"
              >
                {concept.brand.productName}{" "}
                <ArrowRight aria-hidden="true" className="size-3" />
              </Link>
            </div>
          </aside>
        )}
        <div className="min-w-0">
          <div
            className={`mt-10 space-y-5 text-[17px] leading-[1.75] md:text-lg ${v === "letter" ? "first-letter-drop" : ""}`}
          >
            {a.intro.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0 && v !== "magazine" ? "text-ink" : "text-ink/85"
                }
              >
                {p}
              </p>
            ))}
          </div>

          {a.sections.map((s, i) => (
            <div key={s.title}>
              <SectionBlock section={s} variant={v} index={i} />
              {i === 1 && (
                <ProductCard
                  concept={concept}
                  offerId={offerId}
                  href={productHref}
                  variant={v}
                />
              )}
            </div>
          ))}

          <OfferHandOff
            concept={concept}
            offerId={offerId}
            href={productHref}
            variant={v}
          />

          {v === "letter" && (
            <p className="mt-12 text-center text-lg italic text-muted [font-family:var(--f-display)]">
              With warmth, the {concept.brand.name} team
            </p>
          )}
          <p className="mt-12 border-t border-line pt-4 text-xs leading-relaxed text-muted">
            Brand content from {concept.brand.name}. Quoted reviews are from
            verified buyers of the original built-in bra tank.
          </p>
        </div>
      </div>
    </article>
  );
}

function SectionBlock({
  section: s,
  variant: v,
  index,
}: {
  section: AdvertorialSection;
  variant: Variant;
  index: number;
}) {
  const magazine = v === "magazine";
  return (
    <section className="mt-14 md:mt-16">
      {magazine ? (
        <h2 className="display flex items-start gap-4 text-[1.8rem] md:text-[2.4rem]">
          <span className="text-[3.2rem] leading-[0.8] text-brand md:text-[4.4rem]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{s.title.replace(/^\d+\.\s*/, "")}</span>
        </h2>
      ) : (
        <h2
          className={`display ${v === "editorial" ? "border-t border-ink pt-5 text-[1.9rem] md:text-[2.5rem]" : "text-[1.7rem] md:text-[2.1rem]"}`}
        >
          {s.title}
        </h2>
      )}
      <div
        className={
          magazine && s.image
            ? "mt-5 grid gap-6 md:grid-cols-[1fr_1fr] md:items-start"
            : ""
        }
      >
        <div className="mt-4 space-y-4 text-[17px] leading-[1.75] text-ink/85 md:text-lg">
          {s.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        {s.image && (
          <figure className={magazine ? "md:mt-4" : "mt-6"}>
            <div
              className={`overflow-hidden rounded-card ${magazine ? "aspect-square" : "aspect-[4/3]"}`}
            >
              <Picture image={s.image} />
            </div>
            {s.caption && (
              <figcaption className="mt-2 text-xs text-muted">
                {s.caption}
              </figcaption>
            )}
          </figure>
        )}
      </div>
      {s.list && <List items={s.list} variant={v} />}
      {s.pullQuote && <PullQuote review={s.pullQuote} variant={v} />}
    </section>
  );
}

function List({
  items,
  variant: v,
}: {
  items: NonNullable<AdvertorialSection["list"]>;
  variant: Variant;
}) {
  if (v === "editorial")
    return (
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {items.map((it) => (
          <div
            key={it.label}
            className="grid gap-1 py-4 md:grid-cols-[180px_1fr] md:gap-6"
          >
            <dt className="display text-xl">{it.label}</dt>
            <dd className="text-[16px] leading-relaxed text-muted">
              {it.text}
            </dd>
          </div>
        ))}
      </dl>
    );
  if (v === "magazine")
    return (
      <ul className="mt-6 overflow-hidden rounded-card border border-line">
        {items.map((it) => (
          <li
            key={it.label}
            className="grid grid-cols-[minmax(0,130px)_1fr] gap-4 border-b border-line bg-surface p-4 text-[15px] last:border-0"
          >
            <strong className="font-bold">{it.label}</strong>
            <span className="text-muted">{it.text}</span>
          </li>
        ))}
      </ul>
    );
  return (
    <ul className="mt-6 space-y-3">
      {items.map((it) => (
        <li key={it.label} className="rounded-card bg-surface-2 p-5">
          <p className="flex items-start gap-2 font-semibold">
            <Check
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 text-brand"
            />
            {it.label}
          </p>
          <p className="mt-1 pl-6 text-[15px] leading-relaxed text-muted">
            {it.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

function PullQuote({
  review,
  variant: v,
}: {
  review: Review;
  variant: Variant;
}) {
  return (
    <figure
      className={`mt-8 ${
        v === "editorial"
          ? "border-y border-ink py-8 text-center"
          : v === "magazine"
            ? "rounded-card bg-brand p-6 text-brand-ink"
            : "rounded-card bg-highlight/60 p-6"
      }`}
    >
      <Stars rating={review.rating} className="size-4" />
      <blockquote
        className={`display mt-3 leading-snug ${v === "editorial" ? "text-[1.9rem] italic md:text-[2.4rem]" : "text-[1.4rem]"}`}
      >
        “{review.text}”
      </blockquote>
      <figcaption
        className={`mt-4 flex flex-wrap items-center gap-2 text-sm ${v === "editorial" ? "justify-center" : ""}`}
      >
        <strong>{review.name}</strong>
        <span className={v === "magazine" ? "[&_*]:!text-brand-ink/80" : ""}>
          <ReviewSource review={review} />
        </span>
      </figcaption>
    </figure>
  );
}

/** "Meet the product" card, after the second section. */
function ProductCard({
  concept,
  offerId,
  href,
  variant: v,
}: {
  concept: Concept;
  offerId: OfferId;
  href: string;
  variant: Variant;
}) {
  const offer = offers[offerId];
  const single = pricing(offer, offer.bundles[0]);
  return (
    <aside
      className={`mt-12 grid overflow-hidden border border-line bg-surface sm:grid-cols-[200px_1fr] ${v === "editorial" ? "" : "rounded-card"}`}
      data-testid="product-card"
    >
      <div className="aspect-square bg-surface-2 sm:aspect-auto">
        <Picture image={photos.front} className="object-[center_30%]" />
      </div>
      <div className="p-5">
        <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          Meet the {concept.brand.productName}
        </p>
        <p className="display mt-1 text-2xl">{concept.pdp.title.benefit}</p>
        <ul className="mt-3 space-y-1 text-sm text-muted">
          {concept.pdp.bullets.slice(0, 3).map((b) => (
            <li key={b.text} className="flex gap-2">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-success"
              />
              {b.text}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm">
          From <strong>{money(single.total)}</strong>
          {offer.provisional && (
            <Flag flag={{ kind: "provisional", note: offer.basis }} />
          )}
        </p>
        <Link
          to={href}
          className="btn-primary mt-4 inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
          data-testid="advertorial-cta"
        >
          {concept.advertorial.closing.cta}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </aside>
  );
}

/** The transition into the offer: the bundles, priced from offers.ts, and the button. */
function OfferHandOff({
  concept,
  offerId,
  href,
  variant: v,
}: {
  concept: Concept;
  offerId: OfferId;
  href: string;
  variant: Variant;
}) {
  const offer = offers[offerId];
  const copy = concept.offers[offerId];
  const c = concept.advertorial.closing;
  return (
    <section
      className={`mt-16 bg-accent p-6 text-accent-ink md:p-10 ${v === "editorial" ? "" : "rounded-card"}`}
      data-testid="offer-handoff"
    >
      <p className="eyebrow text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
        {copy.eyebrow}
        {offer.provisional && (
          <Flag
            flag={{ kind: "provisional", note: offer.basis }}
            className="!text-current"
          />
        )}
      </p>
      <h2 className="display mt-2 text-[2rem] md:text-[2.6rem]">
        {offerId === "standard" ? c.headline : copy.headline}
      </h2>
      <p className="mt-3 opacity-85">{c.body}</p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-3">
        {offer.bundles.map((b) => {
          const p = pricing(offer, b);
          return (
            <li
              key={b.id}
              className="rounded-[calc(var(--r-card)*0.7)] border border-accent-ink/20 p-4"
            >
              <p className="text-sm font-semibold">
                {b.units === 1 ? "1 tank" : `${b.units} tanks`}
              </p>
              <p className="text-xs opacity-75">{b.deal}</p>
              <p className="mt-2 text-xl font-bold">{money(p.total)}</p>
              {p.saving > 0 && (
                <p className="text-xs opacity-80">
                  <s>{money(p.was)}</s> · save {money(p.saving)}
                </p>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-xs opacity-80">
        90-day fit guarantee: one free size exchange.
        <Flag flag={GUARANTEE_FLAG} className="!text-current" />
      </p>
      <Link
        to={href}
        className="mt-6 inline-flex items-center gap-2 rounded-btn bg-accent-ink px-6 py-4 font-semibold text-accent [font-family:var(--f-button)]"
        data-testid="advertorial-cta"
      >
        {c.cta}
        <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
}
