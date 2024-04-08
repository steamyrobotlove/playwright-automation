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
// // const readline = require('readline');
const { prompts } = require('prompts');
// @ts-ignore
const { test, expect } = require('@playwright/test');
exports.expect = expect;
exports.test = test.extend({
    webApp: ({ page }, use) => __awaiter(void 0, void 0, void 0, function* () {
        yield page.goto('https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/sales-conversion/sc-vehicles-preview-prius/?FT_V1=2024~prius', { waitUntil: 'load', timeout: 0 });
        use(page);
        //     await page.goto("https://steamyrobotlove.github.io", { waitUntil: 'load', timeout: 0 });
        //     const url = await page.evaluate(() => {
        //         return new Promise((resolve) => {
        //             const form = document.querySelector('#urlForm');
        //             const urlInput = document.querySelector<HTMLInputElement>('#urlInput');
        //             if (!form || !urlInput) {
        //                 console.log('No form or input field found.');
        //                 return;
        //             }
        //             form.addEventListener('submit', (event) => {
        //                 event.preventDefault();
        //                 const url = urlInput.value;
        //                 resolve(url);
        //             });
        //         });
        //     // @ts-ignore
        //     }).catch(error => {
        //         console.error('Error: ', error.message);
        //         return null;
        //     });
        //     if (url) {
        //         console.log('Entered URL: ', url);
        //     } else {
        //         console.log('No url entered.');
        //     }
        //     await page.waitForURL(url);
    }),
});
//# sourceMappingURL=modules.js.map