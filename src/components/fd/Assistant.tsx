import { useRef, useState, useEffect } from "react";
import { Send, Sparkles, X } from "lucide-react";
import { askAssistant, type AiReply } from "@/services/ai";
import { actions, useStore } from "@/lib/store";
import { toast } from "sonner";

type Msg = { role: "user" | "ai"; text: string; reply?: AiReply };
const starters = ["Paneer Butter Masala", "Plan my breakfast", "Party snacks", "Reorder my usuals"];

export function Assistant() {
  const open = useStore((s) => s.aiOpen);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "ai", text: "Hi Siddhi 👋 I'm Dash, your AI grocery buddy. Tell me a recipe or a craving and I'll fill your cart." }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, typing]);

  async function send(text: string) {
    if (!text.trim() || typing) return;
    setMsgs((m) => [...m, { role: "user", text }]); setInput(""); setTyping(true);
    const reply = await askAssistant(text);
    setTyping(false);
    setMsgs((m) => [...m, { role: "ai", text: reply.text, reply }]);
  }

  return (
    <>
      <button onClick={() => actions.openAi(!open)} aria-label="AI assistant" className="press fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-ai px-4 py-3 font-bold text-primary-foreground shadow-xl">
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}<span className="hidden sm:inline">{open ? "Close" : "Ask Dash"}</span>
      </button>
      {open && (
        <div className="animate-fade-up fixed bottom-20 right-3 z-40 flex h-[min(560px,75vh)] w-[min(380px,calc(100vw-24px))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          <div className="bg-ai flex items-center gap-2 p-3 font-display font-bold text-primary-foreground"><Sparkles className="h-4 w-4" /> Dash AI</div>
          <div className="flex-1 space-y-3 overflow-y-auto p-3">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-brand text-primary-foreground" : "bg-muted"}`}>{m.text}</div>
                {m.reply?.products && m.reply.products.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    {m.reply.products.map((p) => (
                      <div key={p.id} className="flex items-center gap-2 rounded-xl border border-border p-2 text-xs">
                        <span className="grid h-8 w-8 place-items-center rounded-lg text-lg" style={{ background: p.tint }}>{p.emoji}</span>
                        <span className="min-w-0 flex-1 truncate font-semibold">{p.name}</span>
                        <span className="tabular font-bold">₹{p.units[0].price}</span>
                      </div>
                    ))}
                    <button onClick={() => { actions.addMany(m.reply!.products!.map((p) => p.id)); toast.success(`Added ${m.reply!.products!.length} items to cart`); }} className="press w-full rounded-xl bg-brand py-2 text-xs font-bold text-primary-foreground">Add all to cart</button>
                  </div>
                )}
              </div>
            ))}
            {typing && <div className="flex w-14 gap-1 rounded-2xl bg-muted px-3 py-3">{[0, 1, 2].map((d) => <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${d * 120}ms` }} />)}</div>}
            <div ref={end} />
          </div>
          <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-3 pb-2">
            {starters.map((s) => <button key={s} onClick={() => send(s)} className="ai-border shrink-0 rounded-full px-3 py-1 text-xs font-semibold">{s}</button>)}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-border p-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Try “butter chicken”" className="min-w-0 flex-1 rounded-xl bg-muted px-3 text-sm outline-none" />
            <button aria-label="Send" className="press rounded-xl bg-brand p-2.5 text-primary-foreground"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      )}
    </>
  );
}
