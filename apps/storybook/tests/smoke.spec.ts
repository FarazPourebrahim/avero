import { expect, test } from "@playwright/test";

test("Avero tokens are compiled into Storybook", async ({ page }) => {
  await page.goto("/iframe.html?id=internal-token-smoke--default&viewMode=story");

  const smoke = page.getByTestId("token-smoke");
  await expect(smoke).toBeVisible();
  await expect(smoke).toHaveCSS("background-color", "rgb(10, 102, 194)");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});
