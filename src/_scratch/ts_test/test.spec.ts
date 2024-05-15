<<<<<<< HEAD
import { PrintImgTagHrefsFunction } from './interfaces';
// const { test: playwrightTest, expect: playwrightExpect }: TestExtensions = require('@playwright/test');
const { test, expect } = require('../fixtures/fixtures');

test('Get img tags', async ({ imgTagsHrefs }: { imgTagsHrefs: PrintImgTagHrefsFunction}) => {
    const imgTags = Object.values(imgTagsHrefs);
    console.log(imgTags);
=======
import { TestExtensions } from './interfaces';
const { test, expect } = require('./fixtures');
// const { test: playwrightTest, expect: playwrightExpect }: TestExtensions = require('@playwright/test');

test('Validate aliases', async ({ aTagsNoRedirectAliases }: { aTagsNoRedirectAliases: Function}) => {
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
        } else {
            console.log(`This alias is weird: ${alias}`);
        }
        // console.log(alias);
    }
>>>>>>> 83b159aeda454e1a49296d081abc5dee015c2df3
});