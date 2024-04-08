const { test, expect } = require('../modules/modules');

test('Get aliases', async ({ aTagsNoRedirectAliases }) => {
    const aliases = Object.values(aTagsNoRedirectAliases);
    for (let alias of aliases) {
        console.log(alias);
    }
});