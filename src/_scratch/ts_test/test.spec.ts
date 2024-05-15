import { PrintImgTagHrefsFunction } from './interfaces';
// const { test: playwrightTest, expect: playwrightExpect }: TestExtensions = require('@playwright/test');
const { test, expect } = require('../fixtures/fixtures');

test('Get img tags', async ({ imgTagsHrefs }: { imgTagsHrefs: PrintImgTagHrefsFunction}) => {
    const imgTags = Object.values(imgTagsHrefs);
    console.log(imgTags);
});