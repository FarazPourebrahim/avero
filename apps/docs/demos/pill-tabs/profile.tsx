import { PillTab, PillTabs } from "@avero/react";
import { Award, BookOpen, FileText, MessageSquare } from "lucide-react";

export default function PillTabsProfileDemo() {
  return (
    <PillTabs aria-label="بخش‌های پروفایل">
      <PillTab href="#about" current icon={<FileText />}>
        درباره من
      </PillTab>
      <PillTab href="#courses" icon={<BookOpen />}>
        دوره‌ها (3)
      </PillTab>
      <PillTab href="#certificates" icon={<Award />}>
        گواهی‌ها (2)
      </PillTab>
      <PillTab href="#comments" icon={<MessageSquare />}>
        دیدگاه‌ها (0)
      </PillTab>
    </PillTabs>
  );
}
