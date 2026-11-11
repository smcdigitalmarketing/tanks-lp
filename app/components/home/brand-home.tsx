import { useRef } from "react";
import { ArrowRight, Check, Gift } from "lucide-react";
import type { Concept, OfferId } from "~/content/types";
import { pageContent } from "~/content/page";
import { faqs, photos } from "~/content/product";
import { COLOURS, money } from "~/data/catalog";
import { storePath } from "~/content/store";
import { colourImg } from "~/components/sections/buy-box";
import { Link } from "react-router";
import { StoreShell } from "~/components/store/shell";
import { Flag } from "~/components/flag";
import { Picture, Section } from "~/components/ui";
import {
  MediaGallery,
  OfferBanner,
  PriceSavings,
} from "~/components/sections/above-fold";
import {
  BuyBox,
  StickyAtc,
  UnderAtc,
  useBuyState,
} from "~/components/sections/buy-box";
import { ReviewsWall } from "~/components/sections/proof";
import {
  Comparison,
  HowItWorks,
  ValueProps,
} from "~/components/sections/value-props";
import { ClosingCta, Faq, GuaranteeBlock } from "~/components/sections/closing";
import { Divider } from "~/components/sections/divider";

/*
 * The homepage (/): the landing page cold traffic arrives on. It follows
 * the competitor's homepage journey (promise → why bras stop working → the
 * product → colours → buy → proof → how → compare → guarantee → FAQ), in
 * Kindwear's words, with the product page's buy box built in so nobody has to click
 * through to order. Early Black Friday and Christmas change the hero, the
 * offer block and (Christmas) add a gifting section; facts never change.
 */
export function BrandHome({
  concept,
  offerId,
}: {
  concept: Concept;
  offerId: OfferId;
}) {
  const c = pageContent(concept, offerId);
  return (
    <StoreShell
      offerId={offerId}
      page="home"
      announcement={c.announcement}
    >
      <HomeBody concept={concept} offerId={offerId} />
    </StoreShell>
  );
}

