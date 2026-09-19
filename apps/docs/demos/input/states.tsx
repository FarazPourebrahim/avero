"use client";

import { Input } from "@averoui/react";
import { useCopy } from "../copy";

export default function InputStatesDemo() {
  const t = useCopy({
    fa: {
      courseName: "نام دوره",
      courseValue: "طراحی رابط کاربری",
      invalidCode: "کد تخفیف نامعتبر",
      userId: "شناسه کاربر",
      userIdValue: "۱۴۰۲۸۸۳۱",
      workEmail: "ایمیل سازمانی",
      closed: "ثبت‌نام بسته است",
    },
    en: {
      courseName: "Course name",
      courseValue: "UI design",
      invalidCode: "Invalid discount code",
      userId: "User ID",
      userIdValue: "14028831",
      workEmail: "Work email",
      closed: "Registration is closed",
    },
  });

  return (
    // `defaultValue` is read once on mount, so the inputs are keyed on the copy: switching the
    // preview's language remounts them with the new text rather than leaving the old one behind.
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input key={t.courseValue} aria-label={t.courseName} defaultValue={t.courseValue} />
      <Input aria-label={t.invalidCode} aria-invalid defaultValue="OFF-2020" />
      <Input key={t.userIdValue} aria-label={t.userId} readOnly defaultValue={t.userIdValue} />
      <Input key={t.closed} aria-label={t.workEmail} disabled defaultValue={t.closed} />
    </div>
  );
}
