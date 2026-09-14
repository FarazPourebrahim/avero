"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type PreviewDirection = "rtl" | "ltr";

export type PreviewSettings = {
  dir: PreviewDirection;
  locale: string;
  lang: string;
  setDirection: (dir: PreviewDirection) => void;
};

// Direction and locale move together, the way AveroProvider derives one from the other: a Persian
// locale is right-to-left, anything else is left-to-right.
const LOCALES: Record<PreviewDirection, { locale: string; lang: string }> = {
  rtl: { locale: "fa-IR", lang: "fa" },
  ltr: { locale: "en-US", lang: "en" },
};

const STORAGE_KEY = "avero-docs-preview-direction";
const DEFAULT_DIRECTION: PreviewDirection = "rtl";

function isDirection(value: unknown): value is PreviewDirection {
  return value === "rtl" || value === "ltr";
}

function readStoredDirection(): PreviewDirection | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isDirection(stored) ? stored : null;
  } catch {
    // Private windows and blocked site data make storage throw; the default still works.
    return null;
  }
}

const PreviewSettingsContext = createContext<PreviewSettings | null>(null);

/**
 * Holds the direction and locale every live demo on the site renders in, so the choice survives
 * navigation between pages and reloads instead of resetting per preview.
 */
export function PreviewSettingsProvider({ children }: { children: ReactNode }) {
  const [dir, setDir] = useState<PreviewDirection>(DEFAULT_DIRECTION);

  // Read after mount: the server has no storage, so reading during render would mismatch hydration.
  useEffect(() => {
    const stored = readStoredDirection();
    if (stored) {
      setDir(stored);
    }
  }, []);

  const setDirection = useCallback((next: PreviewDirection) => {
    setDir(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference is lost on reload, which is preferable to breaking the switch.
    }
  }, []);

  const value = useMemo<PreviewSettings>(
    () => ({ dir, ...LOCALES[dir], setDirection }),
    [dir, setDirection],
  );

  return (
    <PreviewSettingsContext.Provider value={value}>{children}</PreviewSettingsContext.Provider>
  );
}

/** Returns the site-wide preview direction and locale. */
export function usePreviewSettings(): PreviewSettings {
  const settings = useContext(PreviewSettingsContext);
  if (!settings) {
    throw new Error("usePreviewSettings must be used inside PreviewSettingsProvider");
  }
  return settings;
}
