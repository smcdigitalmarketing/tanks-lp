import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Ruler, ShieldCheck, X } from "lucide-react";
import type { Bundle, ConceptSlug, Offer, PdpContent } from "~/content/types";
import { getBundle, pricing } from "~/content/offers";
import { sizeGuide } from "~/content/product";
import { COLOURS, SIZES, colourByName, isSoldOut, money } from "~/data/catalog";
import { img } from "~/lib/images";
import { useCart, type UnitChoice } from "~/lib/mock-cart";
import { Icon } from "~/components/icons";
import { Flag } from "~/components/flag";
import { Picture, ReviewSource, Stars } from "~/components/ui";

/*
 * Sections 2 and 3: the buy box and what sits under the button. Every option
 * is visible (no dropdowns), steps are numbered, savings are in dollars, and
 * no size is chosen for you: the button asks for one until every tank has it.
 */

/** Colours the bundle slots start with, so a 5-pack shows some variety. */
const DEFAULT_SLOTS = ["Nude", "Black", "Grey", "White", "Navy Blue"];
const MAX_UNITS = 5;

export const colourImg = (name: string) =>
  img(colourByName(name).image, `${name} tank`);

export type BuyState = ReturnType<typeof useBuyState>;

export function useBuyState(
  offer: Offer,
  concept: ConceptSlug,
  productName: string,
) {
  const [bundleId, setBundleId] = useState<Bundle["id"]>(offer.defaultBundle);
  const [colours, setColours] = useState<string[]>(
    DEFAULT_SLOTS.slice(0, MAX_UNITS),
  );
  const [activeSlot, setActiveSlot] = useState(0);
  const [mixSizes, setMixSizes] = useState(false);
  const [sizeAll, setSizeAll] = useState<string | null>(null);
  const [sizes, setSizes] = useState<(string | null)[]>(
    Array(MAX_UNITS).fill(null),
  );
  const [needSize, setNeedSize] = useState(false);
  const cart = useCart();

  return useMemo(() => {
    const bundle = getBundle(offer, bundleId);
    const n = bundle.units;
    const unitSizes = Array.from({ length: n }, (_, i) =>
      mixSizes ? sizes[i] : sizeAll,
    );
    const units: (UnitChoice | null)[] = unitSizes.map((s, i) =>
      s ? { colour: colours[i], size: s } : null,
    );
    const ready = units.every(Boolean);
    const price = pricing(offer, bundle);
    const soldOut = units.filter(
      (u): u is UnitChoice => !!u && isSoldOut(u.colour, u.size),
    );

    return {
      offer,
      bundle,
      price,
      colours: colours.slice(0, n),
      activeSlot: Math.min(activeSlot, n - 1),
      mixSizes,
      sizeAll,
      unitSizes,
      ready,
      needSize,
      soldOut,
      selectBundle: (id: Bundle["id"]) => {
        setBundleId(id);
        setActiveSlot(0);
      },
      setActiveSlot,
      /** Paint the active tank, then move on to the next one. */
      pickColour: (name: string) => {
        const slot = Math.min(activeSlot, n - 1);
        setColours((prev) => prev.map((c, i) => (i === slot ? name : c)));
        if (slot < n - 1) setActiveSlot(slot + 1);
      },
      setMixSizes: (mix: boolean) => {
        setMixSizes(mix);
        // Carry a size already chosen into the other mode so nothing is lost.
        if (mix && sizeAll) setSizes((prev) => prev.map((s) => s ?? sizeAll));
        if (!mix)
          setSizeAll(
            sizes.slice(0, n).every((s) => s === sizes[0]) ? sizes[0] : null,
          );
      },
      pickSizeAll: (size: string) => {
        setSizeAll(size);
        setNeedSize(false);
      },
      /** The first size picked fills every tank still without one. */
      pickSize: (slot: number, size: string) => {
        setSizes((prev) =>
          prev.map((s, i) => (i === slot ? size : (s ?? size))),
        );
        setNeedSize(false);
      },
      addToCart: () => {
        if (!ready) {
          setNeedSize(true);
          document
            .getElementById("size-step")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
          return false;
        }
        cart.add({
          concept,
          offer: offer.id,
          bundleId: bundle.id,
          title: n === 1 ? productName : `${productName} · ${n}-pack`,
          units: units as UnitChoice[],
          image: colourImg(colours[0]),
          price: price.total,
          was: price.was,
        });
        return true;
      },
    };
  }, [
    offer,
    bundleId,
    colours,
    activeSlot,
    mixSizes,
    sizeAll,
    sizes,
    needSize,
    cart,
    concept,
    productName,
  ]);
}

