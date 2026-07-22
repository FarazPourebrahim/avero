/**
 * Built-in user-facing strings. Components never hardcode copy: they read it from the active
 * dictionary, and every entry can be overridden through `AveroProvider` or per-component props.
 * Persian strings are taken verbatim from the reference site.
 */
export type AveroDictionary = {
  back: string;
  close: string;
  loading: string;
  openMenu: string;
  closeMenu: string;
  previous: string;
  next: string;
  currencyToman: string;
  pricePrefixFrom: string;
  heatmapLess: string;
  heatmapMore: string;
  /** Skip link at the top of a page shell. */
  skipToContent: string;
  /** Accessible name of the activity heatmap grid. */
  heatmapLabel: string;
  /** Label of one heatmap day. `{count}` and `{date}` are replaced. */
  heatmapCell: string;
  tocTitle: string;
  /** Accessible label of a carousel pagination dot. `{index}` is replaced with the slide number. */
  goToSlide: string;
  /** "{value} of {max}", e.g. for capacity counts. */
  ofTotal: string;
  /** Caption under a match percentage. */
  matchLabel: string;
  /** Hint shown when hovering a zoomable image. */
  zoomHint: string;
  /** Accessible label of a rating. `{value}` is replaced with the score. */
  rating: string;
  /** Accessible name of a like control. */
  like: string;
  /** Accessible name of a share control. */
  share: string;
  /** Overlay call to action on a portfolio card. */
  viewDetails: string;
  /** Accessible name of the rich text editing surface. */
  editorLabel: string;
  /** Placeholder shown in an empty rich text editor. */
  editorPlaceholder: string;
  /** Caption of a chart's hidden data table, used when the chart has no `label`. */
  chartDataTable: string;
  /** Header of a chart data table's first column, holding the x value of each row. */
  chartCategory: string;
};

export type AveroLanguage = "fa" | "en";

export const fa: AveroDictionary = {
  back: "بازگشت",
  close: "بستن",
  loading: "در حال بارگذاری",
  openMenu: "باز کردن منو",
  closeMenu: "بستن منو",
  previous: "قبلی",
  next: "بعدی",
  currencyToman: "تومان",
  pricePrefixFrom: "از",
  heatmapLess: "کمتر",
  heatmapMore: "بیشتر",
  skipToContent: "رفتن به محتوای اصلی",
  heatmapLabel: "نقشه فعالیت",
  heatmapCell: "{count} فعالیت در {date}",
  tocTitle: "در این مقاله",
  goToSlide: "اسلاید {index}",
  ofTotal: "{value} از {max}",
  matchLabel: "تطابق",
  zoomHint: "مشاهده بزرگ‌نمایی",
  rating: "امتیاز {value}",
  like: "پسندیدن",
  share: "اشتراک‌گذاری",
  viewDetails: "مشاهده جزئیات کامل",
  editorLabel: "ویرایشگر متن",
  editorPlaceholder: "متن خود را بنویسید…",
  chartDataTable: "جدول داده‌های نمودار",
  chartCategory: "دسته",
};

export const en: AveroDictionary = {
  back: "Back",
  close: "Close",
  loading: "Loading",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  previous: "Previous",
  next: "Next",
  currencyToman: "Toman",
  pricePrefixFrom: "From",
  heatmapLess: "Less",
  heatmapMore: "More",
  skipToContent: "Skip to content",
  heatmapLabel: "Activity map",
  heatmapCell: "{count} activities on {date}",
  tocTitle: "On this page",
  goToSlide: "Go to slide {index}",
  ofTotal: "{value} of {max}",
  matchLabel: "Match",
  zoomHint: "View larger",
  rating: "Rating {value}",
  like: "Like",
  share: "Share",
  viewDetails: "View full details",
  editorLabel: "Rich text editor",
  editorPlaceholder: "Write your text…",
  chartDataTable: "Chart data table",
  chartCategory: "Category",
};

export const dictionaries: Record<AveroLanguage, AveroDictionary> = { fa, en };

/** Replaces `{name}` placeholders in a dictionary string, e.g. `formatMessage("اسلاید {index}", { index: 2 })`. */
export function formatMessage(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    name in values ? String(values[name]) : placeholder,
  );
}

/** Returns the built-in dictionary for a locale tag, falling back to English for unknown languages. */
export function getDictionary(locale: string): AveroDictionary {
  const language = locale.toLowerCase().split("-")[0];
  return language === "fa" ? fa : en;
}
