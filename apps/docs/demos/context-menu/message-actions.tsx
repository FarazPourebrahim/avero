"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@averoui/react";
import { Copy, Forward, Reply, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function ContextMenuMessageActionsDemo() {
  const [status, setStatus] = useState("");
  const t = useCopy({
    fa: {
      message: "سلام، جلسه فردا ساعت ۱۰ در اتاق شماره ۲ برگزار می‌شود.",
      hint: "روی پیام راست‌کلیک کنید، روی آن نگه دارید، یا آن را انتخاب کنید و کلید منو را بزنید.",
      label: "پیام",
      reply: "پاسخ",
      copy: "کپی متن",
      forward: "ارسال به",
      design: "گروه طراحی",
      engineering: "گروه فنی",
      remove: "حذف پیام",
      chose: (action: string) => `انتخاب شد: ${action}`,
    },
    en: {
      message: "Hi, tomorrow's meeting is at 10 in room 2.",
      hint: "Right-click the message, long-press it, or focus it and press the menu key.",
      label: "Message",
      reply: "Reply",
      copy: "Copy text",
      forward: "Forward to",
      design: "Design team",
      engineering: "Engineering team",
      remove: "Delete message",
      chose: (action: string) => `Chose: ${action}`,
    },
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <p
            tabIndex={0}
            className="focus-visible:ring-primary/40 max-w-sm rounded-2xl bg-white p-4 text-sm leading-7 text-gray-700 shadow-xs focus-visible:ring-2 focus-visible:outline-none"
          >
            {t.message}
          </p>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>{t.label}</ContextMenuLabel>
          <ContextMenuItem onSelect={() => setStatus(t.chose(t.reply))}>
            <Reply aria-hidden />
            {t.reply}
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => setStatus(t.chose(t.copy))}>
            <Copy aria-hidden />
            {t.copy}
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Forward aria-hidden />
              {t.forward}
            </ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem onSelect={() => setStatus(t.chose(t.design))}>
                {t.design}
              </ContextMenuItem>
              <ContextMenuItem onSelect={() => setStatus(t.chose(t.engineering))}>
                {t.engineering}
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem tone="danger" onSelect={() => setStatus(t.chose(t.remove))}>
            <Trash2 aria-hidden />
            {t.remove}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <p className="text-xs text-gray-500">{t.hint}</p>
      <p role="status" className="min-h-5 text-sm text-gray-700">
        {status}
      </p>
    </div>
  );
}
