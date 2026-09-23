---
"@averoui/react": minor
---

Adds `SwitchCard`, a setting presented as a bordered row with a `title` and an optional `description` at the inline start and the switch at the inline end. The whole card toggles the switch and takes a soft blue border and tint while on. It accepts every `Switch` prop and forwards its ref to the switch, so it works in forms and inside `FieldControl` like `Switch` does; the title is the switch's accessible name and the description its accessible description.

`Switch` is restyled onto the soft palette `Checkbox` and `RadioGroup` now use. The track keeps its 44×24 size but is now white with a 2px `gray-300` outline and a 16px `gray-400` thumb while off (was a solid `gray-500` track with a white 20px thumb), and a `blue-50` tint with a `blue-200` outline and a `blue-600` thumb once on (was a solid primary track). Pressing shrinks it slightly, the focus ring sits 2px off the track, and an `aria-invalid` switch now shows a red outline and focus ring instead of a red ring. The off outline and thumb are below the 3:1 contrast WCAG asks of controls; where that matters, `className="border-gray-500/80"` restores the outline. Props and markup are unchanged.
