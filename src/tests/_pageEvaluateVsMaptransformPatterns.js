const { chromium } = require('@playwright/test');

// current response test
async function currentTest() {
    let start = performance.now();

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.google.com');

    const anchorHrefs = await page.evaluate(() => {
        const aTags = document.querySelectorAll('a');
        const hrefs = Array.from(aTags).map(a => a.href);
        return hrefs;
    });

    console.log(anchorHrefs);
    await browser.close();
    let runtime = performance.now() - start;
    console.log(`CURRENT TEST, Runtime: ${runtime}ms`);
};

// new response test
async function newTest() {
    let start = performance.now();

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.google.com');

    const anchorHrefs = await page.$$eval('a', (aTags) => {
        Array.from(aTags).map(a => a.href).filter(Boolean);
    });

    console.log(anchorHrefs);
    await browser.close();
    let runtime = performance.now() - start;
    console.log(`NEW TEST, Runtime: ${runtime}ms`);
};

currentTest();
newTest();