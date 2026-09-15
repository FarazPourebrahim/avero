"use client";

import { AveroProvider } from "@avero/react";
import type { ReactNode } from "react";
import { DirectionSwitch } from "./DirectionSwitch";
import { usePreviewSettings } from "./preview-settings.context";

/**
 * Chrome-free preview surface: a thin bar to switch direction and leave, and the demo filling the
 * rest of the viewport at full width.
 */
export function FullPagePreview({ name, children }: { name: string; children: ReactNode }) {
  const { dir, lang, locale } = usePreviewSettings();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-fd-border bg-fd-background flex items-center gap-3 border-b px-4 py-2">
        <a href={`/docs/blocks/${name.split("/")[0]}`} className="text-fd-muted-foreground text-xs">
          ← Back to the documentation
        </a>
        <code className="text-fd-muted-foreground ms-auto text-xs">{name}</code>
        <DirectionSwitch />
      </header>
      <AveroProvider dir={dir} locale={locale}>
        <div dir={dir} lang={lang} className="bg-background flex-1 font-sans">
          {children}
        </div>
      </AveroProvider>
    </div>
  );
}
