---
"@avero/react": minor
---

Add `Popover` (with `PopoverTrigger`, `PopoverAnchor`, `PopoverContent` and `PopoverClose`) and `DropdownMenu` (with content, items with a `danger` tone, checkbox and radio items, labels, separators and submenus). Both open on the `--z-popover` layer with the pop shadow, and their `align` values follow the reading direction: `PopoverContent` passes the `AveroProvider` direction to the portalled panel, and menu submenus open toward the reading direction.
