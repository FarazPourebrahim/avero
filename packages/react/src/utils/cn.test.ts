import { describe, expect, it } from "vitest";
import { cn } from "./cn.js";

describe("cn", () => {
  it("joins truthy class values", () => {
    expect(cn("flex", false, undefined, "gap-2", { italic: false, "font-bold": true })).toBe(
      "flex gap-2 font-bold",
    );
  });

  it("lets later utilities override conflicting earlier ones", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});
