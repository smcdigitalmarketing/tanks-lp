import type { CartLine } from "~/lib/mock-cart";

/**
 * Orders placed through the test-mode checkout. They live in this browser
 * only (localStorage): nothing is charged, sent or shipped. The shape follows
 * what a Shopify order would record, so the confirmation page reads like the
 * real one.
 */

export type Address = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
};

export type Order = {
  /** "KW1001": shown to the shopper. */
  number: string;
  placedAt: string;
  email: string;
  marketing: boolean;
  address: Address;
  shipping: { id: string; label: string; price: number };
  payment: string;
  lines: CartLine[];
  subtotal: number;
  savings: number;
  total: number;
  /** Cart attributes a Shopify build would record with the order. */
  attributes: { pdp_variant: "kindwear"; offers: string[] };
};

const KEY = "kindwear-orders";
const FIRST_NUMBER = 1001;

export function loadOrders(): Order[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as Order[]) : [];
    return Array.isArray(list) ? list.filter((o) => o && o.number) : [];
  } catch {
    return [];
  }
}

export function findOrder(number: string | null) {
  const all = loadOrders();
  return number ? all.find((o) => o.number === number) : all[all.length - 1];
}

/** Saves the order and returns it with its number. */
export function saveOrder(order: Omit<Order, "number" | "placedAt">): Order {
  const all = loadOrders();
  const last = all.reduce(
    (n, o) => Math.max(n, Number(o.number.replace(/\D/g, "")) || 0),
    FIRST_NUMBER - 1,
  );
  const full: Order = {
    ...order,
    number: `KW${last + 1}`,
    placedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...all, full]));
  } catch {
    // Storage blocked: the confirmation page falls back to sessionStorage.
  }
  try {
    window.sessionStorage.setItem("kindwear-last-order", JSON.stringify(full));
  } catch {
    // Nothing more to try.
  }
  return full;
}

/** The order just placed, even if localStorage is blocked. */
export function lastPlacedOrder(number: string | null): Order | undefined {
  const saved = findOrder(number);
  if (saved) return saved;
  try {
    const raw = window.sessionStorage.getItem("kindwear-last-order");
    const o = raw ? (JSON.parse(raw) as Order) : undefined;
    return o && (!number || o.number === number) ? o : undefined;
  } catch {
    return undefined;
  }
}
