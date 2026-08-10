import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import averoPlugin from "./plugin.js";

// UI source that must be token-only and bidirectional.
const UI_SOURCES = [
  "packages/react/src/**/*.{ts,tsx}",
  "packages/charts/src/**/*.{ts,tsx}",
  "packages/editor/src/**/*.{ts,tsx}",
];

const FOCUSED_OR_SKIPPED_TESTS =
  "MemberExpression[object.name=/^(describe|it|test)$/][property.name=/^(only|skip)$/]";

export default defineConfig(
  globalIgnores([
    "**/node_modules/**",
    "**/dist/**",
    "**/.next/**",
    "**/.source/**",
    "**/next-env.d.ts",
    "**/storybook-static/**",
    "**/coverage/**",
    "**/playwright-report/**",
    "**/test-results/**",
  ]),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "no-console": "error",
      "no-debugger": "error",
      "no-restricted-syntax": [
        "error",
        { selector: FOCUSED_OR_SKIPPED_TESTS, message: "Remove .only/.skip before committing." },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: UI_SOURCES,
    plugins: { avero: averoPlugin },
    rules: {
      "avero/no-raw-color": "error",
      "avero/no-physical-direction": "error",
    },
  },
  {
    // Build and maintenance scripts report to the terminal.
    files: ["**/scripts/**/*.{js,mjs,ts}"],
    rules: { "no-console": "off" },
  },
);
