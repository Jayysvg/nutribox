export type Category = "fitness" | "tradicional" | "vegetariano" | "lowcarb";
export type Goal = "emagrecimento" | "massa" | "lowcarb" | "equilibrio";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  emoji?: string;
  image: string;
  calories: number;
  protein: number;
  rating: number;
  reviews: number;
  popular?: boolean;
  goals: Goal[];
}

export type KitSize = 5 | 8 | 10;

export interface Kit {
  size: KitSize;
  discount: number; // 0-1
  label: string;
  tagline: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
