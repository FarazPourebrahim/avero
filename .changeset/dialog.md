---
"@avero/react": minor
---

Add `Dialog` (with `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogBody`, `DialogFooter` and `DialogClose`) and `ConfirmDialog`. `Dialog` is a modal panel over a blurred scrim in three sizes, with a dictionary-labelled close button. `ConfirmDialog` is built on Radix AlertDialog: focus starts on cancel, a `danger` tone uses the new danger button, and an async `onConfirm` keeps the dialog open and busy until it settles. Also adds the `confirm` and `cancel` dictionary entries.
