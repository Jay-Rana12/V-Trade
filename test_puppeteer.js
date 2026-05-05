const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.error('PAGE ERROR:', err));

    await page.goto('http://localhost/redesign/manufacturers.html', { waitUntil: 'networkidle0' });
    
    const content = await page.evaluate(() => {
        return {
            networkGridVisible: document.querySelector('.network-grid')?.style.display !== 'none',
            networkGridCount: document.querySelectorAll('.network-grid').length,
            profileCards: document.querySelectorAll('.network-grid > div').length,
            tsGridCards: document.querySelectorAll('.ts-grid > div').length,
        };
    });
    
    console.log('Result:', content);
    await browser.close();
})();