function StepLabel({
  n,
  children,
  aside,
}: {
  n: number;
  children: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <span className="grid size-6 place-items-center rounded-full bg-ink text-xs text-bg">
          {n}
        </span>
        <span>
          Step {n}: {children}
        </span>
      </p>
      {aside}
    </div>
  );
}

// ── Step 1: bundle ─────────────────────────────────────────────────────────

type TierProps = {
  offer: Offer;
  bundle: Bundle;
  selected: boolean;
  onSelect: () => void;
  thumb: string;
  badge?: string;
};

const unitsLabel = (n: number) => (n === 1 ? "1 tank" : `${n} tanks`);

/** Stacked card (Hallie): thumbnail, deal, price and the dollar saving. */
function TierCard({
  offer,
  bundle,
  selected,
  onSelect,
  thumb,
  badge,
}: TierProps) {
  const p = pricing(offer, bundle);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      data-bundle={bundle.id}
      className={`relative w-full rounded-card border-2 bg-surface p-3 text-left transition ${
        selected
          ? "border-brand shadow-[0_0_0_3px_color-mix(in_srgb,var(--brand)_14%,transparent)]"
          : "border-line hover:border-muted"
      }`}
    >
      {badge && (
        <span className="absolute -top-2.5 right-3 rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-ink">
          {badge}
        </span>
      )}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`grid size-5 shrink-0 place-items-center rounded-full border-2 ${selected ? "border-brand" : "border-line"}`}
        >
          {selected && <span className="size-2.5 rounded-full bg-brand" />}
        </span>
        <span className="relative size-14 shrink-0 overflow-hidden rounded-[calc(var(--r-card)*0.6)] bg-surface-2">
          <Picture image={colourImg(thumb)} fit="contain" />
          {bundle.units > 1 && (
            <span className="absolute bottom-0.5 right-0.5 rounded-full bg-ink px-1.5 text-[10px] font-bold text-bg">
              ×{bundle.units}
            </span>
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold leading-tight">
            {bundle.deal}
          </span>
          <span className="block text-xs text-muted">
            {unitsLabel(bundle.units)}
            {bundle.units > 1 && ` · ${money(p.perUnit)} each`}
          </span>
        </span>
        <span className="text-right">
          <span className="block font-bold">{money(p.total)}</span>
          {p.saving > 0 && <s className="text-xs text-muted">{money(p.was)}</s>}
        </span>
      </div>
      {p.saving > 0 && (
        <span className="ml-8 mt-2 inline-block rounded-full bg-highlight px-2 py-0.5 text-xs font-semibold text-highlight-ink">
          You save {money(p.saving)}
        </span>
      )}
    </button>
  );
}

/** Side-by-side column (Daywell): the pack size and price lead. */
function TierColumn({
  offer,
  bundle,
  selected,
  onSelect,
  thumb,
  badge,
}: TierProps) {
  const p = pricing(offer, bundle);
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      data-bundle={bundle.id}
      className={`relative flex flex-col items-center rounded-card border-2 bg-surface px-1.5 pb-3 pt-4 text-center transition ${
        selected
          ? "border-brand bg-brand/[0.04]"
          : "border-line hover:border-muted"
      }`}
    >
      {badge && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-ink">
          {badge}
        </span>
      )}
      <span className="size-14 overflow-hidden rounded-[calc(var(--r-card)*0.8)] bg-surface-2">
        <Picture image={colourImg(thumb)} fit="contain" />
      </span>
      <span className="display mt-2 text-xl leading-none">
        {bundle.units}-pack
      </span>
      <span className="mt-1 text-[11px] leading-tight text-muted">
        {bundle.units === 1 ? "Single" : bundle.deal}
      </span>
      <span className="mt-2 text-lg font-bold leading-none">
        {money(p.total)}
      </span>
      {p.saving > 0 ? (
        <s className="mt-0.5 text-[11px] text-muted">{money(p.was)}</s>
      ) : (
        <span className="mt-0.5 text-[11px]">&nbsp;</span>
      )}
      <span
        className={`mt-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${p.saving > 0 ? "bg-highlight text-highlight-ink" : "text-muted"}`}
      >
        {p.saving > 0 ? `Save ${money(p.saving)}` : `${money(p.perUnit)} each`}
      </span>
    </button>
  );
}

