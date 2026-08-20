import { Badge, Button, Chip } from "@avero/react";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentPreview } from "./ComponentPreview";
import { ColorTokens } from "./foundations/ColorTokens";
import { BlurScale, RadiusScale, ShadowScale } from "./foundations/ElevationTokens";
import { Breakpoints, ZIndexLayers } from "./foundations/LayoutTokens";
import { AnimationTokens, EasingTokens } from "./foundations/MotionTokens";
import { FontFamilies, FontWeights, LineHeights, TypeScale } from "./foundations/TypographyTokens";
import { PropsTable } from "./PropsTable";

// Components available in every MDX page without an import.
const docsComponents = { ComponentPreview, PropsTable, Tab, Tabs, TypeTable };
const averoComponents = { Badge, Button, Chip };
const foundationComponents = {
  AnimationTokens,
  BlurScale,
  Breakpoints,
  ColorTokens,
  EasingTokens,
  FontFamilies,
  FontWeights,
  LineHeights,
  RadiusScale,
  ShadowScale,
  TypeScale,
  ZIndexLayers,
};

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...docsComponents,
    ...foundationComponents,
    ...averoComponents,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
