import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { Header } from "@/components/fd/Header";
import { ProductCard } from "@/components/fd/ProductCard";
import { CartDrawer } from "@/components/fd/CartDrawer";
import { Assistant } from "@/components/fd/Assistant";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { offers } from "@/data/offers";
import { recipes, productsByNames } from "@/data/recipes";
import { actions, hydrateStore } from "@/lib/store";
import { recommended, smartSearch } from "@/services/ai";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FreshDash — Groceries in 10 minutes, powered by AI" },
      { name: "description", content: "Fresh fruits, dairy, snacks and more delivered in minutes. Smart AI search, recipe-to-cart and a shopping assistant." },
      { property: "og:title", content: "FreshDash — Groceries in 10 minutes" },
      { property: "og:description", content: "AI-powered quick grocery delivery: recipe-to-cart, smart search and personalised picks." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Row({ title, children, ai }: { title: string; children: React.ReactNode; ai?: boolean }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-extrabold">{ai && <Sparkles className="h-5 w-5 text-ai" />}{title}</h2>
      {children}
    </section>
  );
}
const Grid = ({ children }: { children: React.ReactNode }) => <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">{children}</div>;

function Home() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  useEffect(() => hydrateStore(), []);
  const results = useMemo(() => smartSearch(query), [query]);
  const catProducts = cat ? products.filter((p) => p.category === cat) : [];

  return (
    <div className="min-h-screen bg-surface pb-24">
      <Header query={query} onQuery={setQuery} />
      <div className="bg-accent py-1.5 text-center text-xs font-bold text-accent-foreground">⚡ Free delivery on orders above ₹199 · Use FRESH100 for ₹100 off</div>
      <main className="mx-auto max-w-7xl px-4">
        {query ? (
          <Row title={results.length ? `Results for “${query}”` : `No match for “${query}” — try “dahi” or “snacks under 50”`} ai>
            <Grid>{results.map((p) => <ProductCard key={p.id} product={p} />)}</Grid>
          </Row>
        ) : (
          <>
            <section className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="animate-fade-up relative overflow-hidden rounded-2xl bg-brand p-6 text-primary-foreground md:col-span-2">
                <p className="text-sm font-semibold opacity-90">Freshly picked today</p>
                <h1 className="mt-1 max-w-md font-display text-3xl font-extrabold leading-tight sm:text-4xl">Groceries at your door in 9 minutes</h1>
                <button onClick={() => actions.openAi(true)} className="press mt-4 inline-flex items-center gap-2 rounded-xl bg-card px-4 py-2 text-sm font-bold text-foreground"><Sparkles className="h-4 w-4 text-ai" /> Ask Dash what to cook</button>
                <div className="animate-bob absolute -bottom-4 right-4 text-8xl sm:text-9xl">🛵</div>
              </div>
              <div className="grid gap-3">
                {offers.slice(0, 2).map((o) => (
                  <div key={o.code} className="flex items-center gap-3 rounded-2xl bg-hot p-4 text-primary-foreground">
                    <span className="text-3xl">{o.emoji}</span>
                    <div><div className="font-display font-extrabold">{o.title}</div><div className="text-xs opacity-90">{o.subtitle} · <b>{o.code}</b></div></div>
                  </div>
                ))}
              </div>
            </section>

            <Row title="Shop by category">
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                {categories.map((c) => (
                  <button key={c.id} onClick={() => setCat(cat === c.id ? null : c.id)} className={`lift rounded-2xl p-2 text-center ${cat === c.id ? "ring-2 ring-brand" : ""}`} style={{ background: c.tint }}>
                    <div className="text-3xl">{c.emoji}</div>
                    <div className="mt-1 text-[11px] font-semibold leading-tight text-ink">{c.name}</div>
                  </button>
                ))}
              </div>
            </Row>

            {cat && <Row title={categories.find((c) => c.id === cat)!.name}><Grid>{catProducts.map((p) => <ProductCard key={p.id} product={p} />)}</Grid></Row>}

            <Row title="Buy it again" ai><Grid>{recommended().map((p) => <ProductCard key={p.id} product={p} />)}</Grid></Row>

            <Row title="Recipe to cart" ai>
              <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
                {recipes.map((r) => (
                  <div key={r.id} className="lift ai-border w-56 shrink-0 rounded-2xl bg-card p-3">
                    <div className="grid h-24 place-items-center rounded-xl text-5xl" style={{ background: r.tint }}>{r.emoji}</div>
                    <div className="mt-2 font-display font-bold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.minutes} mins · serves {r.serves} · {r.ingredients.length} items</div>
                    <button onClick={() => { const ps = productsByNames(r.ingredients); actions.addMany(ps.map((p) => p.id)); toast.success(`${ps.length} ingredients added for ${r.name}`); }} className="press mt-2 w-full rounded-xl bg-brand py-2 text-xs font-bold text-primary-foreground">Add ingredients</button>
                  </div>
                ))}
              </div>
            </Row>

            <Row title="Bestsellers"><Grid>{[...products].sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 12).map((p) => <ProductCard key={p.id} product={p} />)}</Grid></Row>
          </>
        )}
      </main>
      <CartDrawer />
      <Assistant />
    </div>
  );
}
