import type { Meta, StoryObj } from "@storybook/react-vite";
import { Award, LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import { Avatar } from "../avatar/Avatar.js";
import { Button } from "../button/Button.js";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./DropdownMenu.js";

function UserMenu({ defaultOpen }: { defaultOpen?: boolean }) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="منوی حساب کاربری"
          className="focus-visible:ring-primary/40 rounded-2xl focus-visible:ring-2 focus-visible:outline-none"
        >
          <Avatar name="سارا محمدی" size="lg" className="rounded-2xl" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>سارا محمدی</DropdownMenuLabel>
        <DropdownMenuItem>
          <User aria-hidden />
          مشاهده پروفایل
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Award aria-hidden />
          گواهی‌های من
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings aria-hidden />
          تنظیمات
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem tone="danger">
          <LogOut aria-hidden />
          خروج از حساب
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ViewOptions({ defaultOpen }: { defaultOpen?: boolean }) {
  const [compact, setCompact] = useState(false);
  const [sort, setSort] = useState("newest");
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">نمایش</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem checked={compact} onCheckedChange={setCompact}>
          نمایش فشرده
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>مرتب‌سازی</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="newest">جدیدترین</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="popular">محبوب‌ترین</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>زبان محتوا</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>فارسی</DropdownMenuItem>
            <DropdownMenuItem>English</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const meta = {
  title: "Overlays/DropdownMenu",
  component: UserMenu,
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const User_: Story = { name: "User menu" };

export const UserOpen: Story = { name: "User menu (open)", args: { defaultOpen: true } };

export const Options: Story = { render: () => <ViewOptions /> };

export const OptionsOpen: Story = {
  name: "Options (open)",
  render: () => <ViewOptions defaultOpen />,
};
