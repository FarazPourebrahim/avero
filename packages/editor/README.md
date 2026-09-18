# @avero/editor

A [Tiptap](https://tiptap.dev) rich-text editor for
[Avero](https://github.com/FarazPourebrahim/avero), sharing the prose styles that `RichContent`
renders with. A separate package so the core library never pulls in the editor.

## Install

```bash
pnpm add @avero/editor @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extensions @tiptap/extension-table @tiptap/extension-image
```

The Tiptap packages are peer dependencies.

```tsx
import { EditorToolbar, RichTextEditor } from "@avero/editor";
```

Import the prose stylesheet once:

```css
@import "@avero/tokens/rich-content.css";
```

## Notes

- The toolbar is one tab stop with direction-aware arrow keys, `aria-pressed` toggles and a
  disabled state while read-only.
- **What the editor produces round-trips through `sanitizeHtml` without losing formatting** — every
  tag it can emit is in Avero's allow list, and a test proves it. Sanitize on write as well as on
  render.

## Licence

MIT.
