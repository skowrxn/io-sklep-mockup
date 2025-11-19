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

// Używamy prawdziwych zdjęć z Mock.shop API
export const categories: Category[] = [
  {
    id: '1',
    name: 'Bluzy',
    slug: 'hoodies',
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/products/GreenHoodie01.jpg?v=1739549220',
  },
  {
    id: '2',
    name: 'T-Shirty',
    slug: 't-shirts',
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/products/GreenWomensTshirt01.jpg?v=1675463247',
  },
  {
    id: '3',
    name: 'Buty',
    slug: 'shoes',
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/products/Whiteleathersneakers01.jpg?v=1675447604',
  },
  {
    id: '4',
    name: 'Akcesoria',
    slug: 'accessories',
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/products/Blacksunnies.jpg?v=1675447388',
  },
];

// Produkty z prawdziwymi zdjęciami z Mock.shop API
export const products: Product[] = [
  {
    id: '1',
    name: 'Men\'s Crewneck',
    price: 189,
    description: 'This high-quality crewneck is perfect for your everyday look. Made with 100% cotton, it\'s soft, comfortable, and undeniably stylish. Full sleeved for a classic look and effortlessly versatile.',
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/products/GreenMenscrew01.jpg?v=1675454919',
    category: 'hoodies',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Zielony', 'Czarny', 'Biały'],
    rating: 4.8,
    reviews: 247,
    inStock: true,
  },
  {
    id: '2',
    name: 'Hoodie',
    price: 219,
    description: 'Stylowa bluza z kapturem wykonana z najwyższej jakości bawełny. Idealna na chłodniejsze dni i casualowe stylizacje.',
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/products/GreenHoodie01.jpg?v=1739549220',
    category: 'hoodies',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Zielony', 'Szary', 'Czarny'],
    rating: 4.6,
    reviews: 189,
    inStock: true,
  },
  {
    id: '3',
    name: 'Women\'s Crewneck',
    price: 179,
    description: 'Elegancka bluza damska o klasycznym kroju. Idealna zarówno na co dzień jak i do bardziej casualowych wyjść.',
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/products/GreenWomenscrew01.jpg?v=1675453375',
    category: 'hoodies',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Zielony', 'Różowy', 'Biały'],
    rating: 4.9,
    reviews: 312,
    inStock: true,
  },
  {
    id: '4',
    name: 'Women\'s T-shirt',
    price: 79,
    description: 'Podstawowa damska koszulka wykonana z czystej bawełny. Uniwersalna i wygodna, idealna na każdą okazję.',
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/products/GreenWomensTshirt01.jpg?v=1675463247',
    category: 't-shirts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Zielony', 'Czarny', 'Biały', 'Szary'],
    rating: 4.5,
    reviews: 421,
    inStock: true,
  },
  {
    id: '5',
    name: 'Black Sunnies',
    price: 99,
    description: 'Stylowe czarne okulary przeciwsłoneczne. Klasyczny design, który pasuje do każdej stylizacji. Ochrona UV400.',
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/products/Blacksunnies.jpg?v=1675447388',
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Czarny'],
    rating: 4.7,
    reviews: 156,
    inStock: true,
  },
  {
    id: '6',
    name: 'White Leather Sneakers',
    price: 299,
    description: 'Eleganckie białe skórzane sneakersy. Klasyczny design, który nigdy nie wychodzi z mody. Idealne zarówno do casualowych jak i bardziej eleganckich stylizacji.',
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/products/Differentwhiteleathersneakers01.jpg?v=1675447428',
    category: 'shoes',
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    colors: ['Biały'],
    rating: 4.4,
    reviews: 98,
    inStock: true,
  },
  {
    id: '7',
    name: 'High Top Sneakers',
    price: 339,
    description: 'Wysokie skórzane sneakersy w klasycznym stylu. Doskonałe na jesień i zimę, zapewniają komfort i styl.',
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/products/Whiteleathersneakers01.jpg?v=1675447604',
    category: 'shoes',
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    colors: ['Biały', 'Czarny'],
    rating: 4.6,
    reviews: 203,
    inStock: true,
  },
  {
    id: '8',
    name: 'Canvas Sneakers',
    price: 149,
    description: 'Lekkie sneakersy z płótna, idealne na lato. Wygodne i stylowe, doskonałe do casualowych stylizacji.',
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/products/GreenCanvasSneaker01.jpg?v=1675454881',
    category: 'shoes',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    colors: ['Zielony', 'Biały', 'Czarny'],
    rating: 4.3,
    reviews: 87,
    inStock: true,
  },
  {
    id: '9',
    name: 'Gray Leather Sneakers',
    price: 289,
    description: 'Szare skórzane sneakersy o sportowym charakterze. Idealne do aktywnego stylu życia i codziennych wyjść.',
    image: 'https://cdn.shopify.com/s/files/1/0688/1755/1382/products/Greyleathersneakers.jpg?v=1675447462',
    category: 'shoes',
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    colors: ['Szary', 'Czarny'],
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
