# IO Sklep - Mockup e-commerce z integracją Stripe

Projekt sklepu internetowego z pełną integracją płatności Stripe Checkout.

## 🚀 Struktura projektu

Projekt łączy frontend i backend w jednym repozytorium:

### Frontend

-   React + TypeScript + Vite
-   Tailwind CSS
-   React Router DOM
-   Shadcn/ui components
-   @tanstack/react-query
-   Context API do zarządzania koszykiem

### Backend

-   Express.js server (server.js)
-   Stripe Checkout integration
-   CORS enabled
-   Obsługa webhooków Stripe

## 📦 Instalacja

```bash
npm install
```

## ⚙️ Konfiguracja

### Konfiguracja zmiennych środowiskowych

Edytuj plik `.env` w katalogu głównym projektu:

```env
# Backend API URL dla płatności Stripe
VITE_API_BASE=http://localhost:3001

# Klucze API Stripe (pobierz z https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Stripe Webhook Secret (opcjonalne, dla webhooków produkcyjnych)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Client URL (dla URL-i przekierowania Stripe)
CLIENT_URL=http://localhost:5173

# Port serwera
PORT=3001
```

### 🔑 Uzyskanie kluczy API Stripe

1. Zarejestruj się na https://stripe.com
2. Przejdź do Dashboard
3. Kliknij "Developers" → "API keys"
4. Skopiuj:
   - **Secret key** (klucz testowy zaczyna się od `sk_test_`)
   - **Publishable key** (klucz testowy zaczyna się od `pk_test_`)
5. Wklej je do pliku `.env`

## 🏃 Uruchomienie

### Opcja 1: Uruchomienie wszystkiego jednocześnie (Linux/Mac)

```bash
npm run dev:all
```

### Opcja 2: Uruchomienie w oddzielnych terminalach (Windows/wszystkie systemy)

**Terminal 1 - Backend:**
```bash
npm run server
```

Backend będzie dostępny na `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Frontend będzie dostępny na `http://localhost:5173`

## 🧪 Testowanie płatności

### Proces płatności:

1. Otwórz przeglądarkę i przejdź do `http://localhost:5173`
2. Przeglądaj produkty i dodaj je do koszyka
3. Przejdź do koszyka i kliknij "Przejdź do kasy"
4. Wypełnij formularz z danymi kontaktowymi i adresem dostawy
5. Kliknij "Przejdź do płatności Stripe" - zostaniesz przekierowany do Stripe Checkout
6. Na stronie Stripe Checkout użyj testowej karty:

    **Testowe karty Stripe:**
    - Numer: `4242 4242 4242 4242` (sukces)
    - Data ważności: dowolna przyszła data (np. 12/34)
    - CVC: dowolne 3 cyfry (np. 123)
    - Kod pocztowy: dowolny (np. 00-000)

    **Inne testowe karty:**
    - `4000 0025 0000 3155` - wymaga 3D Secure
    - `4000 0000 0000 9995` - płatność odrzucona

7. Po pomyślnej płatności zostaniesz przekierowany na stronę `/success`
8. Jeśli anulujesz płatność, trafisz na stronę `/cancel`

### Funkcje płatności Stripe:

- ✅ Obsługa kart kredytowych/debetowych
- ✅ Obsługa BLIK (dostępne w polskiej wersji)
- ✅ Obsługa Przelewy24
- ✅ Automatyczne zbieranie adresu rozliczeniowego
- ✅ Automatyczne zbieranie adresu wysyłki (tylko Polska)
- ✅ Polska lokalizacja interfejsu
- ✅ Obsługa wielu produktów w jednej transakcji
- ✅ Automatyczne czyszczenie koszyka po udanej płatności

## 📝 Dostępne strony

-   `/` - Strona główna z produktami
-   `/cart` - Koszyk zakupów
-   `/checkout` - Proces składania zamówienia
-   `/success` - Strona potwierdzenia płatności
-   `/cancel` - Strona anulowania płatności

