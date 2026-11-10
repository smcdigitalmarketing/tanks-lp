import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Link, useLocation } from "react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import type { OfferId } from "~/content/types";
import {
  HELP_PAGES,
  brand,
  fillPrices,
  helpPath,
  storePath,
  type HelpSlug,
  type PageKind,
} from "~/content/store";
import { OFFER_IDS, OFFER_LABEL, isOfferId, offers } from "~/content/offers";
import { useCart } from "~/lib/mock-cart";
import { Wordmark } from "~/components/ui";
import { CartDrawer } from "./cart";

/*
 * The Hallie storefront chrome: a dark preview strip (internal: offer switch,
 * flags, gallery and SOP), the announcement bar, the header with the cart,
 * and the footer.
 *
 * Pages with prices carry their offer in the URL. Pages without (help, cart,
 * 404) use the offer you last browsed, so the header links, the announcement
 * and "continue shopping" stay in the same campaign.
 */

const OFFER_KEY = "hallie-offer";
const OfferContext = createContext<OfferId>("standard");

/** The offer the current page is in (its own, or the one last browsed). */
export const useStoreOffer = () => useContext(OfferContext);

function useRememberedOffer(pageOffer: OfferId | undefined) {
  const [remembered, setRemembered] = useState<OfferId>("standard");
  useEffect(() => {
    try {
      if (pageOffer) window.sessionStorage.setItem(OFFER_KEY, pageOffer);
      else {
        const v = window.sessionStorage.getItem(OFFER_KEY) ?? undefined;
        if (isOfferId(v)) setRemembered(v);
      }
    } catch {
      // Storage blocked: help pages show the Standard offer.
    }
  }, [pageOffer]);
  const choose = (o: OfferId) => {
    setRemembered(o);
    try {
      window.sessionStorage.setItem(OFFER_KEY, o);
    } catch {
      // As above.
    }
  };
  return [pageOffer ?? remembered, choose] as const;
}

export function StoreShell({
  offerId,
  page,
  announcement,
  children,
}: {
  /** Set on pages that show prices; omitted on help, cart and 404. */
  offerId?: OfferId;
  /** The page kind, so the preview strip can switch offer in place. */
  page?: PageKind;
  announcement?: string;
  children: ReactNode;
}) {
  const [offer, chooseOffer] = useRememberedOffer(offerId);
  const bar =
    announcement ?? fillPrices(brand.offers[offer].banner, offers[offer]);
  const productBuy = storePath("product", offer) + "#buy";
  return (
    <OfferContext.Provider value={offer}>
      <div
        data-theme="soft"
        data-offer={offer}
        className="min-h-dvh bg-bg font-sans text-ink antialiased"
      >
        {(page === "product" || page === "home") && (
          <a
            href="#buy"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-btn focus:bg-surface focus:px-4 focus:py-2"
          >
            Skip to purchase options
          </a>
        )}
        <PreviewStrip offer={offer} page={page} onChoose={chooseOffer} />
        <Announcement
          text={bar}
          href={page === "product" || page === "home" ? "#buy" : productBuy}
        />
        <Header offer={offer} />
        <main id="top">{children}</main>
        <Footer offer={offer} />
        <CartDrawer />
      </div>
    </OfferContext.Provider>
  );
}

const FLAGS_KEY = "tanks-lp-flags";

