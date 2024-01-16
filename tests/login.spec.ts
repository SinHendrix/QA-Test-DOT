import { test, expect } from '@playwright/test';
import { chromium, Browser, Page } from 'playwright';

test('login with valid credentials', async () => {
  const browser: Browser = await chromium.launch();
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  try {
    // Navigate to the website
    await page.goto('https://www.psegameshop.com/');

    // Positive Test Case: Successful login
    await page.goto('https://www.psegameshop.com/my-account/'); // Assuming there is a login link on the website
    await page.fill('#username', 'valid_username');
    await page.fill('#password', 'valid_password');
    await page.getByText('Log in').click();

    // Verify that the user is redirected to the dashboard or another authenticated page
    const dashboardTitle = await page.title();
    if (dashboardTitle.includes('Dashboard') || dashboardTitle.includes('Welcome')) {
      console.log('Positive Test Case Passed: User logged in successfully.');
    } else {
      console.error('Positive Test Case Failed: User not redirected to the dashboard.');
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  } finally {
    await browser.close();
  }
});

test('login with invalid credentials', async () => {
  const browser: Browser = await chromium.launch();
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  try {
    // Navigate to the website
    await page.goto('https://www.psegameshop.com/');

    // Negative Test Case: Unsuccessful login
    await page.goto('https://www.psegameshop.com/my-account/'); // Assuming there is a login link on the website
    await page.fill('#username', 'invalid_username');
    await page.fill('#password', 'invalid_password');
    await page.getByText('Log in').click();

    // Verify that an error message is displayed
    const elementXPath = '/html/body/div[1]/main/div[2]/div/div/div[1]/ul/li/div';
    const element = await page.waitForSelector(elementXPath);
    if (element) {
      console.log('Negative Test Case Passed: Error message displayed for invalid login.');
    } else {
      console.error('Negative Test Case Failed: Error message not displayed for invalid login.');
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  } finally {
    await browser.close();
  }
});
