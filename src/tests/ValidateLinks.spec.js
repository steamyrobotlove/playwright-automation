const { test, expect } = require('@playwright/test')
const links = require('../static/links.json')

const url = "https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/vehicle-support/fast-track/p00122042-trm-my25-camry-prelaunch/?FT_V1=2023~camry&dynamiclogoBlkv2=1&grySocIco=1&sl=tx_sl&pt=tx_pt"

links.forEach(link =>{
    test(`Validating alias of ${link.Text}`, async ({page})=>{
        await page.goto(url,{waitUntil:'load',timeout:0})
        const locator = `[href="${link.Url}"]`
        // console.log(locator)
        await page.locator(locator).getAttribute('alias').then(($alias)=>{
            expect($alias).toBe(link.alias);
        })
    })
})