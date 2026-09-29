import { X, Bike } from "lucide-react";
import { toast } from "sonner";
import { productById } from "@/data/products";
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, HANDLING_FEE } from "@/data/offers";
import { actions, cartTotals, useStore } from "@/lib/store";
import { QtyStepper } from "./ProductCard";

export function CartDrawer() {
  const open = useStore((s) => s.cartOpen);
  const cart = useStore((s) => s.cart);
  const { total, saved, items } = cartTotals(cart);
  const delivery = total >= FREE_DELIVERY_THRESHOLD || !items ? 0 : DELIVERY_FEE;
  const grand = items ? total + delivery + HANDLING_FEE : 0;
  const left = FREE_DELIVERY_THRESHOLD - total;

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div onClick={() => actions.openCart(false)} className={`absolute inset-0 bg-foreground/40 transition ${open ? "opacity-100" : "opacity-0"}`} />
      <aside className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-border bg-card p-4">
          <h2 className="font-display text-lg font-extrabold">My Cart</h2>
          <button aria-label="Close cart" onClick={() => actions.openCart(false)}><X className="h-5 w-5" /></button>
        </div>
        {!items ? (
          <div className="grid flex-1 place-items-center p-8 text-center">
            <div><div className="animate-bob text-7xl">🛒</div><p className="mt-4 font-display font-bold">Your cart is empty</p><p className="text-sm text-muted-foreground">Add something fresh — it'll be here in minutes.</p></div>
          </div>
        ) : (
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <div className="flex items-center gap-2 rounded-2xl bg-card p-3 text-sm font-semibold"><Bike className="animate-scooter h-5 w-5 text-brand" /> Arriving in 9 mins</div>
            <div className="rounded-2xl bg-card p-3 text-xs font-semibold">
              {left > 0 ? <>Add <span className="text-brand">₹{left}</span> more for FREE delivery</> : <span className="text-brand">🎉 You unlocked free delivery!</span>}
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full bg-brand transition-all" style={{ width: `${Math.min(100, (total / FREE_DELIVERY_THRESHOLD) * 100)}%` }} /></div>
            </div>
            <div className="divide-y divide-border rounded-2xl bg-card">
              {cart.map((l) => {
                const p = productById(l.productId); if (!p) return null;
                const u = p.units[l.unit];
                return (
                  <div key={l.productId + l.unit} className="flex items-center gap-3 p-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-2xl" style={{ background: p.tint }}>{p.emoji}</div>
                    <div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold">{p.name}</div><div className="text-xs text-muted-foreground">{u.label}</div></div>
                    <QtyStepper product={p} compact />
                    <div className="tabular w-14 text-right text-sm font-bold">₹{u.price * l.qty}</div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-1.5 rounded-2xl bg-card p-4 text-sm tabular">
              <Row k="Items total" v={`₹${total}`} />
              <Row k="Delivery" v={delivery ? `₹${delivery}` : "FREE"} />
              <Row k="Handling" v={`₹${HANDLING_FEE}`} />
              <div className="border-t border-border pt-2"><Row k={<b>Grand total</b>} v={<b>₹{grand}</b>} /></div>
              {saved > 0 && <div className="rounded-lg bg-brand-soft p-2 text-center text-xs font-bold text-brand">You're saving ₹{saved} on this order</div>}
            </div>
          </div>
        )}
        {items > 0 && (
          <div className="border-t border-border bg-card p-4">
            <button onClick={() => { toast.success("Order placed! Arriving in 9 mins 🛵"); actions.clear(); actions.openCart(false); }} className="press flex w-full items-center justify-between rounded-xl bg-brand px-4 py-3 font-bold text-primary-foreground hover:bg-brand-dark">
              <span className="tabular">₹{grand}</span><span>Place order →</span>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
const Row = ({ k, v }: { k: React.ReactNode; v: React.ReactNode }) => <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span>{v}</span></div>;
