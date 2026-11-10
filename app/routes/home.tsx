import { Link } from "react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Route } from "./+types/home";
import type { Concept, OfferId } from "~/content/types";
import {
  concepts,
  conceptPath,
  fillPrices,
  type PageKind,
} from "~/content/concepts";
import { gallery } from "~/content/page";
import { OFFER_IDS, offers, pricing } from "~/content/offers";
import { lifestyle } from "~/content/product";
import { REVIEW_DATA, SOURCE_URL, money, portedAt } from "~/data/catalog";
import { HUB_FONTS, fontHref } from "~/lib/seo";
import { SlideView } from "~/components/gallery/slides";
import { Flag } from "~/components/flag";
import { Picture, Wordmark } from "~/components/ui";

export const meta: Route.MetaFunction = () => [
  { title: "Built-in bra tank · Three brand concepts" },
  { name: "robots", content: "noindex, nofollow" },
  { tagName: "link", rel: "stylesheet", href: fontHref(HUB_FONTS) },
  // Each concept's own type, so every column renders in its brand.
  ...concepts.map((c) => ({
    tagName: "link",
    rel: "stylesheet",
    href: fontHref(c.brand.googleFonts),
  })),
];

const REPO = "https://github.com/smcdigitalmarketing/tanks-lp/blob/main";

const DOCS = [
  { file: "docs/competitor-analysis.md", label: "Competitor analysis" },
  { file: "docs/product-research.md", label: "Product research and claims" },
  { file: "docs/brand-concepts.md", label: "Brand concepts" },
  { file: "docs/asset-manifest.md", label: "Asset manifest" },
];

/** The rows of the side-by-side table: the same slot, written by each brand. */
const ROWS: { label: string; cell: (c: Concept) => string }[] = [
  {
    label: "Product title",
    cell: (c) => `${c.pdp.title.product}: ${c.pdp.title.benefit}`,
  },
  { label: "First gallery slide", cell: (c) => c.pdp.gallery.benefit.headline },
  { label: "Subtitle (voice)", cell: (c) => c.pdp.subtitle },
  { label: "Bundle step", cell: (c) => c.pdp.steps.bundle },
  {
    label: "Standard offer",
    cell: (c) => fillPrices(c.offers.standard.banner, offers.standard),
  },
  {
    label: "Early Black Friday",
    cell: (c) =>
      fillPrices(
        c.offers["early-black-friday"].banner,
        offers["early-black-friday"],
      ),
  },
  {
    label: "Christmas",
    cell: (c) => fillPrices(c.offers.christmas.banner, offers.christmas),
  },
  { label: "Homepage hero", cell: (c) => c.home.hero.headline },
  { label: "7 Reasons headline", cell: (c) => c.sevenReasons.base.headline },
  { label: "Guarantee headline", cell: (c) => c.pdp.guarantee.headline },
  { label: "Advertorial headline", cell: (c) => c.advertorial.headline },
  { label: "Closing line", cell: (c) => c.pdp.closing.headline },
];

