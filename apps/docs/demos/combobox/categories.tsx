"use client";

import { Combobox, Field, FieldControl, FieldDescription, FieldLabel } from "@averoui/react";
import type { ComboboxItem } from "@averoui/react";
import { useCopy } from "../copy";

export default function ComboboxCategoriesDemo() {
  const t = useCopy({
    fa: {
      label: "دوره",
      placeholder: "نام دوره را بنویسید",
      description: "با حروف فارسی یا انگلیسی جستجو کنید.",
      courses: [
        {
          label: "طراحی",
          options: [
            { value: "ui", label: "طراحی رابط کاربری", keywords: ["UI"] },
            { value: "motion", label: "موشن گرافیک" },
            { value: "illustration", label: "تصویرسازی دیجیتال" },
          ],
        },
        {
          label: "برنامه‌نویسی",
          options: [
            { value: "web", label: "برنامه‌نویسی وب" },
            { value: "python", label: "پایتون مقدماتی", keywords: ["Python"] },
            { value: "mobile", label: "توسعه اپلیکیشن موبایل", disabled: true },
          ],
        },
        {
          label: "داده",
          options: [
            { value: "analytics", label: "تحلیل داده" },
            { value: "ml", label: "یادگیری ماشین" },
          ],
        },
      ] satisfies ComboboxItem[],
    },
    en: {
      label: "Course",
      placeholder: "Type a course name",
      description: "Search in Persian or English.",
      courses: [
        {
          label: "Design",
          options: [
            { value: "ui", label: "UI design" },
            { value: "motion", label: "Motion graphics" },
            { value: "illustration", label: "Digital illustration" },
          ],
        },
        {
          label: "Development",
          options: [
            { value: "web", label: "Web development" },
            { value: "python", label: "Python basics" },
            { value: "mobile", label: "Mobile app development", disabled: true },
          ],
        },
        {
          label: "Data",
          options: [
            { value: "analytics", label: "Data analysis" },
            { value: "ml", label: "Machine learning" },
          ],
        },
      ] satisfies ComboboxItem[],
    },
  });

  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>{t.label}</FieldLabel>
        <FieldControl>
          <Combobox key={t.label} name="course" options={t.courses} placeholder={t.placeholder} />
        </FieldControl>
        <FieldDescription>{t.description}</FieldDescription>
      </Field>
    </div>
  );
}
