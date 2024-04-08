const { test, expect } = require('../modules/fixtures');

test('Validate target attributes', async ({ aTagsNoRedirectHrefs, aTagsNoRedirectTargets }) => {
    const hrefs = Object.values(aTagsNoRedirectHrefs);
    const targets = Object.values(aTagsNoRedirectTargets);

    // Remove empty a tag from hrefs
    let newHrefs = hrefs.filter(function(el) {
        return el != "";
    });

    // Pair hrefs and targets for readability, validate them
    for (let i = 0; i < newHrefs.length; i++) {
        const valueHref = newHrefs[i];
        const valueTarget = targets[i];
        if (valueTarget) {
            console.log(`${valueHref} contains target=${valueTarget}`);
        } else {
            console.log(`***ERROR***: ${valueHref} DOES NOT CONTAIN _blank: ${valueTarget}`);
        }
    }
});