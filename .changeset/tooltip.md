---
"@avero/react": minor
---

Add `Tooltip` and `TooltipProvider`. `Tooltip` shows a short description when its trigger is hovered or focused, linked to the trigger with `aria-describedby`, and closes on `Escape`. It opens on the `--z-popover` layer as a dark rounded panel with an optional arrow, follows the `AveroProvider` direction, and works without a provider; wrap a group of tooltips in `TooltipProvider` to share the open delay.
