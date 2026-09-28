// The look DropdownMenu and ContextMenu share: panel, items, indicators, labels and separators.
// Kept in one place so the two menus cannot drift apart. Written as full class strings so Tailwind
// finds them when it scans the built output.

/** The floating panel, minus its height cap, which names each Radix menu's own CSS variable. */
export const menuContentClasses =
  "shadow-pop-wide z-(--z-popover) min-w-48 overflow-y-auto rounded-xl border border-gray-200 bg-white p-1.5 outline-none";

export const menuItemClasses = [
  "relative flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none select-none",
  "data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  "[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-gray-500",
];

/** Added to an item with `tone="danger"`. */
export const menuDangerItemClasses =
  "text-red-600 data-[highlighted]:bg-red-50 data-[highlighted]:text-red-700 [&>svg]:text-red-600";

/** Checkbox and radio items leave room for their indicator at the inline start. */
export const menuIndicatorItemClasses = "ps-9";

export const menuIndicatorSlotClasses = "absolute start-3 flex size-4 items-center justify-center";

export const menuCheckClasses = "text-primary size-4";

export const menuRadioDotClasses = "bg-primary block size-2 rounded-full";

export const menuLabelClasses = "px-3 py-1.5 text-xs font-bold text-gray-500";

export const menuSeparatorClasses = "-mx-1.5 my-1.5 h-px bg-gray-100";

export const menuSubTriggerOpenClasses = "data-[state=open]:bg-gray-100";

/** The submenu chevron points toward the side the submenu opens on. */
export const menuSubChevronClasses = "ms-auto rtl:-scale-x-100";
