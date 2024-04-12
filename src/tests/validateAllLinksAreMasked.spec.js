const { test, expect } = require('../fixtures/fixtures');

test('Verify all links are masked', async ({ page, aTagsHrefs }) => {
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
        if (href && !href == '') {
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