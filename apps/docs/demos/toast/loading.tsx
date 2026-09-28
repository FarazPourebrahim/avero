"use client";

import { Button, ToastProvider, useToast } from "@averoui/react";
import { useCopy } from "../copy";

// Stands in for a request: resolves or rejects after a second and a half.
function send(succeed: boolean) {
  return new Promise<void>((resolve, reject) =>
    window.setTimeout(() => (succeed ? resolve() : reject(new Error("offline"))), 1500),
  );
}

function Triggers() {
  const { toast, update, promise } = useToast();
  const t = useCopy({
    fa: {
      sendButton: "ارسال پیام",
      failButton: "ارسال ناموفق",
      sending: "در حال ارسال…",
      sent: "پیام ارسال شد",
      failed: "ارسال نشد",
      failedBody: "اتصال اینترنت را بررسی کنید.",
    },
    en: {
      sendButton: "Send message",
      failButton: "Failed send",
      sending: "Sending…",
      sent: "Message sent",
      failed: "Couldn't send",
      failedBody: "Check your internet connection.",
    },
  });

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          void promise(send(true), {
            loading: { title: t.sending },
            success: { title: t.sent },
            error: { title: t.failed },
          }).catch(() => {})
        }
      >
        {t.sendButton}
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          const id = toast({ tone: "loading", title: t.sending });
          try {
            await send(false);
            update(id, { tone: "success", title: t.sent });
          } catch {
            update(id, { tone: "danger", title: t.failed, description: t.failedBody });
          }
        }}
      >
        {t.failButton}
      </Button>
    </div>
  );
}

export default function ToastLoadingDemo() {
  return (
    <ToastProvider>
      <Triggers />
    </ToastProvider>
  );
}
