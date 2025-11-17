import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Heart, ShoppingBag, Star, Truck, Shield } from 'lucide-react';
import { getProductById } from '../data/mockData';
import { useCart } from '../context/CartContext';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : null;
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-lg text-neutral-600">Produkt nie znaleziony</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Proszę wybrać rozmiar i kolor');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}
          />
        ))}
        <span className="text-sm text-neutral-600 ml-2">({product.reviews} opinii)</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link to="/categories/hoodies" className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors mb-8">
          <ChevronLeft size={20} />
          Wróć do kategorii
        </Link>

        <div className="grid grid-cols-2 gap-12 mb-16">
          <div>
            <div className="relative aspect-square bg-neutral-200 rounded-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <div className="mb-6">
              <p className="text-sm font-medium text-neutral-500 mb-2">Kategoria</p>
              <h1 className="text-5xl font-bold tracking-tight mb-4">{product.name}</h1>
              {renderStars(product.rating)}
            </div>

            <div className="mb-8 pb-8 border-b border-neutral-200">
              <p className="text-4xl font-bold">{product.price} PLN</p>
              <p className={`text-sm font-medium mt-2 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? '✓ Dostępny' : 'Niedostępny'}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-neutral-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Rozmiar</label>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 font-semibold text-sm transition-all rounded-lg ${
                        selectedSize === size
                          ? 'bg-black text-white shadow-lg'
                          : 'bg-white border border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Kolor</label>
                <div className="grid grid-cols-3 gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`py-3 font-semibold text-sm transition-all rounded-lg ${
                        selectedColor === color
                          ? 'bg-black text-white shadow-lg'
                          : 'bg-white border border-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Ilość</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-semibold"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-green-600 text-white'
                    : 'bg-black text-white hover:bg-neutral-900 hover:shadow-lg'
                }`}
              >
                <ShoppingBag size={20} />
                {isAdded ? 'Dodano do koszyka!' : 'Dodaj do koszyka'}
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-4 rounded-xl border-2 transition-all font-semibold ${
                  isWishlisted
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-neutral-300 text-neutral-600 hover:border-neutral-400'
                }`}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="space-y-4 pt-8 border-t border-neutral-200">
              <div className="flex items-start gap-3">
                <Truck size={20} className="text-neutral-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Darmowa dostawa</p>
                  <p className="text-sm text-neutral-600">Bezpłatna dostawa dla zamówień powyżej 150 PLN</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-neutral-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Gwarancja zadowolenia</p>
                  <p className="text-sm text-neutral-600">30 dni na zwrot produktu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
