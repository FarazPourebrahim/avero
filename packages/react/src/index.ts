// Utilities
export { cn } from "./utils/cn.js";
export { richContentAllowList, sanitizeHtml } from "./utils/sanitize.js";
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
  formatMessage,
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

// Data display
export * from "./components/action-tile/index.js";
export * from "./components/activity-heatmap/index.js";
export * from "./components/capacity-meter/index.js";
export * from "./components/card/index.js";
export * from "./components/cover-header/index.js";
export * from "./components/feature-card/index.js";
export * from "./components/glow-orbs/index.js";
export * from "./components/list/index.js";
export * from "./components/match-score/index.js";
export * from "./components/meta/index.js";
export * from "./components/price-tag/index.js";
export * from "./components/rating/index.js";
export * from "./components/rich-content/index.js";
export * from "./components/section-header/index.js";
export * from "./components/stat/index.js";
export * from "./components/table/index.js";
export * from "./components/zoom-frame/index.js";

// Layout
export * from "./components/container/index.js";
export * from "./components/dashboard-shell/index.js";
export * from "./components/layouts/index.js";
export * from "./components/site-shell/index.js";
export * from "./components/site-footer/index.js";
export * from "./components/site-header/index.js";

// Overlays and feedback
export * from "./components/disabled-overlay/index.js";
export * from "./components/drawer/index.js";
export * from "./components/empty-state/index.js";

// Forms
export * from "./components/form-actions/index.js";
export * from "./components/input/index.js";
export * from "./components/native-select/index.js";
export * from "./components/select/index.js";
export * from "./components/textarea/index.js";

// Navigation
export * from "./components/accordion/index.js";
export * from "./components/back-link/index.js";
export * from "./components/carousel/index.js";
export * from "./components/table-of-contents/index.js";
export * from "./components/pill-tabs/index.js";
export * from "./components/segmented-control/index.js";
export * from "./components/sidebar-nav/index.js";
export * from "./components/toggle-chip-group/index.js";
