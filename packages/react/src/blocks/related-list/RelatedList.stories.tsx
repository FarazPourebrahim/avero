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

export const RelatedServices: Story = {
  render: () => (
    <RelatedList title="خدمات مرتبط">
      <RelatedItem title="سئو SEO سایت با رویکرد فروش" href="#" price={35000000} />
      <RelatedItem title="طراحی فروشگاه اینترنتی" href="#" price={52000000} />
      <RelatedItem title="طراحی لوگو و هویت بصری" href="#" meta={<span>توافقی</span>} />
    </RelatedList>
  ),
};
