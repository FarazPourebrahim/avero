"use client";

import { IconButton, Tooltip, TooltipProvider } from "@averoui/react";
import { Bookmark, Link2, Share2 } from "lucide-react";
import { useCopy } from "../copy";

export default function TooltipOptionsDemo() {
  const t = useCopy({
    fa: {
      saveTip: "ذخیره در فهرست من",
      saveLabel: "ذخیره",
      noArrowTip: "بدون فلش",
      shareLabel: "هم‌رسانی",
      delayedTip: "پس از یک ثانیه باز می‌شود",
      linkLabel: "رونوشت پیوند",
    },
    en: {
      saveTip: "Save to my list",
      saveLabel: "Save",
      noArrowTip: "No arrow",
      shareLabel: "Share",
      delayedTip: "Opens after one second",
      linkLabel: "Copy link",
    },
  });

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center gap-3">
        <Tooltip content={t.saveTip}>
          <IconButton label={t.saveLabel}>
            <Bookmark />
          </IconButton>
        </Tooltip>
        <Tooltip content={t.noArrowTip} showArrow={false}>
          <IconButton label={t.shareLabel}>
            <Share2 />
          </IconButton>
        </Tooltip>
        <Tooltip content={t.delayedTip} delayDuration={1000}>
          <IconButton label={t.linkLabel}>
            <Link2 />
          </IconButton>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
