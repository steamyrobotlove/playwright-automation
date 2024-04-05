const { chromium } = require('playwright');
// @ts-ignore
const { test, expect } = require('@playwright/test');

// @ts-ignore
test('Go to user URL', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    // temp code to go to initial 'grab url' page, move this to fixture later
    await page.goto("https://steamyrobotlove.github.io", { waitUntil: 'load', timeout: 0 });

    const input = await page.locator("input", { name: "text" });
    const url: string = "https://" + await input.inputValue();

    await input.fill(url);

    const button = await page.getByRole("button", { name: "submit" });
    await button.click();
    console.log(url);

    await page.goto(url, { waitUntil: 'load', timeout: 0 });

    const title = await page.title();
    console.log(title);

    await browser.close();
});