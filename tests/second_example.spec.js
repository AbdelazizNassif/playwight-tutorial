// @ts-check
const { test, expect } = require("@playwright/test");

test.skip('two tests', () => {
  test('one', async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    // ...
  });

  test('two', async ({ page }) => {
    
    // ...
  });
});
