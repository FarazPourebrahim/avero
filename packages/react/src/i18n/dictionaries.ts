/**
 * Built-in user-facing strings. Components never hardcode copy: they read it from the active
 * dictionary, and every entry can be overridden through `AveroProvider` or per-component props.
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
  /** Accessible name of a save control. */
  save: string;
  /** Accessible name of a view count. */
  views: string;
  /** Accessible name of a like control. */
  like: string;
  /** Accessible name of a share control. */
  share: string;
  /** Overlay call to action on a showcase card. */
  viewDetails: string;
  /** Label above a base price. */
  basePrice: string;
  /** Dashboard greeting. `{name}` is replaced with the person's name. */
  greeting: string;
  /** Line under the dashboard greeting. */
  welcomeMessage: string;
  /** Title of a filter panel. */
  filters: string;
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
  /** Label before a row of social links on a profile. */
  socialNetworks: string;
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
  /** Message shown when no combobox option matches the typed text. */
  comboboxEmpty: string;
  /** Main line of a file drop area. */
  fileInputTitle: string;
  /** Hint under a file drop area. `{size}` is replaced with the largest allowed file size. */
  fileInputMaxSize: string;
  /** Error for a file of a type the input does not accept. `{name}` is replaced. */
  fileInputRejectedType: string;
  /** Error for a file over the size limit. `{name}` and `{size}` are replaced. */
  fileInputRejectedSize: string;
  /** Error when more files are chosen than allowed. `{count}` is replaced with the limit. */
  fileInputRejectedCount: string;
  /** Accessible name of a chosen file's remove button. `{name}` is replaced. */
  fileInputRemove: string;
  /** Accessible name of a tag's remove button. `{tag}` is replaced. */
  tagInputRemove: string;
  /** Accessible name of the button that opens a date picker's calendar. */
  datePickerOpen: string;
  /** Accessible name of the calendar popup. */
  datePickerCalendar: string;
  /** Calendar button that shows the previous month. */
  datePickerPreviousMonth: string;
  /** Calendar button that shows the next month. */
  datePickerNextMonth: string;
  /** Placeholder showing the typed date format. */
  datePickerFormat: string;
  /** Name of a date range's first input. */
  datePickerFrom: string;
  /** Name of a date range's second input. */
  datePickerTo: string;
  /** Accessible name of a pagination navigation. */
  paginationLabel: string;
  /** Accessible name of a page link. `{page}` is replaced with the page number. */
  paginationPage: string;
  /** Button that loads the next batch of items when automatic loading isn't available. */
  loadMore: string;
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
  tocTitle: "فهرست مطالب",
  goToSlide: "اسلاید {index}",
  ofTotal: "{value} از {max}",
  matchLabel: "تطابق",
  zoomHint: "نمایش بزرگ‌تر",
  rating: "امتیاز {value}",
  view: "مشاهده",
  capacityFull: "ظرفیت تکمیل شد",
  save: "ذخیره",
  views: "بازدید",
  like: "پسندیدن",
  share: "اشتراک‌گذاری",
  viewDetails: "مشاهده جزئیات",
  basePrice: "قیمت پایه",
  greeting: "سلام {name} 👋",
  welcomeMessage: "خوش آمدید",
  filters: "فیلترها",
  report: "گزارش مشکل",
  reportTitle: "گزارش محتوای نامناسب",
  reportDescription: "برای بررسی به تیم پشتیبانی ارسال می‌شود",
  shareLabel: "اشتراک‌گذاری:",
  shareCopy: "کپی لینک",
  shareTelegram: "تلگرام",
  shareWhatsapp: "واتس‌اپ",
  shareLinkedin: "لینکدین",
  shareX: "ایکس",
  comments: "دیدگاه‌ها",
  commentLabel: "دیدگاه شما",
  commentPlaceholder: "دیدگاه خود را بنویسید…",
  submitComment: "ارسال دیدگاه",
  commentsEmpty: "هنوز دیدگاهی ثبت نشده است. نخستین دیدگاه را شما بنویسید.",
  socialNetworks: "شبکه‌های اجتماعی:",
  serviceProvider: "ارائه‌دهنده",
  viewProfile: "مشاهده پروفایل",
  editorLabel: "ویرایشگر متن",
  editorPlaceholder: "متن خود را بنویسید…",
  chartDataTable: "جدول داده‌های نمودار",
  chartCategory: "دسته",
  comboboxEmpty: "موردی یافت نشد",
  fileInputTitle: "فایل را اینجا رها کنید یا برای انتخاب کلیک کنید",
  fileInputMaxSize: "حداکثر حجم هر فایل: {size}",
  fileInputRejectedType: "نوع فایل «{name}» مجاز نیست.",
  fileInputRejectedSize: "حجم «{name}» بیشتر از {size} است.",
  fileInputRejectedCount: "حداکثر {count} فایل می‌توانید انتخاب کنید.",
  fileInputRemove: "حذف {name}",
  tagInputRemove: "حذف {tag}",
  datePickerOpen: "باز کردن تقویم",
  datePickerCalendar: "تقویم",
  datePickerPreviousMonth: "ماه قبل",
  datePickerNextMonth: "ماه بعد",
  datePickerFormat: "سال/ماه/روز",
  datePickerFrom: "از تاریخ",
  datePickerTo: "تا تاریخ",
  paginationLabel: "صفحه‌بندی",
  paginationPage: "صفحه {page}",
  loadMore: "نمایش موارد بیشتر",
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
  capacityFull: "Fully booked",
  save: "Save",
  views: "Views",
  like: "Like",
  share: "Share",
  viewDetails: "View details",
  basePrice: "Base price",
  greeting: "Hello {name} 👋",
  welcomeMessage: "Welcome back",
  filters: "Filters",
  report: "Report a problem",
  reportTitle: "Report inappropriate content",
  reportDescription: "Sent to the support team for review",
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
  commentsEmpty: "No comments yet. Start the conversation.",
  socialNetworks: "Social networks:",
  serviceProvider: "Provider",
  viewProfile: "View profile",
  editorLabel: "Rich text editor",
  editorPlaceholder: "Write your text…",
  chartDataTable: "Chart data table",
  chartCategory: "Category",
  comboboxEmpty: "No matches found",
  fileInputTitle: "Drop a file here or click to browse",
  fileInputMaxSize: "Up to {size} per file",
  fileInputRejectedType: "“{name}” isn't an accepted file type.",
  fileInputRejectedSize: "“{name}” is larger than {size}.",
  fileInputRejectedCount: "You can choose up to {count} files.",
  fileInputRemove: "Remove {name}",
  tagInputRemove: "Remove {tag}",
  datePickerOpen: "Open calendar",
  datePickerCalendar: "Calendar",
  datePickerPreviousMonth: "Previous month",
  datePickerNextMonth: "Next month",
  datePickerFormat: "yyyy/mm/dd",
  datePickerFrom: "Start date",
  datePickerTo: "End date",
  paginationLabel: "Pagination",
  paginationPage: "Page {page}",
  loadMore: "Load more",
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
