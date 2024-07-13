import { test, expect } from '../fixtures/fixtures';

test.describe('Validate images', () => {
    test('Validate image responses', async ({ page, getImgTagsSrcs }) => {
        const srcs = Object.values(getImgTagsSrcs);
        const trackingPixels = ['emltrk', 'emanalytics', 'ffcb10', 'two50'];
    
        for (let src of srcs) {
            if (trackingPixels.some((el) => src.includes(el))){
                console.log(`${src} is a tracking pixel`)
            } else if (src != '') {
                const response = await page.goto(src, { waitUntil: 'load', timeout: 0 });
                const status = response?.status();
    
                if (status == 200 || status == 301 || status == 302 || status == 304) {
                    console.log(`Status of ${src} is ${status}`);
                } else {
                    console.log(`ERROR: status of ${src} is ${status}`);
                }
            } else {
                continue;
            }
        }
    });

    test('Validate presence of alt text', async ({ getImgTagsSrcs, getImgTagsAlts }) => {
        const imgSrcs = Object.values(getImgTagsSrcs);
        const altValues = Object.values(getImgTagsAlts);

        imgSrcs.forEach((src, i) => {
            const alt = altValues[i];
            if (alt) {
                console.log(`Alt text found for ${src}\n Alt text: ${alt}`)
            } else {
                console.log(`No alt text found for ${src}`)
            }
        });       
    });
});
