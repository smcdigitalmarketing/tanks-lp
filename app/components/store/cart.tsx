import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Check, Lock, Minus, Plus, Trash2, X } from "lucide-react";
import { offers } from "~/content/offers";
import { money } from "~/data/catalog";
import { cents, describeUnits, useCart, type CartLine } from "~/lib/mock-cart";
import { Flag } from "~/components/flag";
import { shippingLines } from "~/content/product";
import { Picture } from "~/components/ui";

/** One cart line: photo, title, each tank's colour and size, quantity, price. */
export function LineItem({
  line: l,
  large = false,
}: {
  line: CartLine;
  large?: boolean;
}) {
  const { setQty, remove } = useCart();
  return (
    <li className="flex gap-4 py-4" data-testid="cart-line">
      <div
        className={`${large ? "size-24 md:size-28" : "size-20"} shrink-0 overflow-hidden rounded-card border border-line bg-surface-2`}
      >
        <Picture image={l.image} fit="contain" />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={`font-semibold leading-snug ${large ? "text-base" : "text-sm"}`}
        >
          {l.title}
        </p>
        <p className="mt-0.5 text-xs text-muted" data-testid="cart-line-units">
          {describeUnits(l.units)}
        </p>
        {l.offer !== "standard" && (
          <p className="mt-0.5 text-xs font-semibold text-brand">
            {offers[l.offer].name}
            {offers[l.offer].provisional && (
              <Flag
                flag={{ kind: "provisional", note: offers[l.offer].basis }}
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
            <span className="font-semibold" data-testid="cart-line-total">
              {money(cents(l.price * l.qty))}
            </span>
            {l.was > l.price && (
              <s className="ml-2 text-xs text-muted">
                {money(cents(l.was * l.qty))}
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
  );
}

export function FreeShippingNote({ className = "" }: { className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 text-sm ${className}`}>
      <Check aria-hidden="true" className="size-4 text-success" />
      {shippingLines.shipping.text}
      <Flag flag={shippingLines.shipping.flag} />
    </p>
  );
}

/** Slide-out cart: bundles with their colours and sizes, a quantity stepper and the saving. */
export function CartDrawer() {
  const { lines, open, setOpen, subtotal, wasTotal } = useCart();
  const panel = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const savings = cents(wasTotal - subtotal);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
      inert={!open}
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

        <FreeShippingNote className="border-b border-line bg-surface-2 px-5 py-3" />

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
            <LineItem key={l.key} line={l} />
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
            onClick={() => {
              setOpen(false);
              navigate("/checkout");
            }}
            className="btn-primary mt-4 flex w-full items-center justify-center gap-2 py-4 text-base font-semibold tracking-wide disabled:opacity-40"
          >
            <Lock aria-hidden="true" className="size-4" />
            Check out
          </button>
          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="mt-2 block py-2 text-center text-sm text-muted underline underline-offset-4 hover:text-ink"
          >
            View cart
          </Link>
        </div>
      </div>
    </div>
  );
}
