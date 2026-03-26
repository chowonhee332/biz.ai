import { chromium } from 'playwright';

const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader'] });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);

// Silk canvas만 남기고 나머지 다 숨김
await page.evaluate(() => {
  const hero = document.getElementById('hero');
  if (!hero) return;
  // hero 안의 Silk canvas를 제외한 모든 자식 숨김
  Array.from(hero.children).forEach((child, i) => {
    // 첫번째 div가 Silk wrapper (z-0)
    if (i !== 0) child.style.visibility = 'hidden';
  });
});

await page.waitForTimeout(1000);

const hero = await page.$('section[id="hero"]');
await hero.screenshot({ path: 'public/hero-silk-bg.png' });
console.log('silk background captured');

await browser.close();
