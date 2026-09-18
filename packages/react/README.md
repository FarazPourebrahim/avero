# @averoui/react

Bidirectional React components for products that speak **Persian (RTL)** and **English (LTR)**,
built on [Radix UI](https://www.radix-ui.com) primitives and styled with Tailwind CSS v4 tokens.
Every component works in both directions from the same code.

📖 **[Documentation](https://github.com/FarazPourebrahim/avero)** · Components, blocks, layout
shells, hooks, formatting utilities and icons.

## Install

```bash
pnpm add @averoui/react @averoui/tokens lucide-react
```

`react`, `react-dom` (>= 18.2) and `lucide-react` are peer dependencies. Tailwind CSS v4 is
required — the design tokens are a Tailwind `@theme` block.

## Set up

```css title="app.css"
@import "tailwindcss";
@import "@averoui/tokens/theme.css";
@import "@averoui/tokens/base.css";
@import "@averoui/tokens/utilities.css";

/* Avero ships compiled JS; Tailwind must scan it for the classes it uses. */
@source "../node_modules/@averoui/react/dist";
```

That `@source` line is the step that is easiest to miss: without it components render with
structure but no styling.

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

`AveroProvider` supplies direction, locale, digits, calendar and the built-in strings. The default
locale is `fa-IR` — right-to-left, Persian digits, Jalali dates. Pass `locale="en-US"` for English.

## What's in it

- **Primitives** — Button, IconButton, Link, Badge, Chip, Avatar, IconTile, Progress, Image.
- **Forms** — Field, Input, Textarea, Select, Combobox, Checkbox, Radio, Switch, FileInput,
  PriceInput, TagInput, a Jalali DatePicker and OtpInput.
- **Navigation** — SidebarNav, PillTabs, SegmentedControl, TableOfContents, Accordion, Carousel,
  Pagination, InfiniteScroll.
- **Overlays** — Drawer, Dialog, ConfirmDialog, Popover, DropdownMenu, Tooltip, Toast, Lightbox,
  EmptyState, Alert.
- **Data display** — Card, the stat family, Table, RichContent (always sanitized), PriceTag,
  Rating, ActivityHeatmap and more.
- **Blocks and layout shells** — 25 composed blocks and the site, dashboard, article, listing,
  detail and profile layouts.

## Notes

- **Accessible.** Behaviour comes from Radix, every component test runs axe, and a Playwright suite
  runs axe over every story in both directions.
- **Tree-shakable.** Per-file ES modules with `sideEffects: false`. Importing one primitive pulls in
  about a kilobyte of its own code on top of the shared class-merge utility.
- **No business logic.** No data fetching, routing, storage or network calls. Components never
  navigate on their own.

## Licence

MIT. Bundled brand icons keep their own licences, recorded in `THIRD_PARTY_NOTICES.md`.
