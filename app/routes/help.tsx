import { useState, type FormEvent, type ReactNode } from "react";
import { Link, data } from "react-router";
import { Mail, Ruler, RefreshCw, Truck } from "lucide-react";
import type { Route } from "./+types/help";
import {
  HELP_PAGES,
  brand,
  helpPath,
  isHelpSlug,
  storePath,
  type HelpSlug,
} from "~/content/store";
import {
  GUARANTEE_DAYS,
  GUARANTEE_FLAG,
  SHIPS_TO,
  faqs,
  shippingLines,
  shippingMethods,
  sizeGuide,
} from "~/content/product";
import { money } from "~/data/catalog";
import { storeMeta } from "~/lib/store-route";
import { StoreShell, useStoreOffer } from "~/components/store/shell";
import { Faq } from "~/components/sections/closing";
import { Field } from "~/components/store/form";
import { Flag } from "~/components/flag";

/**
 * Help pages: FAQ, size guide, shipping, returns and contact. Every fact
 * comes from product.ts with its flag; policies we haven't set yet are
 * marked "to confirm".
 */
export function loader({ params }: Route.LoaderArgs) {
  if (!isHelpSlug(params.help)) throw data("Not found", { status: 404 });
  return { slug: params.help };
}

const DESCRIPTION: Record<HelpSlug, string> = {
  faq: "Answers about fit, support, washing and delivery.",
  "size-guide": "Find your size from one bust measurement, S to 4XL.",
  shipping: "How long orders take and what shipping costs.",
  returns: `The ${GUARANTEE_DAYS}-day fit guarantee: one free size exchange.`,
  contact: `Get in touch with the ${brand.brand.name} team.`,
};

export const meta: Route.MetaFunction = ({ data }) =>
  data
    ? storeMeta(HELP_PAGES[data.slug], DESCRIPTION[data.slug])
    : storeMeta("Page not found");

export default function Help({ loaderData }: Route.ComponentProps) {
  const { slug } = loaderData;
  return (
    <StoreShell>
      <div className="px-4 pb-16 pt-8 md:pt-12">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[200px_1fr]">
          <HelpNav current={slug} />
          <div className="min-w-0" data-help={slug}>
            {slug === "faq" && <FaqPage />}
            {slug === "size-guide" && <SizeGuidePage />}
            {slug === "shipping" && <ShippingPage />}
            {slug === "returns" && <ReturnsPage />}
            {slug === "contact" && <ContactPage />}
          </div>
        </div>
      </div>
    </StoreShell>
  );
}

