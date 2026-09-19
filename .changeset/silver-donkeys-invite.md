---
"@averoui/react": major
---

**Breaking:** `NativeSelect` is removed. Use `Select` instead.

`Select` is now the only select Avero ships, so every filter and form gets one trigger style, one listbox and one keyboard contract. `NativeSelectProps` is gone with it.

```tsx
// Before
<NativeSelect aria-label="مرتب‌سازی" defaultValue="newest">
  <option value="newest">جدیدترین</option>
  <option value="oldest">قدیمی‌ترین</option>
</NativeSelect>

// After
<Select defaultValue="newest">
  <SelectTrigger aria-label="مرتب‌سازی">
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="newest">جدیدترین</SelectItem>
    <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
  </SelectContent>
</Select>
```

Two differences to plan for, because `Select` is a Radix component rather than a `<select>` element:

- **It is a client component.** `NativeSelect` carried no `"use client"` directive and rendered inside a React Server Component without a client boundary. `Select` cannot. A server-rendered form that needs a select now needs a client boundary around it.
- **It joins react-hook-form through `Controller`, not `register`.** The trigger is a button, so there is no native value to register. Wrap it in `Controller` and pass `field.value` to `value` and `field.onChange` to `onValueChange`.

Inside a `Field`, put `FieldControl` around the trigger rather than around the whole select, so the generated id and `aria-describedby` land on the element that carries the combobox role:

```tsx
<Field>
  <FieldLabel>شهر</FieldLabel>
  <Select>
    <FieldControl>
      <SelectTrigger>
        <SelectValue placeholder="انتخاب شهر" />
      </SelectTrigger>
    </FieldControl>
    <SelectContent>…</SelectContent>
  </Select>
</Field>
```
