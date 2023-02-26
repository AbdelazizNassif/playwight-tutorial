// @ts-check
const { test, expect } = require("@playwright/test");

test.skip("test add to card from home page", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await page
    .locator("xpath=(//div[contains(@class,'productinfo')])[1]")
    .hover();
  await page.locator("css=.overlay-content [data-product-id='1']").click();
  await page.locator("xpath=//u[.='View Cart']").click();
  await expect(page).toHaveTitle(/Checkout/);
});
