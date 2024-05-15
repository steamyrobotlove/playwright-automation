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
//test
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
    imgTagsHrefs: ({ getUrl }, use) => __awaiter(void 0, void 0, void 0, function* () {
        const imgHrefs = yield getUrl.evaluate(() => {
            const tags = document.querySelectorAll('img');
            const hrefs = Array.from(tags).map(img => img.src);
            return hrefs;
        });
        yield use(imgHrefs);
    }),
    // Begin inner text (copy) section
    getPTagsInnerText: ({ getUrl }, use) => __awaiter(void 0, void 0, void 0, function* () {
        const pTagsInnerText = yield getUrl.evaluate(() => {
            const pTags = document.querySelectorAll('p');
            const innerText = Array.from(pTags).map(p => p.innerText);
            return innerText;
        });
        yield use(pTagsInnerText);
    }),
    getSpanTagsInnerText: ({ getUrl }, use) => __awaiter(void 0, void 0, void 0, function* () {
        const spanTagsInnerText = yield getUrl.evaluate(() => {
            const spanTags = document.querySelectorAll('span');
            const innerText = Array.from(spanTags).map(sp => sp.innerText);
            return innerText;
        });
        yield use(spanTagsInnerText);
    }),
    getATagsInnerText: ({ getUrl }, use) => __awaiter(void 0, void 0, void 0, function* () {
        const aTagsInnerText = yield getUrl.evaluate(() => {
            const aTags = document.querySelectorAll('a');
            const innerText = Array.from(aTags).map(a => a.innerText);
            return innerText;
        });
        yield use(aTagsInnerText);
    }),
    getStrongTagsInnerText: ({ getUrl }, use) => __awaiter(void 0, void 0, void 0, function* () {
        const strongTagsInnerText = yield getUrl.evaluate(() => {
            const strongTags = document.querySelectorAll('strong');
            const innerText = Array.from(strongTags).map(st => st.innerText);
            return innerText;
        });
        yield use(strongTagsInnerText);
    }),
    getListTagsInnerText: ({ getUrl }, use) => __awaiter(void 0, void 0, void 0, function* () {
        const listTagsInnerText = yield getUrl.evaluate(() => {
            const listTags = document.querySelectorAll('li');
            const innerText = Array.from(listTags).map(li => li.innerText);
            return innerText;
        });
        yield use(listTagsInnerText);
    }),
});
//# sourceMappingURL=fixtures.js.map