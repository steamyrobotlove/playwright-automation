// const { playwright } = require('playwright');
const { test, expect } = require('@playwright/test');

exports.expect = expect;
exports.test = test.extend({
    // Get static URL/browser page instance, change to dynamic later
    getUrl: async ({ page }, use) => {
        // tearsheet link
        // await page.goto('https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/sales-conversion/sc-vehicles-preview-prius/?FT_V1=2024~prius', { waitUntil: 'load', timeout: 0 });
        
        // webview link for current email, 4/8/2024, change if webview is no longer valid (or add if not here, any functional webview link will do)
        await page.goto(
            'https://view.e.toyota.com/?qs=ae79f61d8912684410afb4010f090f35e7f98444fa3156f63ab02b745465b60b1efd129f3f68aaf74f629a0191eac00c637682cd1e5f607d6f3b759587971fd0f7490cebbf620ed3b66a2c4b40993ebf'
            );
        await use(page);
    },

    // General anchor link hrefs, used for all tearsheets/PLs/emails
    aTagsHrefs: async ({ getUrl }, use) => {
        const anchorHrefs = await getUrl.evaluate(() => {
            const aTags = document.querySelectorAll('a');
            const hrefs = Array.from(aTags).map(a => a.href);
            return hrefs;
        });
        await use(anchorHrefs);
    },

    // Begin anchor link non-redirect functions (for tearsheets/PLs)
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