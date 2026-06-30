import { Badge } from "@avero/react";
import { ShieldCheck, Sparkles, ZoomIn } from "lucide-react";

export default function BadgeHighlightsDemo() {
  return (
    <>
      <Badge variant="premium">
        <Sparkles className="size-4 animate-pulse text-amber-500" aria-hidden />
        <span>پکیج رایگان</span>
        <ShieldCheck className="size-4 text-amber-600" aria-hidden />
      </Badge>
      <Badge variant="label">
        <Sparkles className="size-4" aria-hidden />
        تابستون ۱۴۰۵
      </Badge>
      <span className="flex gap-3 rounded-2xl bg-slate-400 p-4">
        <Badge variant="overlay">
          <ZoomIn className="size-4" aria-hidden />
          مشاهده بزرگ‌نمایی
        </Badge>
        <Badge variant="overlay" tone="blue">
          مشاهده جزئیات کامل
        </Badge>
        <Badge variant="solid" tone="danger">
          تکمیل ظرفیت
        </Badge>
      </span>
    </>
  );
}
