"use client";

import { Button } from "@averoui/react";
import { useCopy } from "../copy";

export default function ButtonAsLinkDemo() {
  const t = useCopy({
    fa: { contact: "تماس با پشتیبانی" },
    en: { contact: "Contact support" },
  });

  return (
    <Button asChild variant="soft">
      <a href="#contact">{t.contact}</a>
    </Button>
  );
}
