const { test, expect } = require('@playwright/test')

const url = "https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/vehicle-support/fast-track/p00122042-trm-my25-camry-prelaunch/?FT_V1=2023~camry&dynamiclogoBlkv2=1&grySocIco=1&sl=tx_sl&pt=tx_pt"

test.describe('Suite of Unit tests', () => {
    test.setTimeout(0)
    // This block runs before each test
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    test('Checking Title of the Page', async ({ page }) => {
        // const titleText = await page.locator("title").innerText();
        // expect(page).toHaveTitle(titleText);
        // expect(page).toHaveTitle("Toyota");
        const title = await page.title()
        expect(title).toBe("Toyota")

    })


    test('Check status of each image in the page', async ({ page }) => {
        const imgSrcs = await page.$$eval('img', images => images.map(img => img.src));
        console.log(`Found ${imgSrcs.length} images`);

        for (let src of imgSrcs) {
            try {
                const response = await page.goto(src);
                if (response.ok()) {
                    console.log(`Navigation to ${src} was successful with status ${response.status()}.`);
                } else {
                    console.log(`Navigation to ${src} failed with status ${response.status()}.`);
                }
            } catch (error) {
                console.log('Error occurred in', src);
                console.error(error);
            }
        }
    })

    test("Checking status of each link in the page", async ({ page }) => {
        const hrefs = await page.$$eval('a', anchors => anchors.map(anchor => anchor.href));
        console.log(`Found ${hrefs.length} links`);

        for (let href of hrefs) {
            try {
                const response = await page.goto(href);
                if (response.ok()) {
                    console.log(`Navigation to ${href} was successful with status ${response.status()}.`);
                } else {
                    console.log(`Navigation to ${href} failed with status ${response.status()}.`);
                }
            } catch (error) {
                console.log('Error occurred in', href);
                console.error(error);
            }
        }
    })


});