import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeft, Send, ShieldAlert, UserCheck } from "lucide-react";
import { Button } from "./Button.js";

const meta = {
  title: "Primitives/Button",
  component: Button,
  args: { children: "مشاهده دوره‌ها" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "soft", "ghost", "outline", "inverse", "warning", "danger"],
    },
    tone: {
      control: "select",
      options: ["neutral", "sky", "emerald", "blue", "indigo", "purple", "amber", "rose", "red"],
    },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] },
    radius: { control: "inline-radio", options: ["none", "xl", "2xl", "full"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button elevated>
        <span>مشاهده دوره‌ها</span>
        <ArrowLeft className="size-4 ltr:-scale-x-100" aria-hidden />
      </Button>
      <Button variant="secondary" radius="none" size="lg">
        ثبت‌نام رایگان
      </Button>
      <Button variant="soft">تماس با پشتیبانی</Button>
      <Button variant="ghost" size="sm" className="font-medium">
        بازگشت
      </Button>
      <Button variant="outline" radius="2xl" size="lg" className="text-xs font-bold">
        <UserCheck className="size-4" aria-hidden />
        مشاهده پروفایل
      </Button>
      <Button variant="warning">ارتقا</Button>
      <Button variant="danger">حذف دوره</Button>
    </div>
  ),
};

export const SoftTones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="soft" tone="sky" size="sm">
        <Send className="size-3.5" aria-hidden />
        تلگرام
      </Button>
      <Button variant="soft" tone="emerald" size="sm">
        واتس‌اپ
      </Button>
      <Button variant="soft" tone="blue" size="sm">
        لینکدین
      </Button>
      <Button variant="soft" tone="neutral" size="sm">
        کپی لینک
      </Button>
      <Button variant="soft" tone="rose" size="sm">
        <ShieldAlert className="size-4" aria-hidden />
        گزارش مشکل
      </Button>
      <Button variant="soft" tone="purple" size="xs">
        مشاهده گواهی
      </Button>
      <Button variant="soft" tone="indigo" size="xs">
        indigo
      </Button>
      <Button variant="soft" tone="amber" size="xs">
        amber
      </Button>
      <Button variant="soft" tone="red" size="xs">
        red
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">xs</Button>
      <Button size="sm">sm</Button>
      <Button size="md">md</Button>
      <Button size="lg">lg</Button>
      <Button size="xl">xl</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>ارسال دیدگاه</Button>
      <Button disabled>ارسال دیدگاه</Button>
      <Button variant="inverse" size="xl" block className="max-w-md">
        ثبت‌نام در کارگاه
      </Button>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <Button asChild variant="soft">
      <a href="#contact">تماس با پشتیبانی</a>
    </Button>
  ),
};
