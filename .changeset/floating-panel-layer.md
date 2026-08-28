---
"@avero/react": patch
---

`Select`, `Combobox` and `DatePicker` open their floating panels on the `--z-popover` layer instead of `--z-dropdown`, so they appear above a `Drawer` or `Dialog` they are used in rather than behind it.
