import type { Meta, StoryObj } from "@storybook/react-vite";
import { Copy, Flag, Forward, Pin, Reply, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ContextMenu.js";

function MessageActions() {
  const [pinned, setPinned] = useState(false);
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <p
          tabIndex={0}
          className="focus-visible:ring-primary/40 max-w-sm rounded-2xl bg-white p-4 text-sm leading-7 text-gray-700 shadow-xs focus-visible:ring-2 focus-visible:outline-none"
        >
          سلام، جلسه فردا ساعت ۱۰ در اتاق شماره ۲ برگزار می‌شود. (برای دیدن گزینه‌ها راست‌کلیک
          کنید.)
        </p>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>پیام</ContextMenuLabel>
        <ContextMenuItem>
          <Reply aria-hidden />
          پاسخ
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy aria-hidden />
          کپی متن
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Forward aria-hidden />
            ارسال به
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>گروه طراحی</ContextMenuItem>
            <ContextMenuItem>گروه فنی</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuCheckboxItem checked={pinned} onCheckedChange={setPinned}>
          <Pin aria-hidden />
          سنجاق کردن
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Flag aria-hidden />
          گزارش
        </ContextMenuItem>
        <ContextMenuItem tone="danger">
          <Trash2 aria-hidden />
          حذف پیام
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

const meta = {
  title: "Overlays/ContextMenu",
  component: MessageActions,
} satisfies Meta<typeof MessageActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Message: Story = { name: "Message actions" };
