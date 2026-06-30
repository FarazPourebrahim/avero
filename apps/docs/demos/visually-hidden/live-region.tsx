"use client";

import { Button, LiveRegion, VisuallyHidden } from "@avero/react";
import { useState } from "react";

export default function LiveRegionDemo() {
  const [message, setMessage] = useState("");

  return (
    <>
      <Button variant="soft" onClick={() => setMessage("لینک کپی شد")}>
        کپی لینک
        <VisuallyHidden> این مقاله</VisuallyHidden>
      </Button>
      <span className="text-xs text-gray-500">{message || "—"}</span>
      <LiveRegion>{message}</LiveRegion>
    </>
  );
}
