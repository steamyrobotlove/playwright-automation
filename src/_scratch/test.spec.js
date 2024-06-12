const { test } = require('../fixtures/fixtures');

test('Test', async ({ getBodyInnerText }) => {
    const bodyCopy = Object.values(getBodyInnerText);

    console.log(bodyCopy);
});

// FIXTURE
// getBodyInnerText: async ({ getPage }, use) => {
//     const bodyLocator = getPage.locator('body');
//     const allText = await bodyLocator.allInnerTexts();
//     const bodyCopy = allText.join('');

//     await use (bodyCopy);
// },