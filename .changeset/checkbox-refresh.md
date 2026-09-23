---
"@averoui/react": minor
"@averoui/tokens": minor
---

Adds `CheckboxCard`, a checkbox presented as a bordered option with a `title`, an optional `description` and an optional `aside` such as a price. The whole card toggles the checkbox, and it takes a soft blue border and tint while checked. It accepts every `Checkbox` prop and forwards its ref to the checkbox, so it works in forms, with `Controller` and inside `FieldControl` like `Checkbox` does; the title is the checkbox's accessible name and the description its accessible description.

`Checkbox` is restyled onto the library's soft palette. The box is now 24px (was 20px) with a 2px `gray-300` outline that darkens to `gray-400` on hover, and a checked or mixed box is a `blue-50` tint with a `blue-200` outline and a `blue-600` tick instead of a solid primary fill. Checking pops the box and draws the tick in, pressing shrinks it slightly, and the focus ring turns red while `aria-invalid`. `base.css` settles the animations at once under reduced motion. The larger box can shift layouts that aligned text to the old 20px size. The unchecked outline is below the 3:1 contrast WCAG asks of control boundaries; where that matters, `className="border-gray-500/80"` restores it. Props and markup are unchanged.

`@averoui/tokens` adds the two animations behind it: `--animate-check-pop` and `--animate-check-draw`.
