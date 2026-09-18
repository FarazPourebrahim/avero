import { CalendarSolidIcon, ClockSolidIcon, EyeSolidIcon, MetaBar, MetaItem } from "@averoui/react";

export default function MetaArticleDemo() {
  return (
    <MetaBar className="max-w-xl">
      <MetaItem icon={<CalendarSolidIcon size={14} className="text-gray-500" />} label="انتشار:">
        ۳ شهریور ۱۴۰۵
      </MetaItem>
      <MetaItem icon={<ClockSolidIcon size={14} className="text-gray-500" />} label="زمان مطالعه:">
        5 دقیقه
      </MetaItem>
      <MetaItem icon={<EyeSolidIcon size={14} className="text-gray-500" />} label="بازدید:">
        15
      </MetaItem>
    </MetaBar>
  );
}
