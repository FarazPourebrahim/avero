import { useEffect, useRef } from "react";

type AutoFocusHandler = (event: Event) => void;

/**
 * Returns focus to whatever opened a Radix dialog. Radix only refocuses its own `Trigger`, so a
 * dialog opened from a menu or from code would drop focus to `<body>` on close. The consumer's
 * handlers run first; a `preventDefault()` there still wins.
 */
export function useReturnFocus(
  onOpenAutoFocus?: AutoFocusHandler,
  onCloseAutoFocus?: AutoFocusHandler,
) {
  const returnFocus = useRef<HTMLElement | null>(null);
  const stopWatching = useRef<(() => void) | null>(null);

  useEffect(() => () => stopWatching.current?.(), []);

  return {
    onOpenAutoFocus(event: Event) {
      // Runs before Radix moves focus into the content, so this is still the opener.
      const active = document.activeElement;
      returnFocus.current =
        active instanceof HTMLElement && active !== document.body ? active : null;

      // A menu item that opens a dialog is removed with its menu, and the menu then puts focus back
      // on its own trigger, which the dialog's focus trap bounces straight back. Once the opener is
      // gone, that trigger is where focus belongs when the dialog closes. While the opener is still
      // in the page, focus moving elsewhere (into a nested dialog, say) does not replace it.
      const content = event.target instanceof Node ? event.target : null;
      function onFocusIn(focus: FocusEvent) {
        const target = focus.target;
        if (returnFocus.current?.isConnected) return;
        if (target instanceof HTMLElement && !content?.contains(target)) {
          returnFocus.current = target;
        }
      }
      stopWatching.current?.();
      document.addEventListener("focusin", onFocusIn, true);
      stopWatching.current = () => {
        document.removeEventListener("focusin", onFocusIn, true);
        stopWatching.current = null;
      };

      onOpenAutoFocus?.(event);
    },
    onCloseAutoFocus(event: Event) {
      stopWatching.current?.();
      onCloseAutoFocus?.(event);
      const target = returnFocus.current;
      returnFocus.current = null;
      if (event.defaultPrevented || !target?.isConnected) return;
      event.preventDefault();
      target.focus();
    },
  };
}
