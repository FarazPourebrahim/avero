import type { Meta, StoryObj } from "@storybook/react-vite";
import { LayoutDashboard, Menu } from "lucide-react";
import { useState } from "react";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerTitle } from "./Drawer.js";

const meta: Meta<typeof Drawer> = {
  title: "Overlays/Drawer",
  component: Drawer,
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const NAV = ["پیشخوان", "مشاهده پروفایل", "خدمات من", "نمونه‌کارها", "تنظیمات"];

/**
 * The panel portals into this box rather than `document.body`, so the story is captured inside the
 * Storybook root. Applications leave `container` unset.
 */
function DrawerStage({ side, size }: { side?: "start" | "end"; size?: "wide" | "panel" }) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setContainer}
      className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50"
    >
      <p className="p-4 text-sm text-gray-400">صفحه پشت کشو</p>
      <Drawer defaultOpen modal={false}>
        <DrawerContent
          container={container}
          side={side}
          size={size}
          overlayClassName="absolute"
          className="absolute"
          aria-describedby={undefined}
        >
          <DrawerHeader icon={<LayoutDashboard className="size-4 text-gray-500" />}>
            <DrawerTitle>منوی داشبورد</DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            {NAV.map((item, index) => (
              <a
                key={item}
                href="#"
                className={
                  index === 0
                    ? "bg-primary flex w-full items-center gap-x-3 rounded-2xl px-3 py-4 text-sm font-medium text-white shadow-md"
                    : "flex w-full items-center gap-x-3 rounded-2xl px-3 py-4 text-sm font-medium text-zinc-600"
                }
              >
                {item}
              </a>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export const DashboardMenu: Story = {
  render: () => <DrawerStage />,
};

export const HeaderMenu: Story = {
  render: () => <DrawerStage side="start" size="wide" />,
};

export const Closed: Story = {
  render: () => (
    <div className="flex h-40 items-start">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm"
      >
        <Menu className="size-4" />
        باز کردن منو
      </button>
    </div>
  ),
};
