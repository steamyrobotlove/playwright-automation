import { test, expect } from '../fixtures/fixtures';

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
        console.log('The no. of underscores: ',await underscoreCount(tdescv));
    }
})

// Maybe this can be a fixture?
// I've also created this logic in the validateAliases unit test, so maybe we can move that entire logic to a fixture! :D
const underscoreCount = async (str) => {
    let count = 0;
        try{
            for(let i=0; i<str.length; i++){
                if(str.charAt(i) == '_'){
                    count += 1;
                }
            }
            return count;
        }
        catch(err){
            console.log(err);
        }
}