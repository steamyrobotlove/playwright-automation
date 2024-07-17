import { test, expect } from '../fixtures/fixtures';
const axios = require('axios');

test.describe('Validate images', () => {
    // test('Validate image responses', async ({ page, getImgTagsSrcs }) => {
    //     const srcs = Object.values(getImgTagsSrcs);
    //     const trackingPixels = ['emltrk', 'emanalytics', 'ffcb10', 'two50'];
    
    //     for (let src of srcs) {
    //         if (trackingPixels.some((el) => src.includes(el))){
    //             console.log(`${src} is a tracking pixel`)
    //         } else if (src != '') {
    //             const response = await page.goto(src, { waitUntil: 'load', timeout: 0 });
    //             const status = response?.status();
    
    //             if (status == 200 || status == 301 || status == 302 || status == 304) {
    //                 console.log(`Status of ${src} is ${status}`);
    //             } else {
    //                 console.log(`ERROR: status of ${src} is ${status}`);
    //             }
    //         } else {
    //             continue;
    //         }
    //     }
    // });

    // test('Validate presence of alt text', async ({ getImgTagsSrcs, getImgTagsAlts }) => {
    //     const imgSrcs = Object.values(getImgTagsSrcs);
    //     const altValues = Object.values(getImgTagsAlts);

    //     imgSrcs.forEach((src, i) => {
    //         const alt = altValues[i];
    //         if (alt) {
    //             console.log(`Alt text found for ${src}\n Alt text: ${alt}`)
    //         } else {
    //             console.log(`No alt text found for ${src}`)
    //         }
    //     });       
    // });

    test('Validate image filetypes', async ({ getImgTagsSrcs }) => {
        const imgSrcs = Object.values(getImgTagsSrcs);
        const filetypes = ['jpg', 'jpeg', 'gif', 'png'];
        const contentTypes = [];

        for (const src of imgSrcs) {
            try {
                const response = await axios.head(src);
                const header = response.headers['content-type'];
                contentTypes.push(header.split('/')[1]);
            } catch (error) {
                contentTypes.push({ src, error: error.message });
            }
        }

        for (const type of contentTypes) {
            if (typeof type === 'string' && filetypes.some((i) => type.includes(i))) {
                console.log(`Valid type: ${type}`);
            } else if (typeof type === 'object' && type !== null) {
                console.log('Error found: ' + JSON.stringify(type, null, 2));
            }
        }
    });
});
