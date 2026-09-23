---
"@averoui/react": minor
---

**Breaking:** `Input`, `Textarea` and `PriceInput` have a new default look. To keep the previous one, pass the old default explicitly:

```tsx
<Input variant="filter" />
<PriceInput variant="filter" />
<Textarea variant="soft" />
```

The new default, `outline`, is the treatment `Select`, `Combobox`, `DatePicker` and `TagInput` already use: 12px corners, a gray-300 border, a white ground, `py-2.5` and the blue focus ring, turning red while `aria-invalid`. A form that mixes these controls now reads as one family instead of three. `filter`, `soft` and `slate` are unchanged and still available.

`Field` is restyled to match: `FieldLabel` is `font-semibold` in `gray-800`, and `FieldError` is `font-medium` and led by a decorative alert icon, so an error is recognisable without relying on colour. The error's message is wrapped in a `<span>` next to the icon; its accessible text is unchanged.
