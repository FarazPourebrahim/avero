import { SegmentedControl, SegmentedControlItem } from "@avero/react";
import { BookOpen, FileText, Zap } from "lucide-react";

export default function SegmentedControlAnalyticsDemo() {
  return (
    <SegmentedControl aria-label="نوع آنالیتیکس" defaultValue="courses">
      <SegmentedControlItem value="courses">
        <BookOpen className="size-3.5 sm:size-4" aria-hidden />
        دوره‌ها
      </SegmentedControlItem>
      <SegmentedControlItem value="articles">
        <FileText className="size-3.5 sm:size-4" aria-hidden />
        مقاله‌ها
      </SegmentedControlItem>
      <SegmentedControlItem value="workshops">
        <Zap className="size-3.5 sm:size-4" aria-hidden />
        کارگاه‌ها
      </SegmentedControlItem>
    </SegmentedControl>
  );
}
