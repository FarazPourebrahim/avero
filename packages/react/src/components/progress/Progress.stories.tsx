import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress.js";

const meta = {
  title: "Primitives/Progress",
  component: Progress,
  args: { value: 3, max: 12, "aria-label": "ظرفیت ارسال رزومه" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    tone: { control: "inline-radio", options: ["primary", "success", "danger"] },
  },
  decorators: [
    (Story) => (
      <div className="w-80 rounded-2xl bg-white p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Capacity: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">ظرفیت دریافت رزومه</span>
        <span className="font-medium text-gray-800">0 از 15</span>
      </div>
      <Progress value={0} max={15} aria-label="ظرفیت دریافت رزومه" />
      <Progress value={5} max={5} aria-label="تکمیل ظرفیت" />
      <Progress value={null} aria-label="در حال بارگذاری" />
    </div>
  ),
};
