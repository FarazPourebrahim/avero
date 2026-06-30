import type { ComponentType } from "react";
import ButtonAsLink from "./button/as-link";
import ButtonPrimary from "./button/primary";
import ButtonSizes from "./button/sizes";
import ButtonStates from "./button/states";
import ButtonTones from "./button/tones";
import ButtonVariants from "./button/variants";

/** Every live demo, keyed by its file path under `demos/` (without extension). */
export const demos = {
  "button/primary": ButtonPrimary,
  "button/variants": ButtonVariants,
  "button/tones": ButtonTones,
  "button/sizes": ButtonSizes,
  "button/states": ButtonStates,
  "button/as-link": ButtonAsLink,
} satisfies Record<string, ComponentType>;

export type DemoName = keyof typeof demos;
