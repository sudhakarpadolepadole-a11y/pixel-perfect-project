import { useSyncExternalStore } from "react";
import { productById } from "@/data/products";

export type CartLine = { productId: string; unit: number; qty: number };
type State = { cart: CartLine[]; wishlist: string[]; dark: boolean; cartOpen: boolean; aiOpen: boolean };

const KEY = "freshdash-store";
let state: State = { cart: [], wishlist: [], dark: false, cartOpen: false, aiOpen: false };
const subs = new Set<() => void>();
let hydrated = false;

function emit() {
  if (typeof window !== "undefined") {
    const { cart, wishlist, dark } = state;
    localStorage.setItem(KEY, JSON.stringify({ cart, wishlist, dark }));
    document.documentElement.classList.toggle("dark", state.dark);
  }
  subs.forEach((f) => f());
}

export function hydrateStore() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved) state = { ...state, ...saved };
    else state = { ...state, dark: matchMedia("(prefers-color-scheme: dark)").matches };
  } catch {}
  emit();
}

const set = (patch: Partial<State> | ((s: State) => Partial<State>)) => {
  state = { ...state, ...(typeof patch === "function" ? patch(state) : patch) };
  emit();
};

const server: State = { cart: [], wishlist: [], dark: false, cartOpen: false, aiOpen: false };
export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(
    (cb) => (subs.add(cb), () => subs.delete(cb)),
    () => sel(state),
    () => sel(server),
  );
}

export const actions = {
  setQty(productId: string, qty: number, unit = 0) {
    set((s) => {
      const rest = s.cart.filter((l) => !(l.productId === productId && l.unit === unit));
      return { cart: qty > 0 ? [...rest, { productId, unit, qty }].sort((a, b) => a.productId.localeCompare(b.productId)) : rest };
    });
  },
  addMany(ids: string[]) {
    ids.forEach((id) => {
      const cur = state.cart.find((l) => l.productId === id && l.unit === 0)?.qty ?? 0;
      actions.setQty(id, cur + 1);
    });
  },
  clear: () => set({ cart: [] }),
  toggleWish: (id: string) =>
    set((s) => ({ wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id] })),
  toggleDark: () => set((s) => ({ dark: !s.dark })),
  openCart: (v: boolean) => set({ cartOpen: v }),
  openAi: (v: boolean) => set({ aiOpen: v }),
};

export const qtyOf = (cart: CartLine[], id: string, unit = 0) =>
  cart.find((l) => l.productId === id && l.unit === unit)?.qty ?? 0;

export function cartTotals(cart: CartLine[]) {
  let items = 0, total = 0, mrp = 0;
  for (const l of cart) {
    const p = productById(l.productId);
    if (!p) continue;
    const u = p.units[l.unit] ?? p.units[0];
    items += l.qty; total += u.price * l.qty; mrp += u.mrp * l.qty;
  }
  return { items, total, mrp, saved: mrp - total };
}
