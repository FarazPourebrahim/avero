import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode, type ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Carousel, CarouselSlide, CarouselViewport } from "../components/carousel/Carousel.js";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../components/dialog/Dialog.js";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "../components/drawer/Drawer.js";
import { InfiniteScroll } from "../components/infinite-scroll/InfiniteScroll.js";
import { TableOfContents } from "../components/table-of-contents/TableOfContents.js";

// Phase 12 DoD: overlays and carousels must unmount their listeners. React 18's StrictMode mounts
// an effect, tears it down and mounts it again, so an effect that subscribes without cleaning up
// leaks on the very first render — which is what these tests catch.

type ListenerCounts = Map<string, number>;

/** Counts live listeners per target by wrapping add/removeEventListener. */
function trackListeners(target: EventTarget): { counts: ListenerCounts; restore: () => void } {
  const counts: ListenerCounts = new Map();
  const add = target.addEventListener.bind(target);
  const remove = target.removeEventListener.bind(target);

  const addSpy = vi
    .spyOn(target, "addEventListener")
    .mockImplementation((type, listener, options) => {
      counts.set(type, (counts.get(type) ?? 0) + 1);
      add(type, listener, options);
    });
  const removeSpy = vi
    .spyOn(target, "removeEventListener")
    .mockImplementation((type, listener, options) => {
      counts.set(type, (counts.get(type) ?? 0) - 1);
      remove(type, listener, options);
    });

  return {
    counts,
    restore: () => {
      addSpy.mockRestore();
      removeSpy.mockRestore();
    },
  };
}

/** Listener types still registered after unmount. */
function leaked(counts: ListenerCounts): string[] {
  return [...counts].filter(([, count]) => count > 0).map(([type]) => type);
}

/**
 * Listener types React itself leaves on a target after a root unmounts — `selectionchange` among
 * them. Measured from a bare element rather than hardcoded, so a React upgrade that changes the set
 * does not turn into a false failure here.
 */
function reactBaseline(): { window: string[]; document: string[] } {
  const win = trackListeners(window);
  const doc = trackListeners(document);

  const { unmount } = render(
    <StrictMode>
      <div />
    </StrictMode>,
  );
  unmount();

  const baseline = { window: leaked(win.counts), document: leaked(doc.counts) };
  win.restore();
  doc.restore();
  return baseline;
}

/** What a component left behind beyond what React leaves on its own. */
function beyondBaseline(counts: ListenerCounts, baseline: string[]): string[] {
  return leaked(counts).filter((type) => !baseline.includes(type));
}

describe("StrictMode double-mount cleanup", () => {
  let observers: { disconnected: boolean }[];
  let originalObserver: typeof IntersectionObserver;
  let baseline: { window: string[]; document: string[] };

  beforeEach(() => {
    observers = [];
    baseline = reactBaseline();
    originalObserver = globalThis.IntersectionObserver;

    class TrackedObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "";
      readonly thresholds = [];
      #record: { disconnected: boolean };

      constructor() {
        this.#record = { disconnected: false };
        observers.push(this.#record);
      }

      observe() {}
      unobserve() {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
      disconnect() {
        this.#record.disconnected = true;
      }
    }

    globalThis.IntersectionObserver = TrackedObserver as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    globalThis.IntersectionObserver = originalObserver;
  });

  it.each<[string, ReactElement]>([
    [
      "Carousel",
      <Carousel key="a" aria-label="اسلایدها">
        <CarouselViewport>
          <CarouselSlide>یک</CarouselSlide>
          <CarouselSlide>دو</CarouselSlide>
        </CarouselViewport>
      </Carousel>,
    ],
    [
      "InfiniteScroll",
      <InfiniteScroll key="a" hasMore onLoadMore={() => {}}>
        <p>محتوا</p>
      </InfiniteScroll>,
    ],
    [
      "TableOfContents",
      <TableOfContents
        key="a"
        spy
        items={[
          { id: "one", title: "یک", level: 2 },
          { id: "two", title: "دو", level: 2 },
        ]}
      />,
    ],
  ])("%s removes every window and document listener it added", (_name, element) => {
    // Arrange
    const win = trackListeners(window);
    const doc = trackListeners(document);

    // Act
    const { unmount } = render(<StrictMode>{element}</StrictMode>);
    unmount();

    // Assert
    expect(beyondBaseline(win.counts, baseline.window)).toEqual([]);
    expect(beyondBaseline(doc.counts, baseline.document)).toEqual([]);

    win.restore();
    doc.restore();
  });

  it.each<[string, ReactElement]>([
    [
      "Dialog",
      <Dialog key="a">
        <DialogTrigger>باز کردن</DialogTrigger>
        <DialogContent>
          <DialogTitle>عنوان</DialogTitle>
        </DialogContent>
      </Dialog>,
    ],
    [
      "Drawer",
      <Drawer key="a">
        <DrawerTrigger>باز کردن</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>عنوان</DrawerTitle>
        </DrawerContent>
      </Drawer>,
    ],
  ])("%s removes its listeners after being opened and unmounted", async (_name, element) => {
    // Arrange
    const user = userEvent.setup();
    const win = trackListeners(window);
    const doc = trackListeners(document);

    // Act: an overlay only subscribes once it opens, so the listeners must be registered first.
    const { unmount } = render(<StrictMode>{element}</StrictMode>);
    await user.click(screen.getByRole("button", { name: "باز کردن" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    unmount();

    // Assert
    expect(beyondBaseline(win.counts, baseline.window)).toEqual([]);
    expect(beyondBaseline(doc.counts, baseline.document)).toEqual([]);

    win.restore();
    doc.restore();
  });

  it("disconnects every IntersectionObserver it creates", () => {
    // Arrange / Act
    const { unmount } = render(
      <StrictMode>
        <InfiniteScroll hasMore onLoadMore={() => {}}>
          <p>محتوا</p>
        </InfiniteScroll>
      </StrictMode>,
    );
    unmount();

    // Assert
    expect(observers.length).toBeGreaterThan(0);
    expect(observers.every((observer) => observer.disconnected)).toBe(true);
  });
});
