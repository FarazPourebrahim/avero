import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { InfiniteScroll } from "./InfiniteScroll.js";

type Observer = {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit | undefined;
  targets: Element[];
  disconnected: boolean;
};

let observers: Observer[] = [];

function activeObserver(): Observer | undefined {
  return observers.filter((observer) => !observer.disconnected).at(-1);
}

function intersect(isIntersecting: boolean) {
  const observer = activeObserver();
  if (!observer) throw new Error("No active IntersectionObserver");
  act(() => {
    observer.callback(
      observer.targets.map((target) => ({ target, isIntersecting }) as IntersectionObserverEntry),
      {} as IntersectionObserver,
    );
  });
}

beforeEach(() => {
  observers = [];
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      private readonly record: Observer;
      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        this.record = { callback, options, targets: [], disconnected: false };
        observers.push(this.record);
      }
      observe(target: Element) {
        this.record.targets.push(target);
      }
      unobserve() {}
      disconnect() {
        this.record.disconnected = true;
      }
      takeRecords() {
        return [];
      }
    },
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function Feed(props: Partial<React.ComponentProps<typeof InfiniteScroll>>) {
  return (
    <InfiniteScroll onLoadMore={() => {}} hasMore {...props}>
      <ul aria-label="دوره‌ها">
        <li>دوره اول</li>
        <li>دوره دوم</li>
      </ul>
    </InfiniteScroll>
  );
}

describe("InfiniteScroll", () => {
  it("renders its content and watches a sentinel after it", () => {
    const { container } = render(<Feed />);

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    const sentinel = container.querySelector("[data-slot='infinite-scroll-sentinel']");
    expect(sentinel).toHaveAttribute("aria-hidden", "true");
    expect(activeObserver()?.targets).toEqual([sentinel]);
    expect(activeObserver()?.options).toEqual({ rootMargin: "200px" });
  });

  it("loads more when the sentinel comes into view", () => {
    const onLoadMore = vi.fn();
    render(<Feed onLoadMore={onLoadMore} />);

    intersect(false);
    expect(onLoadMore).not.toHaveBeenCalled();

    intersect(true);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("stops watching while loading and shows the loader", () => {
    const { rerender } = render(<Feed />);
    const first = activeObserver();

    rerender(<Feed loading />);

    expect(first?.disconnected).toBe(true);
    expect(activeObserver()).toBeUndefined();
    expect(screen.getByRole("status")).toHaveTextContent("در حال بارگذاری");

    rerender(<Feed />);

    expect(activeObserver()).toBeDefined();
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("shows a custom loader and uses the given root margin", () => {
    render(<Feed loading={false} rootMargin="0px 0px 400px" />);
    expect(activeObserver()?.options).toEqual({ rootMargin: "0px 0px 400px" });
  });

  it("renders a custom loader", () => {
    render(<Feed loading loader="در حال دریافت دوره‌های بیشتر…" />);

    expect(screen.getByRole("status")).toHaveTextContent("در حال دریافت دوره‌های بیشتر…");
  });

  it("does not watch once there is nothing more to load", () => {
    render(<Feed hasMore={false} />);

    expect(observers).toHaveLength(0);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("calls the latest onLoadMore", () => {
    const first = vi.fn();
    const latest = vi.fn();
    const { rerender } = render(<Feed onLoadMore={first} />);

    rerender(<Feed onLoadMore={latest} />);
    intersect(true);

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });

  it("offers a load more button without IntersectionObserver", async () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const onLoadMore = vi.fn();
    const { rerender } = render(
      <AveroProvider locale="en-US">
        <Feed onLoadMore={onLoadMore} />
      </AveroProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Load more" }));
    expect(onLoadMore).toHaveBeenCalledTimes(1);

    rerender(
      <AveroProvider locale="en-US">
        <Feed onLoadMore={onLoadMore} loading />
      </AveroProvider>,
    );
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });

  it("forwards refs and native attributes", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Feed ref={ref} className="flex flex-col" />);

    expect(ref.current).toHaveAttribute("data-slot", "infinite-scroll");
    expect(ref.current).toHaveClass("flex", "flex-col");
  });

  it("renders on the server without the fallback button", () => {
    const html = renderToString(<Feed />);

    expect(html).toContain("دوره اول");
    expect(html).not.toContain("infinite-scroll-load-more");
  });

  it("has no accessibility violations while loading", async () => {
    const { container } = render(<Feed loading />);

    await expectNoAxeViolations(container);
  });
});
