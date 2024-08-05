import {test, expect} from '@playwright/test';

test.only('Universal disclaimer', async ({page})=>{
    // open the PL
    await page.goto('https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/sales-conversion/convert/sc-convert-all-vehicles-sales-event/?FT_V1=2024~sienna~5410~~~03T3&FIRST_NAME_PERSONALIZATION=RAPP&MODEL_NAME=%5EocjVehicle%7CseriesName%7Creplace(%27Toyota%20%27,%27%27)%5E&FN_TRANSFORM=lowercase&whtToyLogo=0&grySocIco=1&DEALER_ZIP=19468&DISCLAIMER=&grylogo=1&MaxOffersLimit=1&sl=offer&pt=offer&previewText=offer&offer=1&DEALER_CD=37154&DEALER_NAME=Tri%20County%20Toyota&DEALER_ADDRESS=15%20D%20&%20L%20Drive&DEALER_CITY=Limerick&DEALER_STATE=PA&DEALER_URL=https://www.tricountytoyota.com/&DEALER_PHONE=610-495-4588&DEALER_SERVICE_URL=https://www.tricountytoyota.com/toyota-schedule-service/&touchName=convertvoihandraisers-se-sl1-nooffer');
    
    // locate the universal disclaimer in the PL
    const universal = await page.locator('//td[@class="universal_disclaimer_td_child"]/p/span');
    
    // verify element is visible or not
    await expect(universal).toBeVisible();
    
    // verify the text of the element
    await expect(universal).toHaveText("Vehicles shown may be prototypes, shown using visual effects and/or shown with options.");

    // Taking the screenshot of the element
    await universal.screenshot({path:'./tests/screenshots/test.png'});

    // verify the element is enabled or not
    await expect(universal).toBeEnabled();

    // verify the font, font-size
    const ud = await page.locator('//td[@class="universal_disclaimer_td_child"]/p');
    await expect(ud).toHaveCSS('font-size', '11px');
    await expect(ud).toHaveCSS('font-family', 'ToyotaType, Helvetica, sans-serif');

    // await expect(ud).toHaveCSS('font-family', 'ToyotaType, Helvetica, Arial, sans-serif');
    await page.waitForTimeout(5000);

})

/*
verify presence of element
verify text content
verify text element is visible
verify text element is enabled
verify text element style
*/

