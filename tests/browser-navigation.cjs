const { chromium } = require('playwright');
(async()=>{
const browser=await chromium.launch({headless:true}); const context=await browser.newContext();const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
await page.goto('http://127.0.0.1:8765/html/index.html');
await page.locator('.main-nav > a').last().click();await page.locator('#fullname').fill('Alice');
await page.locator('.main-nav > a').last().click();console.log('Same-route field:',await page.locator('#fullname').inputValue());
await page.locator('#fullname').fill('   ');
console.log('Whitespace validity:',await page.locator('#fullname').evaluate(e=>e.checkValidity()));
await page.evaluate(()=>location.hash='#/constructor');await page.waitForTimeout(100);console.log('Unknown route content:',await page.locator('#app').innerText());
console.log('Errors:',errors);await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
