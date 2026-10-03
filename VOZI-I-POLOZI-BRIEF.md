# VOZI I POLOŽI: browser igra za autoskolebeograd.com

Ovaj fajl je kompletan brief za izradu igre. Pročitaj ga ceo pre nego što počneš. Sve što treba da znaš je ovde: ideja, pravila vožnje, izgled, boje, kontrole, bodovanje, struktura koda i kriterijumi za završetak. Na kraju fajla je HTML skica ekrana (Prilog A), koju treba pratiti vizuelno.

---

## 1. Ko, šta i zašto

- **Naručilac:** Goran, vlasnik sajta https://autoskolebeograd.com/ (direktorijum auto škola u Beogradu, WordPress + Elementor).
- **Jezik komunikacije sa Goranom:** srpski, latinica. Nikad ćirilica.
- **Pravilo za tekst:** u svim tekstovima u igri i u porukama Goranu ne koristiti duge crte (em/en dash). Izbegavati crtice uopšte.
- **Cilj igre:** zabavna simulacija vožnje iz pogleda vozača u kojoj igrač prolazi kroz situacije sa vozačkog ispita u Srbiji (STOP znak, pešački prelaz, semafor, pravo prvenstva, prestrojavanje sa migavcem, ograničenje brzine). Na kraju dobija ocenu "Položio" ili "Nije položio" sa spiskom grešaka, kao od ispitivača.
- **Poslovni cilj:** deljenje na društvenim mrežama ("položio sam iz prve, probaj ti") i dovođenje posetilaca na listu auto škola: https://autoskolebeograd.com/sve-auto-skole/

---

## 2. Tehnički okvir

- **Jedan samostalan fajl `index.html`** sa ugrađenim CSS-om i JS-om. Bez build koraka, bez npm-a u produkciji.
- **3D:** Three.js preko CDN-a (cdnjs ili jsdelivr, fiksna verzija, ES module import map).
- **Fontovi:** Google Fonts, Overpass (naslovi, brojevi, weight 800 do 900) i Figtree (tekst, 500 i 700).
- **Bez backend-a.** Rezultat i najbolji skor mogu u localStorage (uvek u try/catch, igra mora da radi i bez njega).
- **Performanse:** stabilnih 60 fps na prosečnom laptopu, prihvatljivo na srednjem Android telefonu. Low poly geometrija, malo svetala, bez senki ili sa jednom jeftinom.
- **Radi offline** kad se jednom učita (osim fontova i CDN-a).
- **Veličina:** cilj ispod 300 KB bez biblioteka.
- **Repo struktura (predlog):**
  ```
  /index.html          igra (sve u jednom)
  /README.md           kako se pokreće i kako se ugrađuje
  /docs/brief.md       ovaj fajl
  /assets/og.png       slika za deljenje 1200x630 (opciono)
  ```
- **Hosting za test:** GitHub Pages iz main grane.

---

## 3. Izgled (vizuelni stil)

Stil je stilizovan, ravan, crtani 3D (low poly, flat boje, bez tekstura), kao u Prilogu A. Ne pokušavati fotorealizam.

### Boje (brend sajta)

| Namena | Boja |
|---|---|
| Asfalt, tamna pozadina UI | `#15171C` |
| Signal žuta (migavac, upozorenja, akcenti) | `#F4C20D` |
| Tekst tamni | `#3A3F49` |
| Poziv zelena (dugme "Pozovi", uspeh) | `#15703F` |
| Krem pozadina | `#F5F3EC` |
| Siva opis | `#545966` |
| Linija | `#E2DED3` |
| Bela | `#FFFFFF` |
| Plava L tablica | `#2846A0` |
| Crvena (STOP, greška) | `#C8102E` |

### Logo i oznaka L

- U Srbiji je oznaka vozila za obuku **plavi kvadrat sa belim slovom L** (Pravilnik o obeležavanju vozila za obuku, Sl. glasnik SRS 16/83). **Nikada žuti dijamant ili žuti trougao sa crnim L.** To je strana oznaka i Goran je to izričito ispravio.
- Krovna tabla auto škole je žuta, sa plavim L kvadratima na krajevima.
- Logo sajta: plavi kvadrat sa belim L, pored tekst "AUTO ŠKOLE" velikim slovima i ispod "BEOGRAD" sa žutim isprekidanim linijama koje se pale redom kao migavac.
- U igri: dole levo mali bedž "VOZI I POLOŽI" sa plavim L i ispod "AUTOSKOLEBEOGRAD.COM".

