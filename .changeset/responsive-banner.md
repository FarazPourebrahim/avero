---
"@avero/react": minor
---

Add `ResponsiveBanner`, a banner with separate mobile and desktop artwork. It renders a `<picture>` whose source switches at the `sm`, `md` (default) or `lg` breakpoint, so the browser downloads only the artwork it shows, with no JavaScript. It accepts the `Image` options, including `radius`, `aspect` and a `fallback` for artwork that fails to load.
