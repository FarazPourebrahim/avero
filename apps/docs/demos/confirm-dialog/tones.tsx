"use client";

import { Button, ConfirmDialog } from "@averoui/react";
import { useState } from "react";

export default function ConfirmDialogTonesDemo() {
  const [status, setStatus] = useState("");

  return (
    <div className="flex flex-col items-center gap-3">
      <ConfirmDialog
        trigger={<Button variant="outline">انتشار دوره</Button>}
        title="دوره منتشر شود؟"
        description="پس از انتشار، دوره برای همه قابل دیدن است و می‌توانید آن را دوباره پیش‌نویس کنید."
        confirmLabel="انتشار"
        cancelLabel="فعلاً نه"
        onConfirm={() => setStatus("دوره منتشر شد.")}
      />
      <p role="status" className="min-h-5 text-sm text-gray-700">
        {status}
      </p>
    </div>
  );
}
