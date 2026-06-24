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

// Icons
export { createIcon, type IconDefinition, type IconProps } from "./icons/createIcon.js";
export * from "./icons/referenceIcons.generated.js";
