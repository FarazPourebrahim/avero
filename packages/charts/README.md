# @averoui/charts

[Recharts](https://recharts.org) wrappers styled with
[Avero](https://github.com/FarazPourebrahim/avero)'s chart tokens. A separate package so the core
library never pulls in a charting dependency.

## Install

```bash
pnpm add @averoui/charts recharts
```

`recharts` (>= 3) is a peer dependency, so your app owns the version and bundles one copy.

```tsx
import { AreaChart, ChartCard } from "@averoui/charts";

<ChartCard title="بازدیدها">
  <AreaChart data={data} series={[{ dataKey: "views", name: "بازدید" }]} label="بازدید ماهانه" />
</ChartCard>;
```

## What it gives you

- `ChartCard` with built-in empty and loading states (`data-state` is `ready`, `empty` or
  `loading`) and optional metric toggle chips.
- `AreaChart` and `LineChart` using the palette, grid, axis and cursor tokens.
- A styled tooltip, and `ChartDataTable` — a screen-reader-only table so a chart is not the only
  way to read the data.

Colours come from `@averoui/tokens` as generated data rather than CSS classes: Recharts takes colours
as props that become SVG attributes, where a utility class cannot reach.

Time series read left to right in both directions, so the axis is not reversed on RTL pages by
default.

## Licence

MIT.
