import { Heart, Minus, Plus, Star, Clock } from "lucide-react";
import { discountPct, type Product } from "@/data/products";
import { actions, qtyOf, useStore } from "@/lib/store";

function flyToCart(from: HTMLElement, emoji: string) {
  const target = document.getElementById("cart-button");
  if (!target) return;
  const a = from.getBoundingClientRect(), b = target.getBoundingClientRect();
  const el = document.createElement("div");
  el.textContent = emoji;
  el.style.cssText = `position:fixed;left:${a.left + a.width / 2 - 16}px;top:${a.top}px;font-size:32px;z-index:100;pointer-events:none;transition:transform .7s cubic-bezier(.5,-.3,.7,1),opacity .7s`;
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.transform = `translate(${b.left - a.left - a.width / 2 + 16}px,${b.top - a.top}px) scale(.3)`;
    el.style.opacity = "0.4";
  });
  setTimeout(() => el.remove(), 720);
}

export function QtyStepper({ product, compact }: { product: Product; compact?: boolean }) {
  const qty = useStore((s) => qtyOf(s.cart, product.id));
  const out = product.stock === 0;
  if (qty === 0)
    return (
      <button
        disabled={out}
        onClick={(e) => { actions.setQty(product.id, 1); flyToCart(e.currentTarget, product.emoji); }}
        className={`press rounded-xl border-2 border-brand bg-brand-soft font-bold text-brand transition hover:bg-brand hover:text-primary-foreground disabled:opacity-40 ${compact ? "px-3 py-1 text-xs" : "px-5 py-1.5 text-sm"}`}
      >
        {out ? "Sold out" : "ADD"}
      </button>
    );
  return (
    <div className={`flex items-center rounded-xl bg-brand font-bold text-primary-foreground animate-pop ${compact ? "text-xs" : "text-sm"}`}>
      <button aria-label="Remove one" className="p-1.5" onClick={() => actions.setQty(product.id, qty - 1)}><Minus className="h-3.5 w-3.5" /></button>
      <span className="tabular min-w-5 text-center">{qty}</span>
      <button aria-label="Add one" className="p-1.5" disabled={qty >= product.stock} onClick={() => actions.setQty(product.id, qty + 1)}><Plus className="h-3.5 w-3.5" /></button>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const u = product.units[0];
  const off = discountPct(u);
  const wished = useStore((s) => s.wishlist.includes(product.id));
  return (
    <div className="lift group relative flex flex-col rounded-2xl border border-border bg-card p-3 shadow-sm">
      <div className="relative grid aspect-square place-items-center rounded-xl text-6xl" style={{ background: product.tint }}>
        <span className="transition group-hover:scale-110">{product.emoji}</span>
        {off > 0 && <span className="absolute left-2 top-2 rounded-md bg-berry px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">{off}% OFF</span>}
        <button aria-label="Wishlist" onClick={() => actions.toggleWish(product.id)} className="absolute right-2 top-2 rounded-full bg-card/80 p-1.5">
          <Heart className={`h-4 w-4 ${wished ? "fill-berry text-berry" : "text-muted-foreground"}`} />
        </button>
      </div>
      <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
        <Clock className="h-3 w-3" /> {product.deliveryMins} MINS
        {product.stock > 0 && product.stock <= 5 && <span className="ml-auto text-hot">Only {product.stock} left</span>}
      </div>
      <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold leading-tight">{product.name}</h3>
      <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
        {u.label} · <Star className="h-3 w-3 fill-accent text-accent" /> {product.rating}
      </div>
      <div className="mt-auto flex items-end justify-between pt-2">
        <div className="tabular leading-tight">
          <div className="font-display text-base font-extrabold">₹{u.price}</div>
          {u.mrp > u.price && <div className="text-xs text-muted-foreground line-through">₹{u.mrp}</div>}
        </div>
        <QtyStepper product={product} />
      </div>
    </div>
  );
}
