"use client";

import { Combobox, Field, FieldControl, FieldDescription, FieldLabel } from "@averoui/react";
import type { ComboboxItem } from "@averoui/react";

const COURSES: ComboboxItem[] = [
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
];

export default function ComboboxCategoriesDemo() {
  return (
    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel>دوره</FieldLabel>
        <FieldControl>
          <Combobox name="course" options={COURSES} placeholder="نام دوره را بنویسید" />
        </FieldControl>
        <FieldDescription>با حروف فارسی یا انگلیسی جستجو کنید.</FieldDescription>
      </Field>
    </div>
  );
}
