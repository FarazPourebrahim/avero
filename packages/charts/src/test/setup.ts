import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

const CHART_WIDTH = 600;
const CHART_HEIGHT = 300;

// Recharts' ResponsiveContainer measures its parent and renders nothing at zero size. jsdom has no
// layout and no ResizeObserver, so both are faked with a fixed chart box.
class FakeResizeObserver implements ResizeObserver {
  constructor(private readonly callback: ResizeObserverCallback) {}

  observe(target: Element): void {
    const contentRect = {
      width: CHART_WIDTH,
      height: CHART_HEIGHT,
      top: 0,
      left: 0,
      bottom: CHART_HEIGHT,
      right: CHART_WIDTH,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } satisfies DOMRectReadOnly;

    this.callback([{ target, contentRect } as ResizeObserverEntry], this);
  }

  unobserve(): void {}
  disconnect(): void {}
}

globalThis.ResizeObserver = FakeResizeObserver;

Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
  configurable: true,
  value: CHART_WIDTH,
});
Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
  configurable: true,
  value: CHART_HEIGHT,
});
Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
  configurable: true,
  value: () => new DOMRect(0, 0, CHART_WIDTH, CHART_HEIGHT),
});

afterEach(() => {
  cleanup();
});
