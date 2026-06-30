import { act, render, renderHook } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { mergeRefs } from "../utils/refs.js";
import { useControllableState } from "./useControllableState.js";

describe("useControllableState", () => {
  it("manages its own state when uncontrolled", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: "a", onChange }));

    act(() => result.current[1]("b"));

    expect(result.current[0]).toBe("b");
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("follows the value prop when controlled", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, defaultValue: "a", onChange }),
      { initialProps: { value: "x" } },
    );

    act(() => result.current[1]("y"));
    expect(result.current[0]).toBe("x");
    expect(onChange).toHaveBeenCalledWith("y");

    rerender({ value: "y" });
    expect(result.current[0]).toBe("y");
  });
});

describe("mergeRefs", () => {
  it("assigns object refs and calls callback refs", () => {
    const objectRef = createRef<HTMLDivElement>();
    const callback = vi.fn();

    render(<div ref={mergeRefs(objectRef, callback, undefined)} />);

    expect(objectRef.current).toBeInstanceOf(HTMLDivElement);
    expect(callback).toHaveBeenCalledWith(objectRef.current);
  });
});
