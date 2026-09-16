---
"@avero/react": patch
---

The idle segments of `SegmentedControl` and the resting reaction pills in `ReactionBar` now use
`gray-600` rather than `gray-500` on their `gray-100` track, raising that pairing from 4.39:1 to
6.87:1 so it meets WCAG AA for small text. One fewer pairing fails in the contrast report.
