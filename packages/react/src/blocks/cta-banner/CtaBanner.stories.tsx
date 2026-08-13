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
    eyebrow: "مأموریت ما",
    title: "یادگیری بدون مرز، برای همه",
    children:
      "هدف ما فقط برگزاری چند دوره نیست؛ می‌خواهیم جایی بسازیم که هر کسی بتواند با سرعت خودش مهارتی تازه بیاموزد و آن را در کار و زندگی به کار بگیرد.",
  },
};

export const TitleOnly: Story = {
  args: { title: "یادگیری بدون مرز، برای همه" },
};
