# VOZI I POLOŽI

Browser igra za https://autoskolebeograd.com/ u kojoj igrač vozi kroz situacije sa vozačkog ispita u Beogradu.

Kompletan opis igre je u [docs/brief.md](docs/brief.md).

## Pokretanje i objavljivanje

`index.html` u korenu je izvor igre. Za probu ga otvori direktno u pregledaču (Chrome, Firefox, Safari). Treba mu internet zbog Three.js biblioteke (jsdelivr) i Google fontova.

**Za sajt se koristi verzija iz foldera `dist/`**, ne izvor:

- `dist/index.html` je jedan fajl u kome je sve: igra, Three.js i fontovi. Ne traži ništa sa drugih servera.
- `dist/vozi-i-polozi-deljenje.png` je slika koja se vidi kad neko podeli link (Viber, WhatsApp, Facebook).

Oba fajla idu na server u folder `vozi-i-polozi`, tako da igra bude na https://autoskolebeograd.com/vozi-i-polozi/ a slika na https://autoskolebeograd.com/vozi-i-polozi/vozi-i-polozi-deljenje.png (ta adresa je upisana u igru za deljenje).

Verzija za sajt je zaštićena:

- kod igre je skraćen i zamagljen, deo za testiranje je izbačen;
- igra radi samo na autoskolebeograd.com i njegovim poddomenima (na primer www) preko https. Na drugom domenu, otvorena sa diska ili ubačena u iframe na tuđem sajtu prikazuje samo poziv "Igraj na autoskolebeograd.com". Zato se ova verzija ne može probati otvaranjem sa diska; za probu služi izvor `index.html`.

Posle svake izmene izvora verzija za sajt se pravi ponovo:

```
npm install
npm run build
```

Slika za deljenje se pravi ponovo samo ako se menja izgled: `node build/slika-deljenje.mjs` (treba Playwright).

### Preporučena podešavanja servera (opciono, radi Goran)

Za Apache, u `.htaccess` u folderu `vozi-i-polozi`. Ovo nije WordPress kod i ne dira sajt, ali se postavlja samo uz Goranovo odobrenje:

```
# igra ne može da se ubaci u iframe na tuđem sajtu
Header always set Content-Security-Policy "frame-ancestors 'self'"
# kompresija: 754 KB postaje oko 285 KB
AddOutputFilterByType DEFLATE text/html
# pregledač čuva sliku za deljenje nedelju dana, a igru uvek proverava da li je nova
<FilesMatch "\.png$">
  Header set Cache-Control "public, max-age=604800"
</FilesMatch>
<FilesMatch "\.html$">
  Header set Cache-Control "no-cache"
</FilesMatch>
```

## Autorska prava

Copyright © 2026 autoskolebeograd.com. Sva prava zadržana. Vidi [LICENSE](LICENSE).

## Kontrole

- `↑` gas, `↓` kočnica; ako i posle zaustavljanja držiš kočnicu, auto posle trenutak polako krene u rikverc (brzinomer pokazuje R), što pomaže kod parkiranja. Pustiš kočnicu i auto stane.
- `←` `→` volan: koliko dugo držiš, toliko skrećeš; pušten volan se sam vraća na pravo
- `Q` levi migavac, `E` desni migavac (ponovni pritisak gasi, sam se gasi posle manevra)
- `P` ili `Esc` pauza (vožnja se sama pauzira i kad prozor izgubi fokus)
- `M` zvuk uključen ili isključen (pamti se u pregledaču)

Na telefonu se igra vozi sa telefonom položenim na stranu (u uspravnom položaju igra traži da se telefon okrene i pauzira vožnju). Dugmad na ekranu: dole levo volan levo i desno, dole desno kočnica i gas, iznad njih migavci, gore desno zvuk i pauza. Gas i volan mogu da se drže istovremeno. Ako pregledač dozvoli, igra posle "Kreni" prelazi preko celog ekrana.

## Vozila sa strane

Pošto iz kabine ne možeš da pogledaš levo i desno, pored retrovizora se pojavi okvir kad vozilo prilazi raskrsnici ispred tebe: levo od retrovizora ona koja dolaze sleva, desno ona zdesna. Piše vrsta vozila i koliko metara ima do raskrsnice. Žuto znači da dolazi, crveno da stiže uskoro i da treba da ga propustiš.

## Zvuk i brzina

Zvuk se pravi u samom pregledaču (Web Audio), bez spoljnih fajlova: motor koji prati brzinu, tik tak migavca, zvuk greške, sirena hitne i policije (jača kako se približavaju, levo ili desno prema mestu vozila) i kratka melodija kad položiš.

Na slabijim uređajima igra sama smanjuje kvalitet slike ako ne stiže 40 frejmova u sekundi: prvo rezoluciju, zatim osvežavanje retrovizora, pa daljinu crtanja.

## Staza 1

13 zadataka za oko 2 minuta: polazak sa parkinga, dve raskrsnice bez znakova (pravilo desne strane u oba smera), pešački prelaz, STOP, tramvaj, hitna pomoć iza igrača, semafor, policija na zeleno, desno na bulevar sa prvenstvom prolaza, prestrojavanje uz auto u retrovizoru, levo uz vozila iz suprotnog smera i parkiranje u zoni škole. Detalji su u [docs/brief.md](docs/brief.md), poglavlje 6.

## Stanje razvoja

- [x] Korak 1: scena, kamera iz kola, hauba, volan, vožnja pravo
- [x] Korak 2: HUD (brzinomer, migavci, retrovizor)
- [x] Korak 3: Staza 1 sa 13 zadataka i pravilima
- [x] Korak 4: ostali učesnici u saobraćaju (kola, pešak, tramvaj, hitna, policija)
- [x] Korak 5: ekrani (početni, pauza, rezultat sa deljenjem i linkom ka auto školama)
- [x] Korak 6: kontrole za telefon
- [x] Korak 7: poliranje (prelazi ekrana, zvuk, prilagođavanje brzini uređaja)
