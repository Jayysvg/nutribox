import { CartItem, Kit } from "@/types";

export const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const calcSubtotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

export const calcKitSubtotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

export const calcKitDiscount = (subtotal: number, kit: Kit) =>
  subtotal * kit.discount;

export interface OrderTotals {
  subtotal: number;
  discount: number;
  total: number;
}

export const calcOrderTotals = (
  cartItems: CartItem[],
  kitItems: CartItem[],
  kit: Kit | null
): OrderTotals => {
  const cartSubtotal = calcSubtotal(cartItems);
  const kitSubtotal = calcKitSubtotal(kitItems);
  const discount = kit ? calcKitDiscount(kitSubtotal, kit) : 0;
  const subtotal = cartSubtotal + kitSubtotal;
  return { subtotal, discount, total: subtotal - discount };
};

export const totalKitItems = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0);
