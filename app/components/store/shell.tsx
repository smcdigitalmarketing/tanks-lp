import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowLeft, Menu, ShoppingBag, X } from "lucide-react";
import type { Concept, OfferId } from "~/content/types";
import { concepts, conceptPath } from "~/content/concepts";
import { CartProvider, useCart } from "~/lib/mock-cart";
import { Wordmark } from "~/components/ui";
import { CartDrawer, CheckoutDemo } from "./cart";

type PageKind = "product" | "advertorial";

/**
 * A brand's storefront chrome (announcement bar, header, footer) around a
 * page, under a dark strip that switches concept, page and offer, so the
 * three directions can be compared like for like.
 */
export function StoreShell({
  concept,
  offerId,
  page,
  announcement,
  children,
}: {
  concept: Concept;
  offerId: OfferId;
  page: PageKind;
  announcement: string;
  children: ReactNode;
}) {
  return (
    <CartProvider concept={concept.slug}>
      <div
        data-theme={concept.slug}
        data-offer={offerId}
        className="min-h-dvh bg-bg font-sans text-ink antialiased"
      >
        {page === "product" && (
          <a
            href="#buy"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-btn focus:bg-surface focus:px-4 focus:py-2"
          >
            Skip to purchase options
          </a>
        )}
        <PreviewStrip concept={concept} offerId={offerId} page={page} />
        <Announcement
          text={announcement}
          href={
            page === "advertorial"
              ? conceptPath(concept.slug, { offer: offerId }) + "#buy"
              : "#buy"
          }
        />
        <Header concept={concept} offerId={offerId} page={page} />
        <main id="top">{children}</main>
        <Footer concept={concept} offerId={offerId} />
        <CartDrawer concept={concept} />
        <CheckoutDemo concept={concept} />
      </div>
    </CartProvider>
  );
}

const FLAGS_KEY = "tanks-lp-flags";

/** Shows or hides every verification flag on the page (data-flags on <html>). */
function useFlagsToggle() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    try {
      setOn(window.localStorage.getItem(FLAGS_KEY) !== "off");
    } catch {
      // Storage blocked: flags stay on.
    }
  }, []);
  useEffect(() => {
    document.documentElement.dataset.flags = on ? "on" : "off";
    try {
      window.localStorage.setItem(FLAGS_KEY, on ? "on" : "off");
    } catch {
      // Storage blocked: the choice lasts for this page only.
    }
  }, [on]);
  return [on, setOn] as const;
}

function PreviewStrip({
  concept,
  offerId,
  page,
}: {
  concept: Concept;
  offerId: OfferId;
  page: PageKind;
}) {
  const [flags, setFlags] = useFlagsToggle();
  const pill = (active: boolean) =>
    `rounded px-2 py-1 transition ${active ? "bg-white text-[#111]" : "text-white/70 hover:bg-white/10 hover:text-white"}`;
  return (
    <nav
      aria-label="Concept preview"
      className="flex flex-wrap items-center gap-x-4 gap-y-1.5 bg-[#111] px-3 py-1.5 font-[Inter,system-ui,sans-serif] text-[11px] text-white/80 md:px-4"
    >
      <Link to="/" className="inline-flex items-center gap-1 hover:text-white">
        <ArrowLeft aria-hidden="true" className="size-3" />
        All concepts
      </Link>
      <span
        className="flex items-center gap-0.5"
        role="group"
        aria-label="Concept"
      >
        {concepts.map((c) => (
          <Link
            key={c.slug}
            to={conceptPath(c.slug, { page, offer: offerId })}
            className={pill(c.slug === concept.slug)}
            aria-current={c.slug === concept.slug ? "page" : undefined}
            title={`${c.letter} · ${c.direction}`}
          >
            {c.letter} · {c.brand.name}
          </Link>
        ))}
      </span>
      <span
        className="flex items-center gap-0.5"
        role="group"
        aria-label="Page"
      >
        {(["product", "advertorial"] as const).map((p) => (
          <Link
            key={p}
            to={conceptPath(concept.slug, { page: p, offer: offerId })}
            className={pill(p === page)}
            aria-current={p === page ? "page" : undefined}
          >
            {p === "product" ? "Product page" : "Advertorial"}
          </Link>
        ))}
      </span>
      <span
        className="flex items-center gap-0.5"
        role="group"
        aria-label="Offer"
      >
        {(["standard", "early-black-friday"] as const).map((o) => (
          <Link
            key={o}
            to={conceptPath(concept.slug, { page, offer: o })}
            className={pill(o === offerId)}
            aria-current={o === offerId ? "page" : undefined}
          >
            {o === "standard" ? "Standard" : "Early Black Friday"}
          </Link>
        ))}
      </span>
      <button
        type="button"
        onClick={() => setFlags(!flags)}
        aria-pressed={flags}
        className="ml-auto inline-flex items-center gap-1.5 rounded px-2 py-1 hover:bg-white/10"
      >
        <span
          className={`size-2 rounded-full ${flags ? "bg-amber-400" : "bg-white/30"}`}
        />
        Flags {flags ? "on" : "off"}
      </button>
    </nav>
  );
}

