import { PillTab, PillTabs } from "@avero/react";
import { Briefcase, FileText, MessageSquare, Sparkles } from "lucide-react";

export default function PillTabsProfileDemo() {
  return (
    <PillTabs aria-label="بخش‌های پروفایل">
      <PillTab href="#about" current icon={<FileText />}>
        درباره من
      </PillTab>
      <PillTab href="#service" icon={<Briefcase />}>
        خدمات (1)
      </PillTab>
      <PillTab href="#portfolio" icon={<Sparkles />}>
        نمونه کار (4)
      </PillTab>
      <PillTab href="#comments" icon={<MessageSquare />}>
        نظرات (0)
      </PillTab>
    </PillTabs>
  );
}
