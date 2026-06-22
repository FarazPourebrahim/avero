import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { defaultClientConditions } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)", "../../../packages/*/src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-a11y"],
  framework: { name: "@storybook/react-vite", options: {} },
  core: { disableTelemetry: true },
  viteFinal: (viteConfig) => {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    // Resolve workspace packages to their TypeScript source for instant feedback.
    viteConfig.resolve = {
      ...viteConfig.resolve,
      conditions: ["@avero/source", ...defaultClientConditions],
    };
    return viteConfig;
  },
};

export default config;
