import { tokens } from "@averoui/tokens";
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
    eyebrow: "از سال ۱۴۰۰",
    note: "داستان ما",
    title: "جایی برای یادگیری ساده و لذت‌بخش",
    image: ARTWORK,
    imageAlt: "تصویر معرفی",
    children: (
      <>
        <p>
          ما با یک پرسش ساده شروع کردیم: چرا یادگیری مهارت‌های تازه باید دشوار باشد؟ پاسخ ما
          دوره‌هایی کوتاه، عملی و در دسترس بود.
        </p>
        <p>باور داریم هر کسی، هر جا که باشد، باید بتواند با سرعت خودش پیش برود.</p>
      </>
    ),
    actions: (
      <>
        <Button elevated>مشاهده دوره‌ها</Button>
        <Button variant="soft">تماس با پشتیبانی</Button>
      </>
    ),
  },
};

export const TextOnly: Story = {
  args: {
    title: "جایی برای یادگیری ساده و لذت‌بخش",
    children: <p>بدون تصویر، متن تمام عرض کارت را می‌گیرد.</p>,
  },
};
