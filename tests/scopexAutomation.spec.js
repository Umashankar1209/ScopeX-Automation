import {test,expect} from '@playwright/test'
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const records = parse(
  fs.readFileSync(path.join(__dirname, "../TestDataScopeX/TestDataScopeX.csv")),
  {
      columns: true,
      skip_empty_lines: true
  }
);
test.describe("ScopeX Automation", () => {
  records.forEach((record) => {
/* Test data
const USER_EMAIL = 'Umashankar.t1996@gmail.com';
const USER_PASSWORD = 'shankar*1A';
const RECIPIENT_NAME = 'Umashankar';
const RECIPIENT_NICKNAME = 'SHANKAR';
const bankaccountnumber = '50100321820494';
const bankifscnumber = 'HDFC0002240';
*/
test(`Scopex Money End-to-End Test ${record.TestCaseId}`, async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://scopex.money/Login');
  await page.screenshot({ path: 'screenshots/login_page.png' });

  // Step 2: Login with registered user credentials
  await page.fill("//input[@id=':r3:-form-item']",record.UserEmail);
  await page.fill("//input[@id=':r4:-form-item']",record.UserPassword);
  await page.click("//button[normalize-space()='Log in']");
  await page.screenshot({ path: 'screenshots/after_login.png' });

  // Verify redirection to the dashboard after login
  await expect(page).toHaveURL("https://scopex.money/Dashboard");
  console.log('Login successful. Redirected to the dashboard.');

  // Step 3: Add a recipient
  await page.click("//span[@class='flex-1 ml-3 text-left whitespace-nowrap']");
  await page.click("//a[normalize-space()='Add Recipient']");
  await page.fill("//input[@placeholder='Enter recipient name']",record.RecipientName);
  await page.fill("//input[@placeholder='Enter recipient nick name']",record.RecipientNickName);
  await page.fill("//input[@placeholder='Enter bank account number']",record.BankAccountNumber)
  await page.fill("//input[@placeholder='Enter IFSC code']",record.IFSCCode);
  await page.click("//select[@placeholder='Enter country']");
  await page.selectOption("//select[@placeholder='Enter country']",'India')
  await page.waitForSelector("//button[normalize-space()='Submit']")
  await page.click("//button[normalize-space()='Submit']");
  await page.waitForSelector("//button[normalize-space()='Confirm']");
  await page.click("//button[normalize-space()='Confirm']") 
  await page.screenshot({ path: 'screenshots/after_adding_recipient.png' });
  await page.waitForTimeout(2000);

  // Step 4: Logout
  await page.click("//button[contains(@class,'dashboard-top-menu')]");
  await page.click("//a[@id='menu-item-1']"); 
  await page.screenshot({ path: 'screenshots/after_logout.png' });
  await page.waitForTimeout(2000);

  // Verify redirection to the login page after logout
  await expect(page).toHaveURL("https://scopex.money/#");
  console.log('Logout successful. Redirected to the login page.');

  //closing browser
  await page.close();
});
});
});