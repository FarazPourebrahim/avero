import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input.js";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  args: { placeholder: "جستجو...", "aria-label": "جستجو" },
  argTypes: { variant: { control: "inline-radio", options: ["filter", "soft", "slate"] } },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Filter: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Input {...args} variant="filter" />
      <Input {...args} variant="soft" />
      <Input {...args} variant="slate" />
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Input {...args} defaultValue="طراحی رابط کاربری" />
      <Input {...args} aria-invalid defaultValue="a" />
      <Input {...args} disabled defaultValue="غیرفعال" />
    </div>
  ),
};
