import type { Meta, StoryObj } from "@storybook/react-vite";
import { OpportunityCard } from "./OpportunityCard.js";

const meta: Meta<typeof OpportunityCard> = {
  title: "Blocks/OpportunityCard",
  component: OpportunityCard,
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OpportunityCard>;

export const Open: Story = {
  args: {
    title: "توسعه دهنده php",
    href: "#",
    date: "تاریخ نامشخص",
    tags: ["remote"],
    description: "توسعه بخش مدیریت سایت و رفع اشکالات موجود",
    capacityLabel: "ظرفیت ارسال رزومه",
    value: 3,
    max: 12,
    status: "9 جای خالی",
    startCaption: "3 رزومه ارسال شده",
    endCaption: "حداکثر 12 نفر",
  },
};

export const Full: Story = {
  args: {
    title: "تبدیل قالب HTML به وردپرس",
    href: "#",
    date: "تاریخ نامشخص",
    tags: ["freelance"],
    capacityLabel: "ظرفیت ارسال رزومه",
    value: 5,
    max: 5,
    status: "تکمیل ظرفیت",
    startCaption: "5 رزومه ارسال شده",
    endCaption: "حداکثر 5 نفر",
    full: true,
  },
};
