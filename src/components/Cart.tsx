import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { CartItem } from "@/types";
import { formatBRL, calcOrderTotals } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter,
} from "@/components/ui/sheet";

interface CartProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const Cart = ({
  open, onOpenChange, items, onUpdateQty, onRemove, onCheckout,
}: CartProps) => {
  const { subtotal, total } = calcOrderTotals(items, [], null);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-border">
          <SheetTitle className="font-display font-extrabold text-2xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Seu Carrinho
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground py-16">
              <div className="text-6xl mb-4">🍱</div>
              <p className="font-semibold text-foreground mb-1">Carrinho vazio</p>
              <p className="text-sm">Adicione marmitas para começar.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-xl bg-muted/50 border border-border animate-slide-up"
                >
                  <div className="text-3xl">{item.product.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {formatBRL(item.product.price)} cada
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-card rounded-full border border-border">
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:text-primary transition-smooth"
                          aria-label="Diminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:text-primary transition-smooth"
                          aria-label="Aumentar"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-display font-bold text-primary">
                        {formatBRL(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.product.id)}
                    className="self-start text-muted-foreground hover:text-destructive transition-smooth"
                    aria-label="Remover"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-border px-6 py-5 flex-col gap-3 sm:flex-col sm:space-x-0">
            <div className="w-full space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatBRL(subtotal)}</span>
              </div>
              <div className="flex justify-between font-display font-extrabold text-lg text-foreground pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">{formatBRL(total)}</span>
              </div>
            </div>
            <Button onClick={onCheckout} size="lg" className="w-full rounded-full gradient-primary shadow-soft">
              Finalizar Pedido →
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
