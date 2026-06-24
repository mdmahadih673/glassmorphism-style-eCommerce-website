export interface Product {
  id: string;
  name: string;
  category: 'Skincare' | 'Makeup' | 'Mists';
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  tagline: string;
  description: string;
  ingredients: string[];
  usage: string;
  isFeatured?: boolean;
  glowColor: string; // e.g. 'rgba(255, 158, 207, 0.4)'
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
