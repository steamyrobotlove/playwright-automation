import { test } from '../../fixtures/fixtures';

test('Get img tags', async ({ page, imgTagsSrcs }) => {
    const srcs = Object.values(imgTagsSrcs);
    const trackingPixels = ['emltrk', 'emanalytics', 'ffcb10', 'two50'];

    for (let src of srcs) {
        if (trackingPixels.some((el) => src.includes(el))){
            console.log(`${src} is a tracking pixel`)
        } else if (src != '') {
            const response = await page.goto(src, { waitUntil: 'load', timeout: 0 });
            const status = response?.status();

            if (status == 200 ) {
                console.log(`Status of ${src} is ${status}`);
            } else {
                console.log(`ERROR: status of ${src} is ${status}`);
            }
        } else {
            continue;
        }
    }
});