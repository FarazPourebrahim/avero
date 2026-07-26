import { SuggestionItem } from "@avero/react";

export default function SuggestionItemDashboardDemo() {
  return (
    <div className="w-full max-w-xl space-y-3">
      <SuggestionItem
        title="طراحی سایت عمده فروش"
        href="#"
        description="طراحی فروشگاه اینترنتی با پنل مدیریت"
        tags={["remote"]}
        match={8}
      />
      <SuggestionItem
        title="توسعه اپلیکیشن موبایل"
        href="#"
        description="اپلیکیشن فروشگاهی برای اندروید و iOS"
        tags={["freelance", "remote"]}
        match={92}
      />
    </div>
  );
}
