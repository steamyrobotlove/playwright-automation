import {test, expect} from '@playwright/test';

test('No of Disclaimers', async ({page})=>{

    await page.goto('https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/sales-conversion/convert/sc-convert-all-vehicles-sales-event/?FT_V1=2024~sienna~5410~~~03T3&FIRST_NAME_PERSONALIZATION=RAPP&MODEL_NAME=%5EocjVehicle%7CseriesName%7Creplace(%27Toyota%20%27,%27%27)%5E&FN_TRANSFORM=lowercase&whtToyLogo=0&grySocIco=1&DEALER_ZIP=19468&DISCLAIMER=&grylogo=1&MaxOffersLimit=1&sl=offer&pt=offer&previewText=offer&offer=1&DEALER_CD=37154&DEALER_NAME=Tri%20County%20Toyota&DEALER_ADDRESS=15%20D%20&%20L%20Drive&DEALER_CITY=Limerick&DEALER_STATE=PA&DEALER_URL=https://www.tricountytoyota.com/&DEALER_PHONE=610-495-4588&DEALER_SERVICE_URL=https://www.tricountytoyota.com/toyota-schedule-service/&touchName=convertvoihandraisers-se-sl1-nooffer');
    
    // locating the array of disclaimers
    const disclaimerList = await page.$$('//td[@class="unstyle-auto-detected-links"]/p');
    
    // printing no of disclaimers
    console.log('no of disclaimers: ',disclaimerList.length);
    expect(disclaimerList.length).toBe(6);

})

test.only('Social media icons', async ({page})=>{
    await page.goto('https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/sales-conversion/convert/sc-convert-all-vehicles-sales-event/?FT_V1=2024~sienna~5410~~~03T3&FIRST_NAME_PERSONALIZATION=RAPP&MODEL_NAME=%5EocjVehicle%7CseriesName%7Creplace(%27Toyota%20%27,%27%27)%5E&FN_TRANSFORM=lowercase&whtToyLogo=0&grySocIco=1&DEALER_ZIP=19468&DISCLAIMER=&grylogo=1&MaxOffersLimit=1&sl=offer&pt=offer&previewText=offer&offer=1&DEALER_CD=37154&DEALER_NAME=Tri%20County%20Toyota&DEALER_ADDRESS=15%20D%20&%20L%20Drive&DEALER_CITY=Limerick&DEALER_STATE=PA&DEALER_URL=https://www.tricountytoyota.com/&DEALER_PHONE=610-495-4588&DEALER_SERVICE_URL=https://www.tricountytoyota.com/toyota-schedule-service/&touchName=convertvoihandraisers-se-sl1-nooffer');
    
    const socialIcons = await page.$$('//table[@id="column_count_6_grySocIco"]/tbody/tr/td');

    // verifying the no of social icons including Let's Go Places
    expect(socialIcons.length).toBe(6);

    const fb = page.locator('#col_image_2 a');
    const fbImg = page.locator('#col_image_2 a img');

    await expect(fb).toHaveAttribute('alias', 'next_t_rm_social_support_facebook_na_9_1_facebook_ico_2289');
    await expect(fbImg).toHaveAttribute('alt', 'Facebook');
    
    console.log(await fb.getAttribute('alias'));
    console.log(await fbImg.getAttribute('alt'));
    await fb.screenshot({path: "./tests/screenshots/fb.png"});
})