/** Shows or hides every verification flag on the page (data-flags on <html>). */
function useFlagsToggle() {
  // Off by default; a reviewer can switch them on from the preview strip.
  const [on, setOn] = useState(false);
  useEffect(() => {
    try {
      setOn(window.localStorage.getItem(FLAGS_KEY) === "on");
    } catch {
      // Storage blocked: flags stay off.
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

/**
 * Internal strip above the store: switch the offer (campaign) in place, show
 * verification flags, and reach the gallery and SOP. It also says the store
 * is in test mode, so nobody mistakes the checkout for a real one.
 */
export function PreviewStrip({
  offer,
  page,
  onChoose,
}: {
  offer: OfferId;
  page?: PageKind;
  onChoose?: (o: OfferId) => void;
}) {
  const [flags, setFlags] = useFlagsToggle();
  const pill = (active: boolean) =>
    `rounded px-2 py-1 transition ${active ? "bg-white text-[#111]" : "text-white/70 hover:bg-white/10 hover:text-white"}`;
  return (
    <nav
      aria-label="Store preview"
      data-testid="preview-strip"
      className="flex flex-wrap items-center gap-x-4 gap-y-1.5 bg-[#111] px-3 py-1.5 font-[Inter,system-ui,sans-serif] text-[11px] text-white/80 md:px-4"
    >
      <span className="font-semibold text-white">Test mode</span>
      <span
        className="flex items-center gap-0.5"
        role="group"
        aria-label="Offer"
      >
        {OFFER_IDS.map((o) =>
          page ? (
            <Link
              key={o}
              to={storePath(page, o)}
              className={pill(o === offer)}
              aria-current={o === offer ? "page" : undefined}
            >
              {OFFER_LABEL[o]}
            </Link>
          ) : (
            <button
              key={o}
              type="button"
              onClick={() => onChoose?.(o)}
              className={pill(o === offer)}
              aria-pressed={o === offer}
            >
              {OFFER_LABEL[o]}
            </button>
          ),
        )}
      </span>
      <span className="flex items-center gap-3">
        <Link to="/gallery" className="hover:text-white hover:underline">
          Gallery
        </Link>
        <Link to="/sop" className="hover:text-white hover:underline">
          SOP
        </Link>
      </span>
      <span className="hidden text-white/50 lg:inline">
        No payments are taken and no orders are sent.
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

function navFor(offer: OfferId) {
  return [
    { href: storePath("shop", offer), label: "Shop" },
    { href: storePath("product", offer), label: brand.brand.productName },
    { href: storePath("reasons", offer), label: "Why switch" },
    { href: storePath("story", offer), label: "Our story" },
    { href: helpPath("faq"), label: "Help" },
  ];
}

/** True when `href` is the page we're on (ignoring the hash). */
function useIsCurrent() {
  const { pathname } = useLocation();
  return (href: string) => href.split("#")[0] === pathname;
}

function Header({ offer }: { offer: OfferId }) {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const isCurrent = useIsCurrent();
  const nav = navFor(offer);
  const { pathname } = useLocation();
  // Close the phone menu whenever the page changes.
  useEffect(() => setMenu(false), [pathname]);

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
          <Link
            to={storePath("home", offer)}
            className="shrink-0"
            aria-label={`${brand.brand.name} home`}
          >
            <Wordmark />
          </Link>
        </div>
        <nav
          aria-label="Main"
          className="hidden gap-7 text-sm text-muted md:flex"
        >
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.href}
              className={`hover:text-ink ${isCurrent(n.href) ? "font-semibold text-ink" : ""}`}
              aria-current={isCurrent(n.href) ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
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
          {[...nav, { href: helpPath("contact"), label: "Contact us" }].map(
            (n) => (
              <Link
                key={n.label}
                to={n.href}
                onClick={() => setMenu(false)}
                className="block border-b border-line py-3 text-base font-medium last:border-0"
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>
      )}
    </header>
  );
}

function Footer({ offer }: { offer: OfferId }) {
  const help = (Object.keys(HELP_PAGES) as HelpSlug[]).map((slug) => ({
    href: helpPath(slug),
    label: HELP_PAGES[slug],
  }));
  const cols = [
    {
      title: "Shop",
      links: [
        { href: storePath("product", offer), label: brand.brand.productName },
        { href: storePath("shop", offer), label: "All colours" },
        { href: storePath("reasons", offer), label: "7 reasons to switch" },
        { href: storePath("story", offer), label: "A note from Hallie" },
        { href: "/cart", label: "Your cart" },
      ],
    },
    { title: "Help", links: help },
  ];
  return (
    <footer className="bg-footer px-4 pb-28 pt-14 text-sm text-footer-ink/75">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-xs">
          <span className="[&_*]:!text-footer-ink">
            <Wordmark />
          </span>
          <p className="mt-4">{brand.pdp.footerBlurb}</p>
          <p className="mt-4">
            <a
              href={`mailto:${brand.brand.support.email}`}
              className="hover:text-footer-ink hover:underline"
            >
              {brand.brand.support.email}
            </a>
          </p>
          <p className="mt-1 text-xs">{brand.brand.support.hours}</p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-footer-ink">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="hover:text-footer-ink hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-footer-ink/15 pt-6 text-xs leading-relaxed">
        © 2026 {brand.brand.name}
      </p>
    </footer>
  );
}