const SOP = [
  [
    "Above the fold",
    "Seven-slide gallery, kicker, benefit title, price with the dollar saving, four bullets.",
  ],
  [
    "Buy box",
    "Numbered steps: bundle, a colour per tank, size with nothing preselected.",
  ],
  [
    "Under the button",
    "Shipping, the fit guarantee spelled out, one real review. No urgency, no payment badges.",
  ],
  ["Details", "Accordions with the first one open, then a lifestyle strip."],
  [
    "Social proof",
    "A wall of reviews with their source. No aggregate rating (see the docs).",
  ],
  ["Value props", "Benefit headlines, how it works, the comparison table."],
  [
    "Closing",
    "Guarantee, FAQ, a final call to action, footer. Sticky add to cart.",
  ],
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-[#f4f3f0] font-[Inter,system-ui,sans-serif] text-[#16151a]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <p className="text-sm font-semibold">
            Built-in bra tank · brand concepts
          </p>
          <nav className="flex flex-wrap gap-4 text-sm text-black/60">
            <Link to="/gallery" className="hover:text-black">
              Gallery images
            </Link>
            <Link to="/sop" className="hover:text-black">
              SOP
            </Link>
            <a href={`${REPO}/README.md`} className="hover:text-black">
              Docs
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <section className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/50">
            Internal concept review · not public
          </p>
          <h1 className="mt-3 text-[2.1rem] font-bold leading-tight tracking-tight md:text-5xl">
            Three brands, one tank. Pick the direction to build.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-black/65">
            Each concept sells the same women's tank with built-in bra support,
            with the same photos, product facts and prices. Only the brand, the
            look and the words change, so the comparison is fair. Every concept
            has a product page, an advertorial, and a Standard and an Early
            Black Friday offer.
          </p>
          <p className="mt-4 text-sm text-black/50">
            Researched from{" "}
            <a
              href={SOURCE_URL}
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              maggies-tanks.com
            </a>{" "}
            on {portedAt}. Amber tags on the pages mark claims we can't make
            yet; switch them off in the dark strip at the top of any page.
          </p>
        </section>

        {/* The three concepts, side by side (swipe on a phone). */}
        <section aria-label="The three concepts" className="mt-10">
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
            {concepts.map((c) => (
              <ConceptCard key={c.slug} concept={c} />
            ))}
          </div>
        </section>

        {/* Same slot, three brands. */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">Side by side</h2>
          <p className="mt-2 text-black/60">
            The same place on the page, as each brand writes it.
          </p>
          <div className="no-scrollbar mt-6 overflow-x-auto rounded-xl border border-black/10 bg-white">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="w-44 p-4" />
                  {concepts.map((c) => (
                    <th
                      key={c.slug}
                      data-theme={c.slug}
                      className="bg-transparent p-4 align-bottom font-normal"
                    >
                      <Wordmark slug={c.slug} />
                      <span className="mt-1 block font-[Inter,system-ui,sans-serif] text-xs text-black/50">
                        {c.letter} · {c.direction}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr
                    key={r.label}
                    className="border-b border-black/5 last:border-0"
                  >
                    <th
                      scope="row"
                      className="p-4 align-top text-xs font-semibold uppercase tracking-wide text-black/50"
                    >
                      {r.label}
                    </th>
                    {concepts.map((c) => (
                      <td
                        key={c.slug}
                        data-theme={c.slug}
                        className="bg-transparent p-4 align-top text-[15px] leading-snug text-ink [font-family:var(--f-body)]"
                      >
                        {r.cell(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* The shared offer. */}
        <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              One offer, presented three ways
            </h2>
            <p className="mt-2 leading-relaxed text-black/60">
              Prices live in{" "}
              <code className="rounded bg-black/5 px-1">
                app/content/offers.ts
              </code>
              ; change a number there and every page, cart and banner follows.
              Savings are shown against buying single tanks, not against the
              source store's $84.95 "compare at" price.
            </p>
            <div className="mt-6 flex gap-2">
              <Picture
                image={lifestyle[0]}
                className="!h-28 !w-24 rounded-lg"
              />
              <Picture
                image={lifestyle[1]}
                className="!h-28 !w-24 rounded-lg"
              />
              <Picture
                image={lifestyle[2]}
                className="!h-28 !w-24 rounded-lg"
              />
            </div>
            <p className="mt-2 text-xs text-black/50">
              Same photography on every concept: research images from the source
              store.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-xs uppercase tracking-wide text-black/50">
                  <th className="p-4 font-semibold">Bundle</th>
                  {OFFER_IDS.map((id) => (
                    <th key={id} className="p-4 font-semibold">
                      {offers[id].name}
                      {offers[id].provisional && (
                        <Flag
                          flag={{ kind: "provisional", note: offers[id].basis }}
                        />
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {offers.standard.bundles.map((b, i) => (
                  <tr
                    key={b.id}
                    className="border-b border-black/5 last:border-0"
                  >
                    <th scope="row" className="p-4 font-medium">
                      {b.units === 1 ? "1 tank" : `${b.units} tanks`}
                    </th>
                    {OFFER_IDS.map((id) => {
                      const bundle = offers[id].bundles[i];
                      const p = pricing(offers[id], bundle);
                      return (
                        <td key={id} className="p-4 tabular-nums">
                          <strong>{money(p.total)}</strong>
                          <span className="block text-xs text-black/50">
                            {money(p.perUnit)} each
                            {p.saving > 0 &&
                              ` · saves ${money(p.saving)}${id === "standard" ? "" : " on Standard"}`}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-black/10 bg-white p-6">
            <h2 className="text-xl font-bold">
              The seven sections every product page follows
            </h2>
            <ol className="mt-4 space-y-3 text-sm">
              {SOP.map(([title, body], i) => (
                <li key={title} className="grid grid-cols-[28px_1fr] gap-2">
                  <span className="font-bold text-black/40">{i + 1}</span>
                  <span>
                    <strong>{title}.</strong>{" "}
                    <span className="text-black/60">{body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Link
              to="/sop"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4"
            >
              Read the SOP <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-6">
            <h2 className="text-xl font-bold">Before production</h2>
            <ul className="mt-4 space-y-2 text-sm text-black/70">
              <li>
                • The source shows "4.8/5 from 100,000+ customers"; its own
                Judge.me data says{" "}
                <strong>
                  {REVIEW_DATA.summary.average.toFixed(2)} from{" "}
                  {REVIEW_DATA.summary.count.toLocaleString("en-US")} reviews
                </strong>
                . No rating is shown on these pages.
              </li>
              <li>
                • All photos are the competitor's (several look AI-generated).
                They need usage approval or a reshoot.
              </li>
              <li>
                • Fabric blend, care, shipping times and the size chart
                contradict each other on the source.
              </li>
              <li>
                • Early Black Friday prices are provisional. Brand names need
                trademark and domain checks.
              </li>
            </ul>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
              {DOCS.map((d) => (
                <li key={d.file}>
                  <a
                    href={`${REPO}/${d.file}`}
                    className="inline-flex items-center gap-1 underline underline-offset-4"
                  >
                    {d.label}
                    <ExternalLink aria-hidden="true" className="size-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

function ConceptCard({ concept: c }: { concept: Concept }) {
  const slide = gallery(c)[0];
  const link = (label: string, page: PageKind, offer: OfferId) => (
    <Link
      to={conceptPath(c.slug, { page, offer })}
      className="flex items-center justify-between gap-2 rounded-btn border border-line bg-surface px-3 py-2.5 text-sm font-semibold transition hover:border-ink"
      data-testid={`hub-link-${c.slug}-${page}-${offer}`}
    >
      {label}
      <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
    </Link>
  );
  return (
    <article
      data-theme={c.slug}
      data-testid="concept-card"
      className="flex w-[86vw] max-w-[420px] shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-black/10 bg-bg text-ink [font-family:var(--f-body)] lg:w-auto lg:max-w-none"
    >
      <div className="flex items-start justify-between gap-3 px-5 pt-5">
        <div>
          <p className="font-[Inter,system-ui,sans-serif] text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            Concept {c.letter} · {c.direction}
          </p>
          <div className="mt-3">
            <Wordmark slug={c.slug} />
          </div>
        </div>
      </div>
      <p className="display px-5 pt-4 text-[1.55rem] leading-tight">
        {c.brand.tagline}
      </p>
      <p className="px-5 pt-2 text-sm leading-relaxed text-muted">
        {c.brand.positioning}
      </p>

      <Link
        to={conceptPath(c.slug)}
        className="relative mx-5 mt-5 block aspect-square overflow-hidden rounded-card border border-line [container-type:inline-size]"
        aria-label={`Open ${c.brand.name} product page`}
      >
        <SlideView slide={slide} />
      </Link>

      <dl className="mx-5 mt-5 grid grid-cols-2 gap-4 border-y border-line py-4 text-sm">
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Headings
          </dt>
          <dd className="display mt-1 text-2xl leading-none">Aa</dd>
          <dd className="mt-1 text-xs">{c.brand.fonts.display}</dd>
        </div>
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Body
          </dt>
          <dd className="mt-1 text-2xl leading-none">Aa</dd>
          <dd className="mt-1 text-xs">{c.brand.fonts.body}</dd>
        </div>
      </dl>
      <ul className="mx-5 mt-4 flex gap-2" aria-label="Palette">
        {c.brand.palette.map((s) => (
          <li key={s.hex} className="min-w-0 flex-1">
            <span
              className="block h-10 rounded-[calc(var(--r-card)*0.4)] border border-black/10"
              style={{ background: s.hex }}
            />
            <span className="mt-1 block truncate text-[10px] font-semibold">
              {s.name}
            </span>
            <span className="block text-[10px] uppercase text-muted">
              {s.hex}
            </span>
          </li>
        ))}
      </ul>

      <div className="mx-5 mt-5 rounded-card bg-surface-2 p-4 text-sm">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
          Voice
        </p>
        <p className="mt-1 leading-relaxed">{c.brand.voice}</p>
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
          Hypothesis
        </p>
        <p className="mt-1 leading-relaxed">{c.hypothesis}</p>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2 p-5">
        {link("Homepage", "home", "standard")}
        {link("Product page", "product", "standard")}
        {link("7 Reasons · Black Friday", "reasons", "early-black-friday")}
        {link("7 Reasons", "reasons", "standard")}
        {link("Homepage · Christmas", "home", "christmas")}
        {link("7 Reasons · Christmas", "reasons", "christmas")}
        {link("Homepage · Early BF", "home", "early-black-friday")}
        {link("Early BF page", "product", "early-black-friday")}
        {link("Advertorial", "advertorial", "standard")}
        {link("Early BF advertorial", "advertorial", "early-black-friday")}
        {link("Christmas page", "product", "christmas")}
        {link("Christmas advertorial", "advertorial", "christmas")}
      </div>
    </article>
  );
}
