import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Bundle, ConceptSlug, OfferId } from "~/content/types";
import type { Img } from "~/lib/images";

/**
 * In-browser cart standing in for a Shopify cart. Nothing leaves the browser:
 * checkout opens a demo. Each line carries the concept and the offer, the
 * values a Shopify build would send as cart attributes (pdp_variant, offer).
 */

export type UnitChoice = { colour: string; size: string };

export type CartLine = {
  key: string;
  concept: ConceptSlug;
  offer: OfferId;
  bundleId: Bundle["id"];
  title: string;
  /** One colour and size per tank in the bundle. */
  units: UnitChoice[];
  image: Img;
  /** Price of one bundle, and its struck-through price. */
  price: number;
  was: number;
  qty: number;
};

type CartApi = {
  lines: CartLine[];
  open: boolean;
  checkoutOpen: boolean;
  add: (line: Omit<CartLine, "key" | "qty">) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  setOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  subtotal: number;
  wasTotal: number;
  /** Number of tanks in the cart. */
  count: number;
};

const STORAGE_KEY = "tanks-lp-cart";
const CartContext = createContext<CartApi | null>(null);

function load(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const lines = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return Array.isArray(lines)
      ? lines.filter((l) => l && Array.isArray(l.units))
      : [];
  } catch {
    return [];
  }
}

function save(lines: CartLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Private mode or blocked storage: the cart just won't survive a reload.
  }
}

/** "Black/M, Nude/L, Black/M". */
export const describeUnits = (units: UnitChoice[]) =>
  units.map((u) => `${u.colour}/${u.size}`).join(", ");

export function CartProvider({
  concept,
  children,
}: {
  concept: ConceptSlug;
  children: ReactNode;
}) {
  const [all, setAll] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load after hydration so the prerendered HTML matches the first render.
  useEffect(() => {
    setAll(load());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) save(all);
  }, [all, loaded]);

  const add = useCallback<CartApi["add"]>((line) => {
    setAll((prev) => {
      // The same bundle with the same choices just goes up by one.
      const same = prev.find(
        (l) =>
          l.concept === line.concept &&
          l.offer === line.offer &&
          l.bundleId === line.bundleId &&
          describeUnits(l.units) === describeUnits(line.units),
      );
      if (same)
        return prev.map((l) => (l === same ? { ...l, qty: l.qty + 1 } : l));
      return [
        ...prev,
        { ...line, key: `${line.bundleId}-${Date.now()}`, qty: 1 },
      ];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setAll((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback(
    (key: string) => setAll((prev) => prev.filter((l) => l.key !== key)),
    [],
  );

  const api = useMemo<CartApi>(() => {
    // Each brand keeps its own cart, so switching concepts doesn't mix them.
    const lines = all.filter((l) => l.concept === concept);
    return {
      lines,
      open,
      checkoutOpen,
      add,
      setQty,
      remove,
      setOpen,
      setCheckoutOpen,
      subtotal: lines.reduce((s, l) => s + l.price * l.qty, 0),
      wasTotal: lines.reduce((s, l) => s + l.was * l.qty, 0),
      count: lines.reduce((s, l) => s + l.units.length * l.qty, 0),
    };
  }, [all, concept, open, checkoutOpen, add, setQty, remove]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
