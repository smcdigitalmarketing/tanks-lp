import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import type { Route } from "./+types/checkout";
import { SHIPS_TO, shippingMethods } from "~/content/product";
import { money } from "~/data/catalog";
import { useCart } from "~/lib/mock-cart";
import { saveOrder, type Address } from "~/lib/orders";
import { US_STATES } from "~/lib/us-states";
import { storeMeta } from "~/lib/store-route";
import { Flag } from "~/components/flag";
import { Field, SelectField } from "~/components/store/form";
import {
  CheckoutChrome,
  OrderSummary,
  SecureNote,
  SummaryToggle,
  totalsFor,
} from "~/components/store/checkout";

/**
 * /checkout: contact, delivery, shipping and a test-mode payment step, laid
 * out like Shopify's one-page checkout. Placing the order validates the form,
 * saves the order in this browser, empties the cart and opens the
 * confirmation. Nothing is charged or sent.
 */
export const meta: Route.MetaFunction = () => storeMeta("Checkout");

type Fields = Address & { email: string; marketing?: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ZIP = /^\d{5}(-\d{4})?$/;
const PHONE = /^[\d\s()+.-]{7,}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!EMAIL.test(f.email.trim()))
    e.email = "Enter an email address like name@example.com.";
  if (!f.lastName.trim()) e.lastName = "Enter a last name.";
  if (!f.address1.trim()) e.address1 = "Enter an address.";
  if (!f.city.trim()) e.city = "Enter a city.";
  if (!f.state) e.state = "Select a state.";
  if (!ZIP.test(f.zip.trim())) e.zip = "Enter a ZIP code, like 10001.";
  if (f.phone.trim() && !PHONE.test(f.phone.trim()))
    e.phone = "Enter a valid phone number, or leave it blank.";
  return e;
}

/** Order of the fields on the page, so focus goes to the first error. */
const FIELD_ORDER: (keyof Fields)[] = [
  "email",
  "firstName",
  "lastName",
  "address1",
  "address2",
  "city",
  "state",
  "zip",
  "phone",
];

