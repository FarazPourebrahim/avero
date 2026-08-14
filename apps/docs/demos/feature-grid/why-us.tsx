import { FeatureCard, FeatureGrid } from "@avero/react";

const CARDS = [
  {
    title: "پرداخت امن و بدون دغدغه",
    description: "بازگشت وجه تا هفت روز پس از ثبت‌نام.",
    tone: "emerald",
  },
  {
    title: "مدرس‌های باتجربه",
    description: "متخصصانی با سال‌ها تجربه در همان حوزه.",
    tone: "blue",
  },
  { title: "گواهی پایان دوره", description: "پس از گذراندن پروژه پایانی.", tone: "purple" },
  { title: "پشتیبانی همیشگی", description: "انجمن پرسش و پاسخ برای هر دوره.", tone: "amber" },
] as const;

export default function FeatureGridWhyUsDemo() {
  return (
    <FeatureGrid title="چرا دوره‌های ما متفاوت‌اند؟">
      {CARDS.map((card) => (
        <FeatureCard key={card.title} {...card} />
      ))}
    </FeatureGrid>
  );
}
