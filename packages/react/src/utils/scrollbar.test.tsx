import { act, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { AveroProvider } from "../i18n/AveroProvider.js";
import { SCROLLBAR_ATTRIBUTE, trackScrollbar } from "./scrollbar.js";

const root = document.documentElement;

/** jsdom has no layout, so the scrollbar is whatever the viewport and root widths say it is. */
function setWidths(viewport: number, client: number) {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: viewport });
  Object.defineProperty(root, "clientWidth", { configurable: true, value: client });
}

afterEach(() => {
  setWidths(1024, 1024);
});

describe("trackScrollbar", () => {
  it("marks a page with a classic scrollbar as visible", () => {
    setWidths(1024, 1009);

    const stop = trackScrollbar();

    expect(root).toHaveAttribute(SCROLLBAR_ATTRIBUTE, "visible");
    stop();
  });

  it("marks a page without a scrollbar, or with overlay scrollbars, as none", () => {
    setWidths(1024, 1024);

    const stop = trackScrollbar();

    expect(root).toHaveAttribute(SCROLLBAR_ATTRIBUTE, "none");
    stop();
  });

  it("follows the page as it gains a scrollbar", () => {
    setWidths(1024, 1024);
    const stop = trackScrollbar();

    setWidths(1024, 1009);
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(root).toHaveAttribute(SCROLLBAR_ATTRIBUTE, "visible");
    stop();
  });

  it("keeps the attribute until the last caller stops, then removes it", () => {
    const outer = trackScrollbar();
    const inner = trackScrollbar();

    inner();
    inner();
    expect(root).toHaveAttribute(SCROLLBAR_ATTRIBUTE);

    outer();
    expect(root).not.toHaveAttribute(SCROLLBAR_ATTRIBUTE);
  });
});

describe("AveroProvider scrollbar tracking", () => {
  it("sets the attribute while mounted and removes it on unmount", () => {
    setWidths(1024, 1024);

    const { unmount } = render(<AveroProvider>page</AveroProvider>);
    expect(root).toHaveAttribute(SCROLLBAR_ATTRIBUTE, "none");

    unmount();
    expect(root).not.toHaveAttribute(SCROLLBAR_ATTRIBUTE);
  });

  it("keeps tracking while a nested provider unmounts", () => {
    function Page({ nested }: { nested: boolean }) {
      return (
        <AveroProvider>
          {nested ? <AveroProvider locale="en-US">inner</AveroProvider> : null}
        </AveroProvider>
      );
    }
    const { rerender, unmount } = render(<Page nested />);

    rerender(<Page nested={false} />);
    expect(root).toHaveAttribute(SCROLLBAR_ATTRIBUTE);

    unmount();
    expect(root).not.toHaveAttribute(SCROLLBAR_ATTRIBUTE);
  });

  it("renders on the server without touching the document", () => {
    expect(renderToString(<AveroProvider>page</AveroProvider>)).toBe("page");
  });
});
