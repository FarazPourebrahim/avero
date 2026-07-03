// Utilities
export { cn } from "./utils/cn.js";
export {
  formatDate,
  formatNumber,
  formatRelativeTime,
  toLatinDigits,
  toPersianDigits,
  type CalendarSystem,
  type DatePreset,
  type DigitSystem,
  type FormatDateOptions,
  type FormatNumberOptions,
  type FormatRelativeTimeOptions,
} from "./utils/format.js";

// Internationalisation
export {
  AveroProvider,
  resolveAveroSettings,
  useAvero,
  useAveroFormatter,
  type AveroFormatter,
  type AveroProviderProps,
  type AveroSettings,
  type TextDirection,
} from "./i18n/AveroProvider.js";
export {
  dictionaries,
  en,
  fa,
  getDictionary,
  type AveroDictionary,
  type AveroLanguage,
} from "./i18n/dictionaries.js";

// Hooks
export { useControllableState } from "./hooks/useControllableState.js";
export { mergeRefs } from "./utils/refs.js";

// Icons
export { createIcon, type IconDefinition, type IconProps } from "./icons/createIcon.js";
export * from "./icons/referenceIcons.generated.js";

// Primitives
export * from "./components/avatar/index.js";
export * from "./components/badge/index.js";
export * from "./components/button/index.js";
export * from "./components/chip/index.js";
export * from "./components/divider/index.js";
export * from "./components/icon-button/index.js";
export * from "./components/icon-tile/index.js";
export * from "./components/image/index.js";
export * from "./components/link/index.js";
export * from "./components/progress/index.js";
export * from "./components/typography/index.js";
export * from "./components/visually-hidden/index.js";

// Navigation
export * from "./components/accordion/index.js";
export * from "./components/back-link/index.js";
export * from "./components/table-of-contents/index.js";
export * from "./components/pill-tabs/index.js";
export * from "./components/segmented-control/index.js";
export * from "./components/sidebar-nav/index.js";
export * from "./components/toggle-chip-group/index.js";
