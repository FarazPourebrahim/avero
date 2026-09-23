---
"@averoui/react": minor
---

The text-entry controls move onto the soft palette `Checkbox`, `RadioGroup` and `Switch` use. `Input` and `Textarea` (`outline`), `PriceInput`, `Select`, `Combobox`, `DatePicker` and `TagInput` now share one treatment: a 2px `gray-300` outline on white that darkens to `gray-400` on hover, and on focus a `blue-400` outline with a soft `blue-100` halo instead of the `blue-500` border and ring. Invalid controls keep a red outline with a `red-100` halo. The thicker outline makes each control 2px taller. The `soft` and `slate` variants of `Input` and `Textarea` join it: they keep their grounds, 16px corners and padding, but take a 2px outline (`gray-200` and `slate-200`, darker on hover) and the same `blue-400` focus outline and halo instead of the indigo ring, and `soft` turns white while focused. The compact `filter` variant is unchanged.

`OtpInput` follows the same palette: empty boxes have a 2px `gray-300` outline, filled boxes turn to a `blue-50` tint with a `blue-200` outline and `blue-700` digits that pop in as they are typed, and the box awaiting the next digit shows the focus halo with a blue caret. Each box now carries `data-filled` once it holds a digit.

`FieldError` renders as a soft red note, `red-700` text on `red-50` led by the alert icon, instead of bare red text.

The resting outline is below the 3:1 contrast WCAG asks of control boundaries, the same deliberate choice as the other controls; `className="border-gray-500/80"` (`slotClassName` on `OtpInput`) restores it where strict AA matters.
