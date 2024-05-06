import { TestExtensions } from './interfaces';
import { Page } from 'playwright';
import { GetUrlFunction } from './interfaces';
// const { test, expect } = require('@playwright/test');

const { test: playwrightTest, expect: playwrightExpect }: TestExtensions = require('@playwright/test');

(playwrightTest as any).extend({
    getUrl: async ({ page }: { page: Page }, use: (page: Page) => Promise<void>) => {     // Get static URL/browser page instance, change to dynamic later
        await (page as Page).goto(
            'https://www.google.com', { waitUntil: 'load', timeout: 0 });
        await use(page);
    },

    // General anchor link hrefs, used for all tearsheets/PLs/emails
    aTagsHrefs: async ({ getUrl }: { getUrl: GetUrlFunction }, use: (string: string[]) => Promise<void>) => {
        const anchorHrefs = await getUrl.evaluate(() => {
            const aTags = document.querySelectorAll('a');
            const hrefs = Array.from(aTags).map(a => a.href);
            return hrefs;
        });
        await use(anchorHrefs);
    },

    aTagsNoRedirectAliases: async ({ getUrl }: { getUrl: GetUrlFunction }, use: (string: string[]) => Promise<void>) => {
        const anchorAliases = await getUrl.$$eval('a',(aTags) => {
            let aliases: string[] = [];
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

    aTagsNoRedirectTargets: async ({ getUrl }: { getUrl: GetUrlFunction }, use: (string: string[]) => Promise<void>) => {
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

    aTagsRedirectHrefs: async ({ getUrl, aTagsHrefs }: TestExtensions, use: (string: string[]) => Promise<void>) => {
        let urls: string[] = [];
        const anchorLinks = Object.values(aTagsHrefs); 
        let page = Object.values(getUrl);

        // Navigate to hrefs, get final destination urls in urls array
        for (const href in anchorLinks) {
            if (href && href != '') {
                await getUrl.goto(href);
                const url = await getUrl.url();
                urls.push(url);
            } else {
                continue;
            }
        }
        await use(urls);
    },

    imgTagsHrefs: async ({ getUrl }: TestExtensions, use: (string: string[]) => Promise<void>) => {
        const imgHrefs = await getUrl.evaluate(() => {
            const tags = document.querySelectorAll('img');
            const hrefs = Array.from(tags).map(img => img.src);
            return hrefs;
        });
        await use(imgHrefs);
    },
});