import type { Meta, StoryObj } from "@storybook/react-vite";
import { Eyebrow, Heading, Text } from "./Typography.js";

const meta = {
  title: "Primitives/Typography",
  component: Heading,
  args: { children: "خدمات فریلنسرها" },
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
      <Heading size="display">طراحی سایت و سئو</Heading>
      <Heading size="article" as="h2">
        فریلنسری چیست؟ راهنمای کامل شروع کار به عنوان فریلنسر
      </Heading>
      <Heading size="page" as="h2">
        داستان شکل‌گیری دورلنسر
      </Heading>
      <Heading size="section">پروژه‌های مرتبط</Heading>
      <Heading size="card">نظرات کاربران</Heading>
      <Heading size="subsection">سیستم پرداخت امن و تضمین‌شده</Heading>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4 rounded-3xl bg-white p-8">
      <Eyebrow>ارائه‌دهنده خدمت</Eyebrow>
      <Text>
        فریلنسری یکی از شکل‌های جدید و انعطاف‌پذیر همکاری است که در آن فرد بدون اینکه الزاماً کارمند
        یک شرکت باشد، مهارت خود را به‌صورت پروژه‌ای ارائه می‌کند.
      </Text>
      <Text variant="lead">
        تابستون ۱۴۰۵، ایده دورلنسر از دل یک دغدغه و نیاز ملموس جوانه زد؛ نیازی به پلتفرمی مدرن و
        شفاف.
      </Text>
      <Text variant="muted">روایت یک تصمیم برای تحول فضای دورکاری ✨</Text>
      <Text variant="caption">نظرات پس از بررسی و تایید مدیر منتشر خواهند شد.</Text>
    </div>
  ),
};

export const OnDark: Story = {
  render: () => (
    <div className="gradient-night flex max-w-2xl flex-col gap-4 rounded-3xl p-8 text-white">
      <Eyebrow tone="onDark">مأموریت و چشم‌انداز</Eyebrow>
      <Heading size="section" className="text-white">
        ساختن آینده‌ای که در آن تخصص و تلاش حد و مرزی ندارد
      </Heading>
    </div>
  ),
};
