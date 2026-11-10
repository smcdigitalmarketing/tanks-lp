import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ChevronDown, Lock, ShoppingBag } from "lucide-react";
import { offers } from "~/content/offers";
import { brand } from "~/content/store";
import { money } from "~/data/catalog";
import { cents, describeUnits, type CartLine } from "~/lib/mock-cart";
import { Flag } from "~/components/flag";
import { Picture, Wordmark } from "~/components/ui";

/*
 * Checkout chrome, as on a Shopify checkout: no store navigation, just the
 * logo, a way back to the cart and the order summary. A slim strip above
 * says it's test mode.
 */
export function CheckoutChrome({ children }: { children: ReactNode }) {
  return (
    <div
      data-theme="soft"
      data-offer="standard"
      className="min-h-dvh bg-bg font-sans text-ink antialiased"
    >
      <p
        className="bg-[#111] px-4 py-1.5 text-center font-[Inter,system-ui,sans-serif] text-[11px] text-white/80"
        data-testid="test-mode"
      >
        <strong className="text-white">Test mode</strong> · No payment is taken
        and no order is sent.
      </p>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" aria-label={`${brand.brand.name} home`}>
            <Wordmark />
          </Link>
          <Link
            to="/cart"
            className="rounded-full p-2 text-muted hover:bg-surface-2 hover:text-ink"
            aria-label="Back to cart"
          >
            <ShoppingBag aria-hidden="true" className="size-6" />
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-line px-4 py-6 text-center text-xs text-muted">
        <Link to="/pages/returns" className="hover:underline">
          Returns and exchanges
        </Link>
        <span className="mx-2">·</span>
        <Link to="/pages/shipping" className="hover:underline">
          Shipping
        </Link>
        <span className="mx-2">·</span>
        <Link to="/pages/contact" className="hover:underline">
          Contact us
        </Link>
      </footer>
    </div>
  );
}

export type Totals = {
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
};

export function totalsFor(lines: CartLine[], shipping: number): Totals {
  const subtotal = cents(lines.reduce((s, l) => s + l.price * l.qty, 0));
  const was = cents(lines.reduce((s, l) => s + l.was * l.qty, 0));
  return {
    subtotal,
    savings: cents(was - subtotal),
    shipping,
    total: cents(subtotal + shipping),
  };
}

/** The lines and totals, as in the right-hand column of a Shopify checkout. */
export function OrderSummary({
  lines,
  totals,
  shippingLabel,
  shippingFlag,
}: {
  lines: CartLine[];
  totals: Totals;
  shippingLabel: string;
  shippingFlag?: Parameters<typeof Flag>[0]["flag"];
}) {
  return (
    <div data-testid="order-summary">
      <ul className="space-y-4">
        {lines.map((l) => (
          <li key={l.key} className="flex items-center gap-4">
            <span className="relative size-16 shrink-0 rounded-[10px] border border-line bg-surface">
              <span className="block size-full overflow-hidden rounded-[10px]">
                <Picture image={l.image} fit="contain" />
              </span>
              <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-muted text-[11px] font-semibold text-white">
                {l.qty}
              </span>
            </span>
            <span className="min-w-0 flex-1 text-sm">
              <span className="block font-medium">{l.title}</span>
              <span className="block text-xs text-muted">
                {describeUnits(l.units)}
              </span>
              {l.offer !== "standard" && (
                <span className="block text-xs font-semibold text-brand">
                  {offers[l.offer].name}
                  {offers[l.offer].provisional && (
                    <Flag
                      flag={{
                        kind: "provisional",
                        note: offers[l.offer].basis,
                      }}
                    />
                  )}
                </span>
              )}
            </span>
            <span className="text-sm tabular-nums">
              {money(cents(l.price * l.qty))}
            </span>
          </li>
        ))}
      </ul>
      <dl className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd className="tabular-nums">{money(totals.subtotal)}</dd>
        </div>
        {totals.savings > 0 && (
          <div className="flex justify-between text-success">
            <dt>You save (included above)</dt>
            <dd className="tabular-nums">{money(totals.savings)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt>
            {shippingLabel}
            <Flag flag={shippingFlag} />
          </dt>
          <dd className="tabular-nums">{money(totals.shipping)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-3 text-lg font-bold">
          <dt>Total</dt>
          <dd className="tabular-nums" data-testid="order-total">
            <span className="mr-1.5 text-xs font-normal text-muted">USD</span>
            {money(totals.total)}
          </dd>
        </div>
      </dl>
    </div>
  );
}

/** Phone: the summary folds away above the form, as on Shopify. */
export function SummaryToggle({
  total,
  children,
}: {
  total: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line bg-surface-2 md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="summary-panel"
        className="flex w-full items-center justify-between px-4 py-4 text-sm"
      >
        <span className="inline-flex items-center gap-1.5 text-brand">
          {open ? "Hide" : "Show"} order summary
          <ChevronDown
            aria-hidden="true"
            className={`size-4 transition ${open ? "rotate-180" : ""}`}
          />
        </span>
        <strong className="text-base tabular-nums">{money(total)}</strong>
      </button>
      {open && (
        <div id="summary-panel" className="px-4 pb-5">
          {children}
        </div>
      )}
    </div>
  );
}

export function SecureNote() {
  return (
    <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
      <Lock aria-hidden="true" className="size-3.5" />
      Test mode: no card details are asked for or stored.
    </p>
  );
}
