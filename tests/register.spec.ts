import { test, expect } from '@playwright/test';
import { chromium, Browser, Page } from 'playwright';

test('successfully register', async () => {
  const browser: Browser = await chromium.launch();
  const context = await browser.newContext();
  const page: Page = await context.newPage();
  try {
    // Navigate to the website
    await page.goto('https://www.psegameshop.com/');

    // Positive Test Case: Successful login
    await page.goto('https://www.psegameshop.com/my-account/'); // Assuming there is a login link on the website
    // Assuming the website has a dropdown or list of genres
    const genreDropdownSelectorGenre = 'select#acf-field_5e758bca4e8cc'; // Replace with the actual selector of the dropdown
    await page.selectOption(genreDropdownSelectorGenre, 'Adventure');
    const genreDropdownSelectorConsole = 'select#acf-field_5e75905014c81'; // Replace with the actual selector of the dropdown
    await page.selectOption(genreDropdownSelectorConsole, 'Playstation');
    const genreDropdownSelectorHobby = 'select#acf-field_5ea976d054e4e'; // Replace with the actual selector of the dropdown
    await page.selectOption(genreDropdownSelectorHobby, 'Lifestyle & Shopping');
    // Assuming there is a radio button with the specified value
    const radioValue = 'Male';  // Replace with the actual value of the radio button
    const radioButtonSelector = `input[type="radio"][value="${radioValue}"]`;

    // Select the radio button
    await page.check(radioButtonSelector);
    await page.fill('#reg_email', 'valid_email');
    await page.fill('#reg_password', 'valid_password');
    await page.fill('#reg_confirm_password', 'valid_password');
    const buttonValue = 'Register';  // Replace with the actual value of the button
    const buttonSelector = `button[type="submit"][value="${buttonValue}"], button[type="submit"][value="${buttonValue}"]`;
    // Click the button
    await page.click(buttonSelector);

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
