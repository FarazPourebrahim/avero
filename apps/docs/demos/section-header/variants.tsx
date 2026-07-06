import { SectionHeader } from "@avero/react";
import { Target } from "lucide-react";

export default function SectionHeaderVariantsDemo() {
  return (
    <div className="flex w-full flex-col gap-8 rounded-3xl bg-white p-6">
      <SectionHeader
        variant="accentBar"
        as="h3"
        title="داستان شکل‌گیری دورلنسر"
        subtitle="روایت یک تصمیم برای تحول فضای دورکاری ✨"
      />
      <SectionHeader variant="dot" as="h3" title="درباره من" />
      <SectionHeader
        variant="icon"
        as="h3"
        title="چرا دورلنسر انتخابی متفاوت است؟"
        icon={<Target />}
      />
      <SectionHeader title="پروژه‌های مرتبط" as="h3" />
    </div>
  );
}
