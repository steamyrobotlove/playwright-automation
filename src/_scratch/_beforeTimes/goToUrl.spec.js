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
const { chromium } = require('playwright');
// @ts-ignore
const { test, expect } = require('../../modules/modules');
// @ts-ignore
test('Go to user URL', () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield chromium.launch();
    const page = yield browser.newPage();
    // temp code to go to initial 'grab url' page, move this to fixture later
    // Comment out when testing textbox
    yield page.goto("https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/sales-conversion/sc-vehicles-preview-prius/?FT_V1=2024~prius", { waitUntil: 'load', timeout: 0 });
    // Uncomment to test textbox
    // await page.goto('https://steamyrobotlove.github.io');
    // const input = await page.locator("input", { name: "text" });
    // const url: string = "https://" + input;
    // const url: string = "https://" + await input.inputValue();
    // await input.fill(url);
    // const button = await page.getByRole("button", { name: "submit" });
    // await button.click();
    // await page.goto(url, { waitUntil: 'load', timeout: 0 });
    return page;
}));
//# sourceMappingURL=goToUrl.spec.js.map