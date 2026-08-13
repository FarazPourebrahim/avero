import type { Meta, StoryObj } from "@storybook/react-vite";
import { Menu } from "lucide-react";
import { Avatar } from "../avatar/Avatar.js";
import { Link } from "../link/Link.js";
import { SiteHeader, SiteHeaderMenuButton } from "./SiteHeader.js";

const NAV = [
  { label: "خانه", href: "#" },
  { label: "دوره‌ها", href: "#" },
  { label: "کارگاه‌ها", href: "#" },
  { label: "وبلاگ", href: "#" },
  { label: "درباره‌ما", href: "#", current: true },
];

const meta: Meta<typeof SiteHeader> = {
  title: "Layout/SiteHeader",
  component: SiteHeader,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SiteHeader>;

export const Default: Story = {
  render: (args) => (
    <div className="min-h-[220px] bg-gray-50">
      <SiteHeader
        {...args}
        sticky={false}
        menu={
          <SiteHeaderMenuButton aria-label="باز کردن منو">
            <Menu className="size-5" />
          </SiteHeaderMenuButton>
        }
        logo={
          <a href="#" aria-label="Avero" className="flex items-center gap-x-3 py-2">
            <span className="text-primary text-lg font-black">Avero</span>
          </a>
        }
        nav={NAV.map((item) => (
          <Link
            key={item.label}
            variant="nav"
            href={item.href}
            aria-current={item.current ? "page" : undefined}
            className={item.current ? "font-bold" : undefined}
          >
            {item.label}
          </Link>
        ))}
        actions={
          <a href="#" title="پیشخوان">
            <Avatar name="فراز" size="md" />
          </a>
        }
      />
      <div className="p-8 text-sm text-gray-400">محتوای صفحه</div>
    </div>
  ),
};
