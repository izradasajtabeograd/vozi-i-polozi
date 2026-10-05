# VOZI I POLOŽI

Browser igra za https://autoskolebeograd.com/ u kojoj igrač vozi kroz situacije sa vozačkog ispita u Beogradu.

Kompletan opis igre je u [docs/brief.md](docs/brief.md).

## Pokretanje i hostovanje

Igra je jedan samostalan fajl, `index.html`. Za probu ga otvori direktno u pregledaču (Chrome, Firefox, Safari). Za objavljivanje se taj fajl postavi na server kao obična statična stranica, bez ikakvih dodatnih podešavanja. Potrebna je internet veza zbog Three.js biblioteke (jsdelivr CDN) i Google fontova.

## Kontrole (trenutno)

- `↑` gas
- `↓` kočnica
- `Q` levi migavac, `E` desni migavac (ponovni pritisak gasi)

## Stanje razvoja

- [x] Korak 1: scena, kamera iz kola, hauba, volan, vožnja pravo
- [x] Korak 2: HUD (brzinomer, migavci, retrovizor)
- [ ] Korak 3: Staza 1 sa 8 zadataka i pravilima
- [ ] Korak 4: ostali učesnici u saobraćaju
- [ ] Korak 5: ekrani (početni, pauza, rezultat)
- [ ] Korak 6: kontrole za telefon
- [ ] Korak 7: poliranje
