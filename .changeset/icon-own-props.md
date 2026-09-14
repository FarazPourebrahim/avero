---
"@avero/react": minor
---

`createIcon` now names the props it adds as `IconOwnProps`, matching every other component, so the
documentation generates the icon props table from the source instead of expanding all 434 inherited
SVG attributes. `IconProps` is unchanged. `FeatureCard`, `SectionHeader`, `KeyValueRow`,
`ContactMethod`, the stat components, `ToastOptions` and `AveroProvider` gained the prop
descriptions they were missing.