## 🛠️ Komendy

-   `npm run dev` - Uruchom frontend (Vite dev server)
-   `npm run server` - Uruchom backend (Express + Stripe)
-   `npm run dev:all` - Uruchom frontend i backend jednocześnie (Linux/Mac)
-   `npm run build` - Zbuduj projekt produkcyjny
-   `npm run preview` - Podgląd buildu produkcyjnego
-   `npm run lint` - Sprawdź kod ESLintem
-   `npm run typecheck` - Sprawdź typy TypeScript

## 📚 Technologie

### Frontend

-   React 18
-   TypeScript
-   Vite
-   Tailwind CSS
-   React Router DOM v7
-   TanStack Query (React Query)
-   Radix UI (przez Shadcn/ui)
-   Lucide React (ikony)
-   Context API (zarządzanie stanem koszyka)

### Backend

-   Node.js
-   Express.js
-   Stripe SDK v20
-   CORS
-   dotenv

## 🎨 Komponenty UI

Projekt wykorzystuje shadcn/ui components:

-   Button
-   Card
-   Checkbox
-   Toast/Toaster
-   Dialog
-   Label

## 🔐 Bezpieczeństwo

### Najlepsze praktyki:

- ✅ Klucze API Stripe przechowywane w zmiennych środowiskowych
- ✅ Secret key nigdy nie jest wysyłany do frontendu
- ✅ CORS skonfigurowany dla ochrony API
- ✅ Walidacja danych wejściowych
- ✅ Obsługa błędów i logowanie
- ✅ Webhook signing dla weryfikacji zdarzeń Stripe

### Uwagi dotyczące produkcji:

1. **Nigdy nie commituj pliku `.env`** - jest on w `.gitignore`
2. **Używaj kluczy produkcyjnych tylko na produkcji** - klucze testowe zaczynają się od `sk_test_`
3. **Skonfiguruj webhooks** - dodaj `STRIPE_WEBHOOK_SECRET` dla weryfikacji zdarzeń
4. **Użyj HTTPS** - Stripe wymaga HTTPS w produkcji
5. **Zaimplementuj proper logging** - monitoruj błędy i transakcje

## 🚀 Deploy

### Backend Deploy (np. Render, Railway, Heroku):

1. Ustaw zmienne środowiskowe na platformie hostingowej
2. Upewnij się, że `PORT` jest ustawiony przez platformę
3. Dodaj `CLIENT_URL` z URL-em frontendu produkcyjnego

### Frontend Deploy (np. Vercel, Netlify):

1. Ustaw `VITE_API_BASE` na URL backendu produkcyjnego
2. Build project: `npm run build`
3. Deploy folder `dist`

## 📄 Struktura plików

```
io-sklep-mockup/
├── src/
│   ├── components/
│   │   ├── PaymentButton.tsx      # Przycisk płatności Stripe
│   │   └── ui/                    # Komponenty shadcn/ui
│   ├── context/
│   │   └── CartContext.tsx        # Zarządzanie stanem koszyka
│   ├── pages/
│   │   ├── Index.tsx              # Strona główna
│   │   ├── CheckoutPage.tsx       # Proces checkout
│   │   ├── Success.tsx            # Potwierdzenie płatności
│   │   └── Cancel.tsx             # Anulowanie płatności
│   ├── App-new.tsx                # Główny komponent App
│   └── main.tsx                   # Entry point
├── server.js                      # Backend Express + Stripe
├── .env                          # Zmienne środowiskowe
├── package.json
└── README.md
```

## 📞 Wsparcie

W razie problemów:

1. Sprawdź czy oba serwery są uruchomione (frontend i backend)
2. Sprawdź czy klucze Stripe są poprawnie ustawione w `.env`
3. Sprawdź konsole przeglądarki i terminala pod kątem błędów
4. Upewnij się, że porty 3001 i 5173 nie są zajęte

## 📄 Licencja

MIT
