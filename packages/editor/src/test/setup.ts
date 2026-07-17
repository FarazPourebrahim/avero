import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// ProseMirror measures selections through Range geometry, which jsdom does not implement. Without
// these stubs mounting an editor throws before any assertion runs.
const EMPTY_RECT = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  x: 0,
  y: 0,
  toJSON: () => ({}),
} satisfies DOMRectReadOnly;

Range.prototype.getBoundingClientRect ??= () => EMPTY_RECT as DOMRect;
Range.prototype.getClientRects ??= () =>
  ({ length: 0, item: () => null, [Symbol.iterator]: [].values }) as unknown as DOMRectList;

globalThis.ResizeObserver ??= class ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
