---
"@avero/react": patch
---

Data display components keep long unbroken text, such as URLs, emails or long names, inside their box instead of overflowing it: `StatCard`, `MiniStat`, `InfoRow`, `HighlightPanel`, `MetaItem`, `KeyValueRow`, `ContactMethod`, `CardTitle`, `FeatureCard`, `ActionTile`, `SectionHeader`, `CoverHeader`, `CapacityMeter` and `Blockquote` now wrap it. Section header and `HighlightPanel` actions no longer shrink. `MatchScore` shows `0%` instead of `NaN%` for a value that isn't a finite number.
