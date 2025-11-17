export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface CartItem extends Product {
  cartItemId: string;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

// Using Unsplash for high-quality product images
const mockImage = (category: string, seed: number) =>
  `https://images.unsplash.com/photo-${seed}?w=800&h=800&fit=crop&auto=format`;

export const categories: Category[] = [
  {
    id: '1',
    name: 'Bluzy',
    slug: 'hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&auto=format',
  },
  {
    id: '2',
    name: 'T-Shirty',
    slug: 't-shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&auto=format',
  },
  {
    id: '3',
    name: 'Spodnie',
    slug: 'pants',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=800&fit=crop&auto=format',
  },
  {
    id: '4',
    name: 'Akcesoria',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=800&fit=crop&auto=format',
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Bluza Basic Black',
    price: 189,
    description: 'Klasyczna czarna bluza o minimalistycznym designie. Wykonana z najwyższej jakości bawełny, zapewnia maksymalny komfort noszenia przez cały dzień.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&auto=format',
    category: 'hoodies',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Czarny', 'Biały', 'Szary'],
    rating: 4.8,
    reviews: 247,
    inStock: true,
  },
  {
    id: '2',
    name: 'Bluza Oversize White',
    price: 219,
    description: 'Nowoczesna bluza o kroju oversize w czystym białym kolorze. Idealna do stylizacji casual i sportowych kombinacji.',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop&auto=format',
    category: 'hoodies',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Biały', 'Beż', 'Szary'],
    rating: 4.6,
    reviews: 189,
    inStock: true,
  },
  {
    id: '3',
    name: 'Bluza Hoodie Premium',
    price: 259,
    description: 'Luksusowa bluza z kapturem wykonana z premium materiału. Dodatkami są głębokie kieszenie i regulowana sznurek.',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&h=800&fit=crop&auto=format',
    category: 'hoodies',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Czarny', 'Granatowy'],
    rating: 4.9,
    reviews: 312,
    inStock: true,
  },
  {
    id: '4',
    name: 'T-Shirt Essential',
    price: 79,
    description: 'Podstawowa koszulka wykonana z czystej bawełny. Uniwersalna i wygodna, idealna na każdą okazję.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&auto=format',
    category: 't-shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Czarny', 'Biały', 'Szary', 'Granatowy', 'Beż'],
    rating: 4.5,
    reviews: 421,
    inStock: true,
  },
  {
    id: '5',
    name: 'T-Shirt Vintage',
    price: 99,
    description: 'Stylowa koszulka w stylu vintage z oryginalnym printem. Krótkiego rękawa, wykonana z komfortowego materiału.',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop&auto=format',
    category: 't-shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Biały', 'Beż', 'Khaki'],
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
  {
    id: '6',
    name: 'Spodnie Slim Fit',
    price: 199,
    description: 'Eleganckie spodnie dopasowane, idealne zarówno do pracy jak i wyjścia. Wykonane z trwałego materiału.',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=800&fit=crop&auto=format',
    category: 'pants',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Czarny', 'Granatowy', 'Szary'],
    rating: 4.4,
    reviews: 98,
    inStock: true,
  },
  {
    id: '7',
    name: 'Spodnie Jogger',
    price: 139,
    description: 'Wygodne spodnie joggerów z kieszonkami. Idealne do sportowych stylizacji i codziennego noszenia.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=800&fit=crop&auto=format',
    category: 'pants',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Czarny', 'Szary', 'Khaki'],
    rating: 4.6,
    reviews: 203,
    inStock: true,
  },
  {
    id: '8',
    name: 'Czapka Minimal',
    price: 49,
    description: 'Minimalistyczna czapka baseballowa z regulowanym paskiem. Nowoczesny design w czystych kolorach.',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=800&fit=crop&auto=format',
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Czarny', 'Biały', 'Szary'],
    rating: 4.3,
    reviews: 87,
    inStock: true,
  },
  {
    id: '9',
    name: 'Bluza Zip-Up Black',
    price: 299,
    description: 'Premium bluza na zamek z pewnością będzie hitem Twojej garderoby. Wysokiej jakości materiał i wykończenie.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop&auto=format',
    category: 'hoodies',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Czarny'],
    rating: 5.0,
    reviews: 145,
    inStock: true,
  },
];

export const getProductsByCategory = (slug: string) => {
  return products.filter(product => product.category === slug);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getCategoryBySlug = (slug: string) => {
  return categories.find(category => category.slug === slug);
};
