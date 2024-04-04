const { chromium } = require('playwright');
const path = require('path');
const { test, expect } = require('@playwright/test');

test('Prompt user for URL', async () => {
    const browser = await chromium.launch();

    const page = await browser.newPage();
    const filePath = path.join(__dirname, '../../index.html');
    await page.goto(filePath, { waitUntil: 'load', timeout: 0 });

    const url = await page.evaluate(() => {
        return new Promise((resolve) => {
            const form = document.querySelector('#urlForm');
            const urlInput = document.querySelector<HTMLInputElement>('#urlInput');

            if (!form || !urlInput) {
                console.log('No form or input field found.');
                return;
            }

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const url = urlInput.value;
                resolve(url);
            });
        });
    // @ts-ignore
    }).catch(error => {
        console.error('Error: ', error.message);
        return null;
    });

    if (url) {
        console.log('Entered URL: ', url);
    } else {
        console.log('No url entered.');
    }

    await browser.close();
});


// const { expect } = require('chai');
// @ts-ignore
// const { test, expect } = require('../modules/modules');

// test("target search field", async ({ webApp }: { webApp:any }) => {
//     try {
//         const title = await expect(webApp.getByTitle("Search")).toBeVisible();
//         console.log(title);
//     } catch (err) {
//         console.trace(err);
//     }
// });