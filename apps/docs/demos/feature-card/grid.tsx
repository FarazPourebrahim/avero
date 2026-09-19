"use client";

import { FeatureCard } from "@averoui/react";
import { Award, ShieldCheck, Users, Zap } from "lucide-react";
import { useCopy } from "../copy";

export default function FeatureCardGridDemo() {
  const t = useCopy({
    fa: {
      payTitle: "پرداخت امن و بدون دغدغه",
      payBody: "پرداخت آنلاین امن و بازگشت وجه تا هفت روز پس از ثبت‌نام در هر دوره.",
      teachersTitle: "مدرس‌های باتجربه",
      teachersBody: "دوره‌ها را متخصصانی تدریس می‌کنند که سال‌ها در همان حوزه کار کرده‌اند.",
      certTitle: "گواهی پایان دوره",
      certBody: "پس از گذراندن پروژه پایانی، گواهی قابل استعلام دریافت می‌کنید.",
      paceTitle: "یادگیری با سرعت خودتان",
      paceBody: "جلسه‌ها همیشه در دسترس‌اند و انجمن پرسش و پاسخ همراه شماست.",
    },
    en: {
      payTitle: "Secure, straightforward payment",
      payBody: "Secure online payment, with a refund up to seven days after you sign up.",
      teachersTitle: "Experienced instructors",
      teachersBody: "Courses are taught by people who have worked in the field for years.",
      certTitle: "Certificate of completion",
      certBody: "Finish the final project and you receive a verifiable certificate.",
      paceTitle: "Learn at your own pace",
      paceBody: "Sessions are always available, and the Q&A forum is there when you need it.",
    },
  });

  return (
    <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
      <FeatureCard
        tone="emerald"
        icon={<ShieldCheck className="text-emerald-500" />}
        title={t.payTitle}
        description={t.payBody}
      />
      <FeatureCard
        tone="blue"
        icon={<Users className="text-blue-500" />}
        title={t.teachersTitle}
        description={t.teachersBody}
      />
      <FeatureCard
        tone="purple"
        icon={<Award className="text-purple-500" />}
        title={t.certTitle}
        description={t.certBody}
      />
      <FeatureCard
        tone="amber"
        icon={<Zap className="text-amber-500" />}
        title={t.paceTitle}
        description={t.paceBody}
      />
    </div>
  );
}
