const { chromium } = require('playwright');
// @ts-ignore
const { test, expect } = require('../scratch/modules');

// @ts-ignore
test('Go to user URL', async ({ page }) => {
    // const browser = await chromium.launch();
    // const page = await browser.newPage();
    // temp code to go to initial 'grab url' page, move this to fixture later
    // Comment out when testing textbox
    await page.goto("https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/sales-conversion/sc-vehicles-preview-prius/?FT_V1=2024~prius", { waitUntil: 'load', timeout: 0 });
    // Uncomment to test textbox
    // await page.goto('https://steamyrobotlove.github.io');
    // const input = await page.locator("input", { name: "text" });
    // const url: string = "https://" + input;
    // const url: string = "https://" + await input.inputValue();

    // await input.fill(url);

    // const button = await page.getByRole("button", { name: "submit" });
    // await button.click();

    // await page.goto(url, { waitUntil: 'load', timeout: 0 });
});