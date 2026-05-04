import { useEffect, useState } from "react";
import { CartItem, Product } from "@/types";

const STORAGE_KEY = "marmitafit:cart:v1";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) =>
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

  const removeItem = (id: string) =>
    setItems((prev) => prev.filter((i) => i.product.id !== id));

  const updateQty = (id: string, qty: number) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, quantity: qty } : i))
    );

  const addMany = (newItems: CartItem[]) =>
    setItems((prev) => {
      const map = new Map(prev.map((i) => [i.product.id, { ...i }]));
      for (const ni of newItems) {
        const existing = map.get(ni.product.id);
        if (existing) existing.quantity += ni.quantity;
        else map.set(ni.product.id, { ...ni });
      }
      return Array.from(map.values());
    });

  const clear = () => setItems([]);

  return { items, addItem, removeItem, updateQty, addMany, clear };
}
