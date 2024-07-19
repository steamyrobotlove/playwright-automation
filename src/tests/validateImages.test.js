import { test } from '../fixtures/fixtures';
import axios from 'axios';
import { TestResults } from '../models/test-results';

let results = new TestResults();
results.testName = '';
results.testStatus = 'failed';
results.testMessage = '';
results.testItems = [];

test.describe('Validate images', () => {
    test('Validate presence of src and image responses', async ({ page, getImgTagsSrcs }) => {
        results.testName = 'Validate presence of src and image responses';

        const srcs = Object.values(getImgTagsSrcs);
        const trackingPixels = ['emltrk', 'emanalytics', 'ffcb10', 'two50'];
        let trackingPixelCount = 0;
    
        if (srcs.length !== 0) {
            for (let src of srcs) {
                if (trackingPixels.some((el) => src.includes(el))){
                    results.testItems.push(`${src} is a tracking pixel`);
                    trackingPixelCount++;
                } else if (src != '') {
                    const response = await page.goto(src, { waitUntil: 'load', timeout: 0 });
                    const status = response?.status();        
                    if (status !== 200) {
                        results.testItems.push(`❌ ERROR: status of ${src} is ${status}`);
                    }
                } else {
                    continue;
                }
            }
        } else {
            results.testStatus;
            results.testMessage = "No srcs were found in img tags, or this page does not have images.";
        }

        if (results.testItems.length == 0 || results.testItems.length == trackingPixelCount && results.testItems.some((i) => i.includes('tracking pixel'))) {
            results.testStatus = 'passed';
            results.testMessage = '✅ All images have valid srcs';
        } else {
            results.testStatus;
            results.testMessage = 'Some images do not have valid srcs';
            results.testItems;
        }

        console.log(results);
    });

    test('Validate presence of alt text', async ({ getImgTagsSrcs, getImgTagsAlts }) => {
        results.testName = 'Validate presence of alt text';

        const imgSrcs = Object.values(getImgTagsSrcs);
        const altValues = Object.values(getImgTagsAlts);

        for (const src of imgSrcs) {
            const index = imgSrcs.indexOf(src);
            const alt = altValues[index];
            if (!alt) {
                results.testItems.push(`❌ No alt text found for ${src}`);
            } else {
                continue;
            }
        }
        
        if (results.testItems.length == 0) {
            results.testStatus = 'passed';
            results.testMessage = '✅ All images have alt text';
        } else {
            results.testStatus = 'failed';
            results.testMessage = 'Some images do not have alt text';
        }

        console.log(results);
    });

    test('Validate supported image filetypes', async ({ getImgTagsSrcs }) => {
        results.testName = 'Validate supported image filetypes';

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
                continue;
            } else if (typeof type === 'object' && type !== null) {
                results.testItems.push('❌ Error found: ' + JSON.stringify(type, null, 2));
            }
        }

        if (results.testItems.length == 0) {
            results.testStatus = 'passed';
            results.testMessage = '✅ All images are supported filetypes';
        } else {
            results.testStatus;
            results.testMessage = 'Some images are not supported filetypes';
        }

        console.log(results);
    });

    test('Image-link check', async ({ getUrl }) => {
        results.testName = 'Image-link check';

        const imgLinks = await getUrl.evaluate(() => {
            const imgTags = document.querySelectorAll('img');
            const imgArray = Array.from(imgTags).map(img => ({
                src: img.src,
                link: img.closest('a') ? img.closest('a').href : null
            }));
            return imgArray;
        });

        for (let i = 0; i < imgLinks.length; i++) {
            const img = imgLinks[i];
            if (!img.link) {
                results.testItems.push(`❌ image: ${img.src}\nlink: ${img.link}`);
            }
        }

        if (results.testItems.length > 0) {
            results.testStatus;
            results.testMessage = 'Some image-links have no a-tag hrefs';
        } else {
            results.testStatus = 'passed';
            results.testMessage = '✅ All image-links have valid a-tag hrefs';
        }

        console.log(results);
    });
});