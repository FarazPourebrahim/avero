import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "../../components/chip/index.js";
import { FolderTreeIcon } from "../../icons/internalIcons.js";
import { CategoryLinks } from "./CategoryLinks.js";

const meta: Meta<typeof CategoryLinks> = {
  title: "Blocks/CategoryLinks",
  component: CategoryLinks,
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CategoryLinks>;

const CATEGORIES = ["PHP", "Laravel", "برنامه‌نویسی وب", "API"];

export const RelatedCategories: Story = {
  render: () => (
    <CategoryLinks
      title="دسته‌بندی‌های مرتبط"
      description="دسته‌بندی‌ها و زمینه‌های تخصصی مربوط به این آگهی"
      icon={<FolderTreeIcon />}
    >
      {CATEGORIES.map((category) => (
        <Chip key={category} asChild variant="tag">
          <a href="#">{category}</a>
        </Chip>
      ))}
    </CategoryLinks>
  ),
};
