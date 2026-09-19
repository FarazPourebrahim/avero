"use client";

import { usePreviewSettings } from "@/components/preview-settings.context";

/**
 * Sample copy for a demo, in the language the preview is showing.
 *
 * Demos are written Persian first, the way the library is, with an English counterpart so a reader
 * who switches a preview to English reads the example instead of decoding it. Both languages sit in
 * the demo file itself, so the snippet on the Code tab stays complete and runnable.
 */
export function useCopy<T>(copy: { fa: T; en: T }): T {
  const { dir } = usePreviewSettings();
  return dir === "rtl" ? copy.fa : copy.en;
}
