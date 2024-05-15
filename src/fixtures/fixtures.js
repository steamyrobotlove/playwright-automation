// const { playwright } = require('playwright');
const { test, expect } = require('@playwright/test');

exports.expect = expect;
exports.test = test.extend({
    // Get static URL/browser page instance, change to dynamic later
    getUrl: async ({ page }, use) => {
        await page.goto(
            // uncomment ONE OF THESE URLs; comment out the rest; delete all links before merging to Github (unnecessary if merging to Azure)
            // toyota tearsheet link just for testing
            'https://www.google.com', { waitUntil: 'load', timeout: 0 });
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

    // Begin anchor links with redirects, following redirect journey to final destination (ATEST/CTEST/VTEST/PROD TEST/etc.)
    aTagsRedirectHrefs: async ({ getUrl, aTagsHrefs }, use) => {
        
        let urls = [];
        
        // Create array of hrefs from aTagsHrefs fixture
        const anchorLinks = Object.values(aTagsHrefs);

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
    imgTagsSrcs: async ({ getUrl }, use) => {
        const imgHrefs = await getUrl.evaluate(() => {
            const tags = document.querySelectorAll('img');
            const hrefs = Array.from(tags).map(img => img.src);
            return hrefs;
        });
        await use(imgHrefs);
    },

    // Begin inner text (copy) section
    getPTagsInnerText: async ({ getUrl }, use) => {
        const pTagsInnerText = await getUrl.evaluate(() => {
                const pTags = document.querySelectorAll('p');
                const innerText = Array.from(pTags).map(p => p.innerText);
                return innerText
            });
            await use (pTagsInnerText);
    },

    getSpanTagsInnerText: async ({ getUrl }, use) => {
        const spanTagsInnerText = await getUrl.evaluate(() => {
                const spanTags = document.querySelectorAll('span');
                const innerText = Array.from(spanTags).map(sp => sp.innerText);
                return innerText
            });
            await use (spanTagsInnerText);
    },

    getATagsInnerText: async ({ getUrl }, use) => {
        const aTagsInnerText = await getUrl.evaluate(() => {
                const aTags = document.querySelectorAll('a');
                const innerText = Array.from(aTags).map(a => a.innerText);
                return innerText
            });
            await use (aTagsInnerText);
    },

    getStrongTagsInnerText: async ({ getUrl }, use) => {
        const strongTagsInnerText = await getUrl.evaluate(() => {
                const strongTags = document.querySelectorAll('strong');
                const innerText = Array.from(strongTags).map(st => st.innerText);
                return innerText
            });
            await use (strongTagsInnerText);
    },

    getListTagsInnerText: async ({ getUrl }, use) => {
        const listTagsInnerText = await getUrl.evaluate(() => {
                const listTags = document.querySelectorAll('li');
                const innerText = Array.from(listTags).map(li => li.innerText);
                return innerText
            });
            await use (listTagsInnerText);
    },
});