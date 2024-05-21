import { test } from '../fixtures/fixtures';

test('Validate tdesc in redirected URL params', async ({ aTagsRedirectHrefs }) => {
    const urls = Object.values(aTagsRedirectHrefs);
    let tdescs = [];

    

    for (let url in urls ) {
        if (url !== null && url.includes('tdesc')) {
            console.log(`The url ${url} contains a valid tdesc param`)
        }
    }
});