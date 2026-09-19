# @averoui/font

## 1.0.2

### Patch Changes

- db4caeb: Stop Lahzeh from claiming the ASCII digits. Every `@font-face` now excludes `U+0030–U+0039`, so `0`–`9` fall through to the next family in `--font-sans` and render as Latin numerals, while Persian digits (`U+06F0–U+06F9`) keep coming from Lahzeh.

  The font carries no Latin digit outlines at all: `U+0030–U+0039` are composite glyphs that draw the Persian numerals, and the `lnum`, `tnum`, `onum` and `pnum` variants resolve to those same outlines shifted sideways. No `font-feature-settings` could reach a Latin digit, so any English text set in Lahzeh — a version number, a code sample, a measurement — rendered its digits in Persian.

  This changes rendered output, which Avero's versioning policy normally treats as breaking. It ships as a patch deliberately: it repairs a defect rather than revising a design decision, and no theme or class could have opted out of it. If you relied on ASCII digits rendering as Persian numerals, emit the Persian code points instead — `formatNumber` already does this for a Persian locale.

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
  directions. Colours, radii, shadows, motion and type come from `@averoui/tokens`, so a theme is a set
  of CSS custom properties rather than a fork.