### Okruženje

- Beogradski gradski kraj: niske zgrade u bež i krem tonovima, prozori svetloplavi, drveće (zelene kugle), trotoari svetlosivi, asfalt tamnosiv, bele oznake na putu.
- Nebo svetloplavo gradijent, u daljini blaga zelena brda.
- Pešaci i druga kola su jednostavne figure u bojama iz palete (narandžasta, zelena, plava kola).

---

## 4. Ekran tokom vožnje (HUD)

Pratiti Prilog A. Elementi:

1. **Gore levo, zadatak:** tamna kartica, mali žuti natpis "ZADATAK 3 / 8", naslov zadatka (npr. "Raskrsnica sa znakom STOP") i jedna rečenica uputstva.
2. **Gore u sredini, retrovizor:** pravougaonik sa zaobljenim ivicama, prikazuje pogled unazad (drugi render ili jeftina kamera u maloj rezoluciji). Na stazi postoji auto iza igrača koji se vidi u retrovizoru, bitno za prestrojavanje.
3. **Gore desno, kazneni poeni:** "KAZNENI POENI", veliki broj "2 / 10", ispod poslednja greška narandžastom bojom.
4. **Ispod retrovizora, upozorenje:** žuta pilula sa kratkom porukom ("STOP za 25 m, usporavaj"). Pojavljuje se samo kad treba.
5. **Dole:** hauba kola (krem), volan (tamni), A stubovi.
6. **Dole desno, brzinomer:** krug, velika brojka km/h, ispod crvena pilula sa trenutnim ograničenjem.
7. **Dole u sredini, migavci:** levi i desni taster sa strelicama. Upaljeni migavac trepće žuto (oko 1,5 Hz) sa sjajem. Između njih podsetnik za tastere.
8. **Dole levo:** bedž "VOZI I POLOŽI".

---

## 5. Kontrole

### Tastatura
- `↑` gas, `↓` kočnica (držanjem do nule), `←` `→` volan.
- `Q` levi migavac, `E` desni migavac (toggle; gasi se sam posle završenog skretanja ili prestrojavanja, kao pravi).
- `Space` ručna kočnica (opciono), `P` ili `Esc` pauza.

### Telefon
- Dugmad na ekranu: levo volan levo i desno, desno gas i kočnica, gore iznad njih migavci.
- Dugmad minimum 56x56 px, poluprozirna, ne prekrivaju put.
- Landscape preporučen; u portretu prikazati poruku "Okreni telefon".

### Vožnja (fizika)
- Pojednostavljena, arkadna. Auto ide po putu, ne može da izađe van kolovoza više od ivice trotoara (blago odbijanje i kazneni poeni).
- Ubrzanje realno za mali auto: 0 do 50 km/h za oko 6 sekundi. Kočenje jasno osetno.
- Skretanje na raskrsnicama: kad igrač na raskrsnici drži levo ili desno, auto prati unapred definisanu krivu skretanja (spline). Ne treba slobodna vožnja po celom gradu.
- Prestrojavanje: na putu sa dve trake, levo i desno pomera auto između traka.

---

## 6. Staza 1 (prva verzija)

Jedna linearna staza od 3 do 4 minuta, 8 zadataka redom. Oko svakog zadatka postoji "zona provere" koja aktivira pravila i bodovanje.

1. **Polazak sa parkinga:** uključi levi migavac pre uključivanja u saobraćaj.
2. **Ograničenje 50 km/h:** gradska ulica, tabla 50. Ne prelazi 50.
3. **STOP znak na raskrsnici:** potpuno zaustavljanje (brzina 0 km/h najmanje 1 sekundu) pre bele linije. Zatim propusti auto koji dolazi sa desne strane.
4. **Pešački prelaz:** pešak kreće preko prelaza; igrač mora da stane pre prelaza i sačeka da pešak pređe.
5. **Semafor:** crveno, pa zeleno. Prolazak na crveno je pad ispita. Žuto: ako može bezbedno da stane, treba da stane.
6. **Prestrojavanje u levu traku:** levi migavac najmanje 1 sekundu pre početka prestrojavanja, proveri retrovizor (auto iza mora biti na bezbednoj udaljenosti).
7. **Skretanje levo na raskrsnici bez znakova:** pravilo desne strane; propusti vozilo koje dolazi zdesna i vozilo iz suprotnog smera.
8. **Zona škole, ograničenje 30 km/h,** pa parkiranje na označeno mesto pored trotoara sa desnim migavcem.

