---
"@averoui/react": patch
---

`Checkbox` now responds like the primary `Button`: a checked or mixed box darkens to `primary-hover` on hover, the focus ring sits 2px off the box, and state changes animate over 200ms. The ring turns red while the checkbox is `aria-invalid`, matching the other form controls, and the tick and dash are drawn with a heavier stroke so they stay crisp at 14px. Props and markup are unchanged.
