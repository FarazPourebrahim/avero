"use client";

import { DetailLayout, ProfileLayout } from "@averoui/react";
import { useCopy } from "../copy";

function Block({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={`flex min-h-20 items-center justify-center rounded-2xl bg-white text-sm text-gray-500 shadow-xs ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export default function LayoutsDetailDemo() {
  const t = useCopy({
    fa: {
      summary: "خلاصه دوره",
      signup: "کارت ثبت‌نام",
      detail: "جزئیات (۸ ستون)",
      profileHeader: "سربرگ پروفایل",
      instructorCourses: "دوره‌های مدرس",
    },
    en: {
      summary: "Course summary",
      signup: "Sign-up card",
      detail: "Detail (8 columns)",
      profileHeader: "Profile header",
      instructorCourses: "The instructor's courses",
    },
  });

  return (
    <div className="w-full space-y-6 rounded-2xl bg-gray-100 py-4">
      <DetailLayout asideLabel={t.summary} aside={<Block>{t.signup}</Block>}>
        <Block className="min-h-40">{t.detail}</Block>
      </DetailLayout>
      <ProfileLayout>
        <Block>{t.profileHeader}</Block>
        <Block className="min-h-40">{t.instructorCourses}</Block>
      </ProfileLayout>
    </div>
  );
}
