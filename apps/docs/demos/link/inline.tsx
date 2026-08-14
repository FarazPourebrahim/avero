import { Link } from "@avero/react";
import { ArrowRight } from "lucide-react";

export default function LinkInlineDemo() {
  return (
    <div className="flex flex-col gap-4 text-base leading-8 text-gray-700">
      <p>
        برای شرکت در کارگاه‌ها در <Link href="#register">آوِرو</Link> ثبت‌نام کنید.
      </p>
      <p className="text-sm">
        ایمیل :{" "}
        <Link href="mailto:hello@example.com" variant="chrome" dir="ltr">
          hello@example.com
        </Link>
      </p>
      <Link href="#courses" variant="subtle">
        <ArrowRight className="size-5 ltr:-scale-x-100" aria-hidden />
        <span>بازگشت به فهرست دوره‌ها</span>
      </Link>
      <Link href="https://example.com" external>
        لینک خارجی
      </Link>
    </div>
  );
}
