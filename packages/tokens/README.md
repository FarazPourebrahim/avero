# @avero/tokens

The design tokens behind [Avero](https://github.com/FarazPourebrahim/avero): colour, typography,
spacing, radius, elevation, motion and z-index, as Tailwind CSS v4 `@theme` variables.

A theme is a set of CSS custom properties, not a fork — redefining a token restyles every component
that uses it.

## Install

```bash
pnpm add @avero/tokens
```

Tailwind CSS v4.3+ is a peer dependency.

## Stylesheets

Import in this order; only `theme.css` is required.

| Import                           | Contributes                                             | When                           |
| -------------------------------- | ------------------------------------------------------- | ------------------------------ |
| `@avero/tokens/theme.css`        | Every token, plus keyframes                             | Always                         |
| `@avero/tokens/base.css`         | Document defaults, reduced motion, scroll-lock gutter   | Apps built on Avero end to end |
| `@avero/tokens/utilities.css`    | Scrollbars, shimmer, glow ring, typing caret, gradients | When you use them              |
| `@avero/tokens/rich-content.css` | Prose styles for `RichContent` and the editor           | With either of those           |

```css
@import "tailwindcss";
@import "@avero/tokens/theme.css";
```

## Overriding

Add your own `@theme` block after the import; later declarations win.

```css
@theme {
  --color-primary: #7c3aed;
  --color-primary-hover: #5b21b6;
}
```

## Token data

The same tokens are published as typed data and as DTCG JSON, generated from `theme.css` so they
cannot drift.

```ts
import { tokens } from "@avero/tokens";

tokens.colorPrimary.cssVar; // "--color-primary"
tokens.colorPrimary.value; // "#0a66c2"
```

Use it where a value must reach JavaScript rather than CSS — charting libraries that take colours
as props, for instance. `@avero/tokens/tokens.json` is the DTCG form, for design tools.

## Licence

MIT.
