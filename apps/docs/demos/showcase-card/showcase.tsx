"use client";

import { ShowcaseCard } from "@averoui/react";
import { useCopy } from "../copy";

export default function ShowcaseCardShowcaseDemo() {
  const t = useCopy({
    fa: {
      title: "اپلیکیشن مدیریت کارها",
      description: "پروژه پایانی دوره طراحی رابط کاربری برای یک اپلیکیشن مدیریت کارهای روزانه",
      tags: ["Figma", "طراحی رابط کاربری"],
    },
    en: {
      title: "A task management app",
      description: "The final project from the UI design course: an app for managing daily tasks",
      tags: ["Figma", "UI design"],
    },
  });

  return (
    <div className="w-full max-w-sm">
      <ShowcaseCard
        title={t.title}
        href="#"
        description={t.description}
        tags={t.tags}
        likes={0}
        onShare={() => {}}
      />
    </div>
  );
}
