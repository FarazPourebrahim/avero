import type { Meta, StoryObj } from "@storybook/react-vite";
import { NativeSelect } from "./NativeSelect.js";

const meta: Meta<typeof NativeSelect> = {
  title: "Forms/NativeSelect",
  component: NativeSelect,
  args: { "aria-label": "مرتب‌سازی" },
};

export default meta;
type Story = StoryObj<typeof NativeSelect>;

export const Sort: Story = {
  render: (args) => (
    <NativeSelect {...args}>
      <option value="newest">جدیدترین</option>
      <option value="oldest">قدیمی‌ترین</option>
      <option value="popular">محبوب‌ترین</option>
      <option value="price_asc">ارزان‌ترین</option>
      <option value="price_desc">گران‌ترین</option>
    </NativeSelect>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <NativeSelect {...args}>
      <option value="newest">جدیدترین</option>
    </NativeSelect>
  ),
};
