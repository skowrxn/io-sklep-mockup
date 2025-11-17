# IO Sklep - Mockup e-commerce z integracją Stripe

Projekt sklepu internetowego z możliwością testowych płatności przez Stripe Checkout.

## 🚀 Struktura projektu

Projekt składa się z dwóch głównych części:

### Frontend (io-sklep-mockup)

-   React + TypeScript + Vite
-   Tailwind CSS
-   React Router DOM
-   Shadcn/ui components
-   @tanstack/react-query

### Backend (../stripe/backend)

-   Express.js server
-   Stripe Checkout integration
-   CORS enabled

## 📦 Instalacja

### 1. Frontend

```bash
cd io-sklep-mockup
npm install
```

### 2. Backend

```bash
cd ../stripe/backend
npm install
```

## ⚙️ Konfiguracja

### Backend (.env w folderze stripe/backend)

Stwórz plik `.env` w folderze `stripe/backend`:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env w folderze io-sklep-mockup)

Plik `.env` został już utworzony z konfiguracją:

```env
VITE_API_BASE=http://localhost:3001
```

## 🏃 Uruchomienie

### 1. Uruchom backend (w terminalu 1)

```bash
cd ../stripe/backend
npm start
```

Backend będzie dostępny na `http://localhost:3001`

### 2. Uruchom frontend (w terminalu 2)

```bash
cd io-sklep-mockup
npm run dev
```

Frontend będzie dostępny na `http://localhost:5173`

## 🧪 Testowanie płatności

1. Otwórz przeglądarkę i przejdź do `http://localhost:5173`
2. Wybierz produkt i kliknij "Kup teraz"
3. Zostaniesz przekierowany do Stripe Checkout
4. Użyj testowej karty kredytowej Stripe:

    - Numer: `4242 4242 4242 4242`
    - Data ważności: dowolna przyszła data (np. 12/34)
    - CVC: dowolne 3 cyfry (np. 123)
    - Kod pocztowy: dowolny (np. 12345)

5. Po pomyślnej płatności zostaniesz przekierowany na stronę `/success`
6. Jeśli anulujesz płatność, trafisz na stronę `/cancel`

## 📝 Dostępne strony

-   `/` - Strona główna z produktami
-   `/success` - Strona potwierdzenia płatności
-   `/cancel` - Strona anulowania płatności

## 🛠️ Komendy

### Frontend

-   `npm run dev` - Uruchom serwer deweloperski
-   `npm run build` - Zbuduj projekt produkcyjny
-   `npm run preview` - Podgląd buildu produkcyjnego
-   `npm run lint` - Sprawdź kod ESLintem

### Backend

-   `npm start` - Uruchom serwer produkcyjny
-   `npm run dev` - Uruchom serwer z nodemon (auto-reload)

## 🔑 Uzyskanie klucza API Stripe

1. Zarejestruj się na https://stripe.com
2. Przejdź do Dashboard
3. Kliknij "Developers" → "API keys"
4. Skopiuj "Secret key" (klucz testowy zaczyna się od `sk_test_`)
5. Wklej go do pliku `.env` w folderze `stripe/backend`

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

### Backend

-   Node.js
-   Express.js
-   Stripe SDK
-   CORS
-   dotenv

## 🎨 Komponenty UI

Projekt wykorzystuje shadcn/ui components:

-   Button
-   Card
-   Checkbox
-   Toast/Toaster

## 📄 Licencja

MIT