function HomeBody({ concept, offerId }: { concept: Concept; offerId: OfferId }) {
  const c = pageContent(concept, offerId);
  const h = concept.home;
  const xmas = offerId === "christmas";
  const hero =
    offerId === "christmas"
      ? h.christmas.hero
      : offerId === "early-black-friday"
        ? h.blackFriday.hero
        : h.hero;
  const buy = useBuyState(c.buy.offer, concept.brand.productName);
  const atcRef = useRef<HTMLButtonElement>(null);
  const toBuy = () =>
    document.getElementById("buy")?.scrollIntoView({ behavior: "smooth" });
  const provisional = c.buy.offer.provisional
    ? { kind: "provisional" as const, note: c.buy.offer.basis }
    : undefined;
  const onOffer = offerId !== "standard";

  return (
    <>
      {/* Hero */}
      <section
        data-home-section="hero"
        className={`px-4 py-10 md:py-16 ${onOffer ? "bg-accent text-accent-ink" : "bg-surface-2"}`}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1.05fr_1fr] md:gap-14">
          <div>
            <p
              className={`eyebrow text-xs font-semibold uppercase tracking-[0.2em] ${onOffer ? "opacity-80" : "text-brand"}`}
            >
              {hero.eyebrow}
              {provisional && (
                <Flag flag={provisional} className="!text-current" />
              )}
            </p>
            <h1 className="display mt-4 text-[2.4rem] md:text-[3.9rem]">
              {hero.headline}
            </h1>
            <p
              className={`mt-5 max-w-xl text-lg leading-relaxed ${onOffer ? "opacity-85" : "text-muted"}`}
            >
              {hero.sub}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#buy"
                data-testid="home-cta"
                className={`inline-flex items-center gap-2 px-7 py-4 font-semibold ${onOffer ? "rounded-btn bg-accent-ink text-accent [font-family:var(--f-button)]" : "btn-primary"}`}
              >
                {hero.cta}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              <span
                className={`text-sm ${onOffer ? "opacity-80" : "text-muted"}`}
              >
                From{" "}
                <strong>{money(c.buy.offer.bundles[0].price)}</strong>
              </span>
            </div>
            <ul
              className={`mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm ${onOffer ? "opacity-85" : "text-muted"}`}
            >
              {["No underwire", "No hooks", "No band", "Sizes S–4XL"].map(
                (t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <Check aria-hidden="true" className="size-4" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-card">
            <Picture
              image={photos.portrait}
              priority
              className="object-[center_25%]"
            />
          </div>
        </div>
      </section>

      {/* Why bras stop working */}
      <Section
        eyebrow={h.problem.eyebrow}
        title={h.problem.headline}
        className="[&_header]:max-w-3xl"
      >
        <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[1fr_1fr]">
          <div className="space-y-4 text-[17px] leading-relaxed text-ink/85">
            {h.problem.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {h.problem.points.map((pt) => (
                <li
                  key={pt.label}
                  className="grid gap-1 py-4 sm:grid-cols-[130px_1fr] sm:gap-4"
                >
                  <strong className="display text-xl">{pt.label}</strong>
                  <span className="text-[15px] text-muted">{pt.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure>
            <div className="aspect-square overflow-hidden rounded-card">
              <Picture image={photos.braVsTank} />
            </div>
            <figcaption className="mt-2 text-xs text-muted">
              A traditional bra and the {concept.brand.productName}, from
              behind: hooks, band and thin straps against none.
            </figcaption>
          </figure>
        </div>
      </Section>

      {xmas && (
        <Section
          tone="accent"
          eyebrow={h.christmas.gift.eyebrow}
          title={h.christmas.gift.headline}
          sub={h.christmas.gift.sub}
          className="[&_.eyebrow]:!text-accent-ink/80"
        >
          <ul
            className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3"
            data-testid="gift-points"
          >
            {h.christmas.gift.points.map((pt) => (
              <li
                key={pt.title}
                className="rounded-card border border-accent-ink/20 p-6"
              >
                <Gift aria-hidden="true" className="size-6 opacity-80" />
                <p className="display mt-3 text-xl">
                  {pt.title}
                  <Flag flag={pt.flag} className="!text-current" />
                </p>
                <p className="mt-2 text-[15px] leading-relaxed opacity-85">
                  {pt.text}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <ValueProps data={c.valueProps} />
      <ColourStrip offerId={offerId} />
      <Divider />

      {/* The buy box, as on the product page */}
      <section id="buy" className="scroll-mt-16 px-4 py-14 md:py-20">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          {h.shop.eyebrow && (
            <p className="eyebrow mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {h.shop.eyebrow}
            </p>
          )}
          <h2 className="display text-[2rem] md:text-[2.75rem]">
            {h.shop.headline}
          </h2>
          <p className="mt-4 text-muted md:text-lg">{h.shop.sub}</p>
        </header>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-12">
          <div className="min-w-0 md:sticky md:top-24 md:self-start">
            <MediaGallery slides={c.gallery} />
          </div>
          <div className="min-w-0 space-y-6">
            <div className="space-y-2">
              <p className="display text-[1.7rem] md:text-[2.1rem]">
                {c.title.product}
              </p>
              <PriceSavings
                total={buy.price.total}
                was={buy.price.was}
                flag={provisional}
              />
            </div>
            {c.offerBanner && (
              <OfferBanner data={c.offerBanner} flag={provisional} />
            )}
            <BuyBox
              buy={c.buy}
              state={buy}
              atcRef={atcRef}
            />
            <UnderAtc data={c.underAtc} />
          </div>
        </div>
      </section>
      <Divider />

      <ReviewsWall data={c.reviews} />
      <HowItWorks data={c.howItWorks} />
      <Comparison data={c.comparison} />
      <Divider />

      <GuaranteeBlock data={c.guarantee} onShop={toBuy} />
      <Faq
        data={{ ...c.faq, items: faqs.slice(0, 5) }}
        support={concept.brand.support}
      />
      <ClosingCta
        data={xmas ? h.christmas.closing : c.closing}
        onShop={toBuy}
      />

      <StickyAtc state={buy} atcRef={atcRef} cta={c.buy.cta} />
    </>
  );
}

/** Six colours to start from, and the way into the full shop. */
const FEATURED = ["Nude", "Black", "Grey", "Coffee", "Red Wine", "Blush Pink"];

function ColourStrip({ offerId }: { offerId: OfferId }) {
  const product = storePath("product", offerId);
  const colours = FEATURED.filter((n) => COLOURS.some((c) => c.name === n));
  return (
    <Section
      eyebrow="Thirteen colours"
      title="Start with your favourite shade"
      sub="Mix colours in any 3- or 5-pack: you choose one for every tank."
    >
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {colours.map((name) => (
          <li key={name}>
            <Link
              to={`${product}?colour=${encodeURIComponent(name)}#buy`}
              className="group block"
              data-testid="home-colour"
            >
              <span className="block aspect-square overflow-hidden rounded-card border border-line bg-surface">
                <Picture
                  image={colourImg(name)}
                  fit="contain"
                  className="transition group-hover:scale-[1.03]"
                />
              </span>
              <span className="mt-2 block text-center text-sm font-medium">
                {name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center">
        <Link
          to={storePath("shop", offerId)}
          className="inline-flex items-center gap-2 rounded-btn border border-ink px-6 py-3 text-sm font-semibold hover:bg-ink hover:text-bg"
        >
          See all {COLOURS.length} colours
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </p>
    </Section>
  );
}
