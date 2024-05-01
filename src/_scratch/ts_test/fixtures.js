"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// const { test, expect } = require('@playwright/test');
const { test: playwrightTest, expect: playwrightExpect } = require('@playwright/test');
playwrightTest.extend({
    getUrl: ({ page }, use) => __awaiter(void 0, void 0, void 0, function* () {
        yield page.goto('https://www.google.com', { waitUntil: 'load', timeout: 0 });
        yield use(page);
    }),
    // General anchor link hrefs, used for all tearsheets/PLs/emails
    aTagsHrefs: ({ getUrl }, use) => __awaiter(void 0, void 0, void 0, function* () {
        const anchorHrefs = yield getUrl.evaluate(() => {
            const aTags = document.querySelectorAll('a');
            const hrefs = Array.from(aTags).map(a => a.href);
            return hrefs;
        });
        yield use(anchorHrefs);
    }),
    aTagsNoRedirectAliases: ({ getUrl }, use) => __awaiter(void 0, void 0, void 0, function* () {
        const anchorAliases = yield getUrl.$$eval('a', (aTags) => {
            let aliases = [];
            for (let i = 0; i < aTags.length; i++) {
                const alias = aTags[i].getAttribute('alias');
                if (alias) {
                    aliases.push(alias);
                }
            }
            return aliases;
        });
        yield use(anchorAliases);
    }),
    aTagsNoRedirectTargets: ({ getUrl }, use) => __awaiter(void 0, void 0, void 0, function* () {
        const anchorTargets = yield getUrl.$$eval('a', (aTags) => {
            let targets = [];
            for (let i = 0; i < aTags.length; i++) {
                const target = aTags[i].getAttribute('target');
                if (target) {
                    targets.push(target);
                }
            }
            return targets;
        });
        yield use(anchorTargets);
    }),
    aTagsRedirectHrefs: ({ getUrl, aTagsHrefs }, use) => __awaiter(void 0, void 0, void 0, function* () {
        let urls = [];
        const anchorLinks = Object.values(aTagsHrefs);
        let page = Object.values(getUrl);
        // Navigate to hrefs, get final destination urls in urls array
        for (const href in anchorLinks) {
            if (href && href != '') {
                yield getUrl.goto(href);
                const url = yield getUrl.url();
                urls.push(url);
            }
            else {
                continue;
            }
        }
        yield use(urls);
    }),
});
//# sourceMappingURL=fixtures.js.map