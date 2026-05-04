const { chromium } = require('playwright');
const XLSX = require('xlsx');
const path = require('path');

const EXCEL_PATH = path.join(__dirname, 'Assignment 1 - Test cases.xlsx');
const URL = 'https://www.pixelssuite.com/chat-translator';
const WAIT_MS = 4000;

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(URL);
  await page.waitForTimeout(4000);

  const wb = XLSX.readFile(EXCEL_PATH);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0]) continue;

    const tcId = row[0];
    const input = row[2];
    const expected = row[3];

    console.log(`\n🔍 Testing [${tcId}]`);
    console.log(`Input: ${input}`);

    try {
      // INPUT BOX
      const inputBox = page.locator('textarea').first();

      await inputBox.click();
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Backspace');

      await inputBox.type(input, { delay: 80 });

      // WAIT FOR TRANSLATION (simple + stable)
      await page.waitForTimeout(WAIT_MS);

      // OUTPUT BOX (SECOND TEXTAREA)
      const outputBox = page.locator('textarea').nth(1);

      let actual = await outputBox.inputValue();
      actual = actual.trim();

      // NORMALIZE TEXT
      const normalize = (text) => text.replace(/\s+/g, ' ').trim();

      const status =
        normalize(actual) === normalize(expected) ? 'Pass' : 'Fail';

      data[i][4] = actual || 'No Output';
      data[i][5] = status;

      console.log(`Expected: ${expected}`);
      console.log(`Actual:   ${actual}`);
      console.log(`Status:   ${status}`);
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
      data[i][4] = 'Error';
      data[i][5] = 'Fail';
    }

    // SAVE AFTER EACH ROW
    const newWs = XLSX.utils.aoa_to_sheet(data);
    wb.Sheets[wb.SheetNames[0]] = newWs;
    XLSX.writeFile(wb, EXCEL_PATH);
  }

  console.log('\n✅ All test cases completed!');
  await browser.close();
})();