import { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../data/mockData';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart from localStorage:', e);
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isLoading]);

  const addToCart = (product: Product, size: string, color: string, quantity: number) => {
    const existingItem = items.find(
      item =>
        item.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor === color
    );

    if (existingItem) {
      setItems(items.map(item =>
        item.cartItemId === existingItem.cartItemId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      const cartItem: CartItem = {
        ...product,
        cartItemId: `${product.id}-${size}-${color}-${Date.now()}`,
        selectedSize: size,
        selectedColor: color,
        quantity,
      };
      setItems([...items, cartItem]);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(items.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setItems(items.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, getTotal, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
