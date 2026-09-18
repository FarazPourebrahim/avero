"use client";

import { IconButton, Tooltip, TooltipProvider } from "@averoui/react";
import { Bookmark, Copy, Share2 } from "lucide-react";

export default function TooltipShareActionsDemo() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip content="لینک در حافظه کپی می‌شود">
          <IconButton label="کپی لینک" variant="soft">
            <Copy aria-hidden className="size-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content="در فهرست ذخیره‌شده‌ها">
          <IconButton label="ذخیره" variant="soft">
            <Bookmark aria-hidden className="size-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content="ارسال برای دوستان" side="bottom">
          <IconButton label="اشتراک‌گذاری" variant="soft">
            <Share2 aria-hidden className="size-4" />
          </IconButton>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
