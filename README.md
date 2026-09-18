# Avero

Avero is a React component library for products that speak **Persian (RTL)** and **English (LTR)**.
It is built on [Radix UI](https://www.radix-ui.com) primitives and styled with Tailwind CSS v4 design
tokens, so every component works in both directions from the same code.

- **Bidirectional by default.** Logical spacing and alignment throughout, direction-aware
  keyboard navigation, and icons that flip where they should.
- **Persian-ready.** Jalali dates, Persian digits and separators, the Lahzeh typeface, and `fa` and
  `en` dictionaries for every built-in string.
- **Accessible.** Radix behaviour for interactive components, axe checks in every component test,
  and screen-reader-friendly charts and rich content.
- **Token-driven.** Colours, radii, shadows and type come from `@averoui/tokens`, so a theme is a set
  of CSS variables rather than a fork.

## Packages

| Package           | Contents                                                         |
| ----------------- | ---------------------------------------------------------------- |
| `@averoui/react`  | Components, page blocks, layouts, hooks and formatting utilities |
| `@averoui/tokens` | Tailwind v4 `@theme` tokens, base styles and prose styles        |
| `@averoui/font`   | Lahzeh `@font-face` declarations and font files                  |
| `@averoui/charts` | Recharts wrappers (optional)                                     |
| `@averoui/editor` | Tiptap rich-text editor sharing the prose styles (optional)      |
| `@averoui/config` | Shared TypeScript and ESLint configuration                       |

## Usage

Add the tokens to your Tailwind CSS entry stylesheet:

```css
@import "tailwindcss";
@import "@averoui/tokens/theme.css";
@import "@averoui/font/lahzeh.css";
```

Wrap the app in `AveroProvider`. The locale decides the direction, digits and calendar: `fa-IR`
(the default) renders right-to-left with Jalali dates, and `en-US` renders left-to-right.

```tsx
import { AveroProvider, Button } from "@averoui/react";

export function App() {
  return (
    <AveroProvider locale="fa-IR">
      <Button>ثبت‌نام</Button>
    </AveroProvider>
  );
}
```

## Development

This is a pnpm workspace; use pnpm only.

```bash
pnpm install
pnpm storybook-dev     # component workbench
pnpm packages-build    # build the packages (needed before the docs site)
pnpm docs-dev          # documentation site
pnpm lint && pnpm typecheck && pnpm test
```

Project rules live in [`docs/avero-conventions.md`](docs/avero-conventions.md), open debts in
[`docs/known-debts.md`](docs/known-debts.md) and the release security checklist in
[`docs/SECURITY.md`](docs/SECURITY.md).
