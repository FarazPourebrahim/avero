import { FeatureCard } from "@avero/react";
import { Award, ShieldCheck, Users, Zap } from "lucide-react";

export default function FeatureCardGridDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
      <FeatureCard
        tone="emerald"
        icon={<ShieldCheck className="text-emerald-500" />}
        title="پرداخت امن و بدون دغدغه"
        description="پرداخت آنلاین امن و بازگشت وجه تا هفت روز پس از ثبت‌نام در هر دوره."
      />
      <FeatureCard
        tone="blue"
        icon={<Users className="text-blue-500" />}
        title="مدرس‌های باتجربه"
        description="دوره‌ها را متخصصانی تدریس می‌کنند که سال‌ها در همان حوزه کار کرده‌اند."
      />
      <FeatureCard
        tone="purple"
        icon={<Award className="text-purple-500" />}
        title="گواهی پایان دوره"
        description="پس از گذراندن پروژه پایانی، گواهی قابل استعلام دریافت می‌کنید."
      />
      <FeatureCard
        tone="amber"
        icon={<Zap className="text-amber-500" />}
        title="یادگیری با سرعت خودتان"
        description="جلسه‌ها همیشه در دسترس‌اند و انجمن پرسش و پاسخ همراه شماست."
      />
    </div>
  );
}
