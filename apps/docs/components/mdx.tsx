import { Badge, Button, Chip } from "@avero/react";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

// Avero components available in every MDX page without an import.
const averoComponents = { Badge, Button, Chip };

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...averoComponents,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
