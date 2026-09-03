import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Button } from "../button/Button.js";
import { Alert } from "./Alert.js";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  args: {
    title: "ثبت‌نام دوره باز است",
    children: "تا پایان هفته می‌توانید با تخفیف ثبت‌نام کنید.",
  },
  decorators: [
    (Story) => (
      <div className="flex max-w-xl flex-col gap-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Tones: Story = {
  render: () => (
    <>
      <Alert tone="info" title="اطلاعیه">
        جلسه بعدی دوره یکشنبه ساعت ۱۸ برگزار می‌شود.
      </Alert>
      <Alert tone="success" title="ذخیره شد">
        تغییرات پروفایل شما ذخیره شد.
      </Alert>
      <Alert tone="warning" title="ظرفیت رو به اتمام">
        تنها ۳ جای خالی باقی مانده است.
      </Alert>
      <Alert tone="danger" title="پرداخت انجام نشد">
        مبلغ از حساب شما کسر نشد. دوباره تلاش کنید.
      </Alert>
      <Alert tone="neutral">این دوره به‌زودی به‌روزرسانی می‌شود.</Alert>
    </>
  ),
};

export const Bordered: Story = {
  render: () => (
    <>
      <Alert variant="bordered" tone="info" title="نکته">
        پیش از شروع، پروژه نمونه را دانلود کنید.
      </Alert>
      <Alert variant="bordered" tone="warning" title="هشدار">
        این تنظیم روی همه دوره‌های شما اثر می‌گذارد.
      </Alert>
      <Alert variant="bordered" tone="danger" title="مهم">
        پس از حذف، بازگرداندن دوره ممکن نیست.
      </Alert>
    </>
  ),
};

export const WithAction: Story = {
  args: {
    tone: "danger",
    role: "alert",
    title: "پرداخت انجام نشد",
    children: "ارتباط با درگاه قطع شد. مبلغی از حساب شما کسر نشده است.",
    action: (
      <>
        <Button size="sm" variant="danger">
          تلاش دوباره
        </Button>
        <Button size="sm" variant="ghost">
          تماس با پشتیبانی
        </Button>
      </>
    ),
  },
};

function DismissibleAlert() {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return (
      <Button variant="outline" onClick={() => setVisible(true)}>
        نمایش دوباره
      </Button>
    );
  }
  return (
    <Alert tone="success" title="خوش آمدید" onDismiss={() => setVisible(false)}>
      حساب شما ساخته شد. از داشبورد شروع کنید.
    </Alert>
  );
}

export const Dismissible: Story = { render: () => <DismissibleAlert /> };

export const LongText: Story = {
  args: {
    tone: "warning",
    title: "به‌روزرسانی قوانین استفاده از خدمات و حریم خصوصی کاربران",
    children:
      "از ابتدای ماه آینده، قوانین تازه‌ای برای استفاده از خدمات اعمال می‌شود. لطفاً پیش از ادامه، متن کامل قوانین را مطالعه کنید تا از تغییرات مربوط به پرداخت، بازگشت وجه و نگهداری اطلاعات شخصی آگاه شوید.",
    onDismiss: () => {},
  },
};
