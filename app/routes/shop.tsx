import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import type { Route } from "./+types/shop";
import { brand, storePath } from "~/content/store";
import { offers, pricing } from "~/content/offers";
import { COLOURS, SIZES, money } from "~/data/catalog";
import { shippingLines } from "~/content/product";
import { loadOffer, offerPageMeta } from "~/lib/store-route";
import { StoreShell } from "~/components/store/shell";
import { colourImg } from "~/components/sections/buy-box";
import { Flag } from "~/components/flag";
import { Picture } from "~/components/ui";

/**
 * /collections/all: the one tank in every colour. Each card opens the product
 * page with that colour already chosen for every tank in the pack.
 */
export const loader = ({ params }: Route.LoaderArgs) => loadOffer(params.offer);

export const meta: Route.MetaFunction = ({ data }) =>
  offerPageMeta("shop", data?.offerId);

export default function Shop({ loaderData }: Route.ComponentProps) {
  const { offerId } = loaderData;
  const offer = offers[offerId];
  const single = pricing(offer, offer.bundles[0]);
  const product = storePath("product", offerId);
  const provisional = offer.provisional
    ? { kind: "provisional" as const, note: offer.basis }
    : undefined;

  return (
    <StoreShell offerId={offerId} page="shop">
      <section className="px-4 pb-16 pt-10 md:pt-14">
        <div className="mx-auto max-w-6xl">
          <header className="max-w-2xl">
            <p className="eyebrow text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {brand.brand.productName}
            </p>
            <h1 className="display mt-3 text-[2.3rem] md:text-[3.2rem]">
              Shop all colours
            </h1>
            <p className="mt-4 text-lg text-muted">
              One soft tank with the bra built in, in {COLOURS.length} colours
              and sizes {SIZES[0]} to {SIZES[SIZES.length - 1]}. Mix colours in
              any 3- or 5-pack.
            </p>
          </header>

          <ul
            className="mt-8 grid gap-3 sm:grid-cols-3"
            data-testid="shop-bundles"
          >
            {offer.bundles.map((b) => {
              const p = pricing(offer, b);
              return (
                <li
                  key={b.id}
                  className="rounded-card border border-line bg-surface p-4"
                >
                  <p className="text-sm font-semibold">
                    {b.units === 1 ? "1 tank" : `${b.units} tanks`}
                    <span className="ml-2 text-xs font-normal text-muted">
                      {b.deal}
                    </span>
                  </p>
                  <p className="mt-1 text-xl font-bold">
                    {money(p.total)}
                    {p.saving > 0 && (
                      <s className="ml-2 text-sm font-normal text-muted">
                        {money(p.was)}
                      </s>
                    )}
                    <Flag flag={provisional} />
                  </p>
                  <p className="text-xs text-muted">
                    {money(p.perUnit)} per tank
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 flex flex-wrap items-center text-sm text-muted">
            {shippingLines.shipping.text}
            <Flag flag={shippingLines.shipping.flag} />
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            {shippingLines.guarantee.text}
            <Flag flag={shippingLines.guarantee.flag} />
          </p>

          <ul
            className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4"
            data-testid="shop-grid"
          >
            {COLOURS.map((c) => (
              <li key={c.name}>
                <Link
                  to={`${product}?colour=${encodeURIComponent(c.name)}#buy`}
                  className="group block"
                  data-testid="shop-colour"
                  aria-label={`${brand.brand.productName} in ${c.name}, from ${money(single.total)}`}
                >
                  <span className="block aspect-square overflow-hidden rounded-card border border-line bg-surface">
                    <Picture
                      image={colourImg(c.name)}
                      fit="contain"
                      className="transition duration-300 group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="mt-3 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="size-3.5 shrink-0 rounded-full border border-black/10"
                      style={{ background: c.swatch }}
                    />
                    <span className="font-medium">{c.name}</span>
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {brand.brand.productName} · from {money(single.total)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-center">
            <Link
              to={`${product}#buy`}
              className="btn-primary inline-flex items-center gap-2 px-7 py-4 font-semibold"
            >
              Build a mixed pack
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </p>
        </div>
      </section>
    </StoreShell>
  );
}
