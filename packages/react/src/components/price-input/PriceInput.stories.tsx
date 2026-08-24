import type { Meta, StoryObj } from "@storybook/react-vite";
import { PriceInput } from "./PriceInput.js";

const meta: Meta<typeof PriceInput> = {
  title: "Forms/PriceInput",
  component: PriceInput,
  args: { "aria-label": "بودجه", placeholder: "مبلغ به تومان" },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PriceInput>;

export const Empty: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <PriceInput {...args} defaultValue={2_500_000} />
      <PriceInput {...args} variant="soft" defaultValue={12_000_000} />
      <PriceInput {...args} variant="slate" defaultValue={480_000} currency="ریال" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <PriceInput {...args} defaultValue={100} aria-invalid />
      <PriceInput {...args} defaultValue={750_000} disabled />
    </div>
  ),
};
