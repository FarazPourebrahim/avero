import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/Button.js";
import { ConfirmDialog } from "./ConfirmDialog.js";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Overlays/ConfirmDialog",
  component: ConfirmDialog,
  args: {
    title: "این دوره حذف شود؟",
    description: "همه جلسه‌ها و دیدگاه‌های دوره برای همیشه پاک می‌شوند.",
    confirmLabel: "حذف دوره",
    tone: "danger",
    trigger: <Button variant="danger">حذف دوره</Button>,
    onConfirm: () => new Promise((resolve) => window.setTimeout(resolve, 1200)),
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Danger: Story = {};

export const Open: Story = { args: { defaultOpen: true } };

export const Neutral: Story = {
  args: {
    title: "از حساب کاربری خارج می‌شوید؟",
    description: "برای ادامه یادگیری باید دوباره وارد شوید.",
    confirmLabel: "خروج",
    tone: "default",
    trigger: <Button variant="outline">خروج</Button>,
    onConfirm: () => {},
  },
};
