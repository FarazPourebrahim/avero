import { createStringVisitor } from "./stringNodes.js";

const HEX_COLOR = /(?<![\w&/-])#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})(?![\w-])/i;
// A lookbehind instead of \b: Tailwind arbitrary values join tokens with `_` (a word character).
const COLOR_FUNCTION = /(?<![a-z])(?:rgba?|hsla?|oklch|oklab|lab|lch|hwb)\(/i;

export function findRawColor(text) {
  return text.match(HEX_COLOR)?.[0] ?? text.match(COLOR_FUNCTION)?.[0] ?? null;
}

export const noRawColor = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow raw color values in component code. Colors must come from Avero tokens or the Tailwind palette.",
    },
    schema: [],
    messages: {
      raw: "Raw color '{{value}}' found. Reference an Avero token (e.g. bg-primary, text-text-strong) instead.",
    },
  },
  create(context) {
    return createStringVisitor((text, node) => {
      const value = findRawColor(text);
      if (value) {
        context.report({ node, messageId: "raw", data: { value } });
      }
    });
  },
};
