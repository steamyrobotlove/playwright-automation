const playwright = require('playwright');

async function getUrl() {
    try {
        const browser = await playwright.launch();
        const page = browser.newPage();
        let url = prompt("Enter URL:", "url here");

        await page.goto(url, { waitUntil: "load", timeout: 0 });

        await browser.close();
    } catch(err: any) {
        console.trace(err);
    }
}