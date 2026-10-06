# VOZI I POLOŽI

Browser igra za https://autoskolebeograd.com/ u kojoj igrač vozi kroz situacije sa vozačkog ispita u Beogradu.

Kompletan opis igre je u [docs/brief.md](docs/brief.md).

## Pokretanje i hostovanje

Igra je jedan samostalan fajl, `index.html`. Za probu ga otvori direktno u pregledaču (Chrome, Firefox, Safari). Za objavljivanje se taj fajl postavi na server kao obična statična stranica, bez ikakvih dodatnih podešavanja. Potrebna je internet veza zbog Three.js biblioteke (jsdelivr CDN) i Google fontova.

## Kontrole (trenutno)

- `↑` gas, `↓` kočnica
- `←` `→` volan: koliko dugo držiš, toliko skrećeš; pušten volan se sam vraća na pravo
- `Q` levi migavac, `E` desni migavac (ponovni pritisak gasi, sam se gasi posle manevra)

## Staza 1

13 zadataka za oko 2 minuta: polazak sa parkinga, dve raskrsnice bez znakova (pravilo desne strane u oba smera), pešački prelaz, STOP, tramvaj, hitna pomoć iza igrača, semafor, policija na zeleno, desno na bulevar sa prvenstvom prolaza, prestrojavanje uz auto u retrovizoru, levo uz vozila iz suprotnog smera i parkiranje u zoni škole. Detalji su u [docs/brief.md](docs/brief.md), poglavlje 6.

## Stanje razvoja

- [x] Korak 1: scena, kamera iz kola, hauba, volan, vožnja pravo
- [x] Korak 2: HUD (brzinomer, migavci, retrovizor)
- [x] Korak 3: Staza 1 sa 8 zadataka i pravilima
- [x] Korak 4: ostali učesnici u saobraćaju (kola, pešak, tramvaj, hitna, policija)
- [ ] Korak 5: ekrani (početni, pauza, rezultat)
- [ ] Korak 6: kontrole za telefon
- [ ] Korak 7: poliranje
