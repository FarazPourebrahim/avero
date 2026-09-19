"use client";

import { IconButton, Tooltip, TooltipProvider } from "@averoui/react";
import { Bookmark, Copy, Share2 } from "lucide-react";
import { useCopy } from "../copy";

export default function TooltipShareActionsDemo() {
  const t = useCopy({
    fa: {
      copyTip: "لینک در حافظه کپی می‌شود",
      copyLabel: "کپی لینک",
      saveTip: "در فهرست ذخیره‌شده‌ها",
      saveLabel: "ذخیره",
      shareTip: "ارسال برای دوستان",
      shareLabel: "اشتراک‌گذاری",
    },
    en: {
      copyTip: "Copies the link to your clipboard",
      copyLabel: "Copy link",
      saveTip: "Adds it to your saved list",
      saveLabel: "Save",
      shareTip: "Send it to a friend",
      shareLabel: "Share",
    },
  });

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip content={t.copyTip}>
          <IconButton label={t.copyLabel} variant="soft">
            <Copy aria-hidden className="size-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content={t.saveTip}>
          <IconButton label={t.saveLabel} variant="soft">
            <Bookmark aria-hidden className="size-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content={t.shareTip} side="bottom">
          <IconButton label={t.shareLabel} variant="soft">
            <Share2 aria-hidden className="size-4" />
          </IconButton>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
