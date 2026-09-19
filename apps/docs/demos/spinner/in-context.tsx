"use client";

import { Button, Spinner } from "@averoui/react";
import { useCopy } from "../copy";

export default function SpinnerInContext() {
  const t = useCopy({
    fa: {
      sending: "در حال ارسال",
      loadingLabel: "در حال بارگذاری نظرات",
      loading: "در حال بارگذاری نظرات…",
    },
    en: {
      sending: "Sending",
      loadingLabel: "Loading comments",
      loading: "Loading comments…",
    },
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <Button loading>{t.sending}</Button>
      <p
        role="status"
        className="flex items-center gap-2 text-sm text-gray-600"
        aria-label={t.loadingLabel}
      >
        <Spinner size="sm" />
        {t.loading}
      </p>
    </div>
  );
}
