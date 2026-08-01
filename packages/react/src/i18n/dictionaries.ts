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
  /** Call to action on an opportunity card. */
  view: string;
  /** Reason shown when an opportunity has no places left. */
  capacityFull: string;
  /** Accessible name of a like control. */
  like: string;
  /** Accessible name of a share control. */
  share: string;
  /** Overlay call to action on a portfolio card. */
  viewDetails: string;
  /** Name of a control that reports a violation. */
  report: string;
  /** Title of the report panel. */
  reportTitle: string;
  /** Line under the report panel's title. */
  reportDescription: string;
  /** Label before a row of share controls. */
  shareLabel: string;
  /** Name of the copy-link share control. */
  shareCopy: string;
  /** Name of the Telegram share control. */
  shareTelegram: string;
  /** Name of the WhatsApp share control. */
  shareWhatsapp: string;
  /** Name of the LinkedIn share control. */
  shareLinkedin: string;
  /** Name of the X (Twitter) share control. */
  shareX: string;
  /** Title of a comment section. */
  comments: string;
  /** Accessible name of a comment box. */
  commentLabel: string;
  /** Placeholder of a comment box. */
  commentPlaceholder: string;
  /** Submit label of a comment form. */
  submitComment: string;
  /** Message shown when nothing has been commented yet. */
  commentsEmpty: string;
  /** Label above a service provider's name. */
  serviceProvider: string;
  /** Call to action linking to a provider's profile. */
  viewProfile: string;
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
  view: "مشاهده",
  capacityFull: "تکمیل ظرفیت",
  like: "پسندیدن",
  share: "اشتراک‌گذاری",
  viewDetails: "مشاهده جزئیات کامل",
  report: "گزارش تخلف",
  reportTitle: "گزارش اشکال یا تخلف",
  reportDescription: "ارسال جهت بررسی ادمین",
  shareLabel: "اشتراک‌گذاری:",
  shareCopy: "کپی لینک",
  shareTelegram: "تلگرام",
  shareWhatsapp: "واتس‌اپ",
  shareLinkedin: "لینکدین",
  shareX: "تویتر",
  comments: "نظرات کاربران",
  commentLabel: "نظر شما",
  commentPlaceholder: "نظر خود را بنویسید...",
  submitComment: "ثبت نظر",
  commentsEmpty: "هنوز نظری ثبت نشده است. اولین نفری باشید که نظر ثبت می‌کند!",
  serviceProvider: "ارائه‌دهنده خدمت",
  viewProfile: "مشاهده پروفایل فریلنسر",
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
  view: "View",
  capacityFull: "Capacity full",
  like: "Like",
  share: "Share",
  viewDetails: "View full details",
  report: "Report abuse",
  reportTitle: "Report a problem or abuse",
  reportDescription: "Sent to an administrator for review",
  shareLabel: "Share:",
  shareCopy: "Copy link",
  shareTelegram: "Telegram",
  shareWhatsapp: "WhatsApp",
  shareLinkedin: "LinkedIn",
  shareX: "X",
  comments: "Comments",
  commentLabel: "Your comment",
  commentPlaceholder: "Write your comment…",
  submitComment: "Post comment",
  commentsEmpty: "No comments yet. Be the first to write one!",
  serviceProvider: "Service provider",
  viewProfile: "View freelancer profile",
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
