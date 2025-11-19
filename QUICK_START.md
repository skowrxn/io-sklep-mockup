# Szybki start - Stripe płatności

## ⚡ Problem: "Nic się nie dzieje po kliknięciu"

To oznacza, że **backend nie jest uruchomiony**. Oto jak to naprawić:

## Krok 1: Sprawdź czy masz klucze Stripe

Otwórz plik `.env` i sprawdź czy masz wypełnione:

```env
STRIPE_SECRET_KEY=sk_test_... (twój klucz testowy)
```

Jeśli nie masz, zobacz [STRIPE_SETUP.md](STRIPE_SETUP.md) po instrukcje.

## Krok 2: Uruchom backend

### Opcja A - Windows (zalecane):

**Terminal 1 - Backend:**
```bash
npm run server
```

Poczekaj aż zobaczysz:
```
🚀 Serwer uruchomiony na porcie 3001
📍 Endpoint: http://localhost:3001/create-checkout-session
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Opcja B - Linux/Mac:

```bash
npm run dev:all
```

## Krok 3: Przetestuj połączenie

### Test 1 - Otwórz w przeglądarce:
```
file:///ścieżka/do/projektu/test-server.html
```

Kliknij "Test Backend" - powinieneś zobaczyć zielony komunikat ✅

### Test 2 - W konsoli (opcjonalne):
```bash
curl -X POST http://localhost:3001/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"productName":"Test","price":100}'
```

Powinieneś zobaczyć JSON z `url` do Stripe.

## Krok 4: Testuj płatności

1. Otwórz `http://localhost:5173`
2. Dodaj produkty do koszyka
3. Przejdź do checkout
4. Wypełnij formularz
5. Kliknij "Przejdź do płatności Stripe"
6. Użyj testowej karty: `4242 4242 4242 4242`

## 🐛 Troubleshooting

### Błąd: "Cannot connect to server"
- ❌ Backend nie jest uruchomiony
- ✅ Uruchom: `npm run server` w osobnym terminalu

### Błąd: "Port 3001 is already in use"
- ❌ Inny proces używa portu 3001
- ✅ Windows: `netstat -ano | findstr :3001` i zabij proces
- ✅ Linux/Mac: `lsof -ti:3001 | xargs kill -9`
- ✅ Lub zmień port w `.env`: `PORT=3002`

### Błąd: "Invalid API key"
- ❌ Nieprawidłowy klucz Stripe w `.env`
- ✅ Sprawdź czy klucz zaczyna się od `sk_test_`
- ✅ Skopiuj nowy klucz z https://dashboard.stripe.com/apikeys

### Błąd: "STRIPE_SECRET_KEY not set"
- ❌ Brak klucza w `.env`
- ✅ Dodaj: `STRIPE_SECRET_KEY=sk_test_...`
- ✅ Zrestartuj backend

### Przycisk "Przejdź do płatności" nic nie robi
- ❌ Backend nie jest uruchomiony LUB błąd w konsoli
- ✅ Otwórz DevTools (F12) → Console
- ✅ Sprawdź czy widzisz błędy
- ✅ Uruchom backend: `npm run server`

### Po kliknięciu ładuje się długo i nic
- ❌ Backend prawdopodobnie nie odpowiada
- ✅ Sprawdź terminal z backendem - czy są błędy?
- ✅ Sprawdź konsolę przeglądarki (F12)
- ✅ Sprawdź czy backend odpowiada: `curl http://localhost:3001`

## 📋 Checklist przed testowaniem

- [ ] Zainstalowane zależności: `npm install`
- [ ] Plik `.env` istnieje
- [ ] `STRIPE_SECRET_KEY` w `.env` jest wypełniony
- [ ] Backend uruchomiony: `npm run server`
- [ ] Frontend uruchomiony: `npm run dev`
- [ ] Backend pokazuje: "🚀 Serwer uruchomiony na porcie 3001"
- [ ] Frontend pokazuje: "VITE ... ready in ... ms"

## 🎯 Wszystko działa gdy:

1. ✅ Backend terminal pokazuje: `🚀 Serwer uruchomiony na porcie 3001`
2. ✅ Frontend terminal pokazuje URL: `http://localhost:5173`
3. ✅ Po kliknięciu "Przejdź do płatności" jesteś przekierowany do Stripe
4. ✅ Widzisz formularz płatności Stripe z produktami

## 🆘 Nadal nie działa?

1. Sprawdź konsole przeglądarki (F12 → Console)
2. Sprawdź terminal z backendem - szukaj czerwonych błędów
3. Spróbuj zrestartować oba serwery
4. Spróbuj test-server.html aby sprawdzić połączenie
5. Sprawdź czy masz najnowszą wersję Node.js (v16+)
