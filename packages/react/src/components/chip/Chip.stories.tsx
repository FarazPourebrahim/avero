import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "lucide-react";
import { Chip } from "./Chip.js";

const meta = {
  title: "Primitives/Chip",
  component: Chip,
  args: { children: "سئو" },
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
        <Chip>طراحی UI/UX</Chip>
        <Chip size="sm">remote</Chip>
        <Chip variant="mini">وردپرس</Chip>
        <Chip variant="skill">WordPress</Chip>
        <Chip variant="skill">سئو (SEO)</Chip>
      </div>
      <div className="flex flex-wrap gap-2">
        <Chip asChild variant="link">
          <a href="#frylnsry">فریلنسری</a>
        </Chip>
        <Chip asChild variant="link">
          <a href="#bazar-kar">بازار کار</a>
        </Chip>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Chip asChild variant="tag">
          <a href="#php">
            <Tag aria-hidden />
            <span>PHP</span>
          </a>
        </Chip>
        <Chip asChild variant="tag">
          <a href="#laravel">
            <Tag aria-hidden />
            <span>Laravel</span>
          </a>
        </Chip>
      </div>
      <div className="bg-background flex flex-wrap gap-3 p-4">
        <Chip asChild variant="footer">
          <a href="#web-design">طراحی سایت</a>
        </Chip>
        <Chip asChild variant="footer">
          <a href="#react">React</a>
        </Chip>
      </div>
    </div>
  ),
};
