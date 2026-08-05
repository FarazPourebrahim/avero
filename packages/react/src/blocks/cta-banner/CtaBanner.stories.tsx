import type { Meta, StoryObj } from "@storybook/react-vite";
import { CtaBanner } from "./CtaBanner.js";

const meta: Meta<typeof CtaBanner> = {
  title: "Blocks/CtaBanner",
  component: CtaBanner,
  decorators: [
    (Story) => (
      <div className="max-w-4xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CtaBanner>;

export const Mission: Story = {
  args: {
    eyebrow: "مأموریت و چشم‌انداز",
    title: "ساختن آینده‌ای که در آن تخصص و تلاش حد و مرزی ندارد",
    children:
      "هدف ما در دورلنسر تنها مدیریت چند پروژه نیست؛ ما در پی ایجاد اکوسیستمی پایدار و ارزش‌آفرین هستیم که در آن متخصصان بتوانند رشد شغلی و درآمدی مستقل را تجربه کنند.",
  },
};

export const TitleOnly: Story = {
  args: { title: "ساختن آینده‌ای که در آن تخصص و تلاش حد و مرزی ندارد" },
};
