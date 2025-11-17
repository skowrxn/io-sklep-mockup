import { Link } from 'react-router-dom';
import { ChevronLeft, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Twój koszyk jest pusty</h1>
          <p className="text-neutral-600 mb-8">Dodaj jakieś produkty, aby rozpocząć zakupy</p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-neutral-900 transition-all"
          >
            Wróć do sklepu
          </Link>
        </div>
      </div>
    );
  }

  const total = getTotal();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors mb-8">
          <ChevronLeft size={20} />
          Wróć do sklepu
        </Link>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <h1 className="text-4xl font-bold mb-8">Koszyk</h1>

            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item.cartItemId}
                  className="bg-white rounded-xl p-6 flex gap-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-28 h-28 flex-shrink-0 bg-neutral-200 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-neutral-600 mb-4">
                      {item.selectedColor} • Rozmiar {item.selectedSize}
                    </p>
                    <p className="text-2xl font-bold mb-4">{item.price} PLN</p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 hover:bg-neutral-200 rounded transition-colors"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 hover:bg-neutral-200 rounded transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="ml-auto p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-neutral-600 text-sm mb-2">Razem</p>
                    <p className="text-2xl font-bold">{item.price * item.quantity} PLN</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={clearCart}
              className="mt-8 px-6 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors font-medium"
            >
              Wyczyść koszyk
            </button>
          </div>

          <div className="col-span-1">
            <div className="bg-white rounded-xl p-8 shadow-sm sticky top-8 h-fit">
              <h2 className="text-2xl font-bold mb-8">Podsumowanie</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-neutral-600">
                  <span>Suma:</span>
                  <span>{total} PLN</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Dostawa:</span>
                  <span className="text-green-600 font-semibold">GRATIS</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Podatek (VAT 23%):</span>
                  <span>{(total * 0.23).toFixed(2)} PLN</span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-8 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Razem:</span>
                  <span className="text-3xl font-bold">{(total * 1.23).toFixed(2)} PLN</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full block px-6 py-4 bg-black text-white rounded-xl font-semibold hover:bg-neutral-900 hover:shadow-lg transition-all text-center"
              >
                Przejdź do kasy
              </Link>

              <Link
                to="/"
                className="w-full block mt-4 px-6 py-4 border border-neutral-300 rounded-xl font-semibold hover:bg-neutral-50 transition-colors text-center"
              >
                Kontynuuj zakupy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