/** Hairline row (Oriel): quiet, typographic, nothing filled in. */
function TierRow({ offer, bundle, selected, onSelect, badge }: TierProps) {
  const p = pricing(offer, bundle);
  const name =
    bundle.units === 1
      ? "Single"
      : bundle.units === 3
        ? "Set of three"
        : "Set of five";
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      data-bundle={bundle.id}
      className={`flex w-full items-center gap-4 border-b border-line py-4 text-left transition first:border-t ${selected ? "" : "opacity-75 hover:opacity-100"}`}
    >
      <span
        aria-hidden="true"
        className={`grid size-4 shrink-0 place-items-center rounded-full border ${selected ? "border-ink" : "border-muted"}`}
      >
        {selected && <span className="size-2 rounded-full bg-ink" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="display block text-xl leading-tight">
          {name}
          {badge && (
            <span className="eyebrow ml-2 align-middle text-[10px] font-medium uppercase tracking-[0.2em] text-brand">
              {badge}
            </span>
          )}
        </span>
        <span className="block text-xs text-muted">
          {bundle.units > 1
            ? `${bundle.deal} · ${money(p.perUnit)} per tank`
            : "One tank"}
        </span>
      </span>
      <span className="text-right tabular-nums">
        <span className="block text-[15px] font-medium">{money(p.total)}</span>
        {p.saving > 0 && (
          <span className="block text-[11px] text-muted">
            Saves {money(p.saving)}
          </span>
        )}
      </span>
    </button>
  );
}

// ── Step 2: colours ────────────────────────────────────────────────────────

