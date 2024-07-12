const { test, expect } = require('../fixtures/fixtures');

test.describe('Link validation tests', () => {
    test('Validate Link Responses', async ({ page, aTagsHrefs }) => {
        const hrefs = Object.values(aTagsHrefs);
        for (let href of hrefs) {
            if (href && href !== "") {
                const response = await page.goto(href, { waitUntil: 'load', timeout: 0 });
                const status = response?.status();
                
                const result = status == 200 ? `Status of ${href} is ${status}` : `Status of ${href} was weird: ${status}`;
                console.log(result);
            }
        }
    });

    test('Validate aliases', async ({ aTagsNoRedirectAliases }) => {
        const aliases = Object.values(aTagsNoRedirectAliases);
        for (let alias of aliases) {
            const charToCount = "_";
            const regex = new RegExp(charToCount, 'g');
            const count = alias.match(regex)?.length;
            console.log(count);
            if (!count === undefined && count == 11 || !alias.includes("footer")) {
                console.log(`There are 11 underscores in ${alias}, so it's a main content link!`);
            } else if (count == 11 && alias.includes("footer")){
                console.log(`There are 11 underscores in ${alias}, and it's a footer link!`);            
            } else if (count == 3) {
                console.log(`There are 3 underscores in ${alias}, so this is a footer link.`);
            } else if (count !== 3 && count !== 11 && !alias.includes("footer")) {
                console.log(`This alias does not match the underscores conditional: ${alias}`);
            } else {
                console.log(`${alias} is undefined`)
            }
            // console.log(alias);
        }
    });

    test('Validate target attributes', async ({ aTagsHrefs, aTagsNoRedirectTargets }) => {
        const hrefs = Object.values(aTagsHrefs);
        const targets = Object.values(aTagsNoRedirectTargets);

        // Remove empty a tag from hrefs
        let newHrefs = hrefs.filter(function(el) {
            return el != "";
        });

        // Pair hrefs and targets for readability, validate them
        for (let i = 0; i < newHrefs.length; i++) {
            const valueHref = newHrefs[i];
            const valueTarget = targets[i];
            if (valueTarget) {
                console.log(`${valueHref} contains target=${valueTarget}`);
            } else {
                console.log(`***ERROR***: ${valueHref} DOES NOT CONTAIN _blank: ${valueTarget}`);
            }
        }
    });

    test('Verify all links are masked', async ({ aTagsHrefs }) => {
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
                if (href.includes('click.e.toyota.com')) {
                    console.log(`The url ${href} is masked with click.e.toyota.com`);
                } else if (href.includes("click.lexuscommunications.net")) {
                    console.log(`The url ${href} is masked with click.lexuscommunications.net`);
                } else if (href.includes("click.email.mazdafinancialservices.com")) {
                    console.log(`The url ${href} is masked with click.email.mazdafinancialservices.com`);
                } else if (!href.includes('click.e.toyota.com') && !href.includes("click.lexuscommunications.net") && !href.includes("click.email.mazdafinancialservices.com")){
                    console.log(`The url ${href} is not masked for any known environment`);
                } else {
                    console.log(`This url is weird: ${href}`);
                }
            }
        }        
    });

    // Removed page and getUrl arguments, don't need to pass any browser/page element
    // Other fixtures already use getUrl to get browser instance, can just grab any other fixture that has the data you need :)
    test('validate tdesc parameter', async ({ aTagsHrefs, getTdescValue}) => { 
        test.setTimeout(0);

        const hrefs = Object.values(aTagsHrefs);
        // console.log(hrefs);

        for(const href of hrefs){
            // get tdesc value using getTdescValue fixture
            const tdescv = await getTdescValue(href);
            console.log('tdesc:', tdescv);

            // get no. of underscores using underscoreCount function
            // console.log('The no. of underscores: ',await underscoreCount(tdescv));
        }
    })
});

// Maybe this can be a fixture?
// I've also created this logic in the validateAliases unit test, so maybe we can move that entire logic to a fixture! :D
// const underscoreCount = async (str) => {
//     let count = 0;
//         try{
//             for(let i=0; i<str.length; i++){
//                 if(str.charAt(i) == '_'){
//                     count += 1;
//                 }
//             }
//             return count;
//         }
//         catch(err){
//             console.log(err);
//         }
// }