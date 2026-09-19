"use client";

import { Button, VisuallyHidden } from "@averoui/react";
import { useCopy } from "../copy";

export default function VisuallyHiddenLabelDemo() {
  const t = useCopy({
    fa: {
      courses: ["مبانی تحلیل داده", "طراحی رابط کاربری"],
      edit: "ویرایش",
      note: "هر دکمه روی صفحه «ویرایش» دیده می‌شود، اما برای صفحه‌خوان نام دوره را هم می‌گوید.",
    },
    en: {
      courses: ["Data analysis basics", "UI design"],
      edit: "Edit",
      note: "Each button reads “Edit” on screen, but a screen reader also hears the course name.",
    },
  });

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <ul className="flex flex-col gap-2 text-sm">
        {t.courses.map((course) => (
          <li key={course} className="flex items-center justify-between gap-4">
            <span className="text-gray-700">{course}</span>
            <Button variant="ghost" size="sm">
              {t.edit}
              <VisuallyHidden> {course}</VisuallyHidden>
            </Button>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-500">{t.note}</p>
    </div>
  );
}
