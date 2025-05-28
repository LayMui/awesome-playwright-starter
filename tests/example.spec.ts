import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('shadom DOM', async ({ page }) => {
  await page.goto('https://selectorshub.com/xpath-practice-page/');

   // Wait for the page to load completely
  // Wait for all resources (images, stylesheets, etc.) to load
  await page.waitForLoadState('networkidle'); // Waits for dynamic content
  //await page.waitForTimeout(2000); // Additional wait for shadow DOM to render
 
  // Try using role-based locators
//await page.getByRole('textbox', { name: 'user name field' }).fill('laymui');
await page.evaluate(() => {
  function findInShadowDOM(selector) {
    // Check regular DOM first
    let element = document.querySelector(selector);
    if (element) return element;
    
    // Search all shadow roots
    const allElements = document.querySelectorAll('*');
    for (let el of allElements) {
      if (el.shadowRoot) {
        element = el.shadowRoot.querySelector(selector);
        if (element) return element;
      }
    }
    return null;
  }
  
  const input = findInShadowDOM('#kils');
  if (input) {
    input.value = 'laymui';
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
});

 
  // await page.getByRole('textbox', { name: 'user name field' }).click();
  // await page.getByRole('textbox', { name: 'user name field' }).fill('laymui');
  // await page.getByRole('textbox', { name: 'user name field' }).press('Enter');
});
