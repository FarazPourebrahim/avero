"use client";

import { ShowcaseCard } from "@avero/react";

export default function ShowcaseCardShowcaseDemo() {
  return (
    <div className="w-full max-w-sm">
      <ShowcaseCard
        title="اپلیکیشن مدیریت کارها"
        href="#"
        description="پروژه پایانی دوره طراحی رابط کاربری برای یک اپلیکیشن مدیریت کارهای روزانه"
        tags={["Figma", "طراحی رابط کاربری"]}
        likes={0}
        onShare={() => {}}
      />
    </div>
  );
}
