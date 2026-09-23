---
"@averoui/react": minor
"@averoui/tokens": minor
---

Adds `CheckboxCard`, a checkbox presented as a bordered option with a `title`, an optional `description` and an optional `aside` such as a price. The whole card toggles the checkbox, and it takes a primary border and tint while checked. It accepts every `Checkbox` prop and forwards its ref to the checkbox, so it works in forms, with `Controller` and inside `FieldControl` like `Checkbox` does; the title is the checkbox's accessible name and the description its accessible description.

`Checkbox` is refreshed to match the primary `Button`: the box has softer `rounded-lg` corners and a hairline shadow while unchecked, a checked or mixed box darkens to `primary-hover` on hover, pressing shrinks it slightly, the focus ring sits 2px off the box and turns red while `aria-invalid`, and state changes take 200ms. Checking pops the box and draws the tick in; `base.css` settles both at once under reduced motion. The tick and dash use a heavier stroke. Props and markup are unchanged.

`@averoui/tokens` adds the two animations behind it: `--animate-check-pop` and `--animate-check-draw`.
