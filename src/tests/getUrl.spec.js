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
const path = require('path');
const { test, expect } = require('@playwright/test');
test('Prompt user for URL', () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield chromium.launch();
    const page = yield browser.newPage();
    const filePath = path.join(__dirname, '../../index.html');
    yield page.goto(filePath, { waitUntil: 'load', timeout: 0 });
    const url = yield page.evaluate(() => {
        return new Promise((resolve) => {
            const form = document.querySelector('#urlForm');
            const urlInput = document.querySelector('#urlInput');
            if (!form || !urlInput) {
                console.log('No form or input field found.');
                return;
            }
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const url = urlInput.value;
                resolve(url);
            });
        });
        // @ts-ignore
    }).catch(error => {
        console.error('Error: ', error.message);
        return null;
    });
    if (url) {
        console.log('Entered URL: ', url);
    }
    else {
        console.log('No url entered.');
    }
    yield browser.close();
}));
// const { expect } = require('chai');
// @ts-ignore
// const { test, expect } = require('../modules/modules');
// test("target search field", async ({ webApp }: { webApp:any }) => {
//     try {
//         const title = await expect(webApp.getByTitle("Search")).toBeVisible();
//         console.log(title);
//     } catch (err) {
//         console.trace(err);
//     }
// });
