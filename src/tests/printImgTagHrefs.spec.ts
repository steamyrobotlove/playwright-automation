import { TestExtensions } from '../_scratch/ts_test/interfaces';
const { test: playwrightTest, expect: playwrightExpect }: TestExtensions = require('@playwright/test');
const { test, expect } = require('../fixtures/fixtures');

test('Get img tags', async ({ imgTagsHrefs }) => {
    console.log(imgTagsHrefs);
});