function Announcement({ text, href }: { text: string; href: string }) {
  return (
    <a
      href={href}
      data-testid="announcement"
      className="block bg-accent px-4 py-2 text-center text-[13px] font-medium tracking-wide text-accent-ink hover:underline"
    >
      {text}
    </a>
  );
}

function navFor(concept: Concept, offerId: OfferId, page: PageKind) {
  const product =
    page === "product" ? "" : conceptPath(concept.slug, { offer: offerId });
  return [
    { href: `${product}#buy`, label: "Shop" },
    { href: `${product}#how`, label: "How it works" },
    { href: `${product}#reviews`, label: "Reviews" },
    { href: `${product}#faq`, label: "FAQ" },
    {
      href: conceptPath(concept.slug, { page: "advertorial", offer: offerId }),
      label: "The story",
    },
  ];
}

function Header({
  concept,
  offerId,
  page,
}: {
  concept: Concept;
  offerId: OfferId;
  page: PageKind;
}) {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const nav = navFor(concept, offerId, page);
  const centered = concept.layout.hero === "headline";

  const logo = (
    <a
      href={
        page === "product"
          ? "#top"
          : conceptPath(concept.slug, { offer: offerId })
      }
      className="shrink-0"
      aria-label={`${concept.brand.name} home`}
    >
      <Wordmark slug={concept.slug} />
    </a>
  );
  const desktopNav = (
    <nav aria-label="Main" className="hidden gap-7 text-sm text-muted md:flex">
      {nav.map((n) => (
        <a key={n.label} href={n.href} className="hover:text-ink">
          {n.label}
        </a>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMenu((v) => !v)}
            className="-ml-2 rounded-full p-2 hover:bg-surface-2 md:hidden"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="mobile-menu"
          >
            {menu ? (
              <X aria-hidden="true" className="size-6" />
            ) : (
              <Menu aria-hidden="true" className="size-6" />
            )}
          </button>
          {centered ? desktopNav : logo}
        </div>
        <div className="justify-self-center">
          {centered ? logo : desktopNav}
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative justify-self-end rounded-full p-2 hover:bg-surface-2"
          aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
        >
          <ShoppingBag aria-hidden="true" className="size-6" />
          {count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-brand text-[11px] font-bold text-brand-ink">
              {count}
            </span>
          )}
        </button>
      </div>
      {menu && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="border-t border-line bg-surface px-4 pb-4 md:hidden"
        >
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setMenu(false)}
              className="block border-b border-line py-3 text-base font-medium last:border-0"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Footer({ concept, offerId }: { concept: Concept; offerId: OfferId }) {
  const product = conceptPath(concept.slug, { offer: offerId });
  const cols = [
    {
      title: "Shop",
      links: [
        { href: `${product}#buy`, label: concept.brand.productName },
        { href: `${product}#compare`, label: "How it compares" },
        {
          href: conceptPath(concept.slug, {
            page: "advertorial",
            offer: offerId,
          }),
          label: "The story",
        },
      ],
    },
    {
      title: "Help",
      links: [
        { href: `${product}#faq`, label: "FAQ" },
        { href: `${product}#size-step`, label: "Find your size" },
        {
          href: `mailto:${concept.brand.support.email}`,
          label: concept.brand.support.email,
        },
      ],
    },
  ];
  return (
    <footer className="bg-footer px-4 pb-28 pt-14 text-sm text-footer-ink/75">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-xs">
          <span className="[&_*]:!text-footer-ink">
            <Wordmark slug={concept.slug} />
          </span>
          <p className="mt-4">{concept.pdp.footerBlurb}</p>
          <p className="mt-2 text-xs">{concept.brand.support.hours}</p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-footer-ink">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="hover:text-footer-ink hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-footer-ink/15 pt-6 text-xs leading-relaxed">
        {concept.brand.name} is a working name for concept {concept.letter} (
        {concept.direction}), an internal brand study. Not a live store: nothing
        is sold or charged. Product photos and reviews are competitor research
        material, not cleared for production use. ·{" "}
        <Link to="/" className="underline hover:text-footer-ink">
          Compare all concepts
        </Link>
      </p>
    </footer>
  );
}
