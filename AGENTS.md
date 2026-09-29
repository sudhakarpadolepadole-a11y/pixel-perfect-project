<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Architecture rules
- All simulated AI/API logic lives in `src/services/` — so a real backend can replace it without touching components.
- Client state (cart, wishlist, theme) is one tiny store in `src/lib/store.ts`, persisted to localStorage — per the brief, no heavy state libs.
- Product visuals use emoji on pastel tiles from `src/data/` — they never break like remote images.
