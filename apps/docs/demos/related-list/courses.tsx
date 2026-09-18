"use client";

import { RelatedItem, RelatedList } from "@averoui/react";

export default function RelatedListCoursesDemo() {
  return (
    <div className="w-full max-w-sm">
      <RelatedList title="دوره‌های مرتبط">
        <RelatedItem title="طراحی سیستم طراحی در Figma" href="#" price={3500000} />
        <RelatedItem title="اصول تایپوگرافی فارسی" href="#" price={2200000} />
        <RelatedItem title="کارگاه آزمون کاربردپذیری" href="#" meta={<span>رایگان</span>} />
      </RelatedList>
    </div>
  );
}
