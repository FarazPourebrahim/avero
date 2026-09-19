"use client";

import { Button } from "@averoui/react";
import { useCopy } from "../copy";

export default function ButtonStatesDemo() {
  const t = useCopy({
    fa: { comment: "ثبت نظر", request: "ارسال درخواست" },
    en: { comment: "Post comment", request: "Send request" },
  });

  return (
    <>
      <Button loading>{t.comment}</Button>
      <Button disabled>{t.comment}</Button>
      <Button variant="inverse" size="xl" block className="max-w-sm">
        {t.request}
      </Button>
    </>
  );
}
