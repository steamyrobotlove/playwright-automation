const { playwright } = require('playwright');
const { test, expect } = require('../modules/fixtures');

test('Validate Link Responses', async ({ page, aTagsNoRedirectHrefs }) => {
    const hrefs = Object.values(aTagsNoRedirectHrefs);
    for (let href of hrefs) {
        if (href && !href == "") {
            const response = await page.goto(href, { waitUntil: 'load', timeout: 0 });
            const status = response.status();
            console.log(`Status of ${href} is ${status}`);
        } else {
            console.log(`Response of ${href} was weird`);
        }
    }
});