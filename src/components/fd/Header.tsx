import { Leaf, MapPin, Moon, Search, ShoppingCart, Sparkles, Sun } from "lucide-react";
import { demoUser } from "@/data/users";
import { trendingSearches } from "@/data/synonyms";
import { actions, cartTotals, useStore } from "@/lib/store";
import { useEffect, useState } from "react";

export function Header({ query, onQuery }: { query: string; onQuery: (q: string) => void }) {
  const cart = useStore((s) => s.cart);
  const dark = useStore((s) => s.dark);
  const { items, total } = cartTotals(cart);
  const [ph, setPh] = useState(0);
  useEffect(() => { const t = setInterval(() => setPh((i) => (i + 1) % trendingSearches.length), 2500); return () => clearInterval(t); }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <a href="/" className="flex shrink-0 items-center gap-1.5 transition hover:-translate-y-0.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-primary-foreground"><Leaf className="h-5 w-5" /></span>
          <span className="hidden font-display text-xl font-extrabold sm:block">Fresh<span className="text-brand">Dash</span></span>
        </a>
        <div className="hidden min-w-0 shrink-0 md:block">
          <div className="font-display text-sm font-extrabold">Delivery in 9 mins</div>
          <div className="flex items-center gap-1 truncate text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{demoUser.address.line.slice(0, 28)}…</div>
        </div>
        <label className="ai-border flex min-w-0 flex-1 items-center gap-2 rounded-xl bg-muted px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input value={query} onChange={(e) => onQuery(e.target.value)} placeholder={`Search "${trendingSearches[ph]}"`} className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          <Sparkles className="h-4 w-4 shrink-0 text-ai" />
        </label>
        <button aria-label="Toggle theme" onClick={actions.toggleDark} className="press shrink-0 rounded-xl p-2 hover:bg-muted">{dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</button>
        <button id="cart-button" onClick={() => actions.openCart(true)} className="press flex shrink-0 items-center gap-2 rounded-xl bg-brand px-3 py-2.5 text-sm font-bold text-primary-foreground hover:bg-brand-dark">
          <ShoppingCart className="h-4 w-4" />
          {items ? <span className="tabular leading-none">{items} · ₹{total}</span> : <span className="hidden sm:inline">Cart</span>}
        </button>
      </div>
    </header>
  );
}
