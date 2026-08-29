import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/Button.js";
import { Checkbox } from "../checkbox/Checkbox.js";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./Popover.js";

function FilterPopover({
  defaultOpen,
  align,
}: {
  defaultOpen?: boolean;
  align?: "start" | "center" | "end";
}) {
  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">فیلترها</Button>
      </PopoverTrigger>
      <PopoverContent aria-labelledby="filter-title" align={align} className="flex flex-col gap-3">
        <p id="filter-title" className="font-bold text-gray-900">
          فیلتر دوره‌ها
        </p>
        <div className="flex items-center gap-2">
          <Checkbox id="free-only" />
          <label htmlFor="free-only">فقط دوره‌های رایگان</label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="certificate" defaultChecked />
          <label htmlFor="certificate">دارای گواهی</label>
        </div>
        <PopoverClose asChild>
          <Button size="sm" className="self-end">
            اعمال فیلترها
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

const meta = {
  title: "Overlays/Popover",
  component: FilterPopover,
  decorators: [
    (Story) => (
      <div className="flex min-h-64 justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filters: Story = {};

export const Open: Story = { args: { defaultOpen: true } };

export const AlignedToStart: Story = { args: { defaultOpen: true, align: "start" } };
