// Pravi verziju igre za sajt: dist/index.html
//
// - Three.js i fontovi su ubaceni u fajl, igra ne zavisi od drugih servera
// - deo za testiranje (window.VIP) je izbacen
// - igra radi samo na domenima iz DOZVOLJENI, na drugim prikazuje poziv da se igra na sajtu
// - kod je skracen i zamagljen (minify + obfuscator), tesko se cita i menja
//
// Pokretanje: npm install, pa npm run build
// Izvor (index.html u korenu) ostaje citljiv i radi kao pre, bez zakljucavanja.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as esbuild from 'esbuild';
import JavaScriptObfuscator from 'javascript-obfuscator';

const KOREN = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = path.join(KOREN, 'build');
const DIST = path.join(KOREN, 'dist');

// Domeni na kojima igra sme da radi (i svi njihovi poddomeni, na primer www.)
const DOZVOLJENI = ['autoskolebeograd.com'];

const GODINA = 2026;
const AUTORSKA_PRAVA = `<!--
  VOZI I POLOŽI
  Copyright © ${GODINA} autoskolebeograd.com. Sva prava zadržana.
  Kopiranje, menjanje, objavljivanje ili ugradnja na druge sajtove bez pisane dozvole nije dozvoljeno.
-->`;

function izvadi(tekst, od, do_) {
  const a = tekst.indexOf(od);
  const b = tekst.indexOf(do_, a + od.length);
  if (a < 0 || b < 0) throw new Error('Nije nadjeno: ' + od);
  return [a, b + do_.length];
}

// ---------------------------------------------------------------
// Fontovi: preuzimaju se jednom sa Google Fonts (latinica i latinica sa kvacicama)
// i cuvaju u build/fontovi.css kao base64, pa sledeca pakovanja ne traze internet
// ---------------------------------------------------------------
async function fontovi(html) {
  const keš = path.join(BUILD, 'fontovi.css');
  if (fs.existsSync(keš)) return fs.readFileSync(keš, 'utf8');
  const link = html.match(/href="(https:\/\/fonts\.googleapis\.com\/css2[^"]+)"/)[1].replace(/&amp;/g, '&');
  const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
  const css = await (await fetch(link, { headers: { 'User-Agent': UA } })).text();
  // Google vraca blokove "/* latin */ @font-face {...}"
  const blokovi = [...css.matchAll(/\/\* ([\w-]+) \*\/\s*(@font-face\s*\{[^}]+\})/g)]
    .filter(m => m[1] === 'latin' || m[1] === 'latin-ext');
  // promenljivi fontovi: isti fajl sluzi za vise debljina, pa se ubacuje jednom sa opsegom debljina
  const poFajlu = new Map();
  for (const [, , blok] of blokovi) {
    const url = blok.match(/url\((https:[^)]+)\)/)[1];
    const tezina = +blok.match(/font-weight:\s*(\d+)/)[1];
    const p = poFajlu.get(url);
    if (p) { p.min = Math.min(p.min, tezina); p.max = Math.max(p.max, tezina); }
    else poFajlu.set(url, { blok, min: tezina, max: tezina });
  }
  let izlaz = '';
  for (const [url, { blok, min, max }] of poFajlu) {
    const b64 = Buffer.from(await (await fetch(url)).arrayBuffer()).toString('base64');
    izlaz += blok.replace(url, `data:font/woff2;base64,${b64}`)
      .replace(/font-weight:\s*\d+/, `font-weight: ${min === max ? min : min + ' ' + max}`)
      .replace(/\s+/g, ' ') + '\n';
  }
  if (!izlaz) throw new Error('Fontovi nisu preuzeti');
  fs.writeFileSync(keš, izlaz);
  return izlaz;
}

// ---------------------------------------------------------------
// Zakljucavanje na domen: ubacuje se na pocetak koda igre, pre svega ostalog
// ---------------------------------------------------------------
const ZAKLJUCAVANJE = `
{
  const dozvoljeni = ${JSON.stringify(DOZVOLJENI)};
  const dobar = h => { h = String(h || '').toLowerCase(); return dozvoljeni.some(d => h === d || h.endsWith('.' + d)); };
  let dozvoljeno = location.protocol === 'https:' && dobar(location.hostname);
  // u iframe-u i stranica koja ugradjuje mora biti na dozvoljenom domenu (gde pregledac to otkriva)
  try {
    const preci = location.ancestorOrigins;
    if (preci) for (let i = 0; i < preci.length; i++) if (!dobar(new URL(preci[i]).hostname)) dozvoljeno = false;
  } catch (e) { dozvoljeno = false; }
  if (!dozvoljeno) {
    document.getElementById('drugiSajt').style.display = 'flex';
    document.getElementById('start').remove();
    throw new Error('VOZI I POLOŽI se igra samo na autoskolebeograd.com');
  }
}
`;

