import puppeteer from 'puppeteer-core';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to Part Masters page...');
    await page.goto('http://localhost:3001/dashboard/part-masters', { waitUntil: 'networkidle0' });
    
    console.log('Clicking Add Part button...');
    const [button] = await page.$$('::-p-text(Add Part)');
    if (button) {
      await button.click();
    } else {
      throw new Error("Add Part button not found");
    }
    
    console.log('Waiting for form to appear...');
    await page.waitForSelector('input[name="partNumber"]');
    
    console.log('Filling out form...');
    await page.type('input[name="partNumber"]', 'TEST-AUTO-001');
    await page.type('input[name="name"]', 'Automated Test Part');
    await page.type('input[name="serialNo"]', 'AUTO-1234');
    await page.select('select[name="machineType"]', 'GENERAL');
    
    console.log('Submitting form...');
    await page.click('button[type="submit"]');
    
    console.log('Waiting for form to disappear (success)...');
    await page.waitForSelector('form', { hidden: true, timeout: 5000 });
    
    console.log('SUCCESS! The UI works and the part was added without errors.');
  } catch (error) {
    console.error('FAILED to verify UI:', error.message);
  } finally {
    await browser.close();
  }
})();
