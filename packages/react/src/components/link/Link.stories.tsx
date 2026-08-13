import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, House, Package } from "lucide-react";
import { Link } from "./Link.js";

const meta = {
  title: "Primitives/Link",
  component: Link,
  args: { href: "#", children: "Avero" },
  argTypes: {
    variant: {
      control: "select",
      options: ["nav", "drawer", "prose", "chrome", "subtle", "brand"],
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Navigation: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <nav aria-label="header" className="flex gap-10">
        <Link href="#home" variant="nav" current>
          خانه
        </Link>
        <Link href="#courses" variant="nav">
          دوره‌ها
        </Link>
        <Link href="#blog" variant="nav">
          وبلاگ
        </Link>
      </nav>
      <nav aria-label="drawer" className="flex flex-col gap-6">
        <Link href="#home" variant="drawer">
          <House />
          خانه
        </Link>
        <Link href="#courses" variant="drawer">
          <Package />
          دوره‌ها
        </Link>
      </nav>
    </div>
  ),
};

export const Inline: Story = {
  render: () => (
    <div className="flex flex-col gap-4 text-base leading-8 text-gray-700">
      <p>
        اگر مدرس هستید، دوره خود را در <Link href="#register">Avero</Link> منتشر کنید.
      </p>
      <p className="bg-background p-3 text-sm">
        ایمیل :{" "}
        <Link href="mailto:hello@example.com" variant="chrome" dir="ltr">
          hello@example.com
        </Link>
      </p>
      <p className="text-text-subtle text-xs">
        تمامی حقوق برای
        <Link href="#home" variant="brand" className="mx-1">
          Avero
        </Link>
        محفوظ است
      </p>
      <Link href="#courses" variant="subtle">
        <ArrowRight className="size-5 ltr:-scale-x-100" aria-hidden />
        <span>بازگشت به فهرست دوره‌ها</span>
      </Link>
      <Link href="https://example.com" external>
        لینک خارجی
      </Link>
    </div>
  ),
};
