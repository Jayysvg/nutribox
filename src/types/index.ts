export type Category = "fitness" | "tradicional" | "vegetariano" | "lowcarb";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  emoji: string;
  calories: number;
}

export type KitSize = 5 | 8 | 10;

export interface Kit {
  size: KitSize;
  discount: number; // percentage 0-1
  label: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
