const { test, expect } = require('../fixtures/fixtures');
import { TestResults } from '../models/test-results';

let results = new TestResults();
results.testName = '';
results.testStatus = 'failed';
results.testMessage = '';
results.testItems = [];

test.describe('Link validation tests', () => {
    test('Validate Link Responses', async ({ page, aTagsHrefs }) => {
        results.testName = 'Link validation tests';
        test.slow();

        const hrefs = Object.values(aTagsHrefs);
        const status = [];
        for (let href of hrefs) {
            if (href && href !== "") {
                const response = await page.goto(href, { waitUntil: 'load', timeout: 0 });
                status.push(response?.status());
            }
        }
        
        for (let i = 0; i < hrefs.length; i++) {
            if (status[i] !== 200 && status[i] !== 302) {
                results.testItems.push('❌ STATUS: ' + status[i] + '\n HREF: ' + hrefs[i]);
            }
        }
        
        if (results.testItems.length !== 0) {
            results.testStatus;
            results.testMessage = 'Some links are not resolving';
        } else {
            results.testStatus = 'passed';
            results.testMessage = '✅ All links are resolving';
        }
        console.log(results);
    });

    test('Validate aliases', async ({ aTagsNoRedirectAliases }) => {
        results.testName = 'Validate aliases';
        const aliases = Object.values(aTagsNoRedirectAliases);
        const regex = /_/g;

        for (let alias of aliases) {
            const count = alias.match(regex)?.length;

            if (![3, 11].includes(count) && !alias.includes("footer")) {
                results.testItems.push(`❌ ${alias}`);
            }
        }

        if (results.testItems.length !== 0) {
            results.testMessage = 'Some aliases are not valid';
        } else {
            results.testStatus = 'passed';
            results.testMessage = '✅ All aliases are valid';
        }

        console.log(results);
    });

    test('Validate target attributes', async ({ aTagsHrefs, aTagsNoRedirectTargets }) => {
        results.testName = 'Validate target attributes';
        const hrefs = Object.values(aTagsHrefs);
        const targets = Object.values(aTagsNoRedirectTargets);

        let newHrefs = hrefs.filter((el) => {
            return el != "";
        });

        // Pair hrefs and targets for readability, validate them
        for (let i = 0; i < newHrefs.length; i++) {
            const valueHref = newHrefs[i];
            const valueTarget = targets[i];

            if (!valueTarget) {
                // console.log(`${valueHref} contains target=${valueTarget}`);
                results.testItems.push(`❌ ${valueHref}`);
            }
        }

        if (results.testItems.length !== 0) {
            results.testMessage = 'Some links do not have target attributes';
        } else {
            results.testStatus = 'passed';
            results.testMessage = '✅ All links have target attributes';
        }

        console.log(results);
    });

    test('Verify all links are masked', async ({ aTagsHrefs }) => {
        results.testName = 'Verify all links are masked';
        test.slow();

        const hrefsArray = Object.values(aTagsHrefs);
        let hrefs = [];
        for (let link of hrefsArray) {
            if (!link.includes('view.e.toyota.com')) {
                let value = link.toLowerCase();
                hrefs.push(value);
            } else {
                continue;
            }
        }
        for (let href of hrefs) {
            if (href && href !== '') {
                if (!href.includes('click.e.toyota.com') && !href.includes("click.lexuscommunications.net") && !href.includes("click.email.mazdafinancialservices.com")) {
                    results.testItems.push(`❌ ${href}`);
                }
            }
        }
        
        if (results.testItems.length !== 0) {
            results.testMessage = 'Some links are not masked';
        } else {
            results.testStatus = 'passed';
            results.testMessage = '✅ All links are masked';
        }

        console.log(results);
    });
});

// TDESC FIXTURE, REFACTOR
    // // Removed page and getUrl arguments, don't need to pass any browser/page element
    // // Other fixtures already use getUrl to get browser instance, can just grab any other fixture that has the data you need :)
    // test('validate tdesc parameter', async ({ aTagsHrefs, getTdescValue}) => { 
    //     results.testName = 'Validate tdesc parameter';
    //     test.slow();

    //     const hrefs = Object.values(aTagsHrefs);

    //     for(const href of hrefs){
    //         const tdescv = await getTdescValue(href);

    //         // get no. of underscores using underscoreCount function
    //         // console.log('The no. of underscores: ',await underscoreCount(tdescv));
    //     }
    // });