function ColourStep({ state, label }: { state: BuyState; label: string }) {
  const active = state.colours[state.activeSlot];
  const multi = state.bundle.units > 1;
  return (
    <div>
      <StepLabel n={2}>{label}</StepLabel>
      {multi && (
        <div
          className="mb-3 flex flex-wrap gap-2"
          role="group"
          aria-label="Choose which tank to colour"
        >
          {state.colours.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={() => state.setActiveSlot(i)}
              aria-pressed={i === state.activeSlot}
              className={`flex items-center gap-1.5 rounded-btn border px-2.5 py-1.5 text-xs font-medium transition ${
                i === state.activeSlot
                  ? "border-ink bg-surface ring-1 ring-ink"
                  : "border-line bg-surface hover:border-muted"
              }`}
            >
              <span
                className="size-3.5 rounded-full border border-black/15"
                style={{ background: colourByName(c).swatch }}
              />
              Tank {i + 1}
            </button>
          ))}
        </div>
      )}
      <div className="flex gap-3">
        <span className="size-20 shrink-0 overflow-hidden rounded-[calc(var(--r-card)*0.6)] border border-line bg-surface">
          <Picture image={colourImg(active)} fit="contain" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-sm">
            {multi && (
              <span className="text-muted">Tank {state.activeSlot + 1}: </span>
            )}
            <strong data-testid="active-colour">{active}</strong>
          </p>
          <div
            className="flex flex-wrap gap-1.5"
            role="radiogroup"
            aria-label={`Colour for tank ${state.activeSlot + 1}`}
          >
            {COLOURS.map((c) => (
              <button
                key={c.name}
                type="button"
                role="radio"
                aria-checked={c.name === active}
                aria-label={c.name}
                title={c.name}
                onClick={() => state.pickColour(c.name)}
                className={`size-8 rounded-full border border-black/15 transition ${
                  c.name === active
                    ? "ring-2 ring-ink ring-offset-2 ring-offset-bg"
                    : "hover:scale-110"
                }`}
                style={{ background: c.swatch }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 3: size ───────────────────────────────────────────────────────────

function SizeButtons({
  value,
  onPick,
  colours,
  compact = false,
  name,
}: {
  value: string | null;
  onPick: (s: string) => void;
  colours: string[];
  compact?: boolean;
  name: string;
}) {
  return (
    <div
      className="grid grid-cols-7 gap-1.5"
      role="radiogroup"
      aria-label={name}
    >
      {SIZES.map((s) => {
        const out = colours.some((c) => isSoldOut(c, s));
        return (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={value === s}
            disabled={out}
            title={
              out ? "Sold out in this colour at the source store" : undefined
            }
            onClick={() => onPick(s)}
            className={`rounded-btn border font-semibold transition disabled:cursor-not-allowed disabled:opacity-35 disabled:line-through ${
              compact ? "py-1.5 text-xs" : "py-2.5 text-sm"
            } ${value === s ? "border-ink bg-ink text-bg" : "border-line bg-surface hover:border-ink"}`}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}

function SizeStep({
  state,
  label,
  onGuide,
}: {
  state: BuyState;
  label: string;
  onGuide: () => void;
}) {
  const multi = state.bundle.units > 1;
  return (
    <div
      id="size-step"
      className={`scroll-mt-28 rounded-card transition ${state.needSize ? "bg-highlight/50 p-3 ring-2 ring-brand" : ""}`}
    >
      <StepLabel
        n={3}
        aside={
          <button
            type="button"
            onClick={onGuide}
            className="inline-flex items-center gap-1 text-xs font-semibold underline underline-offset-2"
          >
            <Ruler aria-hidden="true" className="size-3.5" />
            Size guide
          </button>
        }
      >
        {label}
      </StepLabel>
      {multi && (
        <div
          className="mb-3 inline-flex rounded-btn border border-line bg-surface p-0.5 text-xs font-semibold"
          role="group"
          aria-label="Size mode"
        >
          {[
            { mix: false, text: "Same size for all" },
            { mix: true, text: "Mix sizes" },
          ].map((o) => (
            <button
              key={o.text}
              type="button"
              aria-pressed={state.mixSizes === o.mix}
              onClick={() => state.setMixSizes(o.mix)}
              className={`rounded-[calc(var(--r-btn)*0.8)] px-3 py-1.5 transition ${state.mixSizes === o.mix ? "bg-ink text-bg" : "text-muted"}`}
            >
              {o.text}
            </button>
          ))}
        </div>
      )}
      {state.mixSizes && multi ? (
        <ul className="space-y-2.5">
          {state.colours.map((c, i) => (
            <li key={i}>
              <p className="mb-1 flex items-center gap-1.5 text-xs text-muted">
                <span
                  className="size-3 rounded-full border border-black/15"
                  style={{ background: colourByName(c).swatch }}
                />
                Tank {i + 1} · {c}
              </p>
              <SizeButtons
                compact
                name={`Size for tank ${i + 1}`}
                value={state.unitSizes[i]}
                colours={[c]}
                onPick={(s) => state.pickSize(i, s)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <SizeButtons
          name="Size"
          value={state.sizeAll}
          colours={state.colours}
          onPick={state.pickSizeAll}
        />
      )}
      <p
        className={`mt-2 text-xs ${state.needSize ? "font-semibold text-brand" : "text-muted"}`}
        aria-live="polite"
      >
        {state.needSize
          ? "Choose a size for every tank to continue."
          : sizeGuide.between}
      </p>
    </div>
  );
}

export function SizeGuide({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-end bg-black/50 sm:place-items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
        className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-card bg-surface p-6 text-ink shadow-2xl sm:rounded-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <p id="size-guide-title" className="display text-2xl">
            Size guide <Flag flag={sizeGuide.flag} />
          </p>
          <button
            ref={close}
            type="button"
            onClick={onClose}
            className="-mr-2 -mt-1 rounded-full p-2 hover:bg-surface-2"
            aria-label="Close size guide"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-muted">
          {sizeGuide.measure.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ol>
        <table className="mt-5 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <th className="py-2 font-semibold">Size</th>
              <th className="py-2 font-semibold">Bust, over a bra</th>
              <th className="py-2 font-semibold">Weight (guide)</th>
            </tr>
          </thead>
          <tbody>
            {sizeGuide.rows.map((r) => (
              <tr key={r.size} className="border-b border-line last:border-0">
                <th className="py-2 font-bold">{r.size}</th>
                <td className="py-2 tabular-nums">{r.bust}</td>
                <td className="py-2 tabular-nums text-muted">{r.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 rounded-card bg-surface-2 p-3 text-sm">
          {sizeGuide.between}
        </p>
      </div>
    </div>
  );
}

// ── The buy box ────────────────────────────────────────────────────────────

export function BuyBox({
  buy,
  state,
  atcRef,
  variant,
}: {
  buy: PdpContent["buy"];
  state: BuyState;
  atcRef: RefObject<HTMLButtonElement | null>;
  variant: "stack" | "columns" | "rows";
}) {
  const [guide, setGuide] = useState(false);
  const { offer } = buy;
  const Tier =
    variant === "columns"
      ? TierColumn
      : variant === "rows"
        ? TierRow
        : TierCard;
  // The bundle the offer leads with wears the brand's badge.
  const badgeFor = (b: Bundle) =>
    b.id === offer.defaultBundle ? buy.leadBadge : undefined;
  return (
    <div
      id="buy-options"
      className="scroll-mt-24 space-y-7"
      data-offer-id={offer.id}
    >
      <div role="radiogroup" aria-label={buy.steps.bundle}>
        <StepLabel
          n={1}
          aside={
            offer.provisional ? (
              <Flag flag={{ kind: "provisional", note: offer.basis }} />
            ) : undefined
          }
        >
          {buy.steps.bundle}
        </StepLabel>
        <div
          className={
            variant === "columns"
              ? "grid grid-cols-3 gap-2 pt-2"
              : variant === "rows"
                ? ""
                : "space-y-3 pt-1"
          }
        >
          {offer.bundles.map((b) => (
            <Tier
              key={b.id}
              offer={offer}
              bundle={b}
              selected={b.id === state.bundle.id}
              onSelect={() => state.selectBundle(b.id)}
              thumb={state.colours[0]}
              badge={badgeFor(b)}
            />
          ))}
        </div>
      </div>

      <ColourStep state={state} label={buy.steps.colour} />
      <SizeStep
        state={state}
        label={buy.steps.size}
        onGuide={() => setGuide(true)}
      />
      <SizeGuide open={guide} onClose={() => setGuide(false)} />

      <div>
        <p className="mb-3 flex flex-wrap items-baseline justify-between gap-2 text-sm">
          <span className="font-semibold">
            Total:{" "}
            <span className="text-xl font-bold" data-testid="total">
              {money(state.price.total)}
            </span>{" "}
            {state.price.saving > 0 && (
              <s className="text-muted">{money(state.price.was)}</s>
            )}
          </span>
          {state.price.saving > 0 && (
            <span className="font-bold text-success">
              You save {money(state.price.saving)}
            </span>
          )}
        </p>
        {state.soldOut.length > 0 && (
          <p className="mb-2 text-xs font-semibold text-brand">
            {state.soldOut.map((u) => `${u.colour}/${u.size}`).join(", ")} is
            sold out at the source store. Pick another colour or size.
          </p>
        )}
        <button
          ref={atcRef}
          type="button"
          data-testid="add-to-cart"
          onClick={state.addToCart}
          disabled={state.soldOut.length > 0}
          className="btn-primary w-full py-4 text-base font-semibold tracking-wide shadow-lg transition hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
        >
          {state.ready
            ? `${buy.cta} · ${money(state.price.total)}`
            : "Choose a size"}
        </button>
      </div>
    </div>
  );
}

/** Shipping, the guarantee spelled out, and one short review. No urgency, no payment badges. */
export function UnderAtc({ data }: { data: PdpContent["underAtc"] }) {
  return (
    <div className="space-y-4">
      <ul className="grid gap-2 text-sm">
        {data.lines.map((l) => (
          <li key={l.text} className="flex flex-wrap items-center gap-x-2">
            <Icon name={l.icon} className="size-4 text-success" />
            {l.text}
            <Flag flag={l.flag} />
          </li>
        ))}
      </ul>
      <div className="rounded-card border border-line bg-surface-2 p-4">
        <p className="flex flex-wrap items-center gap-x-2 font-semibold">
          <ShieldCheck aria-hidden="true" className="size-5 text-success" />
          {data.guarantee.title}
          <Flag flag={data.guarantee.flag} />
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {data.guarantee.body}
        </p>
      </div>
      <figure className="rounded-card border border-line bg-surface p-4">
        <Stars rating={data.review.rating} className="size-3.5" />
        <blockquote className="mt-1 text-sm leading-relaxed">
          “{data.review.text}”
        </blockquote>
        <figcaption className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <strong>{data.review.name}</strong>
          <ReviewSource review={data.review} />
        </figcaption>
      </figure>
    </div>
  );
}

/** Appears once the main button has scrolled out of view. */
export function StickyAtc({
  state,
  atcRef,
  cta,
}: {
  state: BuyState;
  atcRef: RefObject<HTMLButtonElement | null>;
  cta: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const el = atcRef.current;
      setShow(!!el && el.getBoundingClientRect().bottom < 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [atcRef]);

  return (
    <div
      data-testid="sticky-atc"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!show}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <span className="hidden size-11 shrink-0 overflow-hidden rounded bg-surface-2 sm:block">
          <Picture image={colourImg(state.colours[0])} fit="contain" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold">
            {state.bundle.units === 1
              ? "1 tank"
              : `${state.bundle.units} tanks · ${state.bundle.deal}`}
          </span>
          <span className="block text-xs">
            <strong>{money(state.price.total)}</strong>{" "}
            {state.price.saving > 0 && (
              <s className="text-muted">{money(state.price.was)}</s>
            )}
          </span>
        </span>
        <button
          type="button"
          tabIndex={show ? 0 : -1}
          onClick={state.addToCart}
          className="btn-primary shrink-0 px-5 py-3 text-sm font-semibold tracking-wide"
        >
          {state.ready ? cta : "Choose a size"}
        </button>
      </div>
    </div>
  );
}
