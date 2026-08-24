import { toLatinDigits } from "./format.js";

// Built from code points: these letters look identical to their Persian counterparts, which would
// make the character classes impossible to review as literals.
const char = (...codePoints: number[]) => String.fromCharCode(...codePoints);

const ARABIC_YEH = new RegExp(`[${char(0x064a, 0x0649)}]`, "g");
const ARABIC_KAF = new RegExp(char(0x0643), "g");
const PERSIAN_YEH = char(0x06cc);
const PERSIAN_KAF = char(0x06a9);
// Harakat (U+064B–U+065F), superscript alef (U+0670) and tatweel (U+0640).
const MARKS = new RegExp(`[${char(0x064b)}-${char(0x065f)}${char(0x0670)}${char(0x0640)}]`, "g");
const ZWNJ_AND_SPACES = new RegExp(`[${char(0x200c)}\\s]+`, "g");

/**
 * Folds the differences that make Persian text look the same but compare unequal: Arabic yeh and
 * kaf, zero-width non-joiners, tatweel, diacritics, Persian and Arabic digits, and letter case.
 */
export function normalizeSearchText(text: string): string {
  return toLatinDigits(text)
    .replace(ARABIC_YEH, PERSIAN_YEH)
    .replace(ARABIC_KAF, PERSIAN_KAF)
    .replace(MARKS, "")
    .replace(ZWNJ_AND_SPACES, " ")
    .trim()
    .toLowerCase();
}
