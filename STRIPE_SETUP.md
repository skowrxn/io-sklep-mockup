# Instrukcja konfiguracji Stripe

## Krok 1: Utworzenie konta Stripe

1. Przejdź na https://stripe.com
2. Kliknij "Start now" lub "Sign up"
3. Wypełnij formularz rejestracji
4. Potwierdź adres email

## Krok 2: Przejście do trybu testowego

1. Po zalogowaniu zobaczysz Dashboard Stripe
2. W lewym górnym rogu upewnij się, że jesteś w trybie **"Test mode"** (przełącznik powinien być włączony)
3. W trybie testowym możesz używać testowych kart bez prawdziwych transakcji

## Krok 3: Pobranie kluczy API

### Pobranie kluczy:

1. W Dashboard kliknij **"Developers"** w menu bocznym
2. Kliknij **"API keys"**
3. Zobaczysz dwa klucze testowe:
   - **Publishable key** (pk_test_...) - klucz publiczny
   - **Secret key** (sk_test_...) - klucz tajny

### Skopiowanie kluczy:

1. Kliknij "Reveal test key" przy Secret key
2. Kliknij ikonę kopiowania obok każdego klucza
3. Zapisz oba klucze w bezpiecznym miejscu

## Krok 4: Konfiguracja projektu

### Edycja pliku .env:

1. Otwórz plik `.env` w katalogu głównym projektu
2. Zamień placeholder-y na prawdziwe klucze:

```env
# Zamień te wartości:
STRIPE_SECRET_KEY=sk_test_51A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0
STRIPE_PUBLISHABLE_KEY=pk_test_51A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0
```

3. Zapisz plik

**WAŻNE:** Nigdy nie udostępniaj publicznie pliku `.env` ani Secret key!

## Krok 5: Uruchomienie aplikacji

### Uruchomienie backendu:

```bash
npm run server
```

Powinieneś zobaczyć:
```
🚀 Serwer uruchomiony na porcie 3001
📍 Endpoint: http://localhost:3001/create-checkout-session
```

### Uruchomienie frontendu (w nowym terminalu):

```bash
npm run dev
```

## Krok 6: Test płatności

### Testowe karty kredytowe Stripe:

| Numer karty | Scenariusz | CVV | Data ważności |
|-------------|-----------|-----|---------------|
| `4242 4242 4242 4242` | Płatność udana | dowolny 3-cyfrowy | przyszła data |
| `4000 0025 0000 3155` | Wymaga 3D Secure | dowolny 3-cyfrowy | przyszła data |
| `4000 0000 0000 9995` | Płatność odrzucona | dowolny 3-cyfrowy | przyszła data |
| `4000 0000 0000 0069` | Wygasła karta | dowolny 3-cyfrowy | przyszła data |

### Przeprowadzenie testu:

1. Otwórz `http://localhost:5173`
2. Dodaj produkty do koszyka
3. Przejdź do kasy (checkout)
4. Wypełnij formularz
5. Kliknij "Przejdź do płatności Stripe"
6. Na stronie Stripe użyj testowej karty `4242 4242 4242 4242`
7. Powinieneś zostać przekierowany na stronę sukcesu

## Krok 7: Sprawdzenie płatności w Dashboard

1. Wróć do Stripe Dashboard
2. Kliknij **"Payments"** w menu
3. Zobaczysz listę testowych płatności
4. Kliknij na płatność aby zobaczyć szczegóły

## Krok 8: Konfiguracja Webhooków (opcjonalne)

Webhooks pozwalają Stripe powiadamiać Twój serwer o zdarzeniach.

### Testowanie webhooków lokalnie:

1. Zainstaluj Stripe CLI: https://stripe.com/docs/stripe-cli
2. Zaloguj się: `stripe login`
3. Przekieruj webhooks:
   ```bash
   stripe listen --forward-to localhost:3001/webhook
   ```
4. Skopiuj webhook secret (whsec_...) i dodaj do `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Konfiguracja webhooków produkcyjnych:

1. W Dashboard kliknij **"Developers"** → **"Webhooks"**
2. Kliknij **"Add endpoint"**
3. Wprowadź URL: `https://twoja-domena.com/webhook`
4. Wybierz zdarzenia: `checkout.session.completed`, `payment_intent.succeeded`
5. Skopiuj Webhook signing secret do `.env` produkcyjnego

## Przełączenie na tryb produkcyjny

Gdy będziesz gotowy do przyjmowania prawdziwych płatności:

1. W Stripe Dashboard wyłącz "Test mode"
2. Uzupełnij informacje o firmie w sekcji "Business settings"
3. Pobierz **produkcyjne** klucze API (zaczynają się od `sk_live_` i `pk_live_`)
4. Zaktualizuj `.env` na serwerze produkcyjnym
5. Pamiętaj o użyciu HTTPS!

## Troubleshooting

### Błąd: "No API key provided"
- Sprawdź czy `STRIPE_SECRET_KEY` jest ustawiony w `.env`
- Sprawdź czy serwer został zrestartowany po zmianie `.env`

### Błąd: "Invalid API Key"
- Upewnij się, że klucz zaczyna się od `sk_test_`
- Sprawdź czy nie ma spacji na początku/końcu klucza
- Wygeneruj nowy klucz w Dashboard

### Płatność nie działa
- Sprawdź konsolę przeglądarki (F12)
- Sprawdź logi serwera w terminalu
- Upewnij się, że backend działa na porcie 3001
- Sprawdź czy `VITE_API_BASE` w `.env` jest poprawny

### Backend nie startuje
- Sprawdź czy port 3001 nie jest zajęty
- Uruchom: `npm install` ponownie
- Sprawdź czy wszystkie zależności są zainstalowane

## Przydatne linki

- 📚 Dokumentacja Stripe: https://stripe.com/docs
- 🧪 Testowe karty: https://stripe.com/docs/testing
- 💬 Support: https://support.stripe.com
- 📊 Dashboard: https://dashboard.stripe.com

## Bezpieczeństwo

**Zawsze pamiętaj:**

- ❌ Nigdy nie commituj pliku `.env` do Git
- ❌ Nigdy nie udostępniaj Secret key publicznie
- ❌ Nigdy nie używaj kluczy produkcyjnych w development
- ✅ Używaj zmiennych środowiskowych
- ✅ Włącz 2FA w koncie Stripe
- ✅ Regularnie rotuj klucze API
