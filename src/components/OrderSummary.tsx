import { CheckCircle2, Clock, MapPin, PartyPopper, ShoppingBag } from "lucide-react";
import { CartItem } from "@/types";
import { calcOrderTotals, formatBRL } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMemo } from "react";

interface OrderSummaryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onConfirm: () => void;
  success: boolean;
}

const formatDelivery = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const day = d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
  return `${day.charAt(0).toUpperCase() + day.slice(1)}, entre 12h e 14h`;
};

export const OrderSummary = ({
  open, onOpenChange, items, onConfirm, success,
}: OrderSummaryProps) => {
  const { subtotal, total } = calcOrderTotals(items, [], null);
  const orderId = useMemo(() => "MF" + Math.floor(100000 + Math.random() * 900000), [open]);
  const delivery = useMemo(formatDelivery, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        {success ? (
          <div className="text-center animate-pop-in">
            <div className="relative bg-gradient-to-br from-primary to-primary-glow text-primary-foreground py-10 px-6 overflow-hidden">
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "radial-gradient(circle at 30% 30%, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary-foreground/15 backdrop-blur flex items-center justify-center mx-auto mb-4 border-2 border-primary-foreground/30">
                  <PartyPopper className="w-10 h-10" />
                </div>
                <h3 className="font-display font-extrabold text-3xl mb-1">Pedido confirmado!</h3>
                <p className="text-primary-foreground/85">
                  Pedido <span className="font-bold">#{orderId}</span>
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4 text-left">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-success/10 border border-success/20">
                <Clock className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-foreground">Entrega prevista</p>
                  <p className="text-muted-foreground">{delivery}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-muted">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-foreground">Endereço de entrega</p>
                  <p className="text-muted-foreground">Rua Exemplo, 123 · São Paulo, SP</p>
                </div>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Você receberá atualizações por e-mail e WhatsApp. 💚
              </p>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1 rounded-full"
                >
                  Ver pedidos
                </Button>
                <Button
                  onClick={() => onOpenChange(false)}
                  className="flex-1 rounded-full gradient-primary shadow-soft"
                >
                  Continuar comprando
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="font-display font-extrabold text-2xl flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" /> Resumo do pedido
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

            <div className="flex items-center gap-2 p-3 rounded-xl bg-success/10 border border-success/20 text-sm mb-4">
              <Clock className="w-4 h-4 text-success" />
              <span><span className="font-bold">Entrega:</span> {delivery}</span>
            </div>

            <div className="space-y-2 text-sm border-t border-border pt-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span><span>{formatBRL(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Frete</span><span className="text-success font-semibold">Grátis</span>
              </div>
              <div className="flex justify-between font-display font-extrabold text-xl pt-2 border-t border-border">
                <span>Total</span><span className="text-primary">{formatBRL(total)}</span>
              </div>
            </div>

            <Button onClick={onConfirm} size="lg" className="w-full rounded-full gradient-primary shadow-soft hover:shadow-glow mt-4 gap-2 h-12 font-bold">
              <CheckCircle2 className="w-4 h-4" /> Confirmar pedido
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
