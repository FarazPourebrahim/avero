import { tokenGroups } from "@averoui/tokens";
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

function utilitiesWithPrefix(prefix: string): string[] {
  return tokenGroups.utility
    .filter((name) => name.startsWith(`${prefix}-`))
    .map((name) => name.slice(prefix.length + 1));
}

// Avero's custom token scales and utilities are registered so that overrides merge correctly,
// e.g. cn("shadow-card-soft", "shadow-md") keeps only "shadow-md". The lists come from
// @averoui/tokens, so new tokens are picked up automatically.
const twMerge = extendTailwindMerge<"avero-scrollbar" | "avero-gradient" | "avero-effect">({
  extend: {
    theme: {
      text: [...tokenGroups.fontSize],
      leading: [...tokenGroups.lineHeight],
      radius: [...tokenGroups.radius],
      shadow: [...tokenGroups.shadow],
      "drop-shadow": [...tokenGroups.dropShadow],
      blur: [...tokenGroups.blur],
      animate: [...tokenGroups.animation],
    },
    classGroups: {
      "avero-scrollbar": [{ scrollbar: utilitiesWithPrefix("scrollbar") }],
      "avero-gradient": [{ gradient: utilitiesWithPrefix("gradient") }],
      "avero-effect": ["skeleton-shimmer", "glow-ring", "typing-caret"],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
