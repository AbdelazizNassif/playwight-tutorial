// @ts-check
const { test, expect } = require("@playwright/test");

test("test add to card from home page", async ({ page }) => {
  await page.goto("https://automationexercise.com/");
  await page
    .locator("xpath=(//div[contains(@class,'productinfo')])[1]")
    .hover();
  await page.locator("css=.overlay-content [data-product-id='1']").click();
  await page.locator("xpath=//u[.='View Cart']").click();
  await expect(page).toHaveTitle(/Checkout/);
  await expect(page).toHaveTitle(/A7maaaaaad/);
});

test("test force click button", async ({ page }) => {
  await page.goto("http://webdriveruniversity.com/Click-Buttons/index.html");
  await page.locator("css=#button2").click();
  await expect(page.locator("css=#myModalJSClick .modal-body")).toBeVisible();
});

test.skip("test ajax loader", async ({ page }) => {
  await page.goto("http://webdriveruniversity.com/Ajax-Loader/index.html");
  //await page.locator("//h1[text()='AJAX LOADER']").click();
  await expect(page.locator("css=#button1>p")).toBeVisible();
  await page.locator("css=#button1>p").click();
  await expect(page.locator("css=.modal-body>p")).toBeVisible();
  await expect(page.locator("css=.modal-body>p")).toHaveText(/a tricky one/);
});
test.skip("test handle new browser window", async ({ page }) => {
  await page.goto("http://webdriveruniversity.com/");
  const [newWindow] = await Promise.all([
    page.waitForEvent("popup"),
    page.locator("//h1[text()='AJAX LOADER']").click(),
  ]);
  console.log(newWindow.url());
  await expect(newWindow.locator("css=#button1>p")).toBeVisible();
  await newWindow.locator("css=#button1>p").click();
  await expect(newWindow.locator("css=.modal-body>p")).toBeVisible();
  await expect(newWindow.locator("css=.modal-body>p")).toHaveText(/a tricky one/);
  await page.bringToFront();
  console.log(page.url());
  expect(page.url()).toEqual("http://webdriveruniversity.com/")
});
