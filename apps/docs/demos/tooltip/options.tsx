"use client";

import { IconButton, Tooltip, TooltipProvider } from "@avero/react";
import { Bookmark, Link2, Share2 } from "lucide-react";

export default function TooltipOptionsDemo() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center gap-3">
        <Tooltip content="ذخیره در فهرست من">
          <IconButton label="ذخیره">
            <Bookmark />
          </IconButton>
        </Tooltip>
        <Tooltip content="بدون فلش" showArrow={false}>
          <IconButton label="هم‌رسانی">
            <Share2 />
          </IconButton>
        </Tooltip>
        <Tooltip content="پس از یک ثانیه باز می‌شود" delayDuration={1000}>
          <IconButton label="رونوشت پیوند">
            <Link2 />
          </IconButton>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
