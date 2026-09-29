// Tells `@averoui/tokens/base.css` whether the page has a classic scrollbar, so an overlay's scroll
// lock only keeps a scrollbar gutter that was actually there (decision D-36).

export const SCROLLBAR_ATTRIBUTE = "data-avero-scrollbar";

let subscribers = 0;
let stop: (() => void) | null = null;

function update() {
  const root = document.documentElement;
  // While an overlay has scrolling locked, a reserved gutter keeps `clientWidth` narrower, so a
  // page that had a scrollbar keeps reading as `visible` and one that had none as `none`.
  const value = window.innerWidth > root.clientWidth ? "visible" : "none";
  if (root.getAttribute(SCROLLBAR_ATTRIBUTE) !== value)
    root.setAttribute(SCROLLBAR_ATTRIBUTE, value);
}

function start(): () => void {
  update();
  // The root's box grows and shrinks with the content, which is what makes a scrollbar appear.
  const observer = typeof ResizeObserver === "function" ? new ResizeObserver(update) : null;
  observer?.observe(document.documentElement);
  window.addEventListener("resize", update);
  return () => {
    observer?.disconnect();
    window.removeEventListener("resize", update);
    document.documentElement.removeAttribute(SCROLLBAR_ATTRIBUTE);
  };
}

/**
 * Keeps `data-avero-scrollbar` on `<html>` set to `visible` or `none` until the returned function
 * is called. Shared between every caller, so nested providers observe the page once.
 */
export function trackScrollbar(): () => void {
  subscribers += 1;
  if (subscribers === 1) stop = start();
  let released = false;
  return () => {
    if (released) return;
    released = true;
    subscribers -= 1;
    if (subscribers === 0) {
      stop?.();
      stop = null;
    }
  };
}