export default function Checkout() {
  const { lines, ready, clear } = useCart();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Errors>({});
  const [placing, setPlacing] = useState(false);
  const shipping = shippingMethods[0];
  const totals = totalsFor(lines, shipping.price);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form)) as unknown as Fields;
    const errs = validate(f);
    setErrors(errs);
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPlacing(true);
    const order = saveOrder({
      email: f.email.trim(),
      marketing: f.marketing === "on",
      address: {
        firstName: f.firstName.trim(),
        lastName: f.lastName.trim(),
        address1: f.address1.trim(),
        address2: f.address2.trim(),
        city: f.city.trim(),
        state: f.state,
        zip: f.zip.trim(),
        phone: f.phone.trim(),
      },
      shipping: {
        id: shipping.id,
        label: shipping.label,
        price: shipping.price,
      },
      payment: "Test payment (no charge)",
      lines,
      subtotal: totals.subtotal,
      savings: totals.savings,
      total: totals.total,
      attributes: {
        pdp_variant: "kindwear",
        offers: [...new Set(lines.map((l) => l.offer))],
      },
    });
    clear();
    navigate(`/checkout/thank-you?order=${order.number}`);
  };

  const summary = (
    <OrderSummary
      lines={lines}
      totals={totals}
      shippingLabel="Shipping"
      shippingFlag={shipping.flag}
    />
  );

  if (!ready || placing)
    return (
      <CheckoutChrome>
        <p className="px-4 py-20 text-center text-muted">
          {placing ? "Placing your order…" : "Loading your cart…"}
        </p>
      </CheckoutChrome>
    );

  if (lines.length === 0)
    return (
      <CheckoutChrome>
        <div
          className="mx-auto max-w-md px-4 py-20 text-center"
          data-testid="checkout-empty"
        >
          <p className="display text-3xl">Your cart is empty</p>
          <p className="mt-2 text-muted">Add a bundle before checking out.</p>
          <Link
            to="/products/everyday-tank#buy"
            className="btn-primary mt-6 inline-flex px-6 py-3 font-semibold"
          >
            Shop the Everyday Tank
          </Link>
        </div>
      </CheckoutChrome>
    );

  return (
    <CheckoutChrome>
      <SummaryToggle total={totals.total}>{summary}</SummaryToggle>
      <div className="mx-auto grid max-w-6xl md:grid-cols-[minmax(0,1fr)_400px]">
        <form
          noValidate
          onSubmit={submit}
          className="space-y-9 px-4 py-8 md:border-r md:border-line md:py-12 md:pr-12"
          data-testid="checkout-form"
          // The cart attributes a Shopify build would send with this order.
          data-pdp-variant="kindwear"
          data-offer-ids={[...new Set(lines.map((l) => l.offer))].join(",")}
        >
          <fieldset className="space-y-3">
            <legend className="display mb-3 text-2xl">Contact</legend>
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              error={errors.email}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="marketing"
                className="size-4 accent-[var(--brand)]"
              />
              Email me with news and offers
            </label>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="display mb-3 text-2xl">Delivery</legend>
            <SelectField
              label="Country"
              name="country"
              options={[["US", SHIPS_TO.country]]}
              defaultValue="US"
            />
            <p className="-mt-1 text-xs text-muted">
              We ship to the {SHIPS_TO.country} only.
              <Flag flag={SHIPS_TO.flag} />
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="First name (optional)"
                name="firstName"
                autoComplete="given-name"
              />
              <Field
                label="Last name"
                name="lastName"
                autoComplete="family-name"
                error={errors.lastName}
              />
            </div>
            <Field
              label="Address"
              name="address1"
              autoComplete="address-line1"
              error={errors.address1}
            />
            <Field
              label="Apartment, suite, etc. (optional)"
              name="address2"
              autoComplete="address-line2"
            />
            <div className="grid gap-3 sm:grid-cols-3">
              <Field
                label="City"
                name="city"
                autoComplete="address-level2"
                error={errors.city}
              />
              <SelectField
                label="State"
                name="state"
                options={US_STATES}
                placeholder="Select"
                autoComplete="address-level1"
                error={errors.state}
              />
              <Field
                label="ZIP code"
                name="zip"
                autoComplete="postal-code"
                inputMode="numeric"
                maxLength={10}
                error={errors.zip}
              />
            </div>
            <Field
              label="Phone (optional)"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              error={errors.phone}
            />
          </fieldset>

          <fieldset>
            <legend className="display mb-3 text-2xl">Shipping method</legend>
            <div className="rounded-[10px] border border-ink bg-surface">
              {shippingMethods.map((m) => (
                <label
                  key={m.id}
                  className="flex items-start gap-3 px-4 py-3.5 text-sm"
                >
                  <input
                    type="radio"
                    name="shippingMethod"
                    value={m.id}
                    defaultChecked
                    className="mt-0.5 size-4 accent-[var(--ink)]"
                  />
                  <span className="flex-1">
                    <span className="block font-medium">
                      {m.label}
                      <Flag flag={m.flag} />
                    </span>
                    <span className="block text-xs text-muted">{m.detail}</span>
                  </span>
                  <strong>{money(m.price)}</strong>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="display mb-1 text-2xl">Payment</legend>
            <p className="mb-3 text-sm text-muted">
              This store is in test mode.
            </p>
            <div className="rounded-[10px] border border-ink bg-surface">
              <label className="flex items-start gap-3 px-4 py-3.5 text-sm">
                <input
                  type="radio"
                  name="payment"
                  value="test"
                  defaultChecked
                  className="mt-0.5 size-4 accent-[var(--ink)]"
                />
                <span>
                  <span className="block font-medium">
                    Test payment
                    <Flag
                      flag={{
                        kind: "to-confirm",
                        note: "At launch: Shopify checkout with the payment methods chosen then (cards, Shop Pay, PayPal …).",
                      }}
                    />
                  </span>
                  <span className="block text-xs text-muted">
                    No card needed. Placing the order saves it in this browser
                    only; nothing is charged or shipped.
                  </span>
                </span>
              </label>
            </div>
          </fieldset>

          <div>
            <button
              type="submit"
              className="btn-primary w-full py-4 text-base font-semibold"
              data-testid="place-order"
            >
              Place order · {money(totals.total)}
            </button>
            <SecureNote />
            <p className="mt-4">
              <Link
                to="/cart"
                className="inline-flex items-center gap-1 text-sm text-brand hover:underline"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Return to cart
              </Link>
            </p>
          </div>
        </form>
        <aside className="hidden bg-surface-2/60 px-8 py-12 md:block">
          <div className="sticky top-8">{summary}</div>
        </aside>
      </div>
    </CheckoutChrome>
  );
}
