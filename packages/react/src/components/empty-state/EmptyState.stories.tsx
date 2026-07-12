import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart3, Bell, MessageSquare } from "lucide-react";
import { Button } from "../button/Button.js";
import { EmptyState } from "./EmptyState.js";

const meta: Meta<typeof EmptyState> = {
  title: "Overlays/EmptyState",
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Variants: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4">
      <div className="rounded-3xl bg-white p-6">
        <EmptyState>
          هنوز نظری برای این مقاله ثبت نشده است. اولین نفری باشید که نظر ثبت می‌کند!
        </EmptyState>
      </div>
      <div className="rounded-3xl bg-white p-6">
        <EmptyState variant="slate">هنوز نظری ثبت نشده است.</EmptyState>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <EmptyState variant="icon" icon={<BarChart3 className="mx-auto size-8" />}>
          به‌زودی
        </EmptyState>
      </div>
      <div className="rounded-2xl border border-gray-100 bg-white p-5">
        <EmptyState variant="circle" icon={<Bell />}>
          داده‌ای برای نمایش وجود ندارد
        </EmptyState>
      </div>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div className="max-w-md rounded-2xl border border-gray-100 bg-white p-5">
      <EmptyState
        variant="circle"
        icon={<MessageSquare />}
        action={
          <Button size="sm" variant="soft">
            نوشتن اولین نظر
          </Button>
        }
      >
        هنوز گفت‌وگویی شروع نشده است.
      </EmptyState>
    </div>
  ),
};
