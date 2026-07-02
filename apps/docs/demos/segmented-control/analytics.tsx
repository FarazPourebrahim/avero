import { SegmentedControl, SegmentedControlItem } from "@avero/react";
import { Briefcase, Eye, Zap } from "lucide-react";

export default function SegmentedControlAnalyticsDemo() {
  return (
    <SegmentedControl aria-label="نوع آنالیتیکس" defaultValue="services">
      <SegmentedControlItem value="services">
        <Briefcase className="size-3.5 sm:size-4" aria-hidden />
        خدمات
      </SegmentedControlItem>
      <SegmentedControlItem value="portfolio">
        <Eye className="size-3.5 sm:size-4" aria-hidden />
        نمونه‌کار
      </SegmentedControlItem>
      <SegmentedControlItem value="stories">
        <Zap className="size-3.5 sm:size-4" aria-hidden />
        استوری
      </SegmentedControlItem>
    </SegmentedControl>
  );
}
