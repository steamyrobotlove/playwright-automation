import { expect, chromium} from '@playwright/test';
import { test } from '../fixtures/fixtures';

test('validate tdesc parameter', async ({aTagsRedirectHrefs}) => {
    test.setTimeout(100000);
    const browser = await chromium.launch();
    const context = await browser.newContext(); 
    const page = await context.newPage();

    await page.goto('http://view.e.toyota.com/?qs=665707832911e8684653dfe100b18533c8e3f77a263c1b171b1d9a6e01b94012e939235b540706cde23db214dade3f1fafe0a1028dd54055267552be0175df39c372539fa07346210e6356d56683a69f');

    const pagePromise = context.waitForEvent('page');

    // click on see offer link
    await page.locator(' (//strong[normalize-space()="See offer"])[1]').click();

    const newPage = await pagePromise;

    const currentUrl = newPage.url();
    // console.log(currentUrl);

    // find all search parameters in the url
    const searchparam = new URLSearchParams(new URL(currentUrl).search);

    // verify url has tdesc parameter or not
    console.log(searchparam.has('tdesc'));

    // print the value of tdesc parameter
    const tdescVal = searchparam.get('tdesc');
    console.log(tdescVal);

    // count number of underscores in the url
    let count = 0;
    for(let i=0; i<tdescVal.length; i++){
        if(tdescVal.charAt(i) == '_'){
            count += 1;
        }
    }
    console.log('The no of underscores in tdesc parameter:', count);
})