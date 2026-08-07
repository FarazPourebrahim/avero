import type { Meta, StoryObj } from "@storybook/react-vite";
import { PriceCard } from "./PriceCard.js";

const meta: Meta<typeof PriceCard> = {
  title: "Blocks/PriceCard",
  component: PriceCard,
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PriceCard>;

export const BasePrice: Story = { args: { amount: 20000000 } };

export const CustomLabel: Story = {
  args: { amount: 4500000, label: "قیمت هر ساعت مشاوره" },
};
