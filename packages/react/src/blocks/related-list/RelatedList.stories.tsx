import type { Meta, StoryObj } from "@storybook/react-vite";
import { RelatedItem, RelatedList } from "./RelatedList.js";

const meta: Meta<typeof RelatedList> = {
  title: "Blocks/RelatedList",
  component: RelatedList,
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RelatedList>;

export const RelatedCourses: Story = {
  render: () => (
    <RelatedList title="دوره‌های مرتبط">
      <RelatedItem title="طراحی سیستم طراحی در Figma" href="#" price={3500000} />
      <RelatedItem title="اصول تایپوگرافی فارسی" href="#" price={2200000} />
      <RelatedItem title="کارگاه آزمون کاربردپذیری" href="#" meta={<span>رایگان</span>} />
    </RelatedList>
  ),
};
