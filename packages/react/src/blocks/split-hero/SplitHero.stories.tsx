import { tokens } from "@avero/tokens";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../components/button/index.js";
import { SplitHero } from "./SplitHero.js";

// Inline SVG artwork keeps stories deterministic and offline (no remote images).
const GROUND = tokens.colorPrimary.value;
const HIGHLIGHT = tokens.colorSurfaceGlass.value;
const ARTWORK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><rect width="480" height="360" rx="24" fill="${GROUND}"/><circle cx="240" cy="150" r="70" fill="${HIGHLIGHT}"/><rect x="120" y="260" width="240" height="28" rx="14" fill="${HIGHLIGHT}"/></svg>`,
  );

const meta: Meta<typeof SplitHero> = {
  title: "Blocks/SplitHero",
  component: SplitHero,
  decorators: [
    (Story) => (
      <div className="max-w-5xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SplitHero>;

export const About: Story = {
  args: {
    eyebrow: "تابستون ۱۴۰۵",
    note: "نقطه آغاز ماجرا",
    title: "یه تصمیم بزرگ برای شکستن مرزهای جغرافیایی کار",
    image: ARTWORK,
    imageAlt: "داستان دورلنسر",
    children: (
      <>
        <p>
          تابستون ۱۴۰۵، ایده دورلنسر از دل یک دغدغه و نیاز ملموس جوانه زد؛ نیازی به پلتفرمی مدرن،
          شفاف و قابل اتکا.
        </p>
        <p>ما باور داشتیم که هیچ استعدادی نباید به خاطر موقعیت مکانی از فرصت‌ها محروم بماند.</p>
      </>
    ),
    actions: (
      <>
        <Button elevated>مشاهده پروژه‌ها</Button>
        <Button variant="soft">ارتباط با تیم ما</Button>
      </>
    ),
  },
};

export const TextOnly: Story = {
  args: {
    title: "یه تصمیم بزرگ برای شکستن مرزهای جغرافیایی کار",
    children: <p>بدون تصویر، متن تمام عرض کارت را می‌گیرد.</p>,
  },
};
