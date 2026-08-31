import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bookmark, Copy, Share2 } from "lucide-react";
import { Button } from "../button/Button.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Tooltip, TooltipProvider } from "./Tooltip.js";

function ShareActions({ defaultOpen }: { defaultOpen?: boolean }) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip content="لینک در حافظه کپی می‌شود" defaultOpen={defaultOpen}>
          <IconButton label="کپی لینک" variant="soft">
            <Copy aria-hidden className="size-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content="در فهرست ذخیره‌شده‌ها">
          <IconButton label="ذخیره" variant="soft">
            <Bookmark aria-hidden className="size-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content="ارسال برای دوستان" side="bottom">
          <IconButton label="اشتراک‌گذاری" variant="soft">
            <Share2 aria-hidden className="size-4" />
          </IconButton>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

const meta = {
  title: "Overlays/Tooltip",
  component: ShareActions,
  decorators: [
    (Story) => (
      <div className="flex min-h-40 items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ShareActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconButtons: Story = {};

export const Open: Story = { args: { defaultOpen: true } };

export const LongText: Story = {
  name: "Long text (open)",
  render: () => (
    <Tooltip
      defaultOpen
      content="با فعال کردن این گزینه، هر بار که جلسه تازه‌ای به دوره اضافه شود، از طریق ایمیل به شما خبر می‌دهیم."
    >
      <Button variant="outline">اعلان جلسه‌های تازه</Button>
    </Tooltip>
  ),
};

export const WithoutArrow: Story = {
  name: "Without arrow (open)",
  render: () => (
    <Tooltip defaultOpen showArrow={false} side="bottom" content="پیش‌نویس ذخیره شد">
      <Button variant="ghost">وضعیت</Button>
    </Tooltip>
  ),
};
