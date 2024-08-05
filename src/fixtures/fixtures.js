// const { playwright } = require('playwright');
const { test, expect } = require('@playwright/test');

exports.expect = expect;
exports.test = test.extend({
    // Get static URL/browser page instance, change to dynamic later
    getPage: async ({ page }, use) => {
        await page.goto(
            'https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/sales-conversion/convert/sc-convert-all-vehicles-sales-event/?FT_V1=2024~sienna~5410~~~03T3&FIRST_NAME_PERSONALIZATION=RAPP&MODEL_NAME=%5EocjVehicle%7CseriesName%7Creplace(%27Toyota%20%27,%27%27)%5E&FN_TRANSFORM=lowercase&whtToyLogo=0&grySocIco=1&DEALER_ZIP=19468&DISCLAIMER=&grylogo=1&MaxOffersLimit=1&sl=offer&pt=offer&previewText=offer&offer=1&DEALER_CD=37154&DEALER_NAME=Tri%20County%20Toyota&DEALER_ADDRESS=15%20D%20&%20L%20Drive&DEALER_CITY=Limerick&DEALER_STATE=PA&DEALER_URL=https://www.tricountytoyota.com/&DEALER_PHONE=610-495-4588&DEALER_SERVICE_URL=https://www.tricountytoyota.com/toyota-schedule-service/&touchName=convertvoihandraisers-se-sl1-nooffer', 
            // 'https://view.e.toyota.com/?qs=1b760ffec4ac364e4ce00783464f2a6a728d32265e44b72ddb29e34fc21c6c2e1c5ad155b14f405905d24cfcdb50efb5202de46b2e7d0a7548bcfa6890c0da95b8ec486301753f5365888ac13d360745',
            { waitUntil: 'load', timeout: 0 });
        await use(page);
    },

    // General anchor link hrefs, used for all tearsheets/PLs/emails
    aTagsHrefs: async ({ getPage }, use) => {
        const anchorHrefs = await getPage.evaluate(() => {
            const aTags = document.querySelectorAll('a');
            const hrefs = Array.from(aTags).map(a => a.href);
            return hrefs;
        });
        await use(anchorHrefs);
    },

    // Begin anchor link non-redirect functions (for tearsheets/PLs)
    aTagsNoRedirectAliases: async ({ getPage }, use) => {
        const anchorAliases = await getPage.$$eval('a',(aTags) => {
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

    aTagsNoRedirectTargets: async ({ getPage }, use) => {
        const anchorTargets = await getPage.$$eval('a',(aTags) => {
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
    aTagsRedirectHrefs: async ({ getPage, aTagsHrefs }, use) => {
        let urls = [];
        const anchorLinks = Object.values(aTagsHrefs);

        // Navigate to hrefs, get final destination urls in urls array
        for (const href in anchorLinks) {
            if (!href == null && !href == '') {
                await getPage.goto(href, { waitUntil: 'load', timeout: 0 });
                const url = getPage.url();
                await urls.push(url);
            } else {
                continue;
            }
        }
        await use(urls);
    },

    // Begin img tags section
    getImgTags: async ({ getPage }, use) => {
        const imgTags = await getPage.$$eval('img',() => {
            const tags = document.querySelectorAll('img');
            const imgs = Array.from(tags).map(img => img.outerHTML);
            return imgs;
        })
        await use(imgTags);
    },

    getImgTagsSrcs: async ({ getPage }, use) => {
        const imgHrefs = await getPage.evaluate(() => {
            const tags = document.querySelectorAll('img');
            const hrefs = Array.from(tags).map(img => img.src);
            return hrefs;
        });
        await use(imgHrefs);
    },

    getImgTagsAlts: async ({ getPage }, use) => {
        const imgAlts = await getPage.evaluate(() => {
            const tags = document.querySelectorAll('img');
            const alts = Array.from(tags).map(img => img.alt);
            return alts;
        });
        await use(imgAlts);
    },

    // Begin inner text (copy) section
    getPTagsInnerText: async ({ getPage }, use) => {
        const pTagsInnerText = await getPage.evaluate(() => {
            const pTags = document.querySelectorAll('p');
            const innerText = Array.from(pTags).map(p => p.innerText);
            return innerText
        });
        await use (pTagsInnerText);
    },

    getSpanTagsInnerText: async ({ getPage }, use) => {
        const spanTagsInnerText = await getPage.evaluate(() => {
            const spanTags = document.querySelectorAll('span');
            const innerText = Array.from(spanTags).map(sp => sp.innerText);
            return innerText
        });
        await use (spanTagsInnerText);
    },

    getATagsInnerText: async ({ getPage }, use) => {
        const aTagsInnerText = await getPage.evaluate(() => {
            const aTags = document.querySelectorAll('a');
            const innerText = Array.from(aTags).map(a => a.innerText);
            return innerText
        });
        await use (aTagsInnerText);
    },

    getStrongTagsInnerText: async ({ getPage }, use) => {
        const strongTagsInnerText = await getPage.evaluate(() => {
            const strongTags = document.querySelectorAll('strong');
            const innerText = Array.from(strongTags).map(st => st.innerText);
            return innerText
        });
        await use (strongTagsInnerText);
    },

    getListTagsInnerText: async ({ getPage }, use) => {
        const listTagsInnerText = await getPage.evaluate(() => {
            const listTags = document.querySelectorAll('li');
            const innerText = Array.from(listTags).map(li => li.innerText);
            return innerText
        });
        await use (listTagsInnerText);
    },

    // Fixture for getting destination url, tdesc parameter value for all hrefs in page
    getTdescValue: async ({ getPage }, use) => {
        const tdescVal = async (href) => {
            await getPage.goto(href, { waitUntil: 'load', timeout: 0 });
            const url = getPage.url();
            console.log(url);
            const searchparam = new URLSearchParams(new URL(url).search);
            return searchparam.get('tdesc');
        }
        await use(tdescVal);
    },
});