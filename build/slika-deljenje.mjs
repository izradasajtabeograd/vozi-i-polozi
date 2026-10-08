// Pravi build/vozi-i-polozi-deljenje.png (1200x630), sliku koja se vidi kad se link podeli.
// Pokrece se retko, rucno: node build/slika-deljenje.mjs (treba Playwright sa Chromium-om).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const { chromium } = await import('playwright').catch(() => import('/opt/node22/lib/node_modules/playwright/index.mjs'));

const KOREN = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.route('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.min.js', r => r.fulfill({
  contentType: 'application/javascript', body: fs.readFileSync(path.join(KOREN, 'node_modules/three/build/three.module.min.js'))
}));
await page.goto('file://' + path.join(KOREN, 'index.html'));
await page.waitForTimeout(2500);
await page.evaluate(() => {
  VIP.kreni();
  VIP.postavi(0, VIP.staza.S_STOP - 19, 1.75, 0);
  VIP.postaviZadatak(4);
  VIP.simuliraj(0.05);
});
// sacekaj da auto sa puta sa prvenstvom udje u kadar ispred STOP znaka
await page.evaluate(() => { const t0 = performance.now(); return new Promise(ok => { (function c() {
  const a = VIP.akteri.stopDesno;
  if ((a.aktivan && VIP.lokalno(0, a.x, a.z).d < 4.5) || performance.now() - t0 > 15000) ok(); else { VIP.simuliraj(0.03); requestAnimationFrame(c); } })(); }); });
// fontovi iz build/fontovi.css (pravi ih npm run build), da slika ne zavisi od Google servera
const fontovi = path.join(KOREN, 'build/fontovi.css');
if (fs.existsSync(fontovi)) await page.addStyleTag({ content: fs.readFileSync(fontovi, 'utf8') });
await page.addStyleTag({ content: `
  .hud,.dodirne,.ekran,#okreni{display:none!important}
  #deljenjeOkvir{position:fixed;inset:0;display:flex;align-items:center;padding:0 56px;background:linear-gradient(90deg,rgba(21,23,28,.95) 0,rgba(21,23,28,.88) 36%,rgba(21,23,28,0) 56%);font-family:Overpass,system-ui,sans-serif;color:#fff}
  #deljenjeOkvir .oznakaL{width:96px;height:96px;font-size:68px;border-radius:12px}
  #deljenjeOkvir h1{font-size:76px;line-height:.95;font-weight:900;margin:26px 0 0}
  #deljenjeOkvir p{font-family:Figtree,system-ui,sans-serif;font-size:30px;line-height:1.25;margin:18px 0 0;color:#e7e9ee;max-width:520px}
  #deljenjeOkvir .sajt{margin-top:26px;font-size:20px;font-weight:800;letter-spacing:.14em;color:#F4C20D}` });
await page.evaluate(() => document.body.insertAdjacentHTML('beforeend', `<div id="deljenjeOkvir"><div>
  <div class="oznakaL">L</div><h1>VOZI I<br>POLOŽI</h1>
  <p>Da li bi položio vožnju u Beogradu?</p><div class="sajt">AUTOSKOLEBEOGRAD.COM</div></div></div>`));
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);
await page.screenshot({ path: path.join(KOREN, 'build/vozi-i-polozi-deljenje.png') });
await browser.close();
console.log('build/vozi-i-polozi-deljenje.png');
