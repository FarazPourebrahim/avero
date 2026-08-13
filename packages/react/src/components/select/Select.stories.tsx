import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./Select.js";

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Categories: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="دسته‌بندی">
        <SelectValue placeholder="همه دسته‌ها" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>دسته‌ها</SelectLabel>
          <SelectItem value="all">همه دسته‌ها</SelectItem>
          <SelectItem value="ui">طراحی رابط کاربری</SelectItem>
          <SelectItem value="data">تحلیل داده</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectItem value="other">سایر</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Selected: Story = {
  render: () => (
    <Select defaultValue="ui">
      <SelectTrigger aria-label="دسته‌بندی">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ui">طراحی رابط کاربری</SelectItem>
        <SelectItem value="data">تحلیل داده</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger aria-label="دسته‌بندی">
        <SelectValue placeholder="همه دسته‌ها" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ui">طراحی رابط کاربری</SelectItem>
      </SelectContent>
    </Select>
  ),
};
