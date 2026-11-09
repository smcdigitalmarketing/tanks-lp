import { useRef } from "react";
import type { Concept, OfferId } from "~/content/types";
import { pageContent } from "~/content/page";
import { StoreShell } from "~/components/store/shell";
import {
  BenefitTitle,
  IconBullets,
  Kicker,
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
import { Accordions, LifestyleMarquee } from "~/components/sections/details";
import { ReviewsWall } from "~/components/sections/proof";
import {
  Comparison,
  HowItWorks,
  ValueProps,
} from "~/components/sections/value-props";
import { ClosingCta, Faq, GuaranteeBlock } from "~/components/sections/closing";
import { Divider } from "~/components/sections/divider";

/**
 * The product page. Every concept renders the SOP's seven sections in this
 * order (docs/pdp-template-sop.md); only copy, theme and layout flags differ.
 *
 *   1 Above the fold   gallery → kicker → benefit title → price + saving → bullets
 *   2 Buy box          bundle → colour per tank → size (none preselected) → add to cart
 *   3 Under the button shipping, the guarantee spelled out, one review
 *   4 Details          accordions (first open) + lifestyle strip
 *   5 Social proof     review wall, every review labelled with its source
 *   6 Value props      benefit headlines, how it works, comparison
 *   7 Closing          guarantee → FAQ → final call to action → footer
 */
export function PdpTemplate({
  concept,
  offerId,
}: {
  concept: Concept;
  offerId: OfferId;
}) {
  const c = pageContent(concept, offerId);
  return (
    <StoreShell
      concept={concept}
      offerId={offerId}
      page="product"
      announcement={c.announcement}
    >
      <PdpBody concept={concept} offerId={offerId} />
    </StoreShell>
  );
}

function PdpBody({ concept, offerId }: { concept: Concept; offerId: OfferId }) {
  const c = pageContent(concept, offerId);
  const layout = concept.layout;
  const headlineHero = layout.hero === "headline";
  const buy = useBuyState(c.buy.offer, concept.slug, concept.brand.productName);
  const atcRef = useRef<HTMLButtonElement>(null);
  const toBuy = () =>
    document
      .getElementById("buy-options")
      ?.scrollIntoView({ behavior: "smooth" });
  const provisional = c.buy.offer.provisional
    ? { kind: "provisional" as const, note: c.buy.offer.basis }
    : undefined;

  return (
    <>
      {/* 1–4: product section */}
      <section
        id="buy"
        data-sop-section="above-the-fold"
        className="scroll-mt-16 px-4 pb-10 pt-4 md:pt-10"
      >
        {headlineHero && (
          <header className="mx-auto mb-8 max-w-4xl space-y-4 text-center md:mb-12 md:pt-6">
            <div className="flex justify-center">
              <Kicker text={c.kicker} />
            </div>
            <BenefitTitle
              eyebrow={c.eyebrow}
              title={c.title}
              subtitle={c.subtitle}
              size="large"
            />
          </header>
        )}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] md:gap-12">
          <div
            className={`min-w-0 md:sticky md:top-24 md:self-start ${layout.hero === "reverse" ? "md:order-2" : ""}`}
          >
            <MediaGallery slides={c.gallery} />
          </div>
          <div className="min-w-0 space-y-6">
            <div className="space-y-4">
              {!headlineHero && (
                <>
                  <Kicker text={c.kicker} />
                  <BenefitTitle
                    eyebrow={c.eyebrow}
                    title={c.title}
                    subtitle={c.subtitle}
                  />
                </>
              )}
              <PriceSavings
                total={buy.price.total}
                was={buy.price.was}
                flag={provisional}
              />
              <IconBullets items={c.bullets} />
            </div>
            {c.offerBanner && (
              <OfferBanner data={c.offerBanner} flag={provisional} />
            )}
            <div data-sop-section="buy-box">
              <BuyBox
                buy={c.buy}
                state={buy}
                atcRef={atcRef}
                variant={layout.tiers}
              />
            </div>
            <div data-sop-section="under-the-button">
              <UnderAtc data={c.underAtc} />
            </div>
            <div data-sop-section="details">
              <Accordions items={c.accordions} />
            </div>
          </div>
        </div>
      </section>
      <LifestyleMarquee
        images={c.lifestyle}
        label={`${concept.brand.productName}, worn`}
      />
      <Divider kind={layout.divider} />

      {/* 5: social proof */}
      <div data-sop-section="social-proof">
        <ReviewsWall data={c.reviews} variant={layout.reviews} />
      </div>
      <Divider kind={layout.divider} />

      {/* 6: value props */}
      <div data-sop-section="value-props">
        <ValueProps data={c.valueProps} style={layout.valueProps} />
        <HowItWorks data={c.howItWorks} />
        <Comparison data={c.comparison} />
      </div>
      <Divider kind={layout.divider} />

      {/* 7: closing */}
      <div data-sop-section="closing">
        <GuaranteeBlock data={c.guarantee} onShop={toBuy} />
        <Faq data={c.faq} support={concept.brand.support} />
        <ClosingCta data={c.closing} onShop={toBuy} />
      </div>

      <StickyAtc state={buy} atcRef={atcRef} cta={c.buy.cta} />
    </>
  );
}
