const { test } = require('../fixtures/fixtures');
const Typo = require('typo-js');
const dictionary = new Typo('en_US');

test('Spellcheck', async ({ getPTagsInnerText}) => {
    const pTagsInnerText = Object.values(getPTagsInnerText);
    let misspelled = [];

    const regexNoNewLines = /<br>|[\n\r\n]/g;
    const regexEntities = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/ig;
    const regexSpaces = /\s+/g;
    const regexPunctuation = /[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]/g;
    const regexNumbers = /\d+/g;

    for (let text of pTagsInnerText) {
        const splitWords = text.split(/[^a-zA-Z0-9]+/).map(string => {
            let replaceNewLines = string.replace(regexNoNewLines, ' ');
            let replaceSpaces = replaceNewLines.replace(regexSpaces, ' ');
            let replacePunctuation = replaceSpaces.replace(regexPunctuation, ' ');
            let replaceEntities = replacePunctuation.replace(regexEntities, ' ');
            let replaceNumbers = replaceEntities.replace(regexNumbers, '');
            return replaceNumbers;
        });

        for (let word of splitWords) {
            let spellcheck = dictionary.check(word);

            if (spellcheck==false && word.length > 1) {
                misspelled.push(word);
            }
        }
    };

    const filtered = misspelled.filter(el => el);
    if (filtered.length >= 1) {
        console.table(filtered); //The following misspellings were found: " +
    } else {
        console.log('No misspellings found');
    }
});