import { useState } from "react";
import {
    X,
    ChevronDown,
    ChevronUp,
    ShoppingBag,
    Heart,
    Search,
    User,
    Menu,
} from "lucide-react";
import { PaymentButton } from "@/components/PaymentButton";

interface Product {
    id: number;
    name: string;
    price: number;
    sizes: string[];
}

const products: Product[] = [
    {
        id: 1,
        name: "Bluza Basic Black",
        price: 189,
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 2,
        name: "Bluza Oversize White",
        price: 219,
        sizes: ["M", "L", "XL", "XXL"],
    },
    { id: 3, name: "Bluza Hoodie Premium", price: 259, sizes: ["S", "M", "L"] },
    {
        id: 4,
        name: "Bluza Crewneck Minimal",
        price: 179,
        sizes: ["XS", "S", "M", "L", "XL"],
    },
    { id: 5, name: "Bluza Zip-Up Black", price: 299, sizes: ["M", "L", "XL"] },
    {
        id: 6,
        name: "Bluza Streetwear Classic",
        price: 239,
        sizes: ["S", "M", "L", "XL", "XXL"],
    },
    { id: 7, name: "Bluza Vintage White", price: 269, sizes: ["M", "L", "XL"] },
    {
        id: 8,
        name: "Bluza Urban Essential",
        price: 199,
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 9,
        name: "Bluza Comfort Fit",
        price: 209,
        sizes: ["XS", "S", "M", "L"],
    },
];

interface FilterSectionProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

function FilterSection({
    title,
    isOpen,
    onToggle,
    children,
}: FilterSectionProps) {
    return (
        <div className="border-b border-neutral-200">
            <button
                onClick={onToggle}
                className="w-full py-4 px-0 flex justify-between items-center text-left hover:bg-neutral-50 transition-colors rounded"
            >
                <span className="font-semibold text-sm">{title}</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {isOpen && <div className="pb-4">{children}</div>}
        </div>
    );
}

