const { test, expect } = require('../fixtures/fixtures');

test('Validate destination of link redirects', async ({ page, aTagsHrefs }) => {
    const hrefs = Object.values(aTagsHrefs);

    for (let href of hrefs) {

    }
});