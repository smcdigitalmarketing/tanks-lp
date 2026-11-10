import { Link } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import type {
  AdvertorialSection,
  Concept,
  OfferId,
  Review,
} from "~/content/types";
import { fillPrices, storePath } from "~/content/store";
import { offers, pricing } from "~/content/offers";
import { GUARANTEE_FLAG, photos } from "~/content/product";
import { money } from "~/data/catalog";
import { Flag } from "~/components/flag";
import { StoreShell } from "~/components/store/shell";
import { Picture, ReviewSource, Stars } from "~/components/ui";

/*
 * The advertorial ("A note from Hallie"): a personal letter in one narrow
 * column that introduces the problem, explains the product, answers
 * objections and hands over to the offer. It is labelled "Brand content" and
 * every button goes to the product page, keeping the offer. No journalists,
 * experts or studies.
 */

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
      offerId={offerId}
      page="story"
      announcement={fillPrices(copy.banner, offer)}
    >
      <Article concept={concept} offerId={offerId} />
    </StoreShell>
  );
}

function Article({ concept, offerId }: { concept: Concept; offerId: OfferId }) {
  const a = concept.advertorial;
  const productHref = storePath("product", offerId) + "#buy";

  return (
    <article className="bg-bg pb-20" data-advertorial="letter">
      <header className="mx-auto max-w-2xl px-4 pt-10 text-center md:pt-16">
        <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          {a.kicker}
        </p>
        <h1 className="display mt-4 text-[2.1rem] md:text-[3.1rem]">
          {a.headline}
        </h1>
        <p className="mt-5 text-lg text-muted md:text-xl">{a.dek}</p>
        <p
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-muted"
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

      <figure className="mx-auto mt-8 max-w-3xl px-4 md:mt-12">
        <div className="aspect-[4/3] overflow-hidden rounded-card">
          <Picture image={a.lead} priority className="object-[center_30%]" />
        </div>
        <figcaption className="mt-2 text-xs text-muted">
          {a.leadCaption}
        </figcaption>
      </figure>

      <div className="mx-auto max-w-2xl px-4">
        <div className="first-letter-drop mt-10 space-y-5 text-[17px] leading-[1.75] md:text-lg">
          {a.intro.map((p, i) => (
            <p key={i} className={i === 0 ? "text-ink" : "text-ink/85"}>
              {p}
            </p>
          ))}
        </div>

        {a.sections.map((s, i) => (
          <div key={s.title}>
            <SectionBlock section={s} />
            {i === 1 && (
              <ProductCard
                concept={concept}
                offerId={offerId}
                href={productHref}
              />
            )}
          </div>
        ))}

        <OfferHandOff concept={concept} offerId={offerId} href={productHref} />

        <p className="mt-12 text-center text-lg italic text-muted [font-family:var(--f-display)]">
          With warmth, the {concept.brand.name} team
        </p>
        <p className="mt-12 border-t border-line pt-4 text-xs leading-relaxed text-muted">
          Brand content from {concept.brand.name}. Quoted reviews are from
          verified buyers of the original built-in bra tank.
        </p>
      </div>
    </article>
  );
}

function SectionBlock({ section: s }: { section: AdvertorialSection }) {
  return (
    <section className="mt-14 md:mt-16">
      <h2 className="display text-[1.7rem] md:text-[2.1rem]">{s.title}</h2>
      <div className="mt-4 space-y-4 text-[17px] leading-[1.75] text-ink/85 md:text-lg">
        {s.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {s.image && (
        <figure className="mt-6">
          <div className="aspect-[4/3] overflow-hidden rounded-card">
            <Picture image={s.image} />
          </div>
          {s.caption && (
            <figcaption className="mt-2 text-xs text-muted">
              {s.caption}
            </figcaption>
          )}
        </figure>
      )}
      {s.list && <List items={s.list} />}
      {s.pullQuote && <PullQuote review={s.pullQuote} />}
    </section>
  );
}

function List({
  items,
}: {
  items: NonNullable<AdvertorialSection["list"]>;
}) {
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

function PullQuote({ review }: { review: Review }) {
  return (
    <figure className="mt-8 rounded-card bg-highlight/60 p-6">
      <Stars rating={review.rating} className="size-4" />
      <blockquote className="display mt-3 text-[1.4rem] leading-snug">
        “{review.text}”
      </blockquote>
      <figcaption className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <strong>{review.name}</strong>
        <ReviewSource review={review} />
      </figcaption>
    </figure>
  );
}

/** "Meet the product" card, after the second section. */
function ProductCard({
  concept,
  offerId,
  href,
}: {
  concept: Concept;
  offerId: OfferId;
  href: string;
}) {
  const offer = offers[offerId];
  const single = pricing(offer, offer.bundles[0]);
  return (
    <aside
      className="mt-12 grid overflow-hidden rounded-card border border-line bg-surface sm:grid-cols-[200px_1fr]"
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
}: {
  concept: Concept;
  offerId: OfferId;
  href: string;
}) {
  const offer = offers[offerId];
  const copy = concept.offers[offerId];
  const c = concept.advertorial.closing;
  return (
    <section
      className="mt-16 rounded-card bg-accent p-6 text-accent-ink md:p-10"
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
