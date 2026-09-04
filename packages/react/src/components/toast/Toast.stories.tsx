import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect, useRef } from "react";
import { Button } from "../button/Button.js";
import { ToastProvider, useToast, type ToastOptions } from "./Toast.js";

const SAMPLES: Record<NonNullable<ToastOptions["tone"]>, ToastOptions> = {
  info: { tone: "info", title: "جلسه تازه", description: "جلسه پنجم دوره منتشر شد." },
  success: { tone: "success", title: "ذخیره شد", description: "تغییرات پروفایل شما ذخیره شد." },
  warning: {
    tone: "warning",
    title: "ظرفیت رو به اتمام",
    description: "تنها ۳ جای خالی مانده است.",
  },
  danger: {
    tone: "danger",
    title: "پرداخت انجام نشد",
    description: "ارتباط با درگاه قطع شد.",
    action: {
      label: "تلاش دوباره",
      altText: "از صفحه سفارش دوباره پرداخت کنید",
      onClick: () => {},
    },
  },
};

function Triggers() {
  const { toast, dismiss } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast(SAMPLES.info)}>
        اطلاعیه
      </Button>
      <Button variant="outline" onClick={() => toast(SAMPLES.success)}>
        موفق
      </Button>
      <Button variant="outline" onClick={() => toast(SAMPLES.warning)}>
        هشدار
      </Button>
      <Button variant="outline" onClick={() => toast(SAMPLES.danger)}>
        خطا
      </Button>
      <Button variant="ghost" onClick={() => dismiss()}>
        بستن همه
      </Button>
    </div>
  );
}

function ShownOnMount({ tones }: { tones: Array<keyof typeof SAMPLES> }) {
  const { toast } = useToast();
  const shown = useRef(false);
  useEffect(() => {
    if (shown.current) return;
    shown.current = true;
    for (const tone of tones) toast({ ...SAMPLES[tone], duration: Infinity });
  }, [toast, tones]);
  return <Triggers />;
}

const meta = {
  title: "Feedback/Toast",
  component: ToastProvider,
  decorators: [
    (Story) => (
      <div className="min-h-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Tones: Story = {
  render: () => (
    <ToastProvider>
      <Triggers />
    </ToastProvider>
  ),
};

export const Stacked: Story = {
  name: "Stacked (open)",
  render: () => (
    <ToastProvider>
      <ShownOnMount tones={["success", "warning", "danger"]} />
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  name: "With action (open)",
  render: () => (
    <ToastProvider>
      <ShownOnMount tones={["danger"]} />
    </ToastProvider>
  ),
};
