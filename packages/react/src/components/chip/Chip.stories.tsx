import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "lucide-react";
import { Chip } from "./Chip.js";

const meta = {
  title: "Primitives/Chip",
  component: Chip,
  args: { children: "طراحی" },
  argTypes: {
    variant: {
      control: "select",
      options: ["category", "link", "tag", "footer", "mini", "skill"],
    },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-wrap gap-2">
        <Chip>طراحی رابط کاربری</Chip>
        <Chip size="sm">آنلاین</Chip>
        <Chip variant="mini">Figma</Chip>
        <Chip variant="skill">React</Chip>
        <Chip variant="skill">طراحی تعاملی</Chip>
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip asChild variant="link">
          <a href="#design">طراحی</a>
        </Chip>
        <Chip asChild variant="link">
          <a href="#career">مسیر شغلی</a>
        </Chip>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Chip asChild variant="tag">
          <a href="#typescript">
            <Tag aria-hidden />
            <span>TypeScript</span>
          </a>
        </Chip>
        <Chip asChild variant="tag">
          <a href="#accessibility">
            <Tag aria-hidden />
            <span>دسترس‌پذیری</span>
          </a>
        </Chip>
      </div>
      <div className="bg-background flex flex-wrap gap-3 p-4">
        <Chip asChild variant="footer">
          <a href="#programming">برنامه‌نویسی</a>
        </Chip>
        <Chip asChild variant="footer">
          <a href="#react">React</a>
        </Chip>
      </div>
    </div>
  ),
};
