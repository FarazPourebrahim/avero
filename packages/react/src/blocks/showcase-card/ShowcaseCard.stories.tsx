import type { Meta, StoryObj } from "@storybook/react-vite";
import { ShowcaseCard } from "./ShowcaseCard.js";

const meta: Meta<typeof ShowcaseCard> = {
  title: "Blocks/ShowcaseCard",
  component: ShowcaseCard,
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ShowcaseCard>;

export const Showcase: Story = {
  args: {
    title: "اپلیکیشن مدیریت کارها",
    href: "#",
    description: "پروژه پایانی دوره طراحی رابط کاربری برای یک اپلیکیشن مدیریت کارهای روزانه",
    tags: ["Figma"],
    likes: 0,
    onShare: () => {},
  },
};

export const ManyTags: Story = {
  args: {
    title: "داشبورد تحلیل فروش",
    href: "#",
    description: "نمایش داده‌های فروش با نمودارهای تعاملی",
    tags: ["React", "TypeScript", "Recharts"],
    likes: 12,
    liked: true,
    onShare: () => {},
  },
};

export const TitleOnly: Story = {
  args: { title: "پروژه بدون جزئیات" },
};
