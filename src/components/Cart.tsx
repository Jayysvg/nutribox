import { Minus, Plus, ShoppingBag, Trash2, TrendingDown, Truck } from "lucide-react";
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

const FREE_SHIPPING_THRESHOLD = 150;

export const Cart = ({
  open, onOpenChange, items, onUpdateQty, onRemove, onCheckout,
}: CartProps) => {
  const { subtotal, total } = calcOrderTotals(items, [], null);
  // Simulated savings: each item gets ~8% implied bundle discount when 5+ items
  const totalUnits = items.reduce((s, i) => s + i.quantity, 0);
  const savings = totalUnits >= 5 ? subtotal * 0.08 : 0;
  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);
  const shippingProgress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b border-border bg-muted/30">
          <SheetTitle className="font-display font-extrabold text-2xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" /> Seu Carrinho
            {totalUnits > 0 && (
              <span className="text-sm font-semibold text-muted-foreground">({totalUnits})</span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground py-16">
              <div className="text-6xl mb-4">🍱</div>
              <p className="font-display font-bold text-foreground text-lg mb-1">Carrinho vazio</p>
              <p className="text-sm">Adicione marmitas para começar.</p>
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="mt-6 rounded-full"
              >
                Ver cardápio
              </Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-smooth animate-slide-up"
                >
                 <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {formatBRL(item.product.price)} cada
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-muted rounded-full p-0.5">
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-card hover:text-primary transition-smooth"
                          aria-label="Diminuir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-card hover:text-primary transition-smooth"
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
                    className="self-start text-muted-foreground hover:text-destructive transition-smooth p-1"
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
          <SheetFooter className="border-t border-border px-6 py-5 flex-col gap-3 sm:flex-col sm:space-x-0 bg-muted/30">
            {/* Free shipping progress */}
            <div className="w-full p-3 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 text-xs mb-2">
                <Truck className="w-3.5 h-3.5 text-primary" />
                {missingForFreeShipping > 0 ? (
                  <span>
                    Faltam <span className="font-bold text-primary">{formatBRL(missingForFreeShipping)}</span> para frete grátis 🚚
                  </span>
                ) : (
                  <span className="font-bold text-success">🎉 Frete grátis liberado!</span>
                )}
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full gradient-primary transition-smooth"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatBRL(subtotal)}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-success font-semibold animate-slide-up">
                  <span className="flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    Você economizou
                  </span>
                  <span>−{formatBRL(savings)}</span>
                </div>
              )}
              <div className="flex justify-between font-display font-extrabold text-xl text-foreground pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">{formatBRL(total)}</span>
              </div>
            </div>
            <Button onClick={onCheckout} size="lg" className="w-full rounded-full gradient-primary shadow-soft hover:shadow-glow h-12 font-bold text-base">
              Finalizar pedido →
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
