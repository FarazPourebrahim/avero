import { PillTab, PillTabs } from "@avero/react";
import { Award, BookOpen, FileText, MessageSquare, Star, Users } from "lucide-react";

const TABS = [
  { href: "#overview", label: "معرفی", icon: <FileText />, current: true },
  { href: "#sessions", label: "جلسه‌ها (۲۴)", icon: <BookOpen /> },
  { href: "#reviews", label: "دیدگاه‌ها (۱۸)", icon: <MessageSquare /> },
  { href: "#students", label: "دانشجویان (۳۱۲)", icon: <Users /> },
  { href: "#certificates", label: "گواهی‌ها", icon: <Award /> },
  { href: "#favorites", label: "علاقه‌مندی‌ها", icon: <Star /> },
];

export default function PillTabsCountsDemo() {
  return (
    <div className="w-full max-w-md">
      <PillTabs aria-label="بخش‌های دوره">
        {TABS.map((tab) => (
          <PillTab key={tab.href} href={tab.href} current={tab.current} icon={tab.icon}>
            {tab.label}
          </PillTab>
        ))}
      </PillTabs>
    </div>
  );
}