Kraj staze: ekran rezultata.

---

## 7. Pravila i bodovanje

Sistem po uzoru na ispit: kazneni poeni plus greške koje odmah obaraju ispit.

### Greške koje odmah obaraju (Nije položio)
- Prolazak kroz STOP bez potpunog zaustavljanja.
- Prolazak na crveno svetlo.
- Nepropuštanje pešaka na pešačkom prelazu.
- Nepropuštanje vozila koje ima pravo prvenstva.
- Udar u vozilo, pešaka ili objekat.
- Brzina veća od dozvoljene za više od 20 km/h.

### Kazneni poeni
| Greška | Poeni |
|---|---|
| Prestrojavanje ili skretanje bez migavca | +2 |
| Migavac uključen prekasno (manje od 1 s pre manevra) | +1 |
| Migavac zaboravljen uključen posle manevra (duže od 3 s) | +1 |
| Prekoračenje brzine do 10 km/h | +1 |
| Prekoračenje brzine 10 do 20 km/h | +3 |
| Naglo kočenje bez razloga | +1 |
| Zaustavljanje predaleko od STOP linije (više od 3 m) | +1 |
| Prelazak preko linije trotoara | +2 |
| Prestrojavanje kad je auto u retrovizoru preblizu | +3 |

**Položio** ako nema greške koja obara i ukupno je manje od 10 kaznenih poena.

Poruke grešaka u igri su kratke, na srpskom, latinica, bez crtica. Primer: "Nisi se potpuno zaustavio na STOP znaku".

---

## 8. Ekrani

1. **Početni ekran:** naziv "VOZI I POLOŽI", podnaslov "Proveri da li bi položio vožnju u Beogradu", dugme "Kreni", kratko objašnjenje kontrola, mala napomena "Igra je simulacija i ne zamenjuje obuku u auto školi."
2. **Vožnja:** HUD iz poglavlja 4.
3. **Pauza:** "Nastavi", "Počni ispočetka".
4. **Rezultat:**
   - Veliki natpis "POLOŽIO" (zeleno) ili "NIJE POLOŽIO" (crveno).
   - Kazneni poeni, vreme vožnje.
   - Spisak grešaka sa brojem zadatka.
   - Dugmad: "Vozi ponovo", "Podeli rezultat" (Web Share API, fallback kopiranje linka), **"Nađi auto školu u Beogradu"** koje vodi na https://autoskolebeograd.com/sve-auto-skole/ (pun URL, otvara se u istom prozoru ako je igra na sajtu, u novom ako je samostalna).
   - Tekst za deljenje: "Položio sam vožnju u igri VOZI I POLOŽI sa X kaznenih poena. Probaj ti:" plus link.

Svi linkovi u igri moraju biti puni URL-ovi sa https:// i domenom. Nikada relativne putanje.

---

## 9. Zvuk (opciono, posle prve verzije)

- Tiho zujanje motora koje prati brzinu, klik migavca (tik tak), kratak zvuk greške.
- Web Audio API, bez spoljnih fajlova. Dugme za isključivanje zvuka.

---

## 10. Pristupačnost i ponašanje

- `prefers-reduced-motion`: smanjiti ljuljanje kamere.
- Kontrast teksta u HUD-u minimum 4.5:1.
- Igra ne sme da skroluje stranicu dok se igra (preventDefault na strelicama samo kad je igra u fokusu).
- Kad tab izgubi fokus, automatska pauza.

---

## 11. Postavljanje na sajt (ne raditi bez Goranovog odobrenja)

- Igra ostaje samostalan fajl. Na sajt bi išla kao posebna stranica, na primer `https://autoskolebeograd.com/vozi-i-polozi/`, ugrađena kroz iframe ili kao fajl u uploads.
- **Goranovo pravilo:** na njegovim WordPress sajtovima se NIKADA ne piše CSS ni PHP bez njegovog izričitog odobrenja. Ugradnja iframe-a ili bilo kog koda na sajt ide tek kad on odobri, i to kroz WPCode ili Elementor HTML widget po njegovom izboru.
- U ovoj GitHub sesiji radi se samo igra u repou i test preko GitHub Pages.

---

## 12. Redosled rada

