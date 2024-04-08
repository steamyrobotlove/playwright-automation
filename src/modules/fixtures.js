const { playwright } = require('playwright');
const { test, expect } = require('@playwright/test');

exports.expect = expect;
exports.test = test.extend({
    getUrl: async ({ page }, use) => {
        await page.goto('https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/sales-conversion/sc-vehicles-preview-prius/?FT_V1=2024~prius', { waitUntil: 'load', timeout: 0 });
        await use(page);
    },

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

    aTagsRedirect: async ({ getUrl }, use) => {
        let urls = [];
        const anchorLinks = await getUrl.evaluate(() => {
            const tags = document.querySelectorAll('a');
            const hrefs = Array.from(tags).map(a => a.href);
            return hrefs;
        });

        for (const href in anchorLinks) {
            if (!href == null && !href == '') {
                await getUrl.goto(href, { waitUntil: 'load', timeout: 0 });
                const url = getUrl.url();
                await urls.push(url);
            } else {
                continue;
            }
        }
        console.log(urls);
        await use(urls);
    },

    imgTags: async ({ getUrl }, use) => {
        const imgHrefs = await getUrl.evaluate(() => {
            const tags = document.querySelectorAll('img');
            const hrefs = Array.from(tags).map(img => img.src);
            return hrefs;
        });
        await use(imgHrefs);
    },
});