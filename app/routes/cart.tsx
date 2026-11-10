import { Link, useNavigate } from "react-router";
import { ArrowLeft, Lock } from "lucide-react";
import type { Route } from "./+types/cart";
import { storePath } from "~/content/store";
import { shippingMethods } from "~/content/product";
import { money } from "~/data/catalog";
import { cents, useCart } from "~/lib/mock-cart";
import { storeMeta } from "~/lib/store-route";
import { StoreShell, useStoreOffer } from "~/components/store/shell";
import { FreeShippingNote, LineItem } from "~/components/store/cart";
import { Flag } from "~/components/flag";

/** /cart: the full cart, with the order summary and the way to checkout. */
export const meta: Route.MetaFunction = () => storeMeta("Your cart");

export default function CartPage() {
  return (
    <StoreShell>
      <CartBody />
    </StoreShell>
  );
}

function CartBody() {
  const { lines, ready, subtotal, wasTotal, count } = useCart();
  const offer = useStoreOffer();
  const navigate = useNavigate();
  const shipping = shippingMethods[0];
  const savings = cents(wasTotal - subtotal);
  const shop = storePath("product", offer) + "#buy";

  return (
    <section className="px-4 pb-16 pt-8 md:pt-12">
      <div className="mx-auto max-w-5xl">
        <Link
          to={shop}
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Continue shopping
        </Link>
        <h1 className="display mt-3 text-[2.3rem] md:text-[3rem]">Your cart</h1>

        {!ready ? (
          <p className="mt-10 text-muted">Loading your cart…</p>
        ) : lines.length === 0 ? (
          <div
            className="mt-10 rounded-card border border-line bg-surface p-10 text-center"
            data-testid="cart-empty"
          >
            <p className="display text-2xl">Your cart is empty.</p>
            <p className="mt-2 text-muted">
              Pick a bundle, a colour for every tank and your size.
            </p>
            <Link
              to={shop}
              className="btn-primary mt-6 inline-flex px-6 py-3 font-semibold"
            >
              Shop the Everyday Tank
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid items-start gap-8 md:grid-cols-[1fr_340px]">
            <ul
              className="divide-y divide-line rounded-card border border-line bg-surface px-5"
              data-testid="cart-page-lines"
            >
              {lines.map((l) => (
                <LineItem key={l.key} line={l} large />
              ))}
            </ul>
            <aside className="space-y-4 rounded-card border border-line bg-surface p-6 md:sticky md:top-24">
              <p className="display text-2xl">Order summary</p>
              <dl className="space-y-2 text-[15px]">
                <div className="flex justify-between">
                  <dt>
                    Subtotal ({count} {count === 1 ? "tank" : "tanks"})
                  </dt>
                  <dd className="tabular-nums" data-testid="cart-page-subtotal">
                    {money(subtotal)}
                  </dd>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between font-semibold text-success">
                    <dt>You save</dt>
                    <dd className="tabular-nums">{money(savings)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt>
                    Shipping
                    <Flag flag={shipping.flag} />
                  </dt>
                  <dd>{money(shipping.price)}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3 text-lg font-bold">
                  <dt>Total</dt>
                  <dd className="tabular-nums">
                    {money(cents(subtotal + shipping.price))}
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-base font-semibold"
              >
                <Lock aria-hidden="true" className="size-4" />
                Check out
              </button>
              <FreeShippingNote className="text-muted" />
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
