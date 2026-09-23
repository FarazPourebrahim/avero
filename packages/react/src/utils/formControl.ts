// The soft treatment every text-entry control shares: Input, Textarea, PriceInput, Select, Combobox,
// DatePicker and TagInput. Kept in one place so the family cannot drift apart again. Written as full
// class strings so Tailwind finds them when it scans the built output.

/** Resting box: a 2px light outline on white that darkens on hover. */
export const formControlSurface =
  "rounded-xl border-2 border-gray-300 bg-white transition-all duration-300 hover:border-gray-400";

/**
 * Focus on the control itself: a blue outline with a soft halo. `blue-400` rather than a paler blue
 * keeps the focused field easy to find with a keyboard.
 */
export const formControlFocus =
  "focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none";

/** The same focus for a wrapper around the real input, such as `DatePicker` or `TagInput`. */
export const formControlFocusWithin =
  "focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100";

/** Invalid state for a control that carries `aria-invalid` itself. */
export const formControlAriaInvalid =
  "aria-invalid:border-red-500 aria-invalid:hover:border-red-500 aria-invalid:focus:border-red-500 aria-invalid:focus:ring-red-100";

/** Invalid state for a wrapper whose component knows it is invalid. */
export const formControlInvalidWithin =
  "border-red-500 hover:border-red-500 focus-within:border-red-500 focus-within:ring-red-100";
