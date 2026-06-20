import { createStringVisitor } from "./stringNodes.js";

// Optional Tailwind variant chain, e.g. `md:hover:` or `group-hover/item:`.
const VARIANTS = String.raw`(?:[^\s:]+:)*`;

const PHYSICAL_PATTERNS = [
  // padding / margin / scroll-margin / scroll-padding on the left or right side
  new RegExp(String.raw`^${VARIANTS}-?(?:p[lr]|m[lr]|scroll-[mp][lr])-\S+$`),
  // inset positioning
  new RegExp(String.raw`^${VARIANTS}-?(?:left|right)-\S+$`),
  // side borders and corner radii
  new RegExp(String.raw`^${VARIANTS}(?:border-[lr]|rounded-(?:[lr]|tl|tr|bl|br))(?:-\S+)?$`),
  // alignment and floats
  new RegExp(String.raw`^${VARIANTS}(?:text|float|clear)-(?:left|right)$`),
];

export function findPhysicalDirectionTokens(text) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .filter((token) => PHYSICAL_PATTERNS.some((pattern) => pattern.test(token)));
}

export const noPhysicalDirection = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow physical (left/right) Tailwind utilities. Avero is bidirectional, so use logical utilities instead.",
    },
    schema: [],
    messages: {
      physical:
        "'{{token}}' is a physical direction utility. Use the logical equivalent (ps-/pe-, ms-/me-, start-/end-, border-s/-e, rounded-s/-e/-ss/-se/-es/-ee, text-start/-end).",
    },
  },
  create(context) {
    return createStringVisitor((text, node) => {
      for (const token of findPhysicalDirectionTokens(text)) {
        context.report({ node, messageId: "physical", data: { token } });
      }
    });
  },
};
