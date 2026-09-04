---
"@avero/react": minor
---

Add `ToastProvider` and `useToast`. `toast()` shows a message in `info`, `success`, `warning` or `danger` tone with an optional action, and returns an id for `dismiss()`. Toasts stack at the bottom of the viewport, full width up to 480px and in a column at the inline end above that, keep at most `limit` open, and show a progress bar that pauses while the toast is hovered or focused. Built on Radix Toast: swipe to dismiss toward the inline end, `F8` focuses the region, and `danger` toasts are announced assertively. Also adds the `toastRegion` and `toastLabel` dictionary entries.