function HelpNav({ current }: { current: HelpSlug }) {
  return (
    <nav aria-label="Help" className="md:pt-2">
      <p className="eyebrow mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Help
      </p>
      <ul className="flex flex-wrap gap-2 md:flex-col md:gap-1">
        {(Object.keys(HELP_PAGES) as HelpSlug[]).map((s) => (
          <li key={s}>
            <Link
              to={helpPath(s)}
              aria-current={s === current ? "page" : undefined}
              className={`block rounded-btn px-3 py-1.5 text-sm ${s === current ? "bg-ink text-bg" : "border border-line hover:bg-surface-2 md:border-0"}`}
            >
              {HELP_PAGES[s]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function PageTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <header className="mb-8 max-w-2xl">
      <h1 className="display text-[2.2rem] md:text-[3rem]">{children}</h1>
      {sub && <p className="mt-3 text-lg text-muted">{sub}</p>}
    </header>
  );
}

function Card({
  icon,
  title,
  children,
}: {
  icon?: ReactNode;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-card border border-line bg-surface p-6">
      <h2 className="display flex items-center gap-2 text-xl md:text-2xl">
        {icon}
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink/85">
        {children}
      </div>
    </section>
  );
}

function FaqPage() {
  // The product page's FAQ section, with every question.
  return (
    <div className="-mx-4 [&>section]:pt-0 md:[&>section]:pt-0 [&_header]:!mx-0 [&_header]:text-left [&_.max-w-3xl]:mx-0">
      <Faq
        data={{
          headline: "Questions, answered",
          sub: "Fit, support, washing and delivery. Can't find it here? Ask us.",
          items: faqs,
        }}
        support={brand.brand.support}
      />
    </div>
  );
}

function SizeGuidePage() {
  const offer = useStoreOffer();
  return (
    <>
      <PageTitle sub="One measurement, seven sizes. No band numbers, no cup letters.">
        Size guide
        <Flag flag={sizeGuide.flag} />
      </PageTitle>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="overflow-x-auto rounded-card border border-line bg-surface">
          <table
            className="w-full text-left text-[15px]"
            data-testid="size-table"
          >
            <thead>
              <tr className="border-b border-line bg-surface-2 text-xs uppercase tracking-wide text-muted">
                <th className="px-4 py-3 font-semibold">Size</th>
                <th className="px-4 py-3 font-semibold">Bust, over a bra</th>
                <th className="px-4 py-3 font-semibold">Weight (guide)</th>
              </tr>
            </thead>
            <tbody>
              {sizeGuide.rows.map((r) => (
                <tr key={r.size} className="border-b border-line last:border-0">
                  <th className="px-4 py-3 font-bold">{r.size}</th>
                  <td className="px-4 py-3 tabular-nums">{r.bust}</td>
                  <td className="px-4 py-3 tabular-nums text-muted">
                    {r.weight}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Card
          icon={<Ruler aria-hidden="true" className="size-5 text-brand" />}
          title="How to measure"
        >
          <ol className="list-decimal space-y-2 pl-5">
            {sizeGuide.measure.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ol>
          <p className="font-semibold">{sizeGuide.between}</p>
          <p className="text-muted">
            Still not right? The fit guarantee covers one free size exchange
            within {GUARANTEE_DAYS} days.
            <Flag flag={GUARANTEE_FLAG} />
          </p>
        </Card>
      </div>
      <p className="mt-8">
        <Link
          to={storePath("product", offer) + "#buy"}
          className="btn-primary inline-flex px-6 py-3 font-semibold"
        >
          Choose your size
        </Link>
      </p>
    </>
  );
}

function ShippingPage() {
  return (
    <>
      <PageTitle sub="Where we ship, what it costs and how long it takes.">
        Shipping
      </PageTitle>
      <div className="grid gap-5 md:grid-cols-2">
        <Card
          icon={<Truck aria-hidden="true" className="size-5 text-brand" />}
          title="Cost"
        >
          <p>
            {shippingLines.shipping.text}.
            <Flag flag={shippingLines.shipping.flag} />
          </p>
          <ul className="space-y-1">
            {shippingMethods.map((m) => (
              <li key={m.id} className="flex justify-between gap-4">
                <span>{m.label}</span>
                <strong>{money(m.price)}</strong>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Timing">
          <p>
            {shippingLines.dispatch.text}, then usually about 7 business days on
            the way.
            <Flag flag={shippingLines.dispatch.flag} />
          </p>
          <p className="text-muted">
            Business days are Monday to Friday, not counting public holidays.
          </p>
        </Card>
        <Card title="Where we ship">
          <p>
            Addresses in the {SHIPS_TO.country}.
            <Flag flag={SHIPS_TO.flag} />
          </p>
        </Card>
        <Card title="Tracking">
          <p>
            Once your order leaves us, you'll get a tracking link by email.
            <Flag
              flag={{
                kind: "to-confirm",
                note: "Depends on the carrier and the Shopify notification set-up chosen at launch.",
              }}
            />
          </p>
        </Card>
      </div>
    </>
  );
}

function ReturnsPage() {
  return (
    <>
      <PageTitle
        sub={`If your tank doesn't fit, we'll send another size. That's the ${GUARANTEE_DAYS}-day fit guarantee.`}
      >
        Returns and exchanges
      </PageTitle>
      <div className="grid gap-5 md:grid-cols-2">
        <Card
          icon={<RefreshCw aria-hidden="true" className="size-5 text-brand" />}
          title={
            <>
              The fit guarantee
              <Flag flag={GUARANTEE_FLAG} />
            </>
          }
        >
          <p>
            Within {GUARANTEE_DAYS} days of delivery, tell us your tank doesn't
            fit and we'll send a different size, free.
          </p>
          <p>You don't need to post the first one back.</p>
          <p className="text-muted">One free size exchange per order.</p>
        </Card>
        <Card title="How to ask for an exchange">
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Email{" "}
              <a
                href={`mailto:${brand.brand.support.email}`}
                className="underline underline-offset-2"
              >
                {brand.brand.support.email}
              </a>{" "}
              with your order number (it starts with HL).
            </li>
            <li>Tell us which tank, and the size you'd like instead.</li>
            <li>We'll confirm and send the new size.</li>
          </ol>
          <p>
            Or use the{" "}
            <Link
              to={helpPath("contact")}
              className="underline underline-offset-2"
            >
              contact form
            </Link>
            .
          </p>
        </Card>
        <Card
          title={
            <>
              Refunds
              <Flag
                flag={{
                  kind: "to-confirm",
                  note: "The competitor generally doesn't refund for sizing and offers the exchange instead. Our refund policy is still to decide.",
                }}
              />
            </>
          }
        >
          <p>
            For a fit problem, the size exchange is the quickest fix. For
            anything else, get in touch and we'll sort it out with you.
          </p>
        </Card>
      </div>
    </>
  );
}

type ContactFields = {
  name: string;
  email: string;
  order: string;
  message: string;
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ContactPage() {
  const [sent, setSent] = useState<ContactFields | null>(null);
  const [errors, setErrors] = useState<Partial<ContactFields>>({});

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(
      new FormData(e.currentTarget),
    ) as ContactFields;
    const errs: Partial<ContactFields> = {};
    if (!f.name.trim()) errs.name = "Enter your name.";
    if (!EMAIL.test(f.email.trim()))
      errs.email = "Enter an email address like name@example.com.";
    if (f.message.trim().length < 10)
      errs.message = "Tell us a little more (10 characters or more).";
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setSent(f);
  };

  return (
    <>
      <PageTitle sub="Questions about sizing, an order or anything else: we're happy to help.">
        Contact us
      </PageTitle>
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {sent ? (
          <div
            role="status"
            className="rounded-card border border-line bg-surface p-6"
            data-testid="contact-sent"
          >
            <p className="display text-2xl">
              Thanks, {sent.name.split(" ")[0]}.
            </p>
            <p className="mt-2 text-muted">
              Your message is ready for the {brand.brand.name} team. In test
              mode it isn't sent anywhere; at launch this form goes to{" "}
              {brand.brand.support.email}.
            </p>
            <button
              type="button"
              onClick={() => setSent(null)}
              className="mt-4 text-sm underline underline-offset-4"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            noValidate
            onSubmit={submit}
            className="space-y-4 rounded-card border border-line bg-surface p-6"
            data-testid="contact-form"
          >
            <Field
              label="Name"
              name="name"
              error={errors.name}
              autoComplete="name"
            />
            <Field
              label="Email"
              name="email"
              type="email"
              error={errors.email}
              autoComplete="email"
            />
            <Field
              label="Order number (optional)"
              name="order"
              placeholder="KW1001"
            />
            <Field
              label="Message"
              name="message"
              error={errors.message}
              multiline
            />
            <button
              type="submit"
              className="btn-primary px-6 py-3 font-semibold"
            >
              Send message
            </button>
          </form>
        )}
        <Card
          icon={<Mail aria-hidden="true" className="size-5 text-brand" />}
          title="Email us"
        >
          <p>
            <a
              href={`mailto:${brand.brand.support.email}`}
              className="underline underline-offset-2"
            >
              {brand.brand.support.email}
            </a>
          </p>
          <p className="text-muted">
            {brand.brand.support.hours}
            <Flag
              flag={{
                kind: "to-confirm",
                note: "Support hours and address are working values.",
              }}
            />
          </p>
        </Card>
      </div>
    </>
  );
}
