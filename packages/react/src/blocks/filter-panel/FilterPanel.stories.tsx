import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../../components/input/index.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/select/index.js";
import { FilterPanel } from "./FilterPanel.js";

const meta: Meta<typeof FilterPanel> = {
  title: "Blocks/FilterPanel",
  component: FilterPanel,
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FilterPanel>;

export const Listing: Story = {
  render: () => (
    <FilterPanel>
      <Input aria-label="جستجو" placeholder="جستجو..." />
      <Select>
        <SelectTrigger aria-label="دسته‌بندی">
          <SelectValue placeholder="همه دسته‌ها" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">همه دسته‌ها</SelectItem>
          <SelectItem value="design">طراحی</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="newest">
        <SelectTrigger aria-label="مرتب‌سازی">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">جدیدترین</SelectItem>
          <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
          <SelectItem value="popular">محبوب‌ترین</SelectItem>
          <SelectItem value="price_asc">ارزان‌ترین</SelectItem>
          <SelectItem value="price_desc">گران‌ترین</SelectItem>
        </SelectContent>
      </Select>
    </FilterPanel>
  ),
};

export const SearchOnly: Story = {
  render: () => (
    <FilterPanel>
      <Input aria-label="جستجو" placeholder="جستجو..." />
    </FilterPanel>
  ),
};
