import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { HomePage } from './pages/HomePage';

function Header() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <button className="lg:hidden">
            <Menu size={24} />
          </button>

          <Link to="/" className="text-3xl font-extrabold tracking-tight hover:opacity-70 transition-opacity">
            STORE
          </Link>

          <div className="flex items-center gap-6">
            <button className="hover:bg-neutral-100 p-2 rounded-full transition-all">
              <Search size={20} />
            </button>
            <button className="hover:bg-neutral-100 p-2 rounded-full transition-all">
              <User size={20} />
            </button>
            <button className="hover:bg-neutral-100 p-2 rounded-full transition-all">
              <Heart size={20} />
            </button>
            <Link to="/cart" className="hover:bg-neutral-100 p-2 rounded-full transition-all relative">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium shadow-md">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Navigation() {
  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-6">
        <ul className="flex gap-8 py-4">
          <li><Link to="/" className="text-sm font-medium text-neutral-700 hover:text-black transition-colors">Nowości</Link></li>
          <li><Link to="/categories/hoodies" className="text-sm font-semibold text-black">Bluzy</Link></li>
          <li><Link to="/categories/t-shirts" className="text-sm font-medium text-neutral-700 hover:text-black transition-colors">T-Shirty</Link></li>
          <li><Link to="/categories/pants" className="text-sm font-medium text-neutral-700 hover:text-black transition-colors">Spodnie</Link></li>
          <li><Link to="/categories/accessories" className="text-sm font-medium text-neutral-700 hover:text-black transition-colors">Akcesoria</Link></li>
          <li><Link to="/" className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">Sale</Link></li>
        </ul>
      </div>
    </nav>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories/:slug" element={<CategoriesPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 mt-24 bg-white shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-bold text-sm mb-4">Sklep</h3>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-neutral-600 hover:text-black transition-colors">Nowości</Link></li>
              <li><Link to="/categories/hoodies" className="text-sm text-neutral-600 hover:text-black transition-colors">Bluzy</Link></li>
              <li><Link to="/categories/t-shirts" className="text-sm text-neutral-600 hover:text-black transition-colors">T-Shirty</Link></li>
              <li><Link to="/categories/accessories" className="text-sm text-neutral-600 hover:text-black transition-colors">Akcesoria</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-4">Pomoc</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">Kontakt</a></li>
              <li><a href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">Dostawa</a></li>
              <li><a href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">Zwroty</a></li>
              <li><a href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-4">O nas</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">Nasza historia</a></li>
              <li><a href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">Kariera</a></li>
              <li><a href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-4">Newsletter</h3>
            <p className="text-sm text-neutral-600 mb-4">Zapisz się i otrzymaj 10% zniżki</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black rounded-lg transition-all"
              />
              <button className="bg-black text-white px-6 py-2.5 text-sm font-semibold hover:bg-neutral-900 hover:shadow-md transition-all rounded-lg">
                Zapisz
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-200 pt-8 flex justify-between items-center">
          <p className="text-sm text-neutral-500">© 2025 STORE. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">Polityka prywatności</a>
            <a href="#" className="text-sm text-neutral-600 hover:text-black transition-colors">Regulamin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;
