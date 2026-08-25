import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker } from "./DatePicker.js";

const meta: Meta<typeof DatePicker> = {
  title: "Forms/DatePicker",
  component: DatePicker,
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Single: Story = {
  render: () => <DatePicker aria-label="تاریخ شروع" defaultValue="2026-09-11" />,
};

export const Range: Story = {
  render: () => (
    <DatePicker
      mode="range"
      aria-label="مدت سفر"
      defaultValue={{ from: "2026-09-10", to: "2026-09-16" }}
    />
  ),
};

export const Limits: Story = {
  render: () => (
    <DatePicker
      aria-label="تاریخ جلسه"
      defaultValue="2026-09-15"
      min="2026-09-12"
      max="2026-10-10"
      isDateDisabled={(date) => new Date(`${date}T00:00:00Z`).getUTCDay() === 5}
    />
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DatePicker aria-label="تاریخ" defaultValue="2026-09-11" aria-invalid />
      <DatePicker aria-label="تاریخ" defaultValue="2026-09-11" disabled />
    </div>
  ),
};
