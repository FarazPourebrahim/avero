"use client";

import { Button, LiveRegion, VisuallyHidden } from "@averoui/react";
import { useState } from "react";
import { useCopy } from "../copy";

export default function LiveRegionDemo() {
  const [message, setMessage] = useState("");
  const t = useCopy({
    fa: { copy: "کپی لینک", context: " این مقاله", copied: "لینک کپی شد" },
    en: { copy: "Copy link", context: " to this article", copied: "Link copied" },
  });

  return (
    <>
      <Button variant="soft" onClick={() => setMessage(t.copied)}>
        {t.copy}
        <VisuallyHidden>{t.context}</VisuallyHidden>
      </Button>
      <span className="text-xs text-gray-500">{message || "—"}</span>
      <LiveRegion>{message}</LiveRegion>
    </>
  );
}
