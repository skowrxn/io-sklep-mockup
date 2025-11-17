import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Heart, ShoppingBag } from 'lucide-react';
import { categories, getProductsByCategory, products } from '../data/mockData';
import { useState } from 'react';

export function CategoriesPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find(c => c.slug === slug);
  const categoryProducts = slug ? getProductsByCategory(slug) : products;

  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  if (!category && slug) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-lg text-neutral-600">Kategoria nie znaleziona</p>
      </div>
    );
  }

  let filteredProducts = categoryProducts.filter(
    p => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  if (selectedColors.length > 0) {
    filteredProducts = filteredProducts.filter(p =>
      p.colors.some(c => selectedColors.includes(c))
    );
  }

  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  const allColors = Array.from(new Set(categoryProducts.flatMap(p => p.colors)));
  const minPrice = Math.min(...categoryProducts.map(p => p.price));
  const maxPrice = Math.max(...categoryProducts.map(p => p.price));

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors mb-8">
          <ChevronLeft size={20} />
          Wróć do sklepu
        </Link>

        <div className="flex gap-12">
          <aside className="w-72 flex-shrink-0">
            <div className="sticky top-8">
              <h2 className="text-lg font-bold mb-6">Filtry</h2>

              <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
                <h3 className="font-semibold text-sm mb-4">Cena</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-2">Od: {priceRange[0]} PLN</label>
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-2">Do: {priceRange[1]} PLN</label>
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-sm mb-4">Kolor</h3>
                <div className="space-y-2">
                  {allColors.map(color => (
                    <label key={color} className="flex items-center gap-3 cursor-pointer hover:bg-neutral-50 py-2 px-2 rounded-lg transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleColor(color)}
                        className="w-4 h-4 rounded border-neutral-400 accent-black"
                      />
                      <span className="text-sm font-medium">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-10">
              <h1 className="text-5xl font-bold mb-2">{category ? category.name : 'Wszystkie produkty'}</h1>
              <p className="text-neutral-600">{filteredProducts.length} produktów</p>
            </div>

            <div className="mb-8 flex justify-end">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-neutral-300 px-4 py-2.5 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-black rounded-lg transition-all shadow-sm"
              >
                <option value="newest">Najnowsze</option>
                <option value="price-low">Cena: rosnąco</option>
                <option value="price-high">Cena: malejąco</option>
                <option value="rating">Najwyżej oceniane</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {filteredProducts.map(product => (
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-neutral-600">Brak produktów spełniających kryteria</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
