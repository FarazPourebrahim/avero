import { Heading } from "@avero/react";

export default function TypographyHeadingsDemo() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl bg-white p-6">
      <Heading size="display" as="h3">
        طراحی سایت و سئو
      </Heading>
      <Heading size="article" as="h3">
        فریلنسری چیست؟
      </Heading>
      <Heading size="page" as="h3">
        داستان شکل‌گیری دورلنسر
      </Heading>
      <Heading size="section" as="h3">
        پروژه‌های مرتبط
      </Heading>
      <Heading size="card">نظرات کاربران</Heading>
      <Heading size="subsection">سیستم پرداخت امن و تضمین‌شده</Heading>
    </div>
  );
}
