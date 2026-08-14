import { Heading } from "@avero/react";

export default function TypographyHeadingsDemo() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-3xl bg-white p-6">
      <Heading size="display" as="h3">
        مبانی طراحی رابط کاربری
      </Heading>
      <Heading size="article" as="h3">
        چطور یک سیستم طراحی بسازیم؟
      </Heading>
      <Heading size="page" as="h3">
        داستان ما
      </Heading>
      <Heading size="section" as="h3">
        دوره‌های مرتبط
      </Heading>
      <Heading size="card">دیدگاه‌ها</Heading>
      <Heading size="subsection">پرداخت امن و بدون دغدغه</Heading>
    </div>
  );
}
