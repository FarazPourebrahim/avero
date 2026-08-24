import { describe, expect, it } from "vitest";
import { normalizeSearchText } from "./search.js";

describe("normalizeSearchText", () => {
  it("folds Arabic letters, non-joiners, diacritics, digits and case", () => {
    expect(normalizeSearchText("  كيك‌ها ۱۲٣ ABC ")).toBe("کیک ها 123 abc");
    expect(normalizeSearchText("مُحَمَّد")).toBe("محمد");
  });
});
