import Typo from "typo-js";
import fs from 'fs';
import { TestResults } from '../models/test-results';
import { test, expect } from "../fixtures/fixtures";
const dictionary = new Typo("en_US");

let results = new TestResults();
results.testName = 'Spellcheck';
results.testStatus = 'failed';
results.testMessage = '';
results.testItems = [];

test("Spellcheck", async ({ getStrongTagsInnerText }) => {
    const pTagsInnerText = Object.values(getStrongTagsInnerText);
    let misspelled = [];

    // import exempt.txt for exemption list
    const exemptions = fs.readFileSync('./src/static/exempt.txt', 'utf-8').toString().toLowerCase();
    const regexNoNewLines = /<br>|[\n\r\n]/g;
    const regexEntities = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi;
    const regexSpaces = /\s+/g;
    const regexPunctuation = /[!"#$%&'()*+,./:;<=>?@[\\\]^_`{|}~]/g;
    const regexNumbers = /\d+/g;

    for (let text of pTagsInnerText) {
        const splitWords = text.split(/[^a-zA-Z0-9]+/).map((string) => {
            let matchedStrings = string
                .replace(regexNoNewLines, " ")
                .replace(regexSpaces, " ")
                .replace(regexPunctuation, " ")
                .replace(regexEntities, " ")
                .replace(regexNumbers, "");
            return matchedStrings.toLowerCase();
        });

        // pull individual words, check against typo-js and exemptions list
        for (let word of splitWords) {
            let spellcheck = dictionary.check(word);
            if (spellcheck == false && !exemptions.includes(word) && word.length > 1) {
                misspelled.push('❌ ' + word + '\n');
            }
        }
    }

    const filtered = misspelled.filter((el) => el);
    if (filtered.length >= 1) {
        results.testMessage = 'Some spelling errors found';
        results.testItems = filtered;
        test.info().annotations.push({
            type: 'error',
            description: results.testItems
        })
    } else {
        results.testStatus = 'passed';
        results.testMessage = '✅ No spelling errors found';
    }

    await expect(results.testItems).toEqual({
        testName: 'Spellcheck',
        testStatus: 'passed',
        testMessage: '✅ No spelling errors found',
        testItems: []
    });

    console.log(results);
});