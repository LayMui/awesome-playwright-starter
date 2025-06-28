import { test} from '@playwright/test';

test('iframe + shadow DOM tea interaction', async ({ page }) => {
    await page.goto('https://selectorshub.com/xpath-practice-page/');
    const link = page.locator("a[href='https://selectorshub.com/shadow-dom-in-iframe/']");

    await link.click();

    await page.waitForLoadState("domcontentloaded");

    const iframe = await page.frameLocator("//iframe[@id='pact']");
    try {
        await iframe.locator("#tea").fill("Chamoment", { timeout: 10000 });
      } catch (error) {
        // Wait a bit more and retry
        await page.waitForTimeout(2000);
        await iframe.locator("#tea").fill("Chamoment");
      }
   
});
