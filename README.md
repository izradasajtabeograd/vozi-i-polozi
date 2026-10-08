# VOZI I POLOŽI

Browser igra za https://autoskolebeograd.com/ u kojoj igrač vozi kroz situacije sa vozačkog ispita u Beogradu.

Kompletan opis igre je u [docs/brief.md](docs/brief.md).

## Pokretanje i hostovanje

Igra je jedan samostalan fajl, `index.html`. Za probu ga otvori direktno u pregledaču (Chrome, Firefox, Safari). Za objavljivanje se taj fajl postavi na server kao obična statična stranica, bez ikakvih dodatnih podešavanja. Potrebna je internet veza zbog Three.js biblioteke (jsdelivr CDN) i Google fontova.

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
