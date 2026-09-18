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
  // Every engine the Phase 12 browser sweep covers. The default scripts select Chromium so a pull
  // request stays quick; `test-browser-matrix` runs the lot.
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "edge", use: { ...devices["Desktop Edge"], channel: "msedge" } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 14"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "pnpm run serve-static",
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
});
