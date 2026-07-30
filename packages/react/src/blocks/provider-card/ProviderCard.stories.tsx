import type { Meta, StoryObj } from "@storybook/react-vite";
import { Rating } from "../../components/rating/index.js";
import { ProviderCard } from "./ProviderCard.js";

const meta: Meta<typeof ProviderCard> = {
  title: "Blocks/ProviderCard",
  component: ProviderCard,
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProviderCard>;

export const Provider: Story = {
  args: {
    name: "زینب فلاح",
    headline: "طراحی سایت و سئو",
    stats: [
      { label: "تعداد خدمات", value: "1" },
      { label: "امتیاز رضایت", value: <Rating value={0} size="sm" /> },
    ],
    profileHref: "#",
  },
};

export const WithoutStats: Story = {
  args: { name: "زینب فلاح", headline: "طراحی سایت و سئو", profileHref: "#" },
};
