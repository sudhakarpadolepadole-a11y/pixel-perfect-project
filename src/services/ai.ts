/**
 * Simulated AI layer. Everything here is local logic + fake latency so a real
 * backend can be swapped in later without touching components.
 */
import { products, type Product } from "@/data/products";
import { synonyms } from "@/data/synonyms";
import { recipes, productsByNames, type Recipe } from "@/data/recipes";
import { demoUser } from "@/data/users";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function smartSearch(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = new Set([q, ...(synonyms[q] ?? [])]);
  const under = q.match(/under\s*₹?\s*(\d+)/);
  const max = under ? Number(under[1]) : Infinity;
  const clean = q.replace(/under\s*₹?\s*\d+/, "").trim();
  if (clean) terms.add(clean);
  return products
    .map((p) => {
      const hay = `${p.name} ${p.brand} ${p.subCategory} ${p.category} ${p.tags.join(" ")}`.toLowerCase();
      let score = 0;
      terms.forEach((t) => t && hay.includes(t) && (score += p.name.toLowerCase().includes(t) ? 3 : 1));
      if (!clean && under) score = 1;
      return { p, score };
    })
    .filter((x) => x.score > 0 && x.p.units[0].price <= max)
    .sort((a, b) => b.score - a.score || b.p.rating - a.p.rating)
    .map((x) => x.p)
    .slice(0, 12);
}

export const recommended = () => productsByNames(demoUser.history);

export type AiReply = { text: string; products?: Product[]; recipe?: Recipe };

export async function askAssistant(message: string): Promise<AiReply> {
  await wait(700 + Math.random() * 600);
  const m = message.toLowerCase();
  const recipe = recipes.find((r) => m.includes(r.name.toLowerCase()) || r.name.toLowerCase().split(" ").some((w) => w.length > 4 && m.includes(w)));
  if (recipe) {
    return { text: `Here's everything for ${recipe.name} ${recipe.emoji} (serves ${recipe.serves}, ~${recipe.minutes} mins). Add it all in one tap!`, products: productsByNames(recipe.ingredients), recipe };
  }
  if (/breakfast/.test(m)) return { text: "A quick, filling breakfast basket ☀️", products: productsByNames(["Toned Milk", "Farm Eggs", "Brown Bread", "Banana Robusta", "Amul Butter"]) };
  if (/party|snack/.test(m)) return { text: "Party mode on 🎉 Here are crowd favourites:", products: products.filter((p) => ["snacks", "beverages"].includes(p.category)).slice(0, 6) };
  if (/again|usual|reorder/.test(m)) return { text: "Your usuals, ready to reorder:", products: recommended() };
  const hits = smartSearch(message);
  if (hits.length) return { text: `I found ${hits.length} matches for you:`, products: hits.slice(0, 6) };
  return { text: "I can build a cart from a recipe (try “Paneer Butter Masala”), plan breakfast, stock a party, or reorder your usuals. What sounds good?" };
}
