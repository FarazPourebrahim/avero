---
"@averoui/tokens": minor
"@averoui/react": minor
---

**Breaking (rendered output):** brand accents now follow `--color-primary` instead of Tailwind's `blue-*`. If you relied on them staying blue under a custom primary, pass `tone="blue"` where a component offers it, or add the old `blue-*` classes through `className`.

`@averoui/tokens` adds four tokens derived from the primary at runtime, so overriding `--color-primary` alone rebrands every tint and border:

- `--color-primary-soft`: `color-mix(in oklab, var(--color-primary) 8%, white)`
- `--color-primary-soft-hover`: 15%
- `--color-primary-border`: 25%
- `--color-primary-border-hover`: 40%

They sit in the plain `@theme` block, not `@theme inline`, so the `var()` stays live in the browser and a consumer's override reaches them.

`@averoui/react` moves every brand tint, border, focus halo and selected state onto them: the checked, chosen and on states of `Checkbox`, `CheckboxCard`, `RadioGroup`, `RadioCard`, `Switch` and `SwitchCard`; highlighted and checked options in `Select` and `Combobox`; the range and hover days of `DatePicker`; `FileInput`'s drop state; `TagInput`'s remove button; the `filter` focus of `Input`; the current `PillTabs` tab; `SectionHeader`'s dot; the `StatStrip` accent bars; the `Chip` skill and tag hover; the `Meta` pill hover; the `IconButton` `social` and `slate` hovers; the `CategoryLinks`, `ReactionBar` and `ShowcaseCard` accents; and `CoverHeader`'s default cover, now a `primary` → `primary-hover` gradient. With the default theme these move from Tailwind's `blue-600` to Avero's `#0a66c2`, a slightly deeper blue; every brand pairing in the contrast report measures the same or better.

Named hues keep their hue: `tone="blue"` stays blue whatever the brand is, and the `info` tone of `Alert` and `Toast` stays blue because it means information. A `primary` tone follows the brand instead. `Button` and `IconButton` gain a `soft` `primary` tone and `Badge` an `overlay` `primary` tone, and `primary` is now the default tone of `IconTile`, `ActionTile`, `FeatureCard`, `StatCard`, `StatTile` and `InfoRow` (it was `blue`), with its own tint, muted, tint and gradient values instead of sharing `blue`'s.
