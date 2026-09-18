import { expect, test } from "@playwright/test";

// Every Lahzeh weight declared by @averoui/font loads in a real browser, and only as woff2: the woff
// fallback listed second must never be downloaded by a browser that supports woff2.

const WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900];

test("every Lahzeh weight loads as woff2", async ({ page }) => {
  const fontRequests: string[] = [];
  page.on("request", (request) => {
    if (request.resourceType() === "font") fontRequests.push(request.url());
  });

  await page.goto("/iframe.html?id=internal-token-smoke--default&viewMode=story");
  await page.locator("#storybook-root").waitFor();

  const unloaded = await page.evaluate(async (weights) => {
    const results = await Promise.all(
      weights.map(async (weight) => {
        const font = `${weight} 16px Lahzeh`;
        const faces = await document.fonts.load(font);
        const loaded = faces.some((face) => face.status === "loaded") && document.fonts.check(font);
        return { weight, loaded };
      }),
    );
    return results.filter((result) => !result.loaded).map((result) => result.weight);
  }, WEIGHTS);

  expect(unloaded, "Lahzeh weights that failed to load").toEqual([]);
  expect(fontRequests.filter((url) => url.includes("Lahzeh") && !url.endsWith(".woff2"))).toEqual(
    [],
  );
});