1. Scena: put, trotoari, zgrade, nebo, kamera iz kola, hauba i volan. Vožnja pravo sa gasom i kočnicom.
2. HUD: brzinomer, migavci (Q/E sa treptanjem), retrovizor.
3. Staza 1 sa svih 8 zona i sistemom pravila.
4. Ostali učesnici: pešak, auto sa desne strane, semafor, auto iza u retrovizoru.
5. Ekrani: početni, pauza, rezultat sa deljenjem.
6. Kontrole za telefon.
7. Poliranje: tranzicije, zvuk, performanse.

Posle koraka 1, 3 i 5 napraviti screenshot i poslati Goranu na pregled.

---

## 13. Kriterijumi za završetak prve verzije

- [ ] `index.html` se otvara direktno u Chrome, Firefox i Safari bez grešaka u konzoli.
- [ ] Sva 8 zadataka rade i svaki se može i proći i pasti.
- [ ] Migavci trepću i gase se sami posle manevra.
- [ ] Brzinomer i ograničenje su tačni.
- [ ] Ekran rezultata prikazuje tačan spisak grešaka.
- [ ] Dugme "Nađi auto školu u Beogradu" vodi na https://autoskolebeograd.com/sve-auto-skole/
- [ ] Igra radi na telefonu u landscape režimu sa dugmadima na ekranu.
- [ ] 60 fps na laptopu, bez trzanja.
- [ ] Svi tekstovi na srpskom, latinica, bez dugih crta.
- [ ] Oznaka L je svuda plava sa belim slovom.

---

## Prilog A: HTML skica ekrana vožnje (referenca za izgled)

Otvori ovaj kod kao `mock.html` u pregledaču da vidiš kako ekran treba da izgleda (1280x720). Ovo je statična skica, ne igra.

