import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Bundle, OfferId } from "~/content/types";
import type { Img } from "~/lib/images";

/**
 * In-browser cart standing in for a Shopify cart. Nothing leaves the browser.
 * Each line carries its offer, the value a Shopify build would send as a cart
 * attribute, so a Black Friday bundle keeps its price in the cart and at
 * checkout whichever page you're on.
 */

export type UnitChoice = { colour: string; size: string };

export type CartLine = {
  key: string;
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
  /** False until the saved cart has been read after hydration. */
  ready: boolean;
  open: boolean;
  add: (line: Omit<CartLine, "key" | "qty">) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  subtotal: number;
  wasTotal: number;
  /** Number of tanks in the cart. */
  count: number;
};

const STORAGE_KEY = "hallie-cart";
const CartContext = createContext<CartApi | null>(null);

function load(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const lines = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return Array.isArray(lines)
      ? lines.filter((l) => l && Array.isArray(l.units) && l.qty > 0)
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

export const cents = (n: number) => Math.round(n * 100) / 100;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Load after hydration so the prerendered HTML matches the first render.
  useEffect(() => {
    setLines(load());
    setReady(true);
    // Another tab changed the cart: follow it.
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setLines(load());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (ready) save(lines);
  }, [lines, ready]);

  const add = useCallback<CartApi["add"]>((line) => {
    setLines((prev) => {
      // The same bundle with the same choices just goes up by one.
      const same = prev.find(
        (l) =>
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
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) =>
            l.key === key ? { ...l, qty: Math.min(qty, 20) } : l,
          ),
    );
  }, []);

  const remove = useCallback(
    (key: string) => setLines((prev) => prev.filter((l) => l.key !== key)),
    [],
  );

  const clear = useCallback(() => setLines([]), []);

  const api = useMemo<CartApi>(
    () => ({
      lines,
      ready,
      open,
      add,
      setQty,
      remove,
      clear,
      setOpen,
      subtotal: cents(lines.reduce((s, l) => s + l.price * l.qty, 0)),
      wasTotal: cents(lines.reduce((s, l) => s + l.was * l.qty, 0)),
      count: lines.reduce((s, l) => s + l.units.length * l.qty, 0),
    }),
    [lines, ready, open, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
