import { SectionHeader } from "@averoui/react";
import { Target } from "lucide-react";

export default function SectionHeaderVariantsDemo() {
  return (
    <div className="flex w-full flex-col gap-8 rounded-3xl bg-white p-6">
      <SectionHeader
        variant="accentBar"
        as="h3"
        title="داستان ما"
        subtitle="چطور از یک پرسش ساده به یک مدرسه آنلاین رسیدیم ✨"
      />
      <SectionHeader variant="dot" as="h3" title="درباره من" />
      <SectionHeader variant="icon" as="h3" title="چرا دوره‌های ما متفاوت‌اند؟" icon={<Target />} />
      <SectionHeader title="دوره‌های مرتبط" as="h3" />
    </div>
  );
}
