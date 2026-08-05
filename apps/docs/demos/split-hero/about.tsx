import { Button, SplitHero } from "@avero/react";
import { tokens } from "@avero/tokens";

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
      eyebrow="تابستون ۱۴۰۵"
      note="نقطه آغاز ماجرا"
      title="یه تصمیم بزرگ برای شکستن مرزهای جغرافیایی کار"
      image={ARTWORK}
      imageAlt="داستان دورلنسر"
      actions={
        <>
          <Button elevated>مشاهده پروژه‌ها</Button>
          <Button variant="soft">ارتباط با تیم ما</Button>
        </>
      }
    >
      <p>
        تابستون ۱۴۰۵، ایده دورلنسر از دل یک دغدغه و نیاز ملموس جوانه زد؛ نیازی به پلتفرمی مدرن، شفاف
        و قابل اتکا.
      </p>
      <p>ما باور داشتیم که هیچ استعدادی نباید به خاطر موقعیت مکانی از فرصت‌ها محروم بماند.</p>
    </SplitHero>
  );
}
