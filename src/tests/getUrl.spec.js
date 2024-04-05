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
const { test, expect } = require('@playwright/test');
// @ts-ignore
test('Go to user URL', () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield chromium.launch();
    const page = yield browser.newPage();
    // temp code to go to initial 'grab url' page, move this to fixture later
    yield page.goto("https://steamyrobotlove.github.io", { waitUntil: 'load', timeout: 0 });
    const input = yield page.locator("input", { name: "text" });
    const url = "https://" + (yield input.inputValue());
    yield input.fill(url);
    const button = yield page.getByRole("button", { name: "submit" });
    yield button.click();
    console.log(url);
    yield page.goto(url, { waitUntil: 'load', timeout: 0 });
    const title = yield page.title();
    console.log(title);
    yield browser.close();
}));
