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

## Journal architecture
- Keep diary filtering, book separation, chronological ordering and latest public metrics in the shared journal selectors so cards and summaries use the same classification rules.
- Render book excerpts only in the independent book section, never in the diary category feed, to keep daily reflections homogeneous.
- Shared site chrome and favorites provider wrap the root Outlet; each major section has a distinct public route for navigation and metadata.
- Favorites store journal IDs in browser storage with hydration-safe initialization; they never authorize private actions.
- Community forms use insert-only RLS tables with database validation and no visitor read access, keeping messages and subscriber emails private.
- Normalize TikTok links to allowlisted HTTPS player URLs; public readers show actual videos, while creator scripts and empty video placeholders remain creator-only.
