import type { Meta, StoryObj } from "@storybook/react-vite";
import { TableOfContents, type TocItem } from "./TableOfContents.js";

const ITEMS: TocItem[] = [
  { id: "what", label: "فریلنسری چیست؟" },
  { id: "who", label: "فریلنسر کیست؟" },
  { id: "how", label: "فریلنسری چگونه کار می‌کند؟" },
  { id: "benefits", label: "مزایای فریلنسری چیست؟" },
  { id: "flexibility", label: "انعطاف‌پذیری در زمان و مکان", level: 3 },
  { id: "clients", label: "امکان همکاری با چند کارفرما", level: 3 },
  { id: "first-project", label: "چگونه اولین پروژه فریلنسری خود را بگیریم؟" },
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
