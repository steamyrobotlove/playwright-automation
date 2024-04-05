"use strict";
// // // const readline = require('readline');
// const { prompts } = require('prompts');
// // @ts-ignore
// const { test, expect } = require('@playwright/test');
//     exports.expect = expect;
//     exports.test = test.extend({
//         webApp: async ({ page }: { page:any }, use: any) => {
//             await page.goto("https://steamyrobotlove.github.io", { waitUntil: 'load', timeout: 0 });
//             const url = await page.evaluate(() => {
//                 return new Promise((resolve) => {
//                     const form = document.querySelector('#urlForm');
//                     const urlInput = document.querySelector<HTMLInputElement>('#urlInput');
//                     if (!form || !urlInput) {
//                         console.log('No form or input field found.');
//                         return;
//                     }
//                     form.addEventListener('submit', (event) => {
//                         event.preventDefault();
//                         const url = urlInput.value;
//                         resolve(url);
//                     });
//                 });
//             // @ts-ignore
//             }).catch(error => {
//                 console.error('Error: ', error.message);
//                 return null;
//             });
//             if (url) {
//                 console.log('Entered URL: ', url);
//             } else {
//                 console.log('No url entered.');
//             }
//             await page.waitForURL(url);
//         },
//     });
