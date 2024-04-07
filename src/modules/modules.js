const { test, expect } = require('@playwright/test');

exports.expect = expect;
exports.test = test.extend({
    webApp: async ({ page }, use) => {
        await page.goto('https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/sales-conversion/sc-vehicles-preview-prius/?FT_V1=2024~prius', { waitUntil: 'load', timeout: 0 });
        use(page);
    }
});