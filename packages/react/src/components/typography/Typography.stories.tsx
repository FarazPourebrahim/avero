import type { Meta, StoryObj } from "@storybook/react-vite";
import { Eyebrow, Heading, Text } from "./Typography.js";

const meta = {
  title: "Primitives/Typography",
  component: Heading,
  args: { children: "دوره‌های پرطرفدار" },
  argTypes: {
    size: {
      control: "select",
      options: ["display", "article", "page", "section", "card", "subsection"],
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const HeadingScale: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6 rounded-3xl bg-white p-8">
      <Heading size="display">طراحی تجربه کاربری از صفر</Heading>
      <Heading size="article" as="h2">
        چطور یک سیستم طراحی بسازیم؟ راهنمای گام‌به‌گام
      </Heading>
      <Heading size="page" as="h2">
        درباره ما
      </Heading>
      <Heading size="section">دوره‌های مرتبط</Heading>
      <Heading size="card">دیدگاه‌ها</Heading>
      <Heading size="subsection">پرداخت امن و بدون دغدغه</Heading>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4 rounded-3xl bg-white p-8">
      <Eyebrow>مدرس دوره</Eyebrow>
      <Text>
        سیستم طراحی مجموعه‌ای از قواعد، توکن‌ها و کامپوننت‌هاست که به تیم‌ها کمک می‌کند محصولی
        یکپارچه و قابل نگهداری بسازند.
      </Text>
      <Text variant="lead">
        ما با این باور شروع کردیم که یادگیری مهارت‌های تازه باید ساده، در دسترس و لذت‌بخش باشد.
      </Text>
      <Text variant="muted">مسیری کوتاه برای شروعی مطمئن ✨</Text>
      <Text variant="caption">دیدگاه‌ها پس از بررسی منتشر می‌شوند.</Text>
    </div>
  ),
};

export const OnDark: Story = {
  render: () => (
    <div className="gradient-night flex max-w-2xl flex-col gap-4 rounded-3xl p-8 text-white">
      <Eyebrow tone="onDark">مأموریت ما</Eyebrow>
      <Heading size="section" className="text-white">
        یادگیری بدون مرز، برای همه
      </Heading>
    </div>
  ),
};
