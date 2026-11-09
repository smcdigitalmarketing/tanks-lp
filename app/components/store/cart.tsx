import { useEffect, useRef, useState } from "react";
import { Check, Lock, Minus, Plus, Trash2, X } from "lucide-react";
import type { Concept } from "~/content/types";
import { offers } from "~/content/offers";
import { money } from "~/data/catalog";
import { describeUnits, useCart } from "~/lib/mock-cart";
import { Flag } from "~/components/flag";
import { shippingLines } from "~/content/product";
import { Picture } from "~/components/ui";

/** Slide-out cart: bundles with their colours and sizes, a quantity stepper and the saving. */
export function CartDrawer({ concept }: { concept: Concept }) {
  const {
    lines,
    open,
    setOpen,
    setQty,
    remove,
    subtotal,
    wasTotal,
    setCheckoutOpen,
  } = useCart();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const savings = Math.round((wasTotal - subtotal) * 100) / 100;

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface text-ink shadow-2xl outline-none transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <p className="display text-2xl">Your cart</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 hover:bg-surface-2"
            aria-label="Close cart"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <p className="flex flex-wrap items-center gap-x-2 border-b border-line bg-surface-2 px-5 py-3 text-sm">
          <Check aria-hidden="true" className="size-4 text-success" />
          {shippingLines.shipping.text}
          <Flag flag={shippingLines.shipping.flag} />
        </p>

        <ul
          className="flex-1 divide-y divide-line overflow-y-auto px-5"
          data-testid="cart-lines"
        >
          {lines.length === 0 && (
            <li className="py-16 text-center text-muted">
              Your cart is empty.
            </li>
          )}
          {lines.map((l) => (
            <li key={l.key} className="flex gap-4 py-4" data-testid="cart-line">
              <div className="size-20 shrink-0 overflow-hidden rounded-card border border-line bg-surface-2">
                <Picture image={l.image} fit="contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug">{l.title}</p>
                <p
                  className="mt-0.5 text-xs text-muted"
                  data-testid="cart-line-units"
                >
                  {describeUnits(l.units)}
                </p>
                {l.offer !== "standard" && (
                  <p className="mt-0.5 text-xs font-semibold text-brand">
                    {offers[l.offer].name}
                    {offers[l.offer].provisional && (
                      <Flag
                        flag={{
                          kind: "provisional",
                          note: offers[l.offer].basis,
                        }}
                      />
                    )}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center rounded-btn border border-line">
                    <button
                      type="button"
                      onClick={() => setQty(l.key, l.qty - 1)}
                      className="p-1.5 hover:bg-surface-2"
                      aria-label={`One fewer ${l.title}`}
                    >
                      <Minus aria-hidden="true" className="size-3.5" />
                    </button>
                    <span
                      className="w-7 text-center text-sm tabular-nums"
                      data-testid="cart-line-qty"
                    >
                      {l.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(l.key, l.qty + 1)}
                      className="p-1.5 hover:bg-surface-2"
                      aria-label={`One more ${l.title}`}
                    >
                      <Plus aria-hidden="true" className="size-3.5" />
                    </button>
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold">
                      {money(l.price * l.qty)}
                    </span>
                    {l.was > l.price && (
                      <s className="ml-2 text-xs text-muted">
                        {money(l.was * l.qty)}
                      </s>
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => remove(l.key)}
                className="self-start rounded p-1 text-muted hover:text-ink"
                aria-label={`Remove ${l.title}`}
              >
                <Trash2 aria-hidden="true" className="size-4" />
              </button>
            </li>
          ))}
        </ul>

        <div className="border-t border-line px-5 py-5">
          {savings > 0 && (
            <p className="mb-1 flex justify-between text-sm font-semibold text-success">
              <span>You save</span>
              <span>{money(savings)}</span>
            </p>
          )}
          <p className="flex justify-between text-lg font-bold">
            <span>Subtotal</span>
            <span data-testid="cart-subtotal">{money(subtotal)}</span>
          </p>
          <button
            type="button"
            disabled={lines.length === 0}
            onClick={() => setCheckoutOpen(true)}
            className="btn-primary mt-4 flex w-full items-center justify-center gap-2 py-4 text-base font-semibold tracking-wide disabled:opacity-40"
          >
            <Lock aria-hidden="true" className="size-4" />
            Check out
          </button>
          <p className="mt-2 text-center text-xs text-muted">
            Demo checkout: nothing is charged.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Stands in for Shopify checkout: a short demo of the order summary and the
 * attributes the real store would record, then a confirmation. No payment
 * fields, nothing sent anywhere.
 */
export function CheckoutDemo({ concept }: { concept: Concept }) {
  const { checkoutOpen, setCheckoutOpen, lines, subtotal, wasTotal, setOpen } =
    useCart();
  const [placed, setPlaced] = useState(false);
  useEffect(() => {
    if (!checkoutOpen) setPlaced(false);
  }, [checkoutOpen]);
  if (!checkoutOpen) return null;
  const offerIds = [...new Set(lines.map((l) => l.offer))];
  const close = () => setCheckoutOpen(false);
  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-end bg-black/50 sm:place-items-center sm:p-4"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        data-testid="checkout-demo"
        className="max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-t-card bg-surface p-6 text-ink shadow-2xl sm:rounded-card"
        onClick={(e) => e.stopPropagation()}
      >
        {placed ? (
          <>
            <p id="checkout-title" className="display text-3xl">
              Order placed (demo)
            </p>
            <p className="mt-3 text-sm text-muted">
              In the real {concept.brand.name} store this is where Shopify's
              thank-you page would show. Nothing was charged and no order
              exists.
            </p>
            <button
              type="button"
              onClick={() => {
                close();
                setOpen(false);
              }}
              className="btn-primary mt-6 w-full py-3 font-semibold"
            >
              Back to {concept.brand.name}
            </button>
          </>
        ) : (
          <>
            <p id="checkout-title" className="display text-3xl">
              Checkout
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand">
              Demo: no payment is taken
            </p>
            <ul className="mt-5 divide-y divide-line border-y border-line text-sm">
              {lines.map((l) => (
                <li key={l.key} className="flex justify-between gap-4 py-3">
                  <span>
                    {l.qty} × {l.title}
                    <span className="block text-xs text-muted">
                      {describeUnits(l.units)}
                    </span>
                  </span>
                  <span className="font-semibold tabular-nums">
                    {money(l.price * l.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between text-success">
                <dt>Savings</dt>
                <dd className="tabular-nums">
                  {money(Math.round((wasTotal - subtotal) * 100) / 100)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt>
                  Shipping
                  <Flag flag={shippingLines.shipping.flag} />
                </dt>
                <dd>Free</dd>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <dt>Total</dt>
                <dd className="tabular-nums">{money(subtotal)}</dd>
              </div>
            </dl>
            <p className="mt-5 rounded-card bg-surface-2 p-3 text-xs leading-relaxed text-muted">
              A Shopify build would tag this order{" "}
              <code className="rounded bg-surface px-1 py-0.5 text-ink">
                pdp_variant={concept.slug}
              </code>{" "}
              and{" "}
              <code className="rounded bg-surface px-1 py-0.5 text-ink">
                offer={offerIds.join(",")}
              </code>{" "}
              so reports can compare the concepts.
            </p>
            <button
              type="button"
              onClick={() => setPlaced(true)}
              className="btn-primary mt-5 w-full py-4 font-semibold"
            >
              Place demo order
            </button>
            <button
              type="button"
              onClick={close}
              className="mt-2 w-full py-2 text-sm text-muted underline"
            >
              Back to cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}
