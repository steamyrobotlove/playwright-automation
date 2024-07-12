import { test, expect } from '../fixtures/fixtures';

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

    test('Validate presence of alt text', async ({ getImgTags }) => {
        const imgTags = Object.values(getImgTags);
        const altValue = imgTags.forEach((imgTag) => {
            const alt = imgTag.getAttribute('alt');
            console.log(alt);
        });
        

    });
});
