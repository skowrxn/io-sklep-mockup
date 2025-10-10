import { useState } from 'react';
import { X, ChevronDown, ChevronUp, ShoppingBag, Heart, Search, User, Menu } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  sizes: string[];
}

const products: Product[] = [
  { id: 1, name: 'Bluza Basic Black', price: 189, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 2, name: 'Bluza Oversize White', price: 219, sizes: ['M', 'L', 'XL', 'XXL'] },
  { id: 3, name: 'Bluza Hoodie Premium', price: 259, sizes: ['S', 'M', 'L'] },
  { id: 4, name: 'Bluza Crewneck Minimal', price: 179, sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 5, name: 'Bluza Zip-Up Black', price: 299, sizes: ['M', 'L', 'XL'] },
  { id: 6, name: 'Bluza Streetwear Classic', price: 239, sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 7, name: 'Bluza Vintage White', price: 269, sizes: ['M', 'L', 'XL'] },
  { id: 8, name: 'Bluza Urban Essential', price: 199, sizes: ['S', 'M', 'L', 'XL'] },
  { id: 9, name: 'Bluza Comfort Fit', price: 209, sizes: ['XS', 'S', 'M', 'L'] },
];

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function FilterSection({ title, isOpen, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-b border-black">
      <button
        onClick={onToggle}
        className="w-full py-4 px-0 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-sm uppercase tracking-wider">{title}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
}

function App() {
  const [priceOpen, setPriceOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(true);
  const [colorOpen, setColorOpen] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Czarny', 'Biały', 'Szary'];

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinPrice('');
    setMaxPrice('');
  };

  const hasActiveFilters = selectedSizes.length > 0 || selectedColors.length > 0 || minPrice || maxPrice;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button className="lg:hidden">
              <Menu size={24} />
            </button>

            <h1 className="text-3xl font-bold uppercase tracking-widest">STORE</h1>

            <div className="flex items-center gap-6">
              <button className="hover:opacity-60 transition-opacity">
                <Search size={22} />
              </button>
              <button className="hover:opacity-60 transition-opacity">
                <User size={22} />
              </button>
              <button className="hover:opacity-60 transition-opacity">
                <Heart size={22} />
              </button>
              <button className="hover:opacity-60 transition-opacity relative">
                <ShoppingBag size={22} />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-black">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex gap-8 py-4">
            <li><a href="#" className="text-sm uppercase tracking-wider hover:underline">Nowości</a></li>
            <li><a href="#" className="text-sm uppercase tracking-wider hover:underline font-bold">Bluzy</a></li>
            <li><a href="#" className="text-sm uppercase tracking-wider hover:underline">T-Shirty</a></li>
            <li><a href="#" className="text-sm uppercase tracking-wider hover:underline">Spodnie</a></li>
            <li><a href="#" className="text-sm uppercase tracking-wider hover:underline">Akcesoria</a></li>
            <li><a href="#" className="text-sm uppercase tracking-wider hover:underline text-red-600">Sale</a></li>
          </ul>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-12">
          {/* Filters Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold uppercase tracking-wider">Filtry</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs uppercase tracking-wider hover:underline flex items-center gap-1"
                  >
                    Wyczyść <X size={14} />
                  </button>
                )}
              </div>

              <div className="border-t border-black">
                {/* Price Filter */}
                <FilterSection
                  title="Cena"
                  isOpen={priceOpen}
                  onToggle={() => setPriceOpen(!priceOpen)}
                >
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1">Od (PLN)</label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full border border-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black rounded"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider mb-1">Do (PLN)</label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full border border-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black rounded"
                        placeholder="500"
                      />
                    </div>
                  </div>
                </FilterSection>

                {/* Size Filter */}
                <FilterSection
                  title="Rozmiar"
                  isOpen={sizeOpen}
                  onToggle={() => setSizeOpen(!sizeOpen)}
                >
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-2 border border-black text-sm font-medium uppercase tracking-wider transition-colors rounded ${
                          selectedSizes.includes(size)
                            ? 'bg-black text-white'
                            : 'bg-white text-black hover:bg-gray-100'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                {/* Color Filter */}
                <FilterSection
                  title="Kolor"
                  isOpen={colorOpen}
                  onToggle={() => setColorOpen(!colorOpen)}
                >
                  <div className="space-y-2">
                    {colors.map(color => (
                      <label
                        key={color}
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 py-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={() => toggleColor(color)}
                          className="w-4 h-4 border-2 border-black accent-black"
                        />
                        <span className="text-sm uppercase tracking-wider">{color}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-bold uppercase tracking-widest mb-2">Bluzy</h2>
                <p className="text-sm uppercase tracking-wider text-gray-600">{products.length} Produktów</p>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-xs uppercase tracking-wider text-gray-600">Sortuj:</span>
                <select className="border border-black px-4 py-2 text-xs uppercase tracking-wider bg-white focus:outline-none focus:ring-2 focus:ring-black rounded">
                  <option>Najnowsze</option>
                  <option>Cena: Rosnąco</option>
                  <option>Cena: Malejąco</option>
                  <option>Nazwa: A-Z</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {products.map(product => (
                <div key={product.id} className="group">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-300 mb-4 overflow-hidden rounded-sm">
                    <div className="w-full h-full bg-gray-300 group-hover:bg-gray-400 transition-colors" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                      <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-medium hover:bg-gray-900 transition-colors flex items-center gap-2 rounded">
                          <ShoppingBag size={16} />
                          Dodaj do koszyka
                        </button>
                      </div>
                    </div>

                    {/* Wishlist Button */}
                    <button className="absolute top-4 right-4 bg-white p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded">
                      <Heart size={18} />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div>
                    <h3 className="font-medium text-sm uppercase tracking-wider mb-2">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold mb-3">{product.price} PLN</p>
                    <div className="flex gap-1 mb-3">
                      {product.sizes.map(size => (
                        <span
                          key={size}
                          className="text-xs border border-gray-300 px-2 py-1 uppercase tracking-wider hover:border-black hover:bg-gray-50 cursor-pointer transition-colors rounded"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                    <button className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest font-medium hover:bg-gray-900 transition-colors rounded">
                      Szybki podgląd
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-black mt-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4">Sklep</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:underline">Nowości</a></li>
                <li><a href="#" className="text-sm hover:underline">Bluzy</a></li>
                <li><a href="#" className="text-sm hover:underline">T-Shirty</a></li>
                <li><a href="#" className="text-sm hover:underline">Akcesoria</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4">Pomoc</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:underline">Kontakt</a></li>
                <li><a href="#" className="text-sm hover:underline">Dostawa</a></li>
                <li><a href="#" className="text-sm hover:underline">Zwroty</a></li>
                <li><a href="#" className="text-sm hover:underline">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4">O nas</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:underline">Nasza historia</a></li>
                <li><a href="#" className="text-sm hover:underline">Kariera</a></li>
                <li><a href="#" className="text-sm hover:underline">Sustainability</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm uppercase tracking-widest mb-4">Newsletter</h3>
              <p className="text-sm mb-4">Zapisz się i otrzymaj 10% zniżki</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 border border-black px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black rounded-l"
                />
                <button className="bg-black text-white px-6 py-2 text-xs uppercase tracking-wider hover:bg-gray-900 transition-colors rounded-r">
                  Zapisz
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-black pt-8 flex justify-between items-center">
            <p className="text-sm uppercase tracking-wider text-gray-600">© 2025 STORE. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-sm hover:underline">Polityka prywatności</a>
              <a href="#" className="text-sm hover:underline">Regulamin</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
