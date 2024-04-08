const { test, expect } = require('../../modules/fixtures');

test('Testing: aliases from aTagsNoRedirectAliases', async ({ aTagsNoRedirectAliases }) => {
    const aliases = Object.values(aTagsNoRedirectAliases);
    for (let alias of aliases) {
        console.log(alias);
    }
});