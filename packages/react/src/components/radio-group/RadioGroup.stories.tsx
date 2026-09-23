import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioCard } from "./RadioCard.js";
import { RadioGroup, RadioGroupItem } from "./RadioGroup.js";

const meta: Meta<typeof RadioGroup> = {
  title: "Forms/RadioGroup",
  component: RadioGroup,
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const OPTIONS = [
  { value: "online", label: "آنلاین" },
  { value: "in-person", label: "حضوری" },
  { value: "hybrid", label: "ترکیبی (به‌زودی)", disabled: true },
];

export const Delivery: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <p id="delivery-label" className="text-sm font-medium text-gray-700">
        نحوه برگزاری
      </p>
      <RadioGroup aria-labelledby="delivery-label" defaultValue="online">
        {OPTIONS.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <RadioGroupItem id={option.value} value={option.value} disabled={option.disabled} />
            <label htmlFor={option.value} className="text-sm text-gray-700">
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  ),
};

export const Cards: Story = {
  render: () => (
    <RadioGroup aria-label="روش ارسال" defaultValue="post" className="w-80">
      <RadioCard value="post" title="پست پیشتاز" description="سه تا پنج روز کاری" aside="رایگان" />
      <RadioCard
        value="courier"
        title="پیک"
        description="همان روز، فقط تهران"
        aside="۸۵٬۰۰۰ تومان"
      />
      <RadioCard value="pickup" title="تحویل حضوری" description="به‌زودی" disabled />
    </RadioGroup>
  ),
};
