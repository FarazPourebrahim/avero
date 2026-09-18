---
"@avero/react": minor
---

Adds the three primitives the inventory had left as backlog.

`Spinner` is a busy indicator in a `ring` and a `glow` variant, five sizes and four tones. It is
decorative by default, because the common case sits inside a control that already reports itself
busy; `labelled` turns it into a named `role="status"` for the cases where it is the only sign of
progress.

`Skeleton` is a placeholder in `shimmer`, `pulse` and static animations and four shapes, with
`SkeletonText` and `SkeletonCard` presets. Skeletons are `aria-hidden`, so the loading state is
announced once by the region that owns it rather than once per placeholder bar.

`AvatarGroup` overlaps `Avatar` children towards the reading direction with a logical margin, and
collapses anything past `max` into a counted tile whose digits and label follow the active locale.

Also adds the `avatarGroupOverflow` and `busy` dictionary entries in `fa` and `en`.
