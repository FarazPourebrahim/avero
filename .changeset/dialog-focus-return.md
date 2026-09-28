---
"@averoui/react": patch
---

`Dialog`, `Drawer` and `ConfirmDialog` return focus to whatever opened them when they close, even without a `DialogTrigger`, `DrawerTrigger` or `trigger`. Radix only refocuses its own trigger, so a dialog opened from code or from a menu used to drop focus to `<body>`. When the opener was a `DropdownMenu` or `ContextMenu` item, which is gone by the time the dialog closes, focus goes to the menu's trigger or area instead. Your own `onCloseAutoFocus` runs first, and calling `event.preventDefault()` there still opts out. `Lightbox` uses the same handling.
