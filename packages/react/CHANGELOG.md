# @averoui/react

## 2.0.0

### Major Changes

- 0e0c063: **Breaking:** `NativeSelect` is removed. Use `Select` instead.

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

## 1.0.1

### Patch Changes

- 049bbd1: Publish the type declarations through a top-level `types` field as well as the `exports` map. TypeScript only reads `exports` under `moduleResolution: "bundler"`, `"node16"` or `"nodenext"`; a project still on the legacy `"node"` setting — which is also what an editor assumes for a file with no tsconfig — ignored it, found no `main` or `types` to fall back to, and typed every import as `any`, so no props were suggested and no mistake was reported. Those projects now get the component prop types.

  `moduleResolution: "bundler"` is still the setting to be on: under the legacy one, prop types that come from `class-variance-authority` (`variant`, `tone`, `size`, `radius`) stay `any`, because that package reaches its own types only through its `exports` map.

- Updated dependencies [049bbd1]
  - @averoui/tokens@1.0.1

## 1.0.0

### Major Changes

- Avero 1.0.0 — the first public release.

  A bidirectional React component library for products that speak Persian (RTL) and English (LTR),
  built on Radix UI primitives and styled with Tailwind CSS v4 design tokens. Persian is the default:
  right-to-left layout, Persian digits and Jalali dates through `Intl` alone, with no date library in
  the core. English works from the same code, because every component uses logical CSS properties and
  direction-aware keyboard handling.

  The release covers the primitives, the form controls, navigation and disclosure, overlays and
  feedback, the data-display family, 25 composed blocks and the site, dashboard, article, listing,
  detail and profile layout shells, plus optional Recharts and Tiptap packages.

  Behaviour comes from Radix, so focus management, keyboard support and ARIA semantics are not
  reimplemented; every component test runs axe and a browser suite runs axe over every story in both
  directions. Colours, radii, shadows, motion and type come from `@averoui/tokens`, so a theme is a set
  of CSS custom properties rather than a fork.

### Minor Changes

