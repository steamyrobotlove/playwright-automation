import { test } from '../fixtures/fixtures';

test('Validate copy', async ({ getListTagsInnerText }) => {
    const textArray = Object.values(getListTagsInnerText);

    console.log(textArray);
});

// test.beforeEach(async ({ page, getUrl }) => {
//     let url: any = Object.values(getUrl);
//     await page.goto(url);
// })

// for (let text of textArray) {
//     if (text.includes('prius')) {
//         console.log(`${text} contains the text 'prius'`);
//     } else {
//         continue;
//     }
// }

//# sourceMappingURL=validateCopyTest.spec.js.map