function Index() {
    const [priceOpen, setPriceOpen] = useState(true);
    const [sizeOpen, setSizeOpen] = useState(true);
    const [colorOpen, setColorOpen] = useState(true);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState<string>("");
    const [maxPrice, setMaxPrice] = useState<string>("");

    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const colors = ["Czarny", "Biały", "Szary"];

    const toggleSize = (size: string) => {
        setSelectedSizes((prev) =>
            prev.includes(size)
                ? prev.filter((s) => s !== size)
                : [...prev, size]
        );
    };

    const toggleColor = (color: string) => {
        setSelectedColors((prev) =>
            prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color]
        );
    };

    const clearFilters = () => {
        setSelectedSizes([]);
        setSelectedColors([]);
        setMinPrice("");
        setMaxPrice("");
    };

    const hasActiveFilters =
        selectedSizes.length > 0 ||
        selectedColors.length > 0 ||
        minPrice ||
        maxPrice;

    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <button className="lg:hidden">
                            <Menu size={24} />
                        </button>

                        <h1 className="text-3xl font-extrabold tracking-tight">
                            STORE
                        </h1>

                        <div className="flex items-center gap-1">
                            <button className="hover:bg-neutral-100 p-2 rounded-full transition-all">
                                <Search size={20} />
                            </button>
                            <button className="hover:bg-neutral-100 p-2 rounded-full transition-all">
                                <User size={20} />
                            </button>
                            <button className="hover:bg-neutral-100 p-2 rounded-full transition-all">
                                <Heart size={20} />
                            </button>
                            <button className="hover:bg-neutral-100 p-2 rounded-full transition-all relative">
                                <ShoppingBag size={20} />
                                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium shadow-md">
                                    0
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-6">
                    <ul className="flex gap-8 py-4">
                        <li>
                            <a
                                href="#"
                                className="text-sm font-medium text-neutral-700 hover:text-black transition-colors"
                            >
                                Nowości
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-sm font-semibold text-black"
                            >
                                Bluzy
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-sm font-medium text-neutral-700 hover:text-black transition-colors"
                            >
                                T-Shirty
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-sm font-medium text-neutral-700 hover:text-black transition-colors"
                            >
                                Spodnie
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-sm font-medium text-neutral-700 hover:text-black transition-colors"
                            >
                                Akcesoria
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                            >
                                Sale
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex gap-12">
                    {/* Filters Sidebar */}
                    <aside className="w-64 flex-shrink-0">
                        <div className="sticky top-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold tracking-tight">
                                    Filtry
                                </h2>
                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-xs font-medium text-neutral-600 hover:text-black transition-colors flex items-center gap-1"
                                    >
                                        Wyczyść <X size={14} />
                                    </button>
                                )}
                            </div>

                            <div className="border-t border-neutral-200">
                                {/* Price Filter */}
                                <FilterSection
                                    title="Cena"
                                    isOpen={priceOpen}
                                    onToggle={() => setPriceOpen(!priceOpen)}
                                >
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-xs font-medium text-neutral-700 mb-2">
                                                Od (PLN)
                                            </label>
                                            <input
                                                type="number"
                                                value={minPrice}
                                                onChange={(e) =>
                                                    setMinPrice(e.target.value)
                                                }
                                                className="w-full border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black rounded-lg transition-all"
                                                placeholder="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-neutral-700 mb-2">
                                                Do (PLN)
                                            </label>
                                            <input
                                                type="number"
                                                value={maxPrice}
                                                onChange={(e) =>
                                                    setMaxPrice(e.target.value)
                                                }
                                                className="w-full border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black rounded-lg transition-all"
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
                                        {sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => toggleSize(size)}
                                                className={`py-2.5 text-sm font-semibold transition-all rounded-lg ${
                                                    selectedSizes.includes(size)
                                                        ? "bg-black text-white shadow-md"
                                                        : "bg-white text-black border border-neutral-300 hover:border-neutral-400 hover:shadow-sm"
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
                                        {colors.map((color) => (
                                            <label
                                                key={color}
                                                className="flex items-center gap-3 cursor-pointer hover:bg-neutral-50 py-2.5 px-2 rounded-lg transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedColors.includes(
                                                        color
                                                    )}
                                                    onChange={() =>
                                                        toggleColor(color)
                                                    }
                                                    className="w-4 h-4 rounded border-neutral-400 accent-black"
                                                />
                                                <span className="text-sm font-medium">
                                                    {color}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </FilterSection>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <main className="flex-1">
                        <div className="mb-10 flex justify-between items-end">
                            <div>
                                <h2 className="text-5xl font-bold tracking-tight mb-2">
                                    Bluzy
                                </h2>
                                <p className="text-sm font-medium text-neutral-500">
                                    {products.length} Produktów
                                </p>
                            </div>
                            <div className="flex gap-3 items-center">
                                <span className="text-xs font-medium text-neutral-600">
                                    Sortuj:
                                </span>
                                <select className="border border-neutral-300 px-4 py-2.5 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-black rounded-lg transition-all shadow-sm">
                                    <option>Najnowsze</option>
                                    <option>Cena: Rosnąco</option>
                                    <option>Cena: Malejąco</option>
                                    <option>Nazwa: A-Z</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div key={product.id} className="group">
                                    {/* Product Image */}
                                    <div className="relative aspect-square bg-neutral-200 mb-4 overflow-hidden rounded-xl shadow-sm group-hover:shadow-lg transition-all duration-300">
                                        <div className="w-full h-full bg-neutral-200 group-hover:bg-neutral-300 transition-all duration-300" />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                                            <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <button className="bg-black text-white px-8 py-3.5 text-sm font-semibold hover:bg-neutral-900 transition-all flex items-center gap-2 rounded-full shadow-lg">
                                                    <ShoppingBag size={16} />
                                                    Dodaj do koszyka
                                                </button>
                                            </div>
                                        </div>

                                        {/* Wishlist Button */}
                                        <button className="absolute top-4 right-4 bg-white p-2.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-neutral-100 rounded-full shadow-md">
                                            <Heart size={18} />
                                        </button>
                                    </div>

                                    {/* Product Info */}
                                    <div>
                                        <h3 className="font-semibold text-base mb-2 group-hover:text-neutral-700 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-xl font-bold mb-4">
                                            {product.price} PLN
                                        </p>
                                        <div className="flex gap-2 mb-4">
                                            {product.sizes.map((size) => (
                                                <span
                                                    key={size}
                                                    className="text-xs font-medium border border-neutral-300 px-3 py-1.5 hover:border-neutral-400 hover:bg-neutral-50 cursor-pointer transition-all rounded-lg"
                                                >
                                                    {size}
                                                </span>
                                            ))}
                                        </div>
                                        <PaymentButton
                                            productName={product.name}
                                            price={product.price}
                                            quantity={1}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-neutral-200 mt-24 bg-white shadow-inner">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-4 gap-12 mb-12">
                        <div>
                            <h3 className="font-bold text-sm mb-4">Sklep</h3>
                            <ul className="space-y-2.5">
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Nowości
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Bluzy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-neutral-600 hover:text-black transition-colors"
                                    >
                                        T-Shirty
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Akcesoria
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-4">Pomoc</h3>
                            <ul className="space-y-2.5">
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Kontakt
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Dostawa
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Zwroty
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-neutral-600 hover:text-black transition-colors"
                                    >
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-4">O nas</h3>
                            <ul className="space-y-2.5">
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Nasza historia
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Kariera
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-sm text-neutral-600 hover:text-black transition-colors"
                                    >
                                        Sustainability
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-sm mb-4">
                                Newsletter
                            </h3>
                            <p className="text-sm text-neutral-600 mb-4">
                                Zapisz się i otrzymaj 10% zniżki
                            </p>
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
                        <p className="text-sm text-neutral-500">
                            © 2025 STORE. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a
                                href="#"
                                className="text-sm text-neutral-600 hover:text-black transition-colors"
                            >
                                Polityka prywatności
                            </a>
                            <a
                                href="#"
                                className="text-sm text-neutral-600 hover:text-black transition-colors"
                            >
                                Regulamin
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Index;
