import { test } from '@playwright/test';
import axios from 'axios';

const url = "https://qa-nextcar.rapp.com/tear-sheets/next-car/toyota/vehicle-support/fast-track/p00122042-trm-my25-camry-prelaunch/?FT_V1=2023~camry&dynamiclogoBlkv2=1&grySocIco=1&sl=tx_sl&pt=tx_pt"

test.describe('Validate images', () => {
    test.setTimeout(0)
    // This block runs before each test
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    // test('Check for presence of tracking pixels', async ({ page }) => {
    //     const srcs = await page.$$eval('img', images => images.map(img => img.src));
    //     const trackingPixels = ['emltrk', 'emanalytics', 'ffcb10', 'two50'];
    //     const trackingPixelCount = 0;

    //     for (let src of srcs) {
    //         if (trackingPixels.some((el) => src.includes(el))) {
    //             console.log(`${src} is a tracking pixel`);
    //             trackingPixelCount++;
    //         }
    //     }
    //     console.log(`Found ${trackingPixelCount} tracking pixels`);
    // });

    // test('Validate presence of alt text', async ({ page }) => {
    //     const imgSrcs = await page.$$eval('img', images => images.map(img => img.src));
    //     const altValues = await page.$$eval('img', images => images.map(img => img.alt));

    //     for (const src of imgSrcs) {
    //         const index = imgSrcs.indexOf(src);
    //         const alt = altValues[index];
    //         if (!alt) {
    //             console.log(`❌ No alt text found for ${src}`);
    //         } else {
    //             console.log(`✅ ALT TEXT: ${alt} \nSRC: ${src}`);
    //         }
    //     }
    // });

    test('Validate supported image filetypes', async ({ page }) => {
        const imgSrcs = await page.$$eval('img', images => images.map(img => img.src));
        const filetypes = ['jpg', 'jpeg', 'gif', 'png'];
        const contentTypes = [];
        let i = 0;

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
            if (typeof type === 'string' && filetypes.some((str) => type.includes(str))) {
                console.log(`✅ SRC: ${imgSrcs[i]} - TYPE: ${type}`);
            } else if (typeof type === 'object' && type !== null) {
                console.log(`❌ ERROR: ${imgSrcs[i]} - TYPE: ` + JSON.stringify(type, null, 2));
            }
            //FIND A CLEANER WAY OF ITERATING THROUGH imgSrcs HERE
            i++;
        }
    });

    // test('Image-link check', async ({ getUrl }) => {
    //     results.testName = 'Image-link check';

    //     const imgLinks = await getUrl.evaluate(() => {
    //         const imgTags = document.querySelectorAll('img');
    //         const imgArray = Array.from(imgTags).map(img => ({
    //             src: img.src,
    //             link: img.closest('a') ? img.closest('a').href : null
    //         }));
    //         return imgArray;
    //     });

    //     for (let i = 0; i < imgLinks.length; i++) {
    //         const img = imgLinks[i];

    //         if (!img.link) {
    //             results.testItems.push(`❌ image: ${img.src}\nlink: ${img.link}`);
    //         }
    //     }

    //     if (results.testItems.length > 0) {
    //         results.testMessage = 'Some image-links have no a-tag hrefs';
    //     } else {
    //         results.testStatus = 'passed';
    //         results.testMessage = '✅ All image-links have valid a-tag hrefs';
    //     }

    //     console.log(results);
    // });
});
