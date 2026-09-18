# @avero/font

## 1.0.0

### Major Changes

- Avero 1.0.0 — the first public release.

  A bidirectional React component library for products that speak Persian (RTL) and English (LTR),
  built on Radix UI primitives and styled with Tailwind CSS v4 design tokens. Persian is the default:
  right-to-left layout, Persian digits and Jalali dates through `Intl` alone, with no date library in
  the core. English works from the same code, because every component uses logical CSS properties and
  direction-aware keyboard handling.

  The release covers the primitives, the form controls, navigation and disclosure, overlays and
  feedback, the data-display family, 25 composed blocks and the site, dashboard, article, listing,
  detail and profile layout shells, plus optional Recharts and Tiptap packages.

  Behaviour comes from Radix, so focus management, keyboard support and ARIA semantics are not
  reimplemented; every component test runs axe and a browser suite runs axe over every story in both
  directions. Colours, radii, shadows, motion and type come from `@avero/tokens`, so a theme is a set
  of CSS custom properties rather than a fork.
