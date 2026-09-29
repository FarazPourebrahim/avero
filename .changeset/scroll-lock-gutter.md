---
"@averoui/tokens": patch
"@averoui/react": patch
---

Opening a `Select`, `Dialog`, `Drawer`, `DropdownMenu` or any other overlay that locks scrolling no longer shifts a page that has no scrollbar. `base.css` kept the scrollbar's space during the lock on every page, so on one that never had a scrollbar — a short page, or an app whose shell scrolls inside itself — a gutter appeared from nowhere, pushing the content aside and leaving an empty strip at the edge, on systems with classic scrollbars such as Windows. `AveroProvider` now marks `<html>` with `data-avero-scrollbar="visible"` or `"none"`, and the gutter is only kept when the page had a scrollbar. Pages that do scroll still don't move. Without an `AveroProvider` the attribute is absent and the gutter is kept as before, so render the provider at the root to get the fix.