- b44e7af: Adds `Spinner`, a busy indicator in a `ring` and a `glow` variant, five sizes and four tones; it is decorative by default, because the common case sits inside a control that already reports itself busy, and `labelled` turns it into a named `role="status"`. Adds `Skeleton` in `shimmer`, `pulse` and static animations and four shapes, with `SkeletonText` and `SkeletonCard` presets; skeletons are `aria-hidden`, so the loading state is announced once by the region that owns it. Adds `AvatarGroup`, which overlaps `Avatar` children towards the reading direction with a logical margin and collapses anything past `max` into a counted tile whose digits and label follow the active locale. Also adds the `avatarGroupOverflow` and `busy` dictionary entries.
- b921f6e: Add `Alert`, a message panel in `info`, `success`, `warning`, `danger` and `neutral` tones. The `tinted` variant fills the panel with the tone and the `bordered` variant is white with an accent bar at the inline start. It takes a title, an icon that defaults to the tone's, actions and an optional dictionary-labelled dismiss button, and becomes a live region with `role="alert"`. Also adds the `InfoIcon`, `CircleCheckIcon` and `CircleAlertIcon` glyphs.
- 9e2430a: `Button`: add the `danger` variant, a solid red button for destructive actions whose white label on `red-600` meets WCAG AA (4.87:1).
- 53edd1a: Add `Checkbox` (with an indeterminate state), `RadioGroup` with `RadioGroupItem`, and `Switch`, built on Radix. They submit with native forms, plug into `Field`, follow the `AveroProvider` direction, and their resting borders meet the 3:1 contrast required for form controls.
- b482fd4: Add `Combobox`, a searchable single select on Radix Popover. Options can be grouped under category headings, and matching ignores the differences between Arabic and Persian letters, zero-width non-joiners and digit systems. It follows the WAI-ARIA combobox pattern, works with `Field`, and submits its value through `name`. Also adds the `comboboxEmpty` dictionary entry and the `normalizeSearchText` helper.
- 82ad692: Add `DatePicker`, a Solar Hijri–first date field with `single` and `range` modes. Values are `YYYY-MM-DD` strings; dates can be typed year first in Persian, Arabic or Latin digits, or picked from a calendar that follows the WAI-ARIA date picker dialog pattern with direction-aware arrow keys. It supports `min`, `max` and `isDateDisabled`, follows the `AveroProvider` calendar and digits, and converts between calendars with `Intl` only. Also adds `CalendarIcon` and the `datePicker*` dictionary entries.
- f7544ee: Add `Dialog` (with `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogBody`, `DialogFooter` and `DialogClose`) and `ConfirmDialog`. `Dialog` is a modal panel over a blurred scrim in three sizes, with a dictionary-labelled close button. `ConfirmDialog` is built on Radix AlertDialog: focus starts on cancel, a `danger` tone uses the new danger button, and an async `onConfirm` keeps the dialog open and busy until it settles. Also adds the `confirm` and `cancel` dictionary entries.
- fd6969c: `@averoui/editor`: add `EditorToolbar`, formatting buttons for `RichTextEditor`: bold, italic, underline, strikethrough, heading and subheading, quote, code block, bulleted and numbered lists, undo and redo. It follows the WAI-ARIA toolbar pattern with one tab stop and arrow keys that follow the reading direction, shows active formatting with `aria-pressed`, and disables itself while there is no editor or the editor is read-only. `@averoui/react`: add the `editorToolbar`, `editorBold`, `editorItalic`, `editorUnderline`, `editorStrike`, `editorHeading`, `editorSubheading`, `editorBulletList`, `editorOrderedList`, `editorBlockquote`, `editorCodeBlock`, `editorUndo` and `editorRedo` dictionary entries.
- 07ca132: Add `Field`, with `FieldLabel`, `FieldControl`, `FieldDescription` and `FieldError`. It wires the control's `id`, `aria-describedby`, `aria-invalid`, `aria-required` and `disabled` from one place, and works with any control, including react-hook-form's `register`.
- 17d55b8: Add `FileInput`, a drop area with a file list. Files can be dragged in, clicked in or picked from the keyboard; `accept`, `maxSize` and `maxFiles` reject what doesn't fit and report it through `onReject` and a dictionary message. The chosen files submit with a form through `name`. Also adds `formatFileSize`, the `UploadIcon` and `FileIcon` glyphs, and the `fileInput*` dictionary entries.
- fd50244: `createIcon` now names the props it adds as `IconOwnProps`, matching every other component, so the
  documentation generates the icon props table from the source instead of expanding all 434 inherited
  SVG attributes. `IconProps` is unchanged. `FeatureCard`, `SectionHeader`, `KeyValueRow`,
  `ContactMethod`, the stat components, `ToastOptions` and `AveroProvider` gained the prop
  descriptions they were missing.
- dcf0cb9: Add `Lightbox`, a full-screen image viewer over a dark scrim, built on Radix Dialog. It pages through `images` with previous and next buttons, arrow keys that follow the reading direction, and `Home`/`End`; shows a counter in the locale's digits and an optional caption; and zooms the image from a toggle button or a click. Focus is trapped while it is open and returns to what opened it. The open state and the index can each be controlled. Also adds the `lightboxLabel` dictionary entry.
- 331ecb5: Add `OtpInput`, a one-time code field built on a single real input with `autocomplete="one-time-code"`. It accepts Persian and Arabic digits, cleans pasted codes, calls `onComplete` once the code is full, keeps its boxes left to right on RTL pages and shows the locale's digits.
- 39c4ce7: `Table` and `AccordionLink` now name the props they add as `TableOwnProps` and
  `AccordionLinkOwnProps`, matching every other component, so the documentation generates their props
  tables from the source instead of listing them by hand. `TableProps` and `AccordionLinkProps` are
  unchanged.
