import { test } from '../../fixtures/fixtures';

test('Validate aliases', async ({ aTagsNoRedirectAliases }) => {
    const aliases = Object.values(aTagsNoRedirectAliases);
    for (let alias of aliases) {
        const charToCount = "_";
        const regex = new RegExp(charToCount, 'g');
        const matches = alias.match(regex);
        const count = matches.length;
        console.log(count);
        if (!count === null && count == 11 || !alias.includes("footer")) {
            console.log(`There are 11 underscores in ${alias}, so it's a main content link!`);
        } else if (count == 11 && alias.includes("footer")){
            console.log(`There are 11 underscores in ${alias}, and it's a footer link!`);            
        } else if (count == 3) {
            console.log(`There are 3 underscores in ${alias}, so this is a footer link.`);
        } else if (count !== 3 && count !== 11 && !alias.includes("footer")) {
            console.log(`This alias does not match the underscores conditional: ${alias}`)
        } else {
            console.log(`This alias is weird: ${alias}`);
        }
        // console.log(alias);
    }
});