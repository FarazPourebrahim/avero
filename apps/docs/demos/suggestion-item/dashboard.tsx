import { SuggestionItem } from "@averoui/react";

export default function SuggestionItemDashboardDemo() {
  return (
    <div className="w-full max-w-xl space-y-3">
      <SuggestionItem
        title="مبانی تحلیل داده"
        href="#"
        description="کار با داده‌های واقعی و رسم نمودار در Python"
        tags={["آنلاین"]}
        match={8}
      />
      <SuggestionItem
        title="طراحی سیستم طراحی در Figma"
        href="#"
        description="ساختن کتابخانه کامپوننت و توکن‌های طراحی"
        tags={["پیشرفته", "آنلاین"]}
        match={92}
      />
    </div>
  );
}
