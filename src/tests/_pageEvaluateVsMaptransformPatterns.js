import { chromium } from '@playwright/test';

// current response test
// async function currentTest() {
//     const browser = await chromium.launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto('https://www.google.com');

//     for (let i = 0; i <= 20; i++) {
//         let start = performance.now();
    
//         await page.evaluate(() => {
//             const aTags = document.querySelectorAll('a');
//             const hrefs = Array.from(aTags).map(a => a.href);
//             return hrefs;
//         });

//         let runtime = performance.now() - start;
//         console.log(`CURRENT TEST, Runtime: ${runtime}ms`);
//     }

//     await browser.close();
// };

// new response test
async function newTest() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com');

    for (let i = 0; i <= 20; i++) {
        let start = performance.now();
    
    const anchorHrefs = await page.$$eval('a', (aTags) => {
        Array.from(aTags).map(a => a.href).filter(Boolean);
    });

        let runtime = performance.now() - start;
        console.log(`CURRENT TEST, Runtime: ${runtime}ms`);
    }

    await browser.close();
};

// currentTest();
newTest();