async function main() {
  let html = fs.readFileSync(path.join(KOREN, 'index.html'), 'utf8');

  // 1. kod igre
  const OTVOR = '<script type="module">', ZATVOR = '</script>';
  const [m0, m1] = izvadi(html, OTVOR, ZATVOR);
  let kod = html.slice(m0 + OTVOR.length, m1 - ZATVOR.length);
  kod = kod.replace(/\/\/ @@TEST_POCETAK[\s\S]*?\/\/ @@TEST_KRAJ/, '');
  if (kod.includes('window.VIP')) throw new Error('Deo za testiranje nije izbacen');
  if (!kod.includes('/* @@ZAKLJUCAVANJE */')) throw new Error('Nema mesta za zakljucavanje');
  kod = kod.replace('/* @@ZAKLJUCAVANJE */', ZAKLJUCAVANJE);

  // Three.js: samo delovi koje igra koristi, skraceni (biblioteka je javna, ne zamagljuje se)
  const IMPORT = "import * as THREE from 'three';";
  if (!kod.includes(IMPORT)) throw new Error('Nema importa Three.js');
  const delovi = [...new Set([...kod.matchAll(/THREE\.(\w+)/g)].map(m => m[1]))].sort();
  const ulazThree = path.join(BUILD, '.three.tmp.js');
  fs.writeFileSync(ulazThree, `export { ${delovi.join(', ')} } from 'three';`);
  const three = (await esbuild.build({
    entryPoints: [ulazThree], bundle: true, format: 'iife', globalName: '__T', minify: true,
    target: ['es2020'], write: false, legalComments: 'none', absWorkingDir: KOREN
  })).outputFiles[0].text;
  fs.unlinkSync(ulazThree);

  // Kod igre: skracen, pa zamagljen
  const igra = (await esbuild.transform(kod.replace(IMPORT, 'const THREE = __T;'), {
    loader: 'js', minify: true, target: 'es2020', legalComments: 'none'
  })).code;
  const min = '(()=>{' + igra + '})();';
  console.log(`three ${(three.length / 1024).toFixed(0)} KB, igra posle skracivanja ${(min.length / 1024).toFixed(0)} KB`);

  const zamagljeno = JavaScriptObfuscator.obfuscate(min, {
    target: 'browser', compact: true, seed: 20260,
    identifierNamesGenerator: 'mangled-shuffled', renameGlobals: false,
    stringArray: true, stringArrayThreshold: 0.85, stringArrayEncoding: ['base64'],
    stringArrayRotate: true, stringArrayShuffle: true,
    stringArrayWrappersCount: 2, stringArrayWrappersType: 'function',
    controlFlowFlattening: false, deadCodeInjection: false, selfDefending: false,
    transformObjectKeys: false, unicodeEscapeSequence: false, sourceMap: false
  }).getObfuscatedCode();

  // 2. HTML: bez spoljnih fontova i import mape, kod i fontovi unutra
  html = html.replace(/<!--[\s\S]*?-->\n?/, '');            // komentar sa pocetka, dodaje se nazad ispod
  html = html.replace(/<link rel="preconnect"[^>]*>\n/g, '');
  html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com[^>]*>\n/, '');
  html = html.replace(/<script type="importmap">[\s\S]*?<\/script>\n/, '');
  html = html.replace(/<!--[\s\S]*?-->/g, '');                // ostali komentari
  const css = await fontovi(fs.readFileSync(path.join(KOREN, 'index.html'), 'utf8'));
  html = html.replace('<style>', `<style>\n${css}`);
  const [n0, n1] = izvadi(html, OTVOR, ZATVOR);
  const THREE_LICENCA = '/** @license Three.js, Copyright 2010-2024 Three.js Authors, SPDX-License-Identifier: MIT */\n';
  html = html.slice(0, n0) + OTVOR + THREE_LICENCA + three + '\n' + zamagljeno + ZATVOR + html.slice(n1);
  html = html.replace('<!doctype html>', '<!doctype html>\n' + AUTORSKA_PRAVA);
  if (/cdn\.jsdelivr|fonts\.googleapis|fonts\.gstatic/.test(html)) throw new Error('Ostala je spoljna zavisnost');

  fs.mkdirSync(DIST, { recursive: true });
  fs.writeFileSync(path.join(DIST, 'index.html'), html);
  fs.copyFileSync(path.join(BUILD, 'vozi-i-polozi-deljenje.png'), path.join(DIST, 'vozi-i-polozi-deljenje.png'));
  const kb = n => (n / 1024).toFixed(0) + ' KB';
  console.log(`dist/index.html ${kb(Buffer.byteLength(html))} (three ${kb(three.length)}, kod igre ${kb(zamagljeno.length)}, fontovi ${kb(css.length)})`);
}

main().catch(e => { console.error(e); process.exit(1); });
