SZYBKIE BISTRO — strona internetowa

Otwórz index.html w przeglądarce, aby zobaczyć stronę. Nie wymaga instalacji.

Pliki:
  index.html    strona główna (opis firmy)
  oferta.html   oferta
  cennik.html   cennik
  galeria.html  galeria zdjęć
  kontakt.html  kontakt i formularz
  style.css     wygląd całej strony
  script.js     menu na telefonie, powiększanie zdjęć, formularz
  img/          logo i zdjęcia zastępcze

Co zmienić przed publikacją:
1. Adres, telefon, e-mail i godziny otwarcia. Wyszukaj w plikach: "Przykładowa 12", "000 000 000", "szybkiebistro.pl".
2. Ceny w cennik.html oraz dania w oferta.html i na stronie głównej ("Dziś w witrynie").
3. Zdjęcia w galerii: wstaw swoje pliki do folderu img/ (np. galeria-1.jpg) i w galeria.html zmień src z .svg na .jpg oraz opis alt.
4. Formularz: załóż darmowe konto na formspree.io, utwórz formularz i w kontakt.html zastąp TWOJ_ID swoim identyfikatorem.
5. Czcionki ładują się z Google Fonts. Bez internetu strona użyje czcionek systemowych.

Publikacja: wgraj cały folder na dowolny hosting (np. Netlify, GitHub Pages lub hosting FTP).

Co nowego w tej wersji:
- Odświeżony wygląd: gradienty, cienie, delikatne animacje na przyciskach, kartach dań, tabeli cen i galerii.
- Animacje przy przewijaniu strony (sekcje "wjeżdżają" przy scrollowaniu) — działa automatycznie, bez dodatkowej konfiguracji.
- Płynne przejście (przenikanie) między podstronami w nowszych przeglądarkach (np. Chrome/Edge). W przeglądarkach bez tej funkcji strona po prostu ładuje się normalnie — nic się nie psuje.
- Wszystko szanuje ustawienie "ogranicz animacje" w systemie użytkownika (prefers-reduced-motion).


ZAMÓWIENIA ONLINE:
- Na stronie "Cennik" znajduje się formularz składania zamówień z wyborem dań, ilościami i automatycznym podsumowaniem.
- Zamówienia są wysyłane przez FormSubmit na adres kontakt@szybkiebistro.pl, który jest również widoczny na stronie.
- Przy pierwszym użyciu FormSubmit może poprosić właściciela skrzynki o potwierdzenie adresu e-mail.
- Jeśli zmienisz adres e-mail w stopce/kontakcie, zmień go również w action formularza w cennik.html:
  https://formsubmit.co/TWOJ_ADRES_EMAIL
- Do działania wysyłki potrzebny jest hosting pozwalający stronie wykonywać żądania HTTPS. Samo otwarcie pliku HTML lokalnie może nie działać tak jak strona opublikowana na hostingu.
