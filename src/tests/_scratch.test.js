import { test } from '../fixtures/fixtures';
import axios from 'axios';
import { TestResults } from '../models/test-results';

let results = new TestResults();
results.testName = '';
results.testStatus = 'failed';
results.testMessage = '';
results.testItems = [];

test('Validate presence of src and image responses', async ({ page, getImgTagsSrcs }) => {
    results.testName = 'Validate presence of src and image responses';

    const srcs = Object.values(getImgTagsSrcs);
    const trackingPixels = ['emltrk', 'emanalytics', 'ffcb10', 'two50'];
    let trackingPixelCount = 0;

    // Check for tracking pixels
    if (srcs.length !== 0) {
        for (let src of srcs) {
            if (trackingPixels.some((el) => src.includes(el))){
                results.testItems.push(`${src} is a tracking pixel`);
                trackingPixelCount++;

            // If not pixel check status codes
            } else if (src != '') {
                const response = await page.goto(src, { waitUntil: 'load', timeout: 0 });
                const status = response?.status();        
                if (status !== 200) {
                    results.testItems.push(`❌ ERROR: status of ${src} is ${status}`);
                }
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