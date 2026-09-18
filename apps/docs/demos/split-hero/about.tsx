import { Button, SplitHero } from "@averoui/react";
import { tokens } from "@averoui/tokens";

// Inline SVG artwork keeps the demo deterministic and offline (no remote images).
const GROUND = tokens.colorPrimary.value;
const HIGHLIGHT = tokens.colorSurfaceGlass.value;
const ARTWORK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><rect width="480" height="360" rx="24" fill="${GROUND}"/><circle cx="240" cy="150" r="70" fill="${HIGHLIGHT}"/><rect x="120" y="260" width="240" height="28" rx="14" fill="${HIGHLIGHT}"/></svg>`,
  );

export default function SplitHeroAboutDemo() {
  return (
    <SplitHero
      eyebrow="از سال ۱۴۰۰"
      note="داستان ما"
      title="جایی برای یادگیری ساده و لذت‌بخش"
      image={ARTWORK}
      imageAlt="تصویر معرفی"
      actions={
        <>
          <Button elevated>مشاهده دوره‌ها</Button>
          <Button variant="soft">تماس با پشتیبانی</Button>
        </>
      }
    >
      <p>
        ما با یک پرسش ساده شروع کردیم: چرا یادگیری مهارت‌های تازه باید دشوار باشد؟ پاسخ ما دوره‌هایی
        کوتاه، عملی و در دسترس بود.
      </p>
      <p>باور داریم هر کسی، هر جا که باشد، باید بتواند با سرعت خودش پیش برود.</p>
    </SplitHero>
  );
}
