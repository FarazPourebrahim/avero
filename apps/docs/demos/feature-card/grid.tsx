import { FeatureCard } from "@avero/react";
import { Award, ShieldCheck, Users, Zap } from "lucide-react";

export default function FeatureCardGridDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
      <FeatureCard
        tone="emerald"
        icon={<ShieldCheck className="text-emerald-500" />}
        title="سیستم پرداخت امن و تضمین‌شده"
        description="حفظ امنیت مالی کارفرما و تضمین دریافت دستمزد فریلنسر با پرداخت مرحله‌ای و امانی."
      />
      <FeatureCard
        tone="blue"
        icon={<Users className="text-blue-500" />}
        title="دسترسی به برترین استعدادها"
        description="گردهم‌آوری هزاران متخصص و فریلنسر ماهر در حوزه‌های مختلف."
      />
      <FeatureCard
        tone="purple"
        icon={<Award className="text-purple-500" />}
        title="سنجش مهارت و گواهینامه‌های معتبر"
        description="سیستم پیشرفته آزمون‌های تخصصی برای اعتبارسنجی مهارت‌ها."
      />
      <FeatureCard
        tone="amber"
        icon={<Zap className="text-amber-500" />}
        title="سرعت، سهولت و پشتیبانی فعال"
        description="رابط کاربری ساده، سیستم چت اختصاصی و تیم پشتیبانی همراه."
      />
    </div>
  );
}
