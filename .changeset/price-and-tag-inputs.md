---
"@avero/react": minor
---

Add `PriceInput` and `TagInput`. `PriceInput` accepts Latin, Persian and Arabic digits, groups the amount in the locale's digits as you type while keeping the caret in place, shows the toman unit, and reports a whole number or `null`. `TagInput` turns text into removable tags on Enter, a comma or a Persian comma, splits pasted lists, ignores duplicates that differ only in Arabic letters, joiners or case, and submits each tag through `name`. `normalizeSearchText` now lives in the shared utilities and is still exported under the same name. Also adds the `tagInputRemove` dictionary entry.
