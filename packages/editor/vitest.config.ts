import react from "@vitejs/plugin-react";
import { defaultClientConditions } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  // Resolve workspace packages to their TypeScript source, so tests never run against a stale dist.
  resolve: { conditions: ["@averoui/source", ...defaultClientConditions] },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.*", "src/**/*.stories.*", "src/test/**", "src/**/index.ts"],
      thresholds: { statements: 90, branches: 85 },
    },
  },
});
