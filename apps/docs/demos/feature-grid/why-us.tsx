import { FeatureCard, FeatureGrid } from "@avero/react";

const CARDS = [
  { title: "سیستم پرداخت امن", description: "پرداخت مرحله‌ای و امانی.", tone: "emerald" },
  { title: "برترین استعدادها", description: "هزاران متخصص و فریلنسر ماهر.", tone: "blue" },
  { title: "سنجش مهارت", description: "آزمون‌های تخصصی برای اعتبارسنجی.", tone: "purple" },
  { title: "پشتیبانی فعال", description: "رابط کاربری ساده و تیم پشتیبانی.", tone: "amber" },
] as const;

export default function FeatureGridWhyUsDemo() {
  return (
    <FeatureGrid title="چرا دورلنسر انتخابی متفاوت است؟">
      {CARDS.map((card) => (
        <FeatureCard key={card.title} {...card} />
      ))}
    </FeatureGrid>
  );
}
