"use client";

import { Link } from "@averoui/react";
import { ArrowRight } from "lucide-react";
import { useCopy } from "../copy";

export default function LinkInlineDemo() {
  const t = useCopy({
    fa: {
      before: "برای شرکت در کارگاه‌ها در ",
      brand: "آوِرو",
      after: " ثبت‌نام کنید.",
      emailLabel: "ایمیل :",
      back: "بازگشت به فهرست دوره‌ها",
      external: "لینک خارجی",
    },
    en: {
      before: "Sign up at ",
      brand: "Avero",
      after: " to join a workshop.",
      emailLabel: "Email:",
      back: "Back to all courses",
      external: "External link",
    },
  });

  return (
    <div className="flex flex-col gap-4 text-base leading-8 text-gray-700">
      <p>
        {t.before}
        <Link href="#register">{t.brand}</Link>
        {t.after}
      </p>
      <p className="text-sm">
        {t.emailLabel}{" "}
        <Link href="mailto:hello@example.com" variant="chrome" dir="ltr">
          hello@example.com
        </Link>
      </p>
      <Link href="#courses" variant="subtle">
        <ArrowRight className="size-5 ltr:-scale-x-100" aria-hidden />
        <span>{t.back}</span>
      </Link>
      <Link href="https://example.com" external>
        {t.external}
      </Link>
    </div>
  );
}
