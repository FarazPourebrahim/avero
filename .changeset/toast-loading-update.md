---
"@averoui/react": minor
---

`Toast` gains a `loading` tone and in-place updates. A `loading` toast shows a spinner in the brand colour, stays open until it is updated or dismissed, and is announced politely. `useToast()` now also returns `update(id, options)`, which changes a toast's tone, message, action or duration where it stands (omitted options keep their values, except `duration`, which falls back to the new tone's default), and `promise(pending, { loading, success, error })`, which shows a `loading` toast and turns it into `success` or `danger` when the promise settles, returning the same promise. An updated toast is announced again and its timer starts over. `ToastTone` includes `loading`, and `ToastPromiseOptions` and `ToastPromiseStage` are exported.
