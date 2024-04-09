// const { playwright } = require('playwright');
const { test, expect } = require('@playwright/test');

exports.expect = expect;
exports.test = test.extend({
    // Get static URL/browser page instance, change to dynamic later
    getUrl: async ({ page }, use) => {
        // tearsheet link
        await page.goto('https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/sales-conversion/sc-vehicles-preview-prius/?FT_V1=2024~prius', { waitUntil: 'load', timeout: 0 });
        
        // webview link for current email, 4/8/2024, change if webview is no longer valid
        // await page.goto(
        //     'https://view.e.toyota.com/?qs=8f1d8ef866c577d78a5197a7c3acf4de24453341bf916e8dbef24059e3e48d91507231ef188545b6e6dcfc7b85a7694195fe28019c684163054603a50cf4f9f92b4507f768ff60d04c1727c53962e078'
        //     );
        await use(page);
    },

    // Begin anchor links with no redirects (tearsheets/PLs)
    aTagsNoRedirectHrefs: async ({ getUrl }, use) => {
        const anchorHrefs = await getUrl.evaluate(() => {
            const aTags = document.querySelectorAll('a');
            const hrefs = Array.from(aTags).map(a => a.href);
            return hrefs;
        });
        await use(anchorHrefs);
    },

    aTagsNoRedirectAliases: async ({ getUrl }, use) => {
        const anchorAliases = await getUrl.$$eval('a',(aTags) => {
            let aliases = [];
            for (let i = 0; i < aTags.length; i++) {
                const alias = aTags[i].getAttribute('alias');
                if (alias) {
                    aliases.push(alias);
                }
            }
            return aliases;
        });
        await use(anchorAliases);
    },

    aTagsNoRedirectTargets: async ({ getUrl }, use) => {
        const anchorTargets = await getUrl.$$eval('a',(aTags) => {
            let targets = [];
            for (let i = 0; i < aTags.length; i++) {
                const target = aTags[i].getAttribute('target');
                if (target) {
                    targets.push(target);
                }
            }
            return targets;
        });
        await use(anchorTargets);
    },

    // Begin anchor links with redirects (ATEST/CTEST/VTEST/PROD TEST/etc.)
    aTagsRedirectHrefs: async ({ getUrl }, use) => {
        let urls = [];
        
        // Get all hrefs from atags
        const anchorLinks = await getUrl.evaluate(() => {
            const tags = document.querySelectorAll('a');
            const hrefs = Array.from(tags).map(a => a.href);
            return hrefs;
        });

        // Navigate to hrefs, get final destination urls in urls array
        for (const href in anchorLinks) {
            if (!href == null && !href == '') {
                await getUrl.goto(href, { waitUntil: 'load', timeout: 0 });
                const url = getUrl.url();
                await urls.push(url);
            } else {
                continue;
            }
        }
        await use(urls);
    },

    // Begin img tags section
    imgTagsHrefs: async ({ getUrl }, use) => {
        const imgHrefs = await getUrl.evaluate(() => {
            const tags = document.querySelectorAll('img');
            const hrefs = Array.from(tags).map(img => img.src);
            return hrefs;
        });
        await use(imgHrefs);
    },
});