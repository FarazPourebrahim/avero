"use client";

import { AveroProvider } from "@avero/react";
import type { ReactNode } from "react";
import { DirectionSwitch } from "./DirectionSwitch";
import { usePreviewSettings } from "./preview-settings.context";

/**
 * Live preview surface. Direction and locale come from the site-wide setting, so switching once in
 * the navbar changes every demo on every page. The local switch writes to that same setting.
 */
export function PreviewFrame({ children }: { children: ReactNode }) {
  const { dir, lang, locale } = usePreviewSettings();

  return (
    <div className="flex flex-col">
      <div className="border-fd-border flex justify-end border-b p-2">
        <DirectionSwitch />
      </div>
      <AveroProvider dir={dir} locale={locale}>
        <div
          dir={dir}
          lang={lang}
          className="bg-background flex min-h-40 flex-wrap items-center justify-center gap-3 p-8 font-sans"
        >
          {children}
        </div>
      </AveroProvider>
    </div>
  );
}
