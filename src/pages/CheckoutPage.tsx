import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '@/hooks/use-toast';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCart();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    city: '',
    zipCode: '',
    country: 'Polska',
  });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  if (items.length === 0 && !orderCompleted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Koszyk jest pusty</h1>
          <p className="text-neutral-600 mb-8">Aby dokonać zakupów, dodaj produkty do koszyka</p>
          <button
            onClick={() => navigate('/')}
            className="inline-block px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-neutral-900 transition-all"
          >
            Wróć do sklepu
          </button>
        </div>
      </div>
    );
  }

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center">
        <div className="bg-white rounded-2xl p-12 text-center max-w-md shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Zamówienie złożone!</h1>
          <p className="text-neutral-600 mb-8">
            Dzięki za Twoje zamówienie. Na Twojej skrzynce mailowej powinien pojawić się email potwierdzający.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-neutral-900 transition-all"
          >
            Wróć do sklepu
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.street || !formData.city || !formData.zipCode) {
      toast({
        title: 'Błąd formularza',
        description: 'Proszę wypełnić wszystkie wymagane pola',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      const apiBase = (import.meta.env.VITE_API_BASE as string) || 'http://localhost:3001';
      const endpoint = `${apiBase}/create-checkout-session`;

      // Przygotuj dane produktów z koszyka
      const stripeItems = items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        description: `${item.selectedSize} / ${item.selectedColor}`,
      }));

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: stripeItems,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Server error: ${response.status} ${errText}`);
      }

      const data = await response.json();

      if (data?.url) {
        // Zapisz dane formularza w localStorage przed przekierowaniem
        localStorage.setItem('checkoutFormData', JSON.stringify(formData));

        // Przekieruj do Stripe Checkout
        window.location.href = data.url;
        return;
      }

      throw new Error('No checkout URL received from server');
    } catch (error) {
      let errorMessage = 'Nie udało się utworzyć sesji płatności. Spróbuj ponownie.';

      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = 'Nie można połączyć się z serwerem. Upewnij się, że backend jest uruchomiony (npm run server).';
        } else if (error.message.includes('Server error')) {
          errorMessage = error.message;
        }
      }

      toast({
        title: 'Błąd płatności',
        description: errorMessage,
        variant: 'destructive',
      });
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const total = getTotal();
  const taxAmount = total * 0.23;
  const shippingCost = shippingMethod === 'express' ? 29 : 0;
  const finalTotal = total + taxAmount + shippingCost;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate('/cart')}
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors mb-8"
        >
          <ChevronLeft size={20} />
          Wróć do koszyka
        </button>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <h1 className="text-4xl font-bold mb-8">Kasa</h1>

            <div className="flex gap-4 mb-12">
              {[1, 2, 3].map(s => (
                <button
                  key={s}
                  onClick={() => setStep(s)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                    step === s
                      ? 'bg-black text-white'
                      : 'bg-white border border-neutral-300 text-neutral-600'
                  }`}
                >
                  Krok {s}
                </button>
              ))}
            </div>

            {step === 1 && (
              <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-bold mb-6">Informacje kontaktowe</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-neutral-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="twój@email.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Imię</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border border-neutral-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Jan"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Nazwisko</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border border-neutral-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Kowalski"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-neutral-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="+48 123 456 789"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-6 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-neutral-900 transition-all"
                >
                  Dalej do adresu
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-bold mb-6">Adres dostawy</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Ulica i numer</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full border border-neutral-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="ul. Przykładowa 123"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Kod pocztowy</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full border border-neutral-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="00-000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Miasto</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border border-neutral-300 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Warszawa"
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-semibold mb-4">Metoda dostawy</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-4 border border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={shippingMethod === 'standard'}
                          onChange={e => setShippingMethod(e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <div>
                          <p className="font-semibold">Dostawa standardowa</p>
                          <p className="text-sm text-neutral-600">3-5 dni roboczych • GRATIS</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={shippingMethod === 'express'}
                          onChange={e => setShippingMethod(e.target.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <div>
                          <p className="font-semibold">Dostawa ekspresowa</p>
                          <p className="text-sm text-neutral-600">1-2 dni roboczych • 29 PLN</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="w-full mt-6 px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-neutral-900 transition-all"
                >
                  Dalej do płatności
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
                <h2 className="text-2xl font-bold mb-6">Metoda płatności</h2>
                <div className="space-y-4 mb-6">
                  <label className="flex items-center gap-3 p-4 border border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={e => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="font-semibold">Karta kredytowa / debetowa</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={e => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 accent-black"
                    />
                    <span className="font-semibold">Przelewy24</span>
                  </label>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full px-6 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Przekierowywanie do płatności...' : 'Przejdź do płatności Stripe'}
                </button>
              </div>
            )}
          </div>

          <div className="col-span-1">
            <div className="bg-white rounded-xl p-8 shadow-sm sticky top-8 h-fit">
              <h2 className="text-2xl font-bold mb-6">Podsumowanie</h2>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map(item => (
                  <div key={item.cartItemId} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-neutral-600 text-xs">x{item.quantity}</p>
                    </div>
                    <p className="font-semibold">{item.price * item.quantity} PLN</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-200 pt-6 space-y-2 mb-6">
                <div className="flex justify-between text-neutral-600">
                  <span>Suma:</span>
                  <span>{total} PLN</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Podatek (VAT 23%):</span>
                  <span>{taxAmount.toFixed(2)} PLN</span>
                </div>
                {shippingMethod === 'express' && (
                  <div className="flex justify-between text-neutral-600">
                    <span>Dostawa ekspresowa:</span>
                    <span>29 PLN</span>
                  </div>
                )}
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Razem:</span>
                  <span className="text-2xl font-bold">{finalTotal.toFixed(2)} PLN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
