import { test } from '../../fixtures/fixtures';

test('Validate Link Responses', async ({ page, aTagsHrefs }) => {
    const hrefs = Object.values(aTagsHrefs);
    for (let href of hrefs) {
        if (href && !href == "") {
            const response = await page.goto(href, { waitUntil: 'load', timeout: 0 });
            const status = response?.status();
            // this is not working, figure out why
            const result = status == 200 ? `Status of ${href} is ${status}` : `Status of ${href} was weird: ${status}`;
            console.log(result);
        }
    }
});