"use client";

import { WelcomeCard } from "@averoui/react";
import { useCopy } from "../copy";

export default function WelcomeCardDashboardDemo() {
  const t = useCopy({
    fa: { name: "سارا محمدی" },
    en: { name: "Sara Mohammadi" },
  });

  return (
    <div className="w-full max-w-xs">
      <WelcomeCard name={t.name} />
    </div>
  );
}
