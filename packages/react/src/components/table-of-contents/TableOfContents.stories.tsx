import type { Meta, StoryObj } from "@storybook/react-vite";
import { TableOfContents, type TocItem } from "./TableOfContents.js";

const ITEMS: TocItem[] = [
  { id: "intro", label: "آشنایی با طراحی رابط کاربری" },
  { id: "principles", label: "اصول پایه طراحی" },
  { id: "layout", label: "چیدمان و فاصله‌گذاری" },
  { id: "color", label: "رنگ و کنتراست" },
  { id: "hierarchy", label: "سلسله‌مراتب بصری", level: 3 },
  { id: "legibility", label: "خوانایی متن", level: 3 },
  { id: "first-project", label: "چطور اولین پروژه طراحی را شروع کنیم؟" },
  { id: "summary", label: "جمع‌بندی" },
];

const meta = {
  title: "Navigation/TableOfContents",
  component: TableOfContents,
  args: { items: ITEMS, spy: false },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TableOfContents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Article: Story = {};

export const ActiveSection: Story = {
  args: { defaultActiveId: "first-project" },
};
