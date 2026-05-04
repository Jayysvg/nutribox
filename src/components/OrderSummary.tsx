import { CheckCircle2, PartyPopper } from "lucide-react";
import { CartItem } from "@/types";
import { calcOrderTotals, formatBRL } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface OrderSummaryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onConfirm: () => void;
  success: boolean;
}

export const OrderSummary = ({
  open, onOpenChange, items, onConfirm, success,
}: OrderSummaryProps) => {
  const { subtotal, total } = calcOrderTotals(items, [], null);
  const orderId = "MF" + Math.floor(100000 + Math.random() * 900000);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {success ? (
          <div className="text-center py-6 animate-pop-in">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-5 shadow-glow">
              <PartyPopper className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="font-display font-extrabold text-2xl mb-2">Pedido confirmado!</h3>
            <p className="text-muted-foreground mb-1">Pedido #{orderId}</p>
            <p className="text-sm text-muted-foreground mb-6">
              Suas marmitas chegarão refrigeradas em breve. 🚚
            </p>
            <Button onClick={() => onOpenChange(false)} size="lg" className="w-full rounded-full gradient-primary">
              Continuar comprando
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display font-extrabold text-2xl">
                Resumo do pedido
              </DialogTitle>
            </DialogHeader>

            <div className="max-h-72 overflow-y-auto space-y-2 my-4">
              {items.map((i) => (
                <div key={i.product.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <span className="text-2xl">{i.product.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{i.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qtd: {i.quantity}</p>
                  </div>
                  <span className="font-display font-bold text-primary text-sm">
                    {formatBRL(i.product.price * i.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm border-t border-border pt-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span><span>{formatBRL(subtotal)}</span>
              </div>
              <div className="flex justify-between font-display font-extrabold text-xl pt-2 border-t border-border">
                <span>Total</span><span className="text-primary">{formatBRL(total)}</span>
              </div>
            </div>

            <Button onClick={onConfirm} size="lg" className="w-full rounded-full gradient-primary shadow-soft mt-4 gap-2">
              <CheckCircle2 className="w-4 h-4" /> Confirmar pedido
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
