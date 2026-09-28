"use client";

import {
  ConfirmDialog,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@averoui/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function ContextMenuWithDialogDemo() {
  const [confirming, setConfirming] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const t = useCopy({
    fa: {
      message: "فایل ارائه را در پوشه مشترک گذاشتم.",
      removed: "این پیام حذف شد.",
      remove: "حذف پیام",
      title: "این پیام حذف شود؟",
      description: "پیام برای همه اعضای گفت‌وگو پاک می‌شود.",
    },
    en: {
      message: "I've put the slides in the shared folder.",
      removed: "This message was deleted.",
      remove: "Delete message",
      title: "Delete this message?",
      description: "It is removed for everyone in the conversation.",
    },
  });

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <p
            tabIndex={0}
            className="focus-visible:ring-primary/40 max-w-sm rounded-2xl bg-white p-4 text-sm leading-7 text-gray-700 shadow-xs focus-visible:ring-2 focus-visible:outline-none"
          >
            {deleted ? t.removed : t.message}
          </p>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem tone="danger" disabled={deleted} onSelect={() => setConfirming(true)}>
            <Trash2 aria-hidden />
            {t.remove}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {/* Controlled, with no trigger: closing returns focus to the message. */}
      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        tone="danger"
        title={t.title}
        description={t.description}
        confirmLabel={t.remove}
        onConfirm={() => setDeleted(true)}
      />
    </>
  );
}
