import { Link } from 'react-router-dom';
import { products, categories } from '../data/mockData';
import { Heart, ShoppingBag } from 'lucide-react';

export function HomePage() {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-24">
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <h1 className="text-6xl font-bold tracking-tight mb-6">Minimalizm w każdym szczególe</h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Odkryj naszą kolekcję wysokiej jakości ubrań i akcesoriów. Nowoczesny design, najlepsze materiały.
            </p>
            <Link
              to="/categories/hoodies"
              className="inline-block px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-neutral-900 hover:shadow-lg transition-all"
            >
              Odkryj kolekcję
            </Link>
          </div>
        </div>

        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-12">Kategorie</h2>
          <div className="grid grid-cols-4 gap-6">
            {categories.map(category => (
              <Link key={category.id} to={`/categories/${category.slug}`} className="group">
                <div className="relative aspect-square bg-neutral-200 rounded-xl overflow-hidden mb-4 shadow-sm group-hover:shadow-lg transition-all">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
                <h3 className="text-lg font-bold group-hover:text-neutral-700 transition-colors">{category.name}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Polecane produkty</h2>
            <Link to="/categories/hoodies" className="text-black hover:text-neutral-600 transition-colors font-semibold">
              Wszystkie produkty →
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <div className="relative aspect-square bg-neutral-200 mb-4 overflow-hidden rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                    <button className="bg-black text-white px-8 py-3.5 text-sm font-semibold hover:bg-neutral-900 transition-all flex items-center gap-2 rounded-full shadow-lg">
                      <ShoppingBag size={16} />
                      Szybki podgląd
                    </button>
                  </div>

                  <button className="absolute top-4 right-4 bg-white p-2.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-neutral-100 rounded-full shadow-md">
                    <Heart size={18} />
                  </button>
                </div>

                <h3 className="font-semibold text-base mb-2 group-hover:text-neutral-700 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xl font-bold mb-2">{product.price} PLN</p>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-400">★</span>
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-neutral-500">({product.reviews})</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-4xl font-bold mb-2">30+</div>
              <h3 className="text-lg font-bold mb-2">Lat doświadczenia</h3>
              <p className="text-neutral-600">Zaufaj nam - jesteśmy liderem w branży od ponad 30 lat</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-4xl font-bold mb-2">100k+</div>
              <h3 className="text-lg font-bold mb-2">Zadowoleni klienci</h3>
              <p className="text-neutral-600">Ponad sto tysięcy zadowolonych klientów na całym świecie</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <h3 className="text-lg font-bold mb-2">Wsparcie</h3>
              <p className="text-neutral-600">Nasz zespół zawsze gotowy do pomocy, 24 godziny na dobę</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
