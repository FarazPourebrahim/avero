import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell } from "lucide-react";
import { Avatar } from "../avatar/Avatar.js";
import { Button } from "../button/Button.js";
import { Checkbox } from "../checkbox/Checkbox.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./Popover.js";

const NOTIFICATIONS = [
  { id: 1, name: "سارا محمدی", text: "به دیدگاه شما پاسخ داد.", time: "۵ دقیقه پیش", unread: true },
  {
    id: 2,
    name: "علی رضایی",
    text: "در دوره «طراحی رابط کاربری» ثبت‌نام کرد.",
    time: "۱ ساعت پیش",
    unread: true,
  },
  { id: 3, name: "مریم احمدی", text: "گواهی دوره شما صادر شد.", time: "دیروز", unread: false },
];

function NotificationMenu({ defaultOpen }: { defaultOpen?: boolean }) {
  const unread = NOTIFICATIONS.filter((item) => item.unread).length;
  return (
    <Popover defaultOpen={defaultOpen}>
      <PopoverTrigger asChild>
        <IconButton label={`اعلان‌ها، ${unread} خوانده‌نشده`} className="relative">
          <Bell aria-hidden className="size-5" />
          <span aria-hidden className="absolute end-1.5 top-1.5 size-2 rounded-full bg-red-500" />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent align="end" aria-labelledby="notifications-title" className="w-80 p-0">
        <p
          id="notifications-title"
          className="border-b border-gray-100 px-4 py-3 font-bold text-gray-900"
        >
          اعلان‌ها
        </p>
        <ul className="flex flex-col py-1">
          {NOTIFICATIONS.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 px-4 py-3 data-[unread=true]:bg-blue-50/50"
              data-unread={item.unread}
            >
              <Avatar name={item.name} size="sm" />
              <div className="flex flex-col gap-0.5">
                <p className="text-sm leading-6 text-gray-700">
                  <span className="font-bold text-gray-900">{item.name}</span> {item.text}
                </p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-100 p-2">
          <PopoverClose asChild>
            <Button variant="ghost" size="sm" className="w-full">
              مشاهده همه اعلان‌ها
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

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

export const Notifications: Story = { render: () => <NotificationMenu /> };

export const NotificationsOpen: Story = {
  name: "Notifications (open)",
  render: () => <NotificationMenu defaultOpen />,
};
