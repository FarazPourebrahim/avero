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

  describe("Avero token groups", () => {
    it.each([
      ["font sizes", "text-2xs", "text-sm"],
      ["line heights", "leading-prose", "leading-8"],
      ["radii", "rounded-huge", "rounded-xl"],
      ["shadows", "shadow-card-soft", "shadow-md"],
      ["drop shadows", "drop-shadow-soft", "drop-shadow-sm"],
      ["blurs", "blur-orb", "blur-sm"],
      ["animations", "animate-fade-in", "animate-spin"],
      ["scrollbars", "scrollbar-fancy", "scrollbar-hidden"],
      ["gradients", "gradient-cover", "gradient-night"],
    ])("merges %s", (_group, earlier, later) => {
      expect(cn(earlier, later)).toBe(later);
    });

    it("keeps a custom font size next to a text color", () => {
      expect(cn("text-md", "text-primary")).toBe("text-md text-primary");
    });

    it("keeps a custom shadow next to a shadow color", () => {
      expect(cn("shadow-brand-soft", "shadow-primary/20")).toBe(
        "shadow-brand-soft shadow-primary/20",
      );
    });

    it("lets brand colors override each other", () => {
      expect(cn("bg-primary", "bg-surface-muted")).toBe("bg-surface-muted");
    });
  });
});
