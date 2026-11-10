import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { CheckCircle2 } from "lucide-react";
import type { Route } from "./+types/thank-you";
import { brand, helpPath } from "~/content/store";
import {
  GUARANTEE_DAYS,
  GUARANTEE_FLAG,
  shippingLines,
} from "~/content/product";
import { lastPlacedOrder, type Order } from "~/lib/orders";
import { US_STATES } from "~/lib/us-states";
import { storeMeta } from "~/lib/store-route";
import { Flag } from "~/components/flag";
import { CheckoutChrome, OrderSummary } from "~/components/store/checkout";

/**
 * /checkout/thank-you?order=HL1001: the order confirmation. The order lives
 * in this browser (lib/orders.ts), so the page reads it after hydration.
 */
export const meta: Route.MetaFunction = () => storeMeta("Thank you");

const stateName = (code: string) =>
  US_STATES.find(([c]) => c === code)?.[1] ?? code;

export default function ThankYou() {
  const [params] = useSearchParams();
  const number = params.get("order");
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  useEffect(() => setOrder(lastPlacedOrder(number) ?? null), [number]);

  if (order === undefined)
    return (
      <CheckoutChrome>
        <p className="px-4 py-20 text-center text-muted">Loading your order…</p>
      </CheckoutChrome>
    );

  if (order === null)
    return (
      <CheckoutChrome>
        <div
          className="mx-auto max-w-md px-4 py-20 text-center"
          data-testid="order-missing"
        >
          <p className="display text-3xl">We can't find that order</p>
          <p className="mt-2 text-muted">
            Test orders are saved in the browser they were placed in.
          </p>
          <Link
            to="/"
            className="btn-primary mt-6 inline-flex px-6 py-3 font-semibold"
          >
            Back to {brand.brand.name}
          </Link>
        </div>
      </CheckoutChrome>
    );

  const a = order.address;
  const name = a.firstName || a.lastName;
  return (
    <CheckoutChrome>
      <div
        className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-[minmax(0,1fr)_400px] md:py-14"
        data-testid="order-confirmation"
        data-pdp-variant={order.attributes.pdp_variant}
        data-offer-ids={order.attributes.offers.join(",")}
      >
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <CheckCircle2
              aria-hidden="true"
              className="mt-1 size-10 shrink-0 text-success"
            />
            <div>
              <p className="text-sm text-muted">
                Order <span data-testid="order-number">{order.number}</span>
              </p>
              <h1 className="display text-[2rem] md:text-[2.6rem]">
                Thank you, {name}!
              </h1>
            </div>
          </div>

          <section className="rounded-card border border-line bg-surface p-6">
            <h2 className="display text-xl">Your order is in</h2>
            <p className="mt-2 text-[15px] text-muted">
              This was a test-mode order: nothing has been charged and nothing
              will ship. In the live store, a confirmation goes to{" "}
              <strong className="text-ink">{order.email}</strong>.
            </p>
          </section>

          <section className="rounded-card border border-line bg-surface p-6">
            <h2 className="display text-xl">What happens next</h2>
            <ul className="mt-3 space-y-2 text-[15px]">
              <li>
                {shippingLines.dispatch.text}, then usually about 7 business
                days on the way.
                <Flag flag={shippingLines.dispatch.flag} />
              </li>
              <li>
                Doesn't fit? Within {GUARANTEE_DAYS} days of delivery we'll send
                another size, free.
                <Flag flag={GUARANTEE_FLAG} />{" "}
                <Link
                  to={helpPath("returns")}
                  className="underline underline-offset-2"
                >
                  How exchanges work
                </Link>
              </li>
            </ul>
          </section>

          <section className="grid gap-6 rounded-card border border-line bg-surface p-6 text-[15px] sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold">Contact</h2>
              <p className="mt-1 text-muted">{order.email}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold">Payment</h2>
              <p className="mt-1 text-muted">{order.payment}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold">Shipping address</h2>
              <address
                className="mt-1 not-italic text-muted"
                data-testid="order-address"
              >
                {[a.firstName, a.lastName].filter(Boolean).join(" ")}
                <br />
                {a.address1}
                {a.address2 && (
                  <>
                    <br />
                    {a.address2}
                  </>
                )}
                <br />
                {a.city}, {stateName(a.state)} {a.zip}
                <br />
                United States
              </address>
            </div>
            <div>
              <h2 className="text-sm font-semibold">Shipping method</h2>
              <p className="mt-1 text-muted">{order.shipping.label}</p>
            </div>
          </section>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              to={helpPath("contact")}
              className="text-sm underline underline-offset-4"
            >
              Need help? Contact us
            </Link>
            <Link to="/" className="btn-primary px-6 py-3 font-semibold">
              Continue shopping
            </Link>
          </div>
        </div>
        <aside className="h-fit rounded-card bg-surface-2/60 p-6 md:p-8">
          <OrderSummary
            lines={order.lines}
            totals={{
              subtotal: order.subtotal,
              savings: order.savings,
              shipping: order.shipping.price,
              total: order.total,
            }}
            shippingLabel="Shipping"
          />
        </aside>
      </div>
    </CheckoutChrome>
  );
}