- 761b74a: Add `Pagination` and `InfiniteScroll`. `Pagination` shows the first and last pages with a window around the current one, renders pages as links (`getHref`, with `rel="prev"`/`"next"`) or buttons (`onPageChange`), marks the current page with `aria-current="page"`, and uses the locale's digits and reading direction; `paginationRange` exposes the same page list. `InfiniteScroll` calls `onLoadMore` when a sentinel after its content scrolls into view, pauses while `loading`, stops when `hasMore` is false, announces loading in a status region, and falls back to a load more button without `IntersectionObserver`. Also adds the `paginationLabel`, `paginationPage` and `loadMore` dictionary entries.
- 195eb7b: Add `Popover` (with `PopoverTrigger`, `PopoverAnchor`, `PopoverContent` and `PopoverClose`) and `DropdownMenu` (with content, items with a `danger` tone, checkbox and radio items, labels, separators and submenus). Both open on the `--z-popover` layer with the pop shadow, and their `align` values follow the reading direction: `PopoverContent` passes the `AveroProvider` direction to the portalled panel, and menu submenus open toward the reading direction.
- 359a424: Add `PriceInput` and `TagInput`. `PriceInput` accepts Latin, Persian and Arabic digits, groups the amount in the locale's digits as you type while keeping the caret in place, shows the toman unit, and reports a whole number or `null`. `TagInput` turns text into removable tags on Enter, a comma or a Persian comma, splits pasted lists, ignores duplicates that differ only in Arabic letters, joiners or case, and submits each tag through `name`. `normalizeSearchText` now lives in the shared utilities and is still exported under the same name. Also adds the `tagInputRemove` dictionary entry.
- 1b6724d: Add `ResponsiveBanner`, a banner with separate mobile and desktop artwork. It renders a `<picture>` whose source switches at the `sm`, `md` (default) or `lg` breakpoint, so the browser downloads only the artwork it shows, with no JavaScript. It accepts the `Image` options, including `radius`, `aspect` and a `fallback` for artwork that fails to load.
- fb4cf08: Add `ToastProvider` and `useToast`. `toast()` shows a message in `info`, `success`, `warning` or `danger` tone with an optional action, and returns an id for `dismiss()`. Toasts stack at the bottom of the viewport, full width up to 480px and in a column at the inline end above that, keep at most `limit` open, and show a progress bar that pauses while the toast is hovered or focused. Built on Radix Toast: swipe to dismiss toward the inline end, `F8` focuses the region, and `danger` toasts are announced assertively. Also adds the `toastRegion` and `toastLabel` dictionary entries.
- 9ab5791: Add `Tooltip` and `TooltipProvider`. `Tooltip` shows a short description when its trigger is hovered or focused, linked to the trigger with `aria-describedby`, and closes on `Escape`. It opens on the `--z-popover` layer as a dark rounded panel with an optional arrow, follows the `AveroProvider` direction, and works without a provider; wrap a group of tooltips in `TooltipProvider` to share the open delay.

### Patch Changes

- 2ae572f: Data display components keep long unbroken text, such as URLs, emails or long names, inside their box instead of overflowing it: `StatCard`, `MiniStat`, `InfoRow`, `HighlightPanel`, `MetaItem`, `KeyValueRow`, `ContactMethod`, `CardTitle`, `FeatureCard`, `ActionTile`, `SectionHeader`, `CoverHeader`, `CapacityMeter` and `Blockquote` now wrap it. Section header and `HighlightPanel` actions no longer shrink. `MatchScore` shows `0%` instead of `NaN%` for a value that isn't a finite number.
- 76dcb4c: `DatePicker`: the calendar now opens aligned with the field's inline end on right-to-left pages whose `<html>` has `dir="rtl"`. It passes the provider's direction to the popup and uses a logical `align`, instead of swapping the alignment by hand, which floating-ui mirrored a second time.
- 26fa419: `Select`, `Combobox` and `DatePicker` open their floating panels on the `--z-popover` layer instead of `--z-dropdown`, so they appear above a `Drawer` or `Dialog` they are used in rather than behind it.
- 30c298d: `ActivityHeatmap`: weekday row headers now carry the full weekday name as visually hidden text instead of an `aria-label`, so the rows whose short label is hidden still have header content. The accessible names and the rendered look are unchanged.
- f0b1606: The idle segments of `SegmentedControl` and the resting reaction pills in `ReactionBar` now use
  `gray-600` rather than `gray-500` on their `gray-100` track, raising that pairing from 4.39:1 to
  6.87:1 so it meets WCAG AA for small text. One fewer pairing fails in the contrast report.
- ebdc948: Adds a total-library size budget and per-component budgets spanning the size range, alongside the
  existing `cn` budget. No runtime changes.
- 2bcd63b: Adds StrictMode double-mount cleanup tests covering `Carousel`, `InfiniteScroll`,
  `TableOfContents`, `Dialog` and `Drawer`, and sanitizer tests for `data:` URLs, CSS
  `expression()` and case- and entity-obfuscated script schemes. No runtime behaviour changes.
- Updated dependencies
- Updated dependencies [eccfcdf]
  - @averoui/tokens@1.0.0
