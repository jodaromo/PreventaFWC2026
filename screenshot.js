const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Wait for animations to complete
  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: '/sessions/admiring-dreamy-curie/mnt/FIFA2026/preview-hero.png', fullPage: false });
  
  // Scroll to products section
  await page.evaluate(() => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '/sessions/admiring-dreamy-curie/mnt/FIFA2026/preview-products.png', fullPage: false });
  
  // Full page screenshot
  await page.screenshot({ path: '/sessions/admiring-dreamy-curie/mnt/FIFA2026/preview-full.png', fullPage: true });
  
  await browser.close();
  console.log('Screenshots saved!');
})();
