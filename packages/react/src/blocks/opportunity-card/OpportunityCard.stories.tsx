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
    title: "کارگاه طراحی تجربه کاربری",
    href: "#",
    date: "15 مهر",
    tags: ["آنلاین"],
    description: "کارگاه عملی سه‌روزه برای آشنایی با فرایند طراحی و آزمون کاربردپذیری",
    capacityLabel: "ظرفیت ثبت‌نام",
    value: 3,
    max: 12,
    status: "9 جای خالی",
    startCaption: "3 نفر ثبت‌نام کرده‌اند",
    endCaption: "حداکثر 12 نفر",
  },
};

export const Full: Story = {
  args: {
    title: "کارگاه عکاسی با موبایل",
    href: "#",
    date: "22 مهر",
    tags: ["حضوری"],
    capacityLabel: "ظرفیت ثبت‌نام",
    value: 5,
    max: 5,
    status: "ظرفیت تکمیل شد",
    startCaption: "5 نفر ثبت‌نام کرده‌اند",
    endCaption: "حداکثر 5 نفر",
    full: true,
  },
};
