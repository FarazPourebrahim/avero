import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom token groups are registered here so overrides merge correctly (see Phase 2).
const twMerge = extendTailwindMerge({});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
