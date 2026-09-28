---
"@averoui/react": minor
---

Adds `ContextMenu`, a menu opened by right-clicking, long-pressing or pressing the context-menu key on an area, such as the actions on a message. It wraps Radix Context Menu with the same parts as `DropdownMenu` (`ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem` with a `danger` tone, checkbox and radio items, labels, separators, groups and submenus), reads its direction from `AveroProvider`, and opens on the `--z-popover` layer. Both menus now take their classes from one shared source, so they look identical; `DropdownMenu`'s rendered classes are unchanged.
