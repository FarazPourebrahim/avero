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
          <SelectItem value="seo">سئو</SelectItem>
          <SelectItem value="design">طراحی سایت</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectItem value="other">سایر</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const Selected: Story = {
  render: () => (
    <Select defaultValue="seo">
      <SelectTrigger aria-label="دسته‌بندی">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="seo">سئو</SelectItem>
        <SelectItem value="design">طراحی سایت</SelectItem>
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
        <SelectItem value="seo">سئو</SelectItem>
      </SelectContent>
    </Select>
  ),
};
