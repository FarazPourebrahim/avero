---
"@avero/react": patch
---

`DatePicker`: the calendar now opens aligned with the field's inline end on right-to-left pages whose `<html>` has `dir="rtl"`. It passes the provider's direction to the popup and uses a logical `align`, instead of swapping the alignment by hand, which floating-ui mirrored a second time.
