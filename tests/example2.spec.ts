import { test} from '@playwright/test';

test('iframe + shadow DOM tea interaction', async ({ page }) => {
    await page.goto('https://selectorshub.com/xpath-practice-page/');
    const link = page.locator("a[href='https://selectorshub.com/shadow-dom-in-iframe/']");

    await link.click();

    await page.waitForLoadState('domcontentloaded', { timeout: 60000 }); // 60 seconds

    const iframeElement = page.locator("//iframe[@id='pact']");
    await iframeElement.waitFor({ state: 'visible', timeout: 60_000 });


    await page.locator("iframe#pact").waitFor({ state: 'visible' });
    const iframe = page.frameLocator("iframe#pact");

    await iframe.locator("#tea").fill("Chamoment", { timeout: 60_000 });
   
});
