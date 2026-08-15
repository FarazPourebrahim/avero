---
"@avero/react": patch
---

`ActivityHeatmap`: weekday row headers now carry the full weekday name as visually hidden text instead of an `aria-label`, so the rows whose short label is hidden still have header content. The accessible names and the rendered look are unchanged.
