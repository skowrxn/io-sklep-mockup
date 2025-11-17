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

const mockImage = (id: number) => `https://images.pexels.com/photos/${5000 + id}/pexels-photo-${5000 + id}.jpeg?auto=compress&cs=tinysrgb&w=600`;

export const categories: Category[] = [
  {
    id: '1',
    name: 'Bluzy',
    slug: 'hoodies',
    image: mockImage(1),
  },
  {
    id: '2',
    name: 'T-Shirty',
    slug: 't-shirts',
    image: mockImage(2),
  },
  {
    id: '3',
    name: 'Spodnie',
    slug: 'pants',
    image: mockImage(3),
  },
  {
    id: '4',
    name: 'Akcesoria',
    slug: 'accessories',
    image: mockImage(4),
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Bluza Basic Black',
    price: 189,
    description: 'Klasyczna czarna bluza o minimalistycznym designie. Wykonana z najwyższej jakości bawełny, zapewnia maksymalny komfort noszenia przez cały dzień.',
    image: mockImage(5),
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
    image: mockImage(6),
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
    image: mockImage(7),
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
    image: mockImage(8),
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
    image: mockImage(9),
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
    image: mockImage(10),
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
    image: mockImage(11),
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
    image: mockImage(12),
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
    image: mockImage(13),
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
