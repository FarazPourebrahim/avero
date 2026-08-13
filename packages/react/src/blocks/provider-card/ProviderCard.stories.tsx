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
    name: "نگار رضایی",
    headline: "مدرس طراحی رابط کاربری",
    stats: [
      { label: "تعداد دوره‌ها", value: "3" },
      { label: "امتیاز شرکت‌کنندگان", value: <Rating value={4.8} size="sm" /> },
    ],
    profileHref: "#",
  },
};

export const WithoutStats: Story = {
  args: { name: "نگار رضایی", headline: "مدرس طراحی رابط کاربری", profileHref: "#" },
};