```html
<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Overpass:wght@600;800;900&family=Figtree:wght@500;700&display=swap" rel="stylesheet">
<style>
body{margin:0;background:#0f1115;font-family:Figtree,sans-serif}
.s{position:relative;width:1280px;height:720px;overflow:hidden}
svg{position:absolute;inset:0}
.hud{position:absolute;font-family:Overpass,sans-serif;color:#fff}
.pill{background:rgba(21,23,28,.82);border-radius:14px;padding:12px 18px;backdrop-filter:blur(4px)}
</style></head><body>
<div class="s">
<svg viewBox="0 0 1280 720" width="1280" height="720">
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd0ee"/><stop offset="1" stop-color="#e8f2ea"/></linearGradient>
<linearGradient id="road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a5e66"/><stop offset="1" stop-color="#3a3d44"/></linearGradient>
</defs>
<rect width="1280" height="330" fill="url(#sky)"/>
<!-- daleki brdo / grad -->
<path d="M0,300 L120,270 L260,285 L420,260 L600,280 L780,255 L960,275 L1120,258 L1280,280 L1280,330 L0,330Z" fill="#b9d3c0"/>
<!-- zgrade levo -->
<g>
<rect x="40" y="150" width="190" height="190" fill="#e9dcc3"/><rect x="230" y="190" width="150" height="150" fill="#d9c7a6"/>
<rect x="380" y="235" width="110" height="105" fill="#efe6d3"/>
<g fill="#7fa7c2"><rect x="62" y="172" width="34" height="40"/><rect x="112" y="172" width="34" height="40"/><rect x="162" y="172" width="34" height="40"/><rect x="62" y="232" width="34" height="40"/><rect x="112" y="232" width="34" height="40"/><rect x="162" y="232" width="34" height="40"/><rect x="250" y="210" width="28" height="34"/><rect x="295" y="210" width="28" height="34"/><rect x="340" y="210" width="28" height="34"/><rect x="250" y="262" width="28" height="34"/><rect x="295" y="262" width="28" height="34"/><rect x="398" y="252" width="24" height="28"/><rect x="440" y="252" width="24" height="28"/></g>
<!-- desno -->
<rect x="790" y="235" width="110" height="105" fill="#ead9b8"/><rect x="900" y="190" width="160" height="150" fill="#e4d2b0"/><rect x="1060" y="140" width="220" height="200" fill="#efe3cb"/>
<g fill="#7fa7c2"><rect x="810" y="252" width="24" height="28"/><rect x="852" y="252" width="24" height="28"/><rect x="920" y="210" width="28" height="34"/><rect x="965" y="210" width="28" height="34"/><rect x="1010" y="210" width="28" height="34"/><rect x="1085" y="165" width="36" height="42"/><rect x="1140" y="165" width="36" height="42"/><rect x="1195" y="165" width="36" height="42"/><rect x="1085" y="230" width="36" height="42"/><rect x="1140" y="230" width="36" height="42"/></g>
</g>
<!-- trotoari -->
<path d="M0,720 L0,520 L560,340 L590,340 Z" fill="#cfcac0"/>
<path d="M1280,720 L1280,520 L720,340 L690,340 Z" fill="#cfcac0"/>
<!-- glavni put -->
<path d="M90,720 L590,340 L690,340 L1190,720Z" fill="url(#road)"/>
<!-- poprecna ulica (raskrsnica) -->
<path d="M0,372 L1280,372 L1280,400 L0,400Z" fill="#4a4d54"/>
<path d="M0,366 L470,366 L470,372 L0,372Z M810,366 L1280,366 L1280,372 L810,372Z" fill="#bdb8ad"/>
<!-- isprekidana sredina -->
<g fill="#f4f1e6"><path d="M636,410 L644,410 L650,450 L630,450Z"/><path d="M625,480 L655,480 L664,545 L616,545Z"/><path d="M608,590 L672,590 L686,690 L594,690Z"/></g>
<!-- pesacki prelaz -->
<g fill="#f7f5ee"><path d="M520,412 L548,412 L540,440 L508,440Z"/><path d="M566,412 L594,412 L590,440 L560,440Z"/><path d="M612,412 L640,412 L640,440 L610,440Z"/><path d="M658,412 L686,412 L690,440 L660,440Z"/><path d="M704,412 L732,412 L740,440 L710,440Z"/><path d="M750,412 L778,412 L790,440 L760,440Z"/></g>
<!-- STOP linija -->
<path d="M640,448 L800,448 L808,456 L640,456Z" fill="#fff"/>
<!-- STOP znak -->
<g transform="translate(860,250)"><rect x="-4" y="40" width="8" height="120" fill="#6b6f77"/>
<polygon points="-26,-62 26,-62 62,-26 62,26 26,62 -26,62 -62,26 -62,-26" transform="scale(.62)" fill="#c8102e" stroke="#fff" stroke-width="6"/>
<text x="0" y="8" font-family="Overpass" font-weight="900" font-size="22" fill="#fff" text-anchor="middle">STOP</text></g>
<!-- znak pesacki prelaz -->
<g transform="translate(470,262)"><rect x="-3" y="20" width="6" height="96" fill="#6b6f77"/><rect x="-24" y="-26" width="48" height="48" fill="#1f5fbf" rx="3"/><polygon points="0,-20 20,16 -20,16" fill="#fff"/><circle cx="0" cy="-2" r="4" fill="#15171c"/><rect x="-2" y="2" width="4" height="10" fill="#15171c"/></g>
<!-- pesak -->
<g transform="translate(548,365)"><circle cx="0" cy="0" r="9" fill="#e0b38c"/><rect x="-8" y="9" width="16" height="26" rx="5" fill="#2e7d4f"/><rect x="-7" y="34" width="5" height="22" fill="#2b2f36"/><rect x="2" y="34" width="5" height="22" fill="#2b2f36" transform="rotate(14 4 34)"/></g>
<!-- auto sa strane -->
<g transform="translate(960,378)"><rect x="0" y="0" width="92" height="28" rx="8" fill="#e05d3b"/><rect x="14" y="-14" width="58" height="18" rx="6" fill="#e05d3b"/><rect x="20" y="-10" width="20" height="12" fill="#bcd8ea"/><rect x="45" y="-10" width="20" height="12" fill="#bcd8ea"/><circle cx="20" cy="28" r="9" fill="#222"/><circle cx="72" cy="28" r="9" fill="#222"/></g>
<!-- drvo -->
<g transform="translate(330,300)"><rect x="-4" y="20" width="8" height="40" fill="#7a5a3a"/><circle cx="0" cy="8" r="26" fill="#4f9a5a"/></g>
<g transform="translate(990,300)"><rect x="-4" y="20" width="8" height="40" fill="#7a5a3a"/><circle cx="0" cy="8" r="24" fill="#4f9a5a"/></g>
<!-- unutrasnjost kola: hauba + kontrolna tabla -->
<path d="M0,720 L0,600 Q640,540 1280,600 L1280,720Z" fill="#1b1d22"/>
<path d="M170,640 Q640,560 1110,640 L1140,720 L140,720Z" fill="#f2efe6"/>
<path d="M0,560 L0,720 L140,720 L210,600Z" fill="#15171c"/>
<path d="M1280,560 L1280,720 L1140,720 L1070,600Z" fill="#15171c"/>
<!-- retrovizor -->
<rect x="540" y="18" width="200" height="56" rx="16" fill="#15171c"/><rect x="548" y="25" width="184" height="42" rx="11" fill="#9fc3dc"/><path d="M548,58 L732,52 L732,67 L548,67Z" fill="#5a5e66"/><rect x="610" y="44" width="40" height="14" rx="4" fill="#2846a0"/>
<!-- volan -->
<g transform="translate(440,770)"><circle r="170" fill="none" stroke="#24272d" stroke-width="30"/><rect x="-30" y="-150" width="60" height="70" fill="#24272d" rx="10"/><circle r="40" fill="#2b2e34"/></g>
</svg>

<!-- HUD gore levo: zadatak -->
<div class="hud pill" style="left:24px;top:22px;width:330px">
 <div style="font-size:12px;letter-spacing:.14em;color:#F4C20D;font-weight:800">ZADATAK 3 / 8</div>
 <div style="font-size:22px;font-weight:800;margin-top:4px">Raskrsnica sa znakom STOP</div>
 <div style="font-family:Figtree;font-size:15px;color:#c9ccd3;margin-top:6px">Potpuno se zaustavi pre linije i propusti pešaka.</div>
</div>
<!-- HUD gore desno: poeni -->
<div class="hud pill" style="right:24px;top:22px;text-align:right">
 <div style="font-size:12px;letter-spacing:.14em;color:#c9ccd3;font-weight:800">KAZNENI POENI</div>
 <div style="font-size:40px;font-weight:900;line-height:1.05">2 <span style="font-size:18px;color:#c9ccd3">/ 10</span></div>
 <div style="font-family:Figtree;font-size:13px;color:#e8a33b">Bez migavca pri prestrojavanju, +2</div>
</div>
<!-- upozorenje -->
<div class="hud" style="left:50%;top:150px;transform:translateX(-50%);background:#F4C20D;color:#15171c;border-radius:999px;padding:10px 22px;font-weight:800;font-size:18px;box-shadow:0 8px 24px rgba(0,0,0,.25)">STOP za 25 m, usporavaj</div>
<!-- brzinomer -->
<div class="hud" style="right:70px;bottom:28px;width:190px;height:190px;border-radius:50%;background:#15171c;border:5px solid #2b2e34;display:flex;flex-direction:column;align-items:center;justify-content:center">
 <div style="font-size:64px;font-weight:900;line-height:1">18</div><div style="font-size:14px;color:#c9ccd3;letter-spacing:.1em">KM/H</div>
 <div style="margin-top:8px;font-size:13px;background:#c8102e;border-radius:999px;padding:2px 10px">ograničenje 50</div>
</div>
<!-- migavci -->
<div class="hud" style="left:50%;bottom:40px;transform:translateX(-50%);display:flex;gap:16px;align-items:center">
 <div style="width:58px;height:58px;border-radius:12px;background:#15171c;display:flex;align-items:center;justify-content:center;font-size:30px;color:#3a3d44">◀</div>
 <div style="background:#15171c;border-radius:12px;padding:10px 16px;font-size:13px;color:#c9ccd3;font-family:Figtree">Q / E migavci &nbsp;·&nbsp; ← → volan &nbsp;·&nbsp; ↑ ↓ gas i kočnica</div>
 <div style="width:58px;height:58px;border-radius:12px;background:#15171c;display:flex;align-items:center;justify-content:center;font-size:30px;color:#F4C20D;box-shadow:0 0 22px rgba(244,194,13,.6)">▶</div>
</div>
<!-- logo -->
<div class="hud pill" style="left:24px;bottom:24px;display:flex;align-items:center;gap:10px">
 <div style="width:44px;height:44px;background:#2846A0;border-radius:6px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:30px">L</div>
 <div style="line-height:1"><div style="font-weight:900;font-size:20px">VOZI I POLOŽI</div><div style="font-size:12px;color:#c9ccd3;letter-spacing:.12em">AUTOSKOLEBEOGRAD.COM</div></div>
</div>
</div>
</body></html>
```
