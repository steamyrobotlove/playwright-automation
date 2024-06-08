const { test, expect } = require('../fixtures/fixtures');
const Typo = require('typo-js');
const dictionary = new Typo('en_US');

const isNotWord = (word) => {
    return /^\d+$/.test(word) || /^[^\w]+$/.test(word) || word.length < 3;
};

const hasWord = (text) => {
    return /\w/.test(text);
};

test('Spellcheck', async ({ getPTagsInnerText }) => {
    const pTagsInnerText = Object.values(getPTagsInnerText).flat();
    const misspelledWords = pTagsInnerText.reduce((acc, text) => {
        if (!hasWord(text)) {
            return acc;
        }

        const words = text.split(' ').map(word => {
            if (isNotWord(word)) {
                return word;
            }
            return !dictionary.check(word) ? word : '';
        }).filter(Boolean);

        return [...acc, ...words];
    }, []);

    console.log(misspelledWords);
});

// Previous n00b code
    // const pTagsInnerText = Object.values(getPTagsInnerText);
    // let misspelled = [];

    // for (let array of pTagsInnerText) {
    //     let text = array.split(' ');

    //     for (let str of text) {
    //         let words = str.split(' ');

    //         for (let word of words) {
    //             let spellcheck = dictionary.check(word);

    //             if (spellcheck == false) {
    //                 misspelled.push(word);
    //             } else {
    //                 continue;
    //             }
    //         }
    //     }
    // }
    // console.log(misspelled);