---
"@averoui/react": minor
---

Adds `RadioCard`, a `RadioGroup` option presented as a bordered card with a `title`, an optional `description` and an optional `aside` such as a price. It goes inside a `RadioGroup` in place of `RadioGroupItem`: the whole card chooses the option, the chosen card takes a soft blue border and tint, and arrow keys, `value` and form submission work as before. The title is the radio's accessible name and the description its accessible description.

`RadioGroupItem` is restyled onto the soft palette `Checkbox` now uses. An item is now 24px (was 20px) with a 2px `gray-300` outline that darkens to `gray-400` on hover; the chosen item is a `blue-50` tint with a `blue-200` outline and a `blue-600` dot, instead of a primary outline and dot. The dot pops in when an option is chosen, pressing shrinks the item slightly, and the focus ring sits 2px off the item. Every option's outline and focus ring now turn red while the group is `aria-invalid`, not only when the item itself is. The larger item can shift layouts that aligned text to the old 20px size. The unselected outline is below the 3:1 contrast WCAG asks of control boundaries; where that matters, `className="border-gray-500/80"` on each item restores it. Props and markup are unchanged.
