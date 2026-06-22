import { defineConfig, devices } from "@playwright/test";

const PORT = 6007;
// An explicit IPv4 host: Node resolves `localhost` to ::1 first, while the static server binds IPv4.
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01 },
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm run serve-static",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
});
