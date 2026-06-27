import type { Meta, StoryObj } from "@storybook/react-vite";
import { MapPin, ShieldCheck, Sparkles, ZoomIn } from "lucide-react";
import { Badge } from "./Badge.js";

const meta = {
  title: "Primitives/Badge",
  component: Badge,
  args: { children: "منتشر شده", tone: "success" },
  argTypes: {
    variant: {
      control: "select",
      options: ["status", "outline", "counter", "premium", "label", "overlay", "solid"],
    },
    tone: {
      control: "select",
      options: ["neutral", "success", "danger", "indigo", "emerald", "amber", "blue", "dark"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Status: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tone="success">منتشر شده</Badge>
      <Badge tone="success" className="py-1">
        9 جای خالی
      </Badge>
      <Badge tone="danger" className="py-1">
        تکمیل ظرفیت
      </Badge>
      <Badge>remote</Badge>
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="outline" tone="indigo">
        سئو
      </Badge>
      <Badge variant="outline" tone="emerald">
        همکاری: remote
      </Badge>
      <Badge variant="outline" tone="amber">
        <MapPin className="size-3.5" aria-hidden />
        ایران، تهران
      </Badge>
    </div>
  ),
};

export const Highlights: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="premium">
        <Sparkles className="size-4 animate-pulse text-amber-500" aria-hidden />
        <span>پکیج رایگان</span>
        <ShieldCheck className="size-4 text-amber-600" aria-hidden />
      </Badge>
      <Badge variant="label">
        <Sparkles className="size-4" aria-hidden />
        تابستون ۱۴۰۵
      </Badge>
      <Badge variant="counter">0</Badge>
    </div>
  ),
};

export const OnMedia: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-slate-300 p-6">
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
    </div>
  ),
};
