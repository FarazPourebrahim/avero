import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { TableOfContents, type TocItem } from "./TableOfContents.js";

const ITEMS: TocItem[] = [
  { id: "what", label: "فریلنسری چیست؟" },
  { id: "benefits", label: "مزایای فریلنسری چیست؟" },
  { id: "flexibility", label: "انعطاف‌پذیری در زمان و مکان", level: 3 },
];

function entry(name: string) {
  return screen.getByRole("link", { name });
}

type ObserverCallback = (entries: Array<Partial<IntersectionObserverEntry>>) => void;

function installObserver() {
  const observed: Element[] = [];
  let callback: ObserverCallback = () => {};
  const disconnect = vi.fn();
  class MockIntersectionObserver {
    constructor(cb: ObserverCallback) {
      callback = cb;
    }
    observe(element: Element) {
      observed.push(element);
    }
    disconnect = disconnect;
  }
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  return {
    observed,
    disconnect,
    fire: (entries: Array<Partial<IntersectionObserverEntry>>) => act(() => callback(entries)),
  };
}

describe("TableOfContents", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders a titled navigation of heading links", () => {
    render(<TableOfContents items={ITEMS} spy={false} />);

    expect(screen.getByRole("navigation", { name: "در این مقاله" })).toBeInTheDocument();
    expect(entry("فریلنسری چیست؟")).toHaveAttribute("href", "#what");
  });

  it("highlights the first entry by default", () => {
    render(<TableOfContents items={ITEMS} spy={false} />);

    expect(entry("فریلنسری چیست؟")).toHaveAttribute("aria-current", "location");
    expect(entry("فریلنسری چیست؟").parentElement).toHaveClass(
      "border-indigo-500",
      "text-indigo-600",
    );
  });

  it("renders level-3 entries as smaller sub-items", () => {
    render(<TableOfContents items={ITEMS} spy={false} />);

    expect(entry("انعطاف‌پذیری در زمان و مکان")).toHaveClass("text-xs", "pe-6");
  });

  it("highlights the clicked entry and reports it", async () => {
    const onActiveChange = vi.fn();
    render(<TableOfContents items={ITEMS} spy={false} onActiveChange={onActiveChange} />);

    await userEvent.click(entry("مزایای فریلنسری چیست؟"));

    expect(entry("مزایای فریلنسری چیست؟")).toHaveAttribute("aria-current", "location");
    expect(onActiveChange).toHaveBeenCalledWith("benefits");
  });

  it("supports a controlled active entry and a custom title", () => {
    render(
      <TableOfContents items={ITEMS} spy={false} activeId="flexibility" title="فهرست مطالب" />,
    );

    expect(screen.getByRole("navigation", { name: "فهرست مطالب" })).toBeInTheDocument();
    expect(entry("انعطاف‌پذیری در زمان و مکان")).toHaveAttribute("aria-current", "location");
  });

  it("uses the English title under an English provider", () => {
    render(
      <AveroProvider locale="en-US">
        <TableOfContents items={ITEMS} spy={false} />
      </AveroProvider>,
    );

    expect(screen.getByRole("navigation", { name: "On this page" })).toBeInTheDocument();
  });

  it("follows the topmost visible heading while scrolling", () => {
    const observer = installObserver();
    const { unmount } = render(
      <>
        <h2 id="what">what</h2>
        <h2 id="benefits">benefits</h2>
        <TableOfContents items={ITEMS} />
      </>,
    );

    expect(observer.observed.map((element) => element.id)).toEqual(["what", "benefits"]);

    const benefits = document.getElementById("benefits")!;
    const what = document.getElementById("what")!;
    observer.fire([
      { target: benefits, isIntersecting: true },
      { target: what, isIntersecting: false },
    ]);
    expect(entry("مزایای فریلنسری چیست؟")).toHaveAttribute("aria-current", "location");

    observer.fire([{ target: benefits, isIntersecting: false }]);
    expect(entry("مزایای فریلنسری چیست؟")).toHaveAttribute("aria-current", "location");

    unmount();
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it("works without IntersectionObserver support", () => {
    vi.stubGlobal("IntersectionObserver", undefined);

    render(<TableOfContents items={ITEMS} />);

    expect(entry("فریلنسری چیست؟")).toHaveAttribute("aria-current", "location");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<TableOfContents ref={ref} items={ITEMS} spy={false} />);

    expect(ref.current).toHaveAttribute("data-slot", "table-of-contents");
  });

  it("renders on the server", () => {
    expect(renderToString(<TableOfContents items={ITEMS} />)).toContain('href="#what"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<TableOfContents items={ITEMS} spy={false} />);

    await expectNoAxeViolations(container);
  